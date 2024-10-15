import mongoose, { Schema } from 'mongoose';

interface IBooking {
    user_name: string;
    user_mobile?: string;
    user_email?: string;
    user_address?: string;
    totalPrice: string;
    tours_details: any[];
    payNow: boolean;
}

const bookingSchema: Schema = new Schema({
    user_name: { type: String, required: true },
    user_mobile: { type: String },
    user_email: { type: String },
    user_address: { type: String },
    totalPrice: { type: String },
    tours_details: { type: Array, required: true },
    payNow: { type: Boolean }
});

const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
export default Booking;
