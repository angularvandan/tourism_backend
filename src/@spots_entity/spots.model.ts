import mongoose, { Schema } from 'mongoose';

interface ISpot {
    name: string;
    tour_id: mongoose.Types.ObjectId;
    tips: any; // Can use a specific type if you have a defined structure
    images: string[];
}

const spotSchema: Schema = new Schema({
    name: { type: String, required: true },
    tour_id: { type: mongoose.Types.ObjectId, ref: 'Tour' },
    tips: { type: Schema.Types.Mixed },
    images: { type: [String] }
});

const Spot = mongoose.model<ISpot>('Spot', spotSchema);
export default Spot;
