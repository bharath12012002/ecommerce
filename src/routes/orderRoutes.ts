import express from 'express';
import {  viewOrders, placeOrder } from '../controllers/orderController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();

 router.post('/place', verifyToken, placeOrder);
router.get('/vieworders', verifyToken, viewOrders);

export default router;
