import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { Officer } from '../models/officer.model.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, 'secret');
        req.userId = decoded.userId;
        req.userRole = decoded.role;

        let user;
        if (decoded.role === 'officer') {
            user = await Officer.findById(req.userId);
        } else {
            user = await User.findById(req.userId);
        }

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};
