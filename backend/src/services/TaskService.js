import pool from '../config/DatabaseConfig.js';
import TaskModel from '../models/TaskModel.js';

class TaskService {
    static async create(title, description, userId) {
        const query = `
            INSERT INTO tasks (title, description, is_complete, user_id) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *;
        `;

        const values = [title, description, false, userId];
        const result = await pool.query(query, values);

        return new TaskModel(
            result.rows[0].id, 
            result.rows[0].title, 
            result.rows[0].description, 
            result.rows[0].is_complete, 
            result.rows[0].user_id
        );
    }

    static async getByUser(userId) {
        const query = `SELECT * FROM tasks WHERE user_id = $1;`;

        const result = await pool.query(query, [userId]);

        return result.rows.map(row => 
            new TaskModel(
                row.id,
                row.title,
                row.description,
                row.is_complete,
                row.user_id
            )
        );
    }

    static async getById(taskId) {
        const query = `SELECT * FROM tasks WHERE id = $1;`;

        const result = await pool.query(query, [taskId]);

        if (result.rows.length === 0) return null;

        return new TaskModel(
            result.rows[0].id, 
            result.rows[0].title, 
            result.rows[0].description, 
            result.rows[0].is_complete, 
            result.rows[0].user_id
        );
    }

    static async update(taskId, title, description, isComplete) {
        const query = `
            UPDATE tasks 
            SET title = $1, description = $2, is_complete = $3 
            WHERE id = $4 
            RETURNING *;
        `;

        const values = [title, description, isComplete, taskId];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) return null;

        return new TaskModel(
            result.rows[0].id, 
            result.rows[0].title, 
            result.rows[0].description, 
            result.rows[0].is_complete, 
            result.rows[0].user_id
        );
    }

    static async delete(taskId) {
        const query = `DELETE FROM tasks WHERE id = $1 RETURNING *;`;

        const result = await pool.query(query, [taskId]);

        if (result.rows.length === 0) return null;

        return new TaskModel(
            result.rows[0].id, 
            result.rows[0].title, 
            result.rows[0].description, 
            result.rows[0].is_complete, 
            result.rows[0].user_id
        );
    }
}

export default TaskService;
