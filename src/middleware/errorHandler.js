export function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;

    if (statusCode >= 500) {
        console.error("Internal Server Error:", err);

        return res.status(statusCode).json({
            success: false,
            message: "Internal Server Error"
        });
    }

    return res.status(statusCode).json({
        success: false,
        message: err.message,
        ...(err.errors && { errors: err.errors })
    });
}