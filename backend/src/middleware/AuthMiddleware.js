import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.writeHead(401, { 'Content-Type': 'text/plain' }).end('Unauthorized');
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.writeHead(403, { 'Content-Type': 'text/plain' }).end('Invalid token');
    }
};

export default authMiddleware;
