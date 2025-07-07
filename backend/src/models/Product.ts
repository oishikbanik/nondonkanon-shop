import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default model<IProduct>('Product', productSchema);
