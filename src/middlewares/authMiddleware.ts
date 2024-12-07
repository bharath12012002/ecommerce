// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { User } from '../models/userModel';

// export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       return res.status(403).json({ message: 'No token provided' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }
//     req.user = { id: user.id, role: user.role }; // Attach user data to request
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };

// export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       return res.status(403).json({ message: 'No token provided' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
//     const user = await User.findById(decoded.id);
//     if (!user || user.role !== 'admin') {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };


import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';

// Middleware to verify the token
export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(403).json({ message: 'No token provided' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }
    
    req.user = { id: user.id, role: user.role }; // Attach user data to request
    next(); // Proceed to the next middleware
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to check if the user is an admin
export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(403).json({ message: 'No token provided' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const user = await User.findById(decoded.id);
    if (!user || user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied' });
      return; 
    }

    next(); // Proceed to the next middleware
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
