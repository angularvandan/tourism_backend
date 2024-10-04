import mongoose, { Schema } from 'mongoose';

interface ISpot {
    name: string;
    tour_id: mongoose.Types.ObjectId;
    tips: any; // Can use a specific type if you have a defined structure
    images: string[];
    price_adult: number;
    price_child?: number;
    price_infant?: number;
}

const spotSchema: Schema = new Schema({
    name: { type: String, required: true },
    tour_id: { type: mongoose.Types.ObjectId, ref: 'Tour' },
    tips: { type: Schema.Types.Mixed },
    images: { type: [String] },
    price_adult: { type: Number }, // Price for adults
    price_child: { type: Number }, // Price for children (optional)
    price_infant: { type: Number } // Price for infants (optional)
});

const Spot = mongoose.model<ISpot>('Spot', spotSchema);
export default Spot;
