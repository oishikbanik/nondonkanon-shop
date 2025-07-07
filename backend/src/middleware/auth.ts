import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No auth token found' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!(req as any).user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Admin access required' });
  }
};
