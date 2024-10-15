import mongoose, { Schema } from 'mongoose';

interface IBooking {
    user_name: string;
    user_mobile?: string;
    user_email?: string;
    user_address?: string;
    totalPrice: string;
    tours_details: any[];
    adult_price: number;
    children_price: number;
    infant_price: number;
    payNow: boolean;
}

const bookingSchema: Schema = new Schema({
    user_name: { type: String, required: true },
    user_mobile: { type: String },
    user_email: { type: String },
    user_address: { type: String },
    totalPrice: { type: String },
    adult_price: { type: Number, required: true },    // New field
    children_price: { type: Number, required: true }, // New field
    infant_price: { type: Number, required: true },    // New field
    tours_details: { type: Array, required: true },
    payNow: { type: Boolean }
});

const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
export default Booking;
