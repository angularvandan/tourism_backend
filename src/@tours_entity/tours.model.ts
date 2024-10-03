import mongoose, {  Schema } from 'mongoose';

interface ITour {
    name: string;
    description: string;
    address: string;
    images: string[];
    tips: any; // Can use a specific type if you have a defined structure
}

const tourSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    address: { type: String },
    images: { type: [String] },
    tips: { type: Schema.Types.Mixed } // Using Mixed for JSON
});

const Tour = mongoose.model<ITour>('Tour', tourSchema);

export default Tour;
