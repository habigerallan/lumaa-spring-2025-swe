import pool from '../config/DatabaseConfig.js';
import bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel.js';

class UserService {
    static async create(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `
            INSERT INTO users (username, password) 
            VALUES ($1, $2) 
            RETURNING id, username;
        `;
        const values = [username, hashedPassword];
        const result = await pool.query(query, values);
        return new UserModel(result.rows[0].id, result.rows[0].username, null);
    }

    static async getByUsername(username) {
        const query = `SELECT * FROM users WHERE username = $1;`;
        const result = await pool.query(query, [username]);
        if (result.rows.length === 0) return null;
        return new UserModel(result.rows[0].id, result.rows[0].username, result.rows[0].password);
    }

    static async getById(id) {
        const query = `SELECT id, username FROM users WHERE id = $1;`;
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) return null;
        return new UserModel(result.rows[0].id, result.rows[0].username, null);
    }

    static async validatePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
}

export default UserService;
