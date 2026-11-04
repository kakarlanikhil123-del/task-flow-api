import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {users} from "../data/users.js";

export async function login (email, password){

    const user = users.find(u => u.email === email);

    if (!user) {
        const error = new Error("Invalid email or password ");
        error.statusCode = 401;
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        {id:user.id,
            role:user.role
        },
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    );

    const { password: _, ...safeUser } = user;

    return { user: safeUser, token };
}