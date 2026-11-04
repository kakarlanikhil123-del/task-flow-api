
import bcrypt from "bcrypt";
import crypto from "crypto";

export const users = [];

export async function createUser(name, email, password) {

    if (users.find(u => u.email === email)) {
        const error = new Error("Email already exists");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        id: crypto.randomUUID(),
        name,
        role: "user",
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString()
    };

    users.push(user);

    const { password: _, ...safeUser } = user;

    return safeUser;
}
