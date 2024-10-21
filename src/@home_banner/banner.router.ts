import { Router } from 'express';
import {
    createBanner,
    getBanners,
    getBannerById,
    updateBanner,
    deleteBanner,
} from './banner.controller';

const router = Router();

router.route('/')
    .post(createBanner)
    .get(getBanners);

router.route('/:id')
    .get(getBannerById)
    .put(updateBanner)
    .delete(deleteBanner);

export default router;
