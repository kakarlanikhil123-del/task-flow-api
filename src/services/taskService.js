import crypto from "crypto";
import { tasks } from "../data/tasks.js";

export function getAllTasks(status, search) {
    let filteredTasks = [...tasks];

    if (status) {
        filteredTasks = filteredTasks.filter(
            task => task.status === status
        );
    }

    if (search) {
        filteredTasks = filteredTasks.filter(task =>
            task.title
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }

    return filteredTasks;
}

export function getTaskById(id) {
    const task = tasks.find(
        task => String(task.id) === String(id)
    );

    return task || null;
}

export function createTask(taskData) {
    const newTask = {
        id: crypto.randomUUID(),
        title: taskData.title.trim(),
        description: taskData.description.trim(),
        status: taskData.status,
        priority: taskData.priority,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);

    return newTask;
}

export function updateTask(id, taskData) {
    const taskIndex = tasks.findIndex(
        task => String(task.id) === String(id)
    );

    if (taskIndex === -1) {
        return null;
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: taskData.title.trim(),
        description: taskData.description.trim(),
        status: taskData.status,
        priority: taskData.priority,
        updatedAt: new Date().toISOString()
    };

    return tasks[taskIndex];
}

export function deleteTask(id) {
    const taskIndex = tasks.findIndex(
        task => String(task.id) === String(id)
    );

    if (taskIndex === -1) {
        return null;
    }

    const deletedTask = tasks[taskIndex];

    tasks.splice(taskIndex, 1);

    return deletedTask;
}