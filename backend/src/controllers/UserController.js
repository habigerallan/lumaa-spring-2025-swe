import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserService from '../services/UserService.js';

dotenv.config();

class UserController {
    static async register(req, res) {
        try {
            const { username, password } = req.body;

            const existingUser = await UserService.getByUsername(username);
            if (existingUser) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                return res.end('User already exists');
            }

            const newUser = await UserService.create(username, password);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(newUser));
        } catch (error) {
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end('Server error');
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body;

            const user = await UserService.getByUsername(username);
            if (!user) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                return res.end('Invalid credentials');
            }

            const isValid = await UserService.validatePassword(password, user.password);
            if (!isValid) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                return res.end('Invalid credentials');
            }

            const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ token }));
        } catch (error) {
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end('Server error');
        }
    }
}

export default UserController;
