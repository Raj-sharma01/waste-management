import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    try {
        // console.log("auth error")
        // Extract the token from the cookies
        const token = req.cookies.token;
        console.log(req.cookies)
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Verify the token
        const decoded = jwt.verify(token, 'secret');

        // Add the officer ID to the request object
        req.userId = decoded.userId;

        // Call next middleware
        next();
    } catch (error) {
        // console.log("auth error")
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
