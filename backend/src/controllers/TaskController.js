import TaskService from '../services/TaskService.js';

class TaskController {
    static async createTask(req, res) {
        try {
            const { title, description } = req.body;
            const userId = req.user.userId;

            if (!title) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                return res.end('Title is required');
            }

            const task = await TaskService.create(title, description, userId);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(task));
        } catch (error) {
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end('Server error');
        }
    }

    static async getUserTasks(req, res) {
        try {
            const userId = req.user.userId;

            const tasks = await TaskService.getByUser(userId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(tasks));
        } catch (error) {
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end('Server error');
        }
    }

    static async getTask(req, res) {
        try {
            const { taskId } = req.params;

            const task = await TaskService.getById(taskId);
            if (!task) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                return res.end('Task not found');
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(task));
        } catch (error) {
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end('Server error');
        }
    }

    static async updateTask(req, res) {
        try {
            const { taskId } = req.params;
            const { title, description, is_complete } = req.body;

            const updatedTask = await TaskService.update(taskId, title, description, is_complete);
            if (!updatedTask) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                return res.end('Task not found');
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(updatedTask));
        } catch (error) {
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end('Server error');
        }
    }

    static async deleteTask(req, res) {
        try {
            const { taskId } = req.params;

            const deletedTask = await TaskService.delete(taskId);
            if (!deletedTask) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                return res.end('Task not found');
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Task deleted' }));
        } catch (error) {
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end('Server error');
        }
    }
}

export default TaskController;
