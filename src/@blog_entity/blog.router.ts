import {Router} from 'express';
import { createBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from './blog.controller';

const router=Router();

router.post('/',createBlog);
router.put('/:id',updateBlog);
router.get('/',getBlogs);
router.get('/:id',getBlogById);
router.delete('/:id',deleteBlog);

export default router;