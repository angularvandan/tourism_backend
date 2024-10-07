import mongoose, { Schema, Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
// Define an interface that extends Mongoose's Document to type the User model
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: string;
    getJWTToken(): string; // Method to generate JWT token
}

// Create the user schema with proper fields
const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, default: 'admin' }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password as string, 10);
});

// Define instance methods for the user schema
userSchema.methods.getJWTToken = function (): string {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_TOKEN_EXPIRE
    });
};

// Create and export the User model
const User = mongoose.model<IUser>('User', userSchema);
export default User;
