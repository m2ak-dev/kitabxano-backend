import { Request, Response, NextFunction } from 'express';

// Extended Request interface to include user
export interface AuthRequest extends Request {
    userId?: string;
}

// Authentication middleware
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Extract token from "Bearer <token>" format
    const tokenArray = token.split(' ');
    if (tokenArray.length !== 2 || tokenArray[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
    }

    // For demonstration purposes, we'll use a simple token validation
    // In production, use JWT verification
    const userId = tokenArray[1];
    
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Attach user ID to request
    req.userId = userId;
    next();
};

// Optional: Verify user exists (requires controller reference)
export const verifyUserExists = (users: Map<string, any>) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.userId || !users.has(req.userId)) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }
        next();
    };
};