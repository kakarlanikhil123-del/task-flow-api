export function validateTaskData(taskData = {}) {
    if (
        !taskData ||
        typeof taskData !== "object" ||
        Array.isArray(taskData)
    ) {
        return {
            isValid: false,
            errors: ["Request body must be a valid object"]
        };
    }

    const {
        title,
        status,
        description,
        priority
    } = taskData;

    const errors = [];

    const validStatus = [
        "pending",
        "in-progress",
        "completed"
    ];

    const validPriority = [
        "low",
        "medium",
        "high"
    ];

    if (!title || !status || !description || !priority) {
        errors.push(
            "title, status, description and priority are required"
        );
    }

    if (
        typeof title !== "string" ||
        typeof status !== "string" ||
        typeof description !== "string" ||
        typeof priority !== "string"
    ) {
        errors.push("All fields must be strings");
    }

    if (
        typeof title === "string" &&
        title.trim() === ""
    ) {
        errors.push("Title cannot be empty");
    }

    if (
        typeof description === "string" &&
        description.trim() === ""
    ) {
        errors.push("Description cannot be empty");
    }

    if (
        typeof status === "string" &&
        !validStatus.includes(status)
    ) {
        errors.push(
            "Status must be pending, in-progress, or completed"
        );
    }

    if (
        typeof priority === "string" &&
        !validPriority.includes(priority)
    ) {
        errors.push(
            "Priority must be low, medium, or high"
        );
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}