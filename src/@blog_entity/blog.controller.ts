import asyncHandler from 'express-async-handler';
import Blog from './blog.model';

// Get all blog posts
export const getBlogs = asyncHandler(async (req: any, res: any) => {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
});

// Get a single blog post by ID
export const getBlogById = asyncHandler(async (req: any, res: any) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(blog);
});

// Create a new blog post
export const createBlog = asyncHandler(async (req: any, res: any) => {
    const { title, images, content } = req.body;

    // Validate required fields
    if (!title || !images || !content) {
        return res.status(400).json({ message: 'Title, images, and content are required' });
    }

    const blog = new Blog(req.body);
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
});

// Update a blog post by ID
export const updateBlog = asyncHandler(async (req: any, res: any) => {
    const { title, images, content } = req.body;

    // Validate required fields
    if (!title || !images || !content) {
        return res.status(400).json({ message: 'Title, images, and content are required' });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) {
        return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(updatedBlog);
});

// Delete a blog post by ID
export const deleteBlog = asyncHandler(async (req: any, res: any) => {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
        return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json({message:"Deleted Successfully"});
});
