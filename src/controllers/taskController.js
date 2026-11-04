import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from "../services/taskService.js";

import { sendSuccess } from "../utils/response.js";
import { validateTaskData } from "../utils/validation.js";

export function getAllTasksController(req, res, next) {
    try {
        const { status, search } = req.query;

        const validStatus = [
            "pending",
            "in-progress",
            "completed"
        ];

        if (
            status &&
            !validStatus.includes(status)
        ) {
            const error = new Error(
                "Status must be pending, in-progress, or completed"
            );

            error.statusCode = 400;

            return next(error);
        }

        const filteredTasks = getAllTasks(
            status,
            search
        );

        return sendSuccess(
            res,
            "Tasks retrieved successfully",
            filteredTasks
        );
    } catch (error) {
        next(error);
    }
}

export function getTaskByIdController(req, res, next) {
    try {
        const task = getTaskById(
            req.params.id
        );

        if (!task) {
            const error = new Error(
                "Task not found"
            );

            error.statusCode = 404;

            return next(error);
        }

        return sendSuccess(
            res,
            "Task retrieved successfully",
            task
        );
    } catch (error) {
        next(error);
    }
}

export function createTaskController(req, res, next) {
    try {
        const validation = validateTaskData(
            req.body
        );

        if (!validation.isValid) {
            const error = new Error(
                "Validation Failed"
            );

            error.statusCode = 400;
            error.errors = validation.errors;

            return next(error);
        }

        const newTask = createTask(
            req.body
        );

        return sendSuccess(
            res,
            "Task created successfully",
            newTask,
            201
        );
    } catch (error) {
        next(error);
    }
}

export function updateTaskController(req, res, next) {
    try {
        const validation = validateTaskData(
            req.body
        );

        if (!validation.isValid) {
            const error = new Error(
                "Validation Failed"
            );

            error.statusCode = 400;
            error.errors = validation.errors;

            return next(error);
        }

        const updatedTask = updateTask(
            req.params.id,
            req.body
        );

        if (!updatedTask) {
            const error = new Error(
                "Task not found"
            );

            error.statusCode = 404;

            return next(error);
        }

        return sendSuccess(
            res,
            "Task updated successfully",
            updatedTask
        );
    } catch (error) {
        next(error);
    }
}

export function deleteTaskController(req, res, next) {
    try {
        const { id } = req.params;

        const deletedTask = deleteTask(id);

        if (!deletedTask) {
            const error = new Error(
                "Task not found"
            );

            error.statusCode = 404;

            return next(error);
        }

        return sendSuccess(
            res,
            "Task deleted successfully",
            deletedTask,
            200
        );
    } catch (error) {
        next(error);
    }
}