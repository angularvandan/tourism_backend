import ErrorHandler from "../../utils/errorHandler"
import userModel from "./user.model";
import bcrypt from 'bcryptjs';
import validator from "validator";


export const register = async (req: any, res: any, next: any) => {
    console.log(req);
    const { name, email, password, phone, role } = req.body

    if (!name || !email || !password || !phone || !role) {
        return next(new ErrorHandler("All fields are rewuired", 500))
    }
    // Validate email format
    if (!validator.isEmail(email)) {
        return next(new ErrorHandler("Invalid email format", 400));
    }

    try {
        // Check if email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return next(new ErrorHandler("Email already in use", 400));
        }

        const newUser = new userModel({ name, email, password, phone, role });
        const user = await newUser.save();
        const token = user.getJWTToken();
        res.status(200).json({ success: true, message: "User created successfully!", user, token });
    } catch (error: any) {
        res.status(500).json({ success: false, error });
    }
}

// Login Controller
export const login = async (req: any, res: any, next: any) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please provide both email and password", 400));
    }

    try {
        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        const token = user.getJWTToken();

        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
        };

        res.status(200).json({
            success: true,
            message: "Logged in successfully!",
            userData,
            token,
        });
    } catch (error: any) {
        next(new ErrorHandler(error.message, 500));
    }
};
