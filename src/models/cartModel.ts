import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from './productModel'; // Import IProduct interface, not the model itself

// Updated ICartItem to include the populated Product type
export interface ICartItem {
  productId: IProduct; // Now using the IProduct interface, not the Product model itself
  quantity: number;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
}

const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
});

export const Cart = mongoose.model<ICart>('Cart', cartSchema);
