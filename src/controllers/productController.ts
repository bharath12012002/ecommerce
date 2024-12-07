import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/productModel';

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, price } = req.body;

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      res.status(400).json({ message: 'Product already exists' });
      return; 
    }

    const product = new Product({ name, price });
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const product = await Product.findByIdAndUpdate(id, { name, price }, { new: true });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return; 
    }

    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    next(error); 
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return; 
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
