import ErrorHandler from "../../utils/errorHandler"
import userModel from "./user.model"

export const register = async (req: any, res: any, next: any) => {
    const { name, email, password, phone, role } = req.body

    if (!name || !email || !password || !phone || !role) {
        return next(new ErrorHandler("All fields are rewuired", 500))
    }

    try {
        const newUser = new userModel({ name, email, password, phone, role })
        const user = await newUser.save()
        const token = user.getJWTToken()
        res.status(200).json({ success: true, message: "User created successfully!", user, token })
    } catch (error: any) {
        res.status(500).json({ success: false, error })
    }

}