import express from 'express';
import { addToCart, removeFromCart, viewCart } from '../controllers/cartController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();

// Routes for cart actions; requires authentication
router.post('/add', verifyToken, addToCart);
router.delete('/remove/:productId', verifyToken, removeFromCart);
router.get('/view', verifyToken, viewCart);

export default router;
