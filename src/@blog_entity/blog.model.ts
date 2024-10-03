import mongoose, { Schema } from 'mongoose';

interface IBlog {
    title: string;
    images: string;
    content: any; // Can use a specific type if you have a defined structure
    quote: string;
    created_at: Date;
}

const blogSchema: Schema = new Schema({
    title: { type: String, required: true },
    images: { type: String },
    content: { type: Schema.Types.Mixed }, // Using Mixed for JSON
    quote: { type: String },
    created_at: { type: Date, default: Date.now }
});

const Blog = mongoose.model<IBlog>('Blog', blogSchema);
export default Blog;
