import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedback extends Document {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  message?: string;
}

const FeedbackSchema: Schema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String }
}, {
  timestamps: true
});

export default mongoose.model<IFeedback>('Feedback', FeedbackSchema);
