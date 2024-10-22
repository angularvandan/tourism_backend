import mongoose, { Document, Schema } from 'mongoose';

export interface IEntity extends Document {
    image: string;
    subtitle: string;
    title: string;
    name: string;
}

const entitySchema: Schema = new Schema({
    image: { type: String, required: true },
    subtitle: { type: String, required: true },
    title: { type: String, required: true },
    name: { type: String, required: true }
});

const Entity = mongoose.model<IEntity>('Entity', entitySchema);
export default Entity;
