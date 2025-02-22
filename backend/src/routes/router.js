import userController from "../controllers/UserController.js";
import taskController from "../controllers/TaskController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const matchRoute = (requestedUrl) => {
    for (const route in router) {
        const routePattern = new RegExp(`^${route.replace(/:taskId/, "(\\d+)")}$`);
        const match = requestedUrl.match(routePattern);
        if (match) {
            return { route, params: { taskId: match[1] } };
        }
    }
    return { route: requestedUrl, params: {} };
};

const router = {
    "/auth/register": { POST: userController.register },
    "/auth/login": { POST: userController.login },

    "/tasks": {
        GET: [authMiddleware, taskController.getUserTasks],
        POST: [authMiddleware, taskController.createTask],
    },

    "/tasks/:taskId": {
        GET: [authMiddleware, taskController.getTask],
        PUT: [authMiddleware, taskController.updateTask],
        DELETE: [authMiddleware, taskController.deleteTask],
    },
};

export { router, matchRoute };
