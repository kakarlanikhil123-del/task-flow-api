import { createUser } from "../services/authService.js";
import { sendSuccess } from "../utils/response.js";

export async function registerController(
    req,
    res,
    next
) {
    try {
        let { name, email, password } = req.body;

        if (!name || !email || !password) {
            const error = new Error("Validation Failed");
            error.statusCode = 400;
            error.errors = [
                "name, email and password are required"
            ];
            return next(error);
        }

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            const error = new Error("Validation Failed");
            error.statusCode = 400;
            error.errors = [
                "name, email and password must be strings"
            ];
            return next(error);
        }

        name = name.trim();
        email = email.trim().toLowerCase();

        if (!name || !email || !password) {
            const error = new Error("Validation Failed");
            error.statusCode = 400;
            error.errors = [
                "name, email and password cannot be empty"
            ];
            return next(error);
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            const error = new Error("Validation Failed");
            error.statusCode = 400;
            error.errors = ["Invalid email format"];
            return next(error);
        }

        if (password.length < 8) {
            const error = new Error("Validation Failed");
            error.statusCode = 400;
            error.errors = [
                "Password must be at least 8 characters long"
            ];
            return next(error);
        }

        const user = await createUser(
            name,
            email,
            password
        );

        return sendSuccess(
            res,
            "User registered successfully",
            user,
            201
        );
    } catch (error) {
        next(error);
    }
}