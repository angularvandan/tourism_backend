import mongoose, { Schema } from 'mongoose';

interface ITour {
    name: string;
    title: string,
    description: string;
    address: string;
    images: string[];
    tips: any; // Can use a specific type if you have a defined structure
    price_adult: number;
    price_child?: number;
    price_infant?: number;
}

const tourSchema: Schema = new Schema({
    name: { type: String },
    title: { type: String },
    description: { type: String },
    address: { type: String },
    images: { type: [String] },
    tips: { type: Schema.Types.Mixed }, // Using Mixed for JSON,
    price_adult: { type: Number }, // Price for adults
    price_child: { type: Number }, // Price for children (optional)
    price_infant: { type: Number } // Price for infants (optional)
});

const Tour = mongoose.model<ITour>('Tour', tourSchema);

export default Tour;
