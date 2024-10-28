// privacyPolicyAPI/privacyPolicyModel.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IPrivacyPolicy extends Document {
    privacyContent: string;
    updatedAt: Date;
}

const PrivacyPolicySchema: Schema = new Schema(
    {
        privacyContent: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IPrivacyPolicy>('PrivacyPolicy', PrivacyPolicySchema);
