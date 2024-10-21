import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Banner from './banner.model';

export const createBanner = asyncHandler(async (req: Request, res: Response) => {
    const { image, subtitle, title, name } = req.body;

    const newBanner = await Banner.create({ image, subtitle, title, name });

    res.status(201).json(newBanner);
});

export const getBanners = asyncHandler(async (req: Request, res: Response) => {
    const banners = await Banner.find();
    res.status(200).json(banners);
});

export const getBannerById = asyncHandler(async (req: Request, res: Response) => {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
        res.status(404).json({ message: 'Banner not found' });
    } else {
        res.status(200).json(banner);
    }
});

export const updateBanner = asyncHandler(async (req: Request, res: Response) => {
    const { image, subtitle, title, name } = req.body;

    const updatedBanner = await Banner.findByIdAndUpdate(
        req.params.id,
        { image, subtitle, title, name },
        { new: true }
    );

    if (!updatedBanner) {
        res.status(404).json({ message: 'Banner not found' });
    } else {
        res.status(200).json(updatedBanner);
    }
});

export const deleteBanner = asyncHandler(async (req: Request, res: Response) => {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
        res.status(404).json({ message: 'Banner not found' });
    } else {
        res.status(204).send();
    }
});
