import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
});

export const Product = mongoose.model<IProduct>('Product', productSchema);
