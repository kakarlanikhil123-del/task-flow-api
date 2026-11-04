import express from "express";

import {
    getAllTasksController,
    getTaskByIdController,
    createTaskController,
    updateTaskController,
    deleteTaskController
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getAllTasksController);

router.get("/:id", getTaskByIdController);

router.post("/", createTaskController);

router.put("/:id", updateTaskController);

router.delete("/:id", deleteTaskController);

export default router;