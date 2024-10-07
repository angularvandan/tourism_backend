import mongoose, { Schema } from 'mongoose';

interface IBlog {
    title: string;
    images: string[];
    content: any[]; // Can use a specific type if you have a defined structure
    quote: object;
}

const blogSchema: Schema = new Schema({
    title: { type: String, required: true },
    images: { type: [String] ,required: true},
    content: { type: Schema.Types.Mixed ,required: true}, // Using Mixed for JSON
    quote: { type: Object },
},{
    timestamps:true
});

const Blog = mongoose.model<IBlog>('Blog', blogSchema);
export default Blog;
