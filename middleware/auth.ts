import ErrorHandler from '../utils/errorHandler';
import userModel from '../src/@user_entity/user.model'
import jwt from 'jsonwebtoken';


export interface AuthRequest extends Request {
  userId?: string;
}

export const auth = async (req: any, res: any, next: any) => {
  if (!req.headers.authorization) {
    return res.status(401).send({
      error: {
        message: `Unauthorized.Please Send token in request header`,
      },
    });
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET!
    ) as { userId: string };;

    req.userId = userId;

    const userValid = await userModel.findById(userId);

    if (!userValid) {
      return res
        .status(401)
        .send({ error: { message: `Unauthorized user not valid` } });
    }
    next();
  } catch (error: any) {
    return res.status(401).send({
      error: { message: `Unauthorized server error ${(error)}` },
    });
  }
};

export const isAdmin = async (req: any, res: any, next: any) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId).select("+password");
    if (!user)
      return next(new ErrorHandler("Invalid token. User not found.", 401));

    if (user.role !== "admin")
      return next(new ErrorHandler("Restricted: Admin Only", 401));

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandler("Unauthorized is admin error", 401));
  }
};