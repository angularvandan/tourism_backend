// privacyPolicyAPI/privacyPolicyModel.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IPrivacyPolicy extends Document {
    content: string;
    updatedAt: Date;
}

const PrivacyPolicySchema: Schema = new Schema(
    {
        content: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IPrivacyPolicy>('PrivacyPolicy', PrivacyPolicySchema);
