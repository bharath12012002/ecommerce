import express from 'express';
import { createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { isAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

// Admin-only product management routes
router.post('/create', isAdmin, createProduct);
router.put('/update/:id', isAdmin, updateProduct);
router.delete('/delete/:id', isAdmin, deleteProduct);

export default router;
