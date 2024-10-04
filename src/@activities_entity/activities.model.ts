import mongoose, { Schema } from 'mongoose';

interface IActivity {
    name: string;
    description: string;
    price_adult: number;
    price_child?: number;
    price_infant?: number;
    image: string;
    spot_id: mongoose.Types.ObjectId;
}

const activitySchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price_adult: { type: Number },
    price_child: { type: Number },
    price_infant: { type: Number },
    image: { type: String },
    spot_id: { type: mongoose.Types.ObjectId, ref: 'Spot' }
});

const Activity = mongoose.model<IActivity>('Activity', activitySchema);
export default Activity;
