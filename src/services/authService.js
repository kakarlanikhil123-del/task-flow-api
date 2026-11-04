import bcrypt from "bcrypt";
import crypto from "crypto";
import { users } from "../data/users.js";

export async function createUser(
    name,
    email,
    password
) {
    const existingUser = users.find(
        u => u.email === email
    );

    if (existingUser) {
        const error = new Error(
            "Email already exists"
        );

        error.statusCode = 409;

        throw error;
    }

    const hashedPassword = await bcrypt.hash(
        password,
        10
    );

    const user = {
        id: crypto.randomUUID(),
        name,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString()
    };

    users.push(user);

    const { password: _, ...safeUser } = user;

    return safeUser;
}