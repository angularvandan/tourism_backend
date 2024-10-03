import mongoose, { Schema } from 'mongoose';

interface IPayment extends Document {
    booking_id: mongoose.Types.ObjectId;
    amount: string;
    success: boolean;
    date: Date;
    method: string;
}

const paymentSchema: Schema = new Schema({
    booking_id: { type: mongoose.Types.ObjectId, ref: 'Booking' },
    amount: { type: String },
    success: { type: Boolean },
    date: { type: Date, default: Date.now },
    method: { type: String }
});

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);
export default Payment;
