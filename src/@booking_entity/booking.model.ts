import mongoose, { Schema, Document } from 'mongoose';

interface IPriceDetail {
    count: number;
    price: number;
    totalPrice: number;
}

interface IBooking extends Document {
    user_name: string;
    user_mobile?: string;
    user_email?: string;
    user_address?: string;
    totalPrice: string;
    tours_details: any[];
    priceDetails: {
        adult: IPriceDetail;
        child: IPriceDetail;
        infant: IPriceDetail;
    };
    payNow: boolean;
}

const priceDetailSchema: Schema = new Schema({
    count: { type: Number, required: true },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
});

const bookingSchema: Schema = new Schema({
    user_name: { type: String, required: true },
    user_mobile: { type: String },
    user_email: { type: String },
    user_address: { type: String },
    totalPrice: { type: String },
    tours_details: { type: Array, required: true },
    priceDetails: {
        adult: { type: priceDetailSchema, required: true, default: { count: 1, price: 0, totalPrice: 0 } },
        child: { type: priceDetailSchema, required: true, default: { count: 1, price: 0, totalPrice: 0 } },
        infant: { type: priceDetailSchema, required: true, default: { count: 1, price: 0, totalPrice: 0 } }
    },
    payNow: { type: Boolean }
});

const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
export default Booking;
