import mongoose, { Schema, model, Document } from 'mongoose';

// Define the interface for the Payment document
interface PaymentDocument extends Document {
  orderID: string;                 // Unique identifier for the payment order
  bookingId: Schema.Types.ObjectId; // Reference to the Booking model
  amount: number;                  // Amount paid
  paymentStatus: string;           // Status of the payment (e.g., "COMPLETED", "ERROR")
  payerID?: string;                // PayPal payer ID (optional)
  paymentDate?: Date;              // Date of the payment
  errorMessage?: string;           // Error message if payment failed (optional)
  errorDetails?: Record<string, any>; // Detailed error information (optional)
}

// Define the schema for the Payment model
const paymentSchema = new Schema<PaymentDocument>({
  orderID: { type: String, required: true },                       // Order ID
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true }, // Reference to Booking
  amount: { type: Number, required: true },                        // Payment amount
  paymentStatus: { type: String, required: true },                 // Payment status
  payerID: { type: String },                                       // PayPal payer ID
  paymentDate: { type: Date, default: Date.now },                 // Payment date
  errorMessage: { type: String },                                  // Error message for failed payments
  errorDetails: { type: Schema.Types.Mixed }                      // Additional details about the error
});

export const Payment = model<PaymentDocument>('Payment', paymentSchema);
