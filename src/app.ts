import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils/db';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middlewares/errorHandler';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';
import productRoutes from './routes/productRoutes'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/', authRoutes);

app.use('/', cartRoutes);
app.use('/', orderRoutes);
app.use('/', productRoutes);
app.use(errorHandler);

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});