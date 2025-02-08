import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express' {
    interface Request {
        user?: any;
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.cookies.access_token;

        if (!authHeader || authHeader.trim() === '') {
            return res.status(401).json({ message: 'You are not authenticated!' });
        }

        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            throw new Error('JWT_SECRET_KEY is not defined in environment variables.');
        }

        jwt.verify(authHeader, secretKey, (error: any, user: any) => {
            if (error) {
                return res.status(403).json({ message: 'Token is not valid!' });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error during authentication.' });
    }
};