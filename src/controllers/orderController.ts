import { Request, Response, NextFunction } from 'express';
import { Cart } from '../models/cartModel';
import { Order } from '../models/orderModel';
import { User } from '../models/userModel';
import { sendOrderConfirmationEmail } from '../utils/mailer';
export const placeOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
     }
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      res.status(400).json({ message: 'Cart is empty' });
      return; 
    }

    const items = cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price * item.quantity,
    }));

    const total = items.reduce((sum, item) => sum + item.price, 0);

    const order = new Order({ userId, items, total });
    await order.save();

    await Cart.deleteOne({ userId });
    const user = await User.findById(userId);
    if (user && user.email) {
      // Send order confirmation email
      await sendOrderConfirmationEmail(user.email, order._id.toString(), total);
    }
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    next(error); 
  }
};

export const viewOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return; 
    }
    const userId = req.user.id;

    const orders = await Order.find({ userId }).populate('items.productId');
    res.status(200).json({ orders });
  } catch (error) {
    next(error); 
  }
};
