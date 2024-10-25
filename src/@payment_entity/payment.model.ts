// import mongoose, { Schema } from 'mongoose';

// interface IPayment extends Document {
//     booking_id: mongoose.Types.ObjectId;
//     amount: string;
//     success: boolean;
//     date: Date;
//     method: string;
// }

// const paymentSchema: Schema = new Schema({
//     booking_id: { type: mongoose.Types.ObjectId, ref: 'Booking' },
//     amount: { type: String },
//     success: { type: Boolean },
//     date: { type: Date, default: Date.now },
//     method: { type: String }
// });

// const Payment = mongoose.model<IPayment>('Payment', paymentSchema);
// export default Payment;
import mongoose, { Schema, model, Document } from 'mongoose';

interface PaymentDocument extends Document {
  orderID: string;
  bookingId: Schema.Types.ObjectId;  // Use Schema.Types.ObjectId for compatibility
  amount: number;
  paymentStatus: string;
  payerID?: string;
  paymentDate?: Date;
}

const paymentSchema = new Schema<PaymentDocument>({
  orderID: { type: String, required: true },
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },  // Reference Booking model
  amount: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
  payerID: { type: String },
  paymentDate: { type: Date, default: Date.now }
});

export const Payment = model<PaymentDocument>('Payment', paymentSchema);
