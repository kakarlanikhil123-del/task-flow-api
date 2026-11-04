
import { users } from "../data/users.js";
import { sendSuccess } from "../utils/response.js";

export function profileController(req, res, next) {
    try {
        const profileId = req.user.id;

        const existingUser = users.find(u => u.id === profileId);

        if (!existingUser) {
            const error = new Error("Unauthorized user");
            error.statusCode = 401;
            return next(error);
        }

        const { password: _, ...safeUser } = existingUser;

        return sendSuccess(
            res,
            "Profile loaded successfully",
            safeUser,
            200
        );

    } catch (error) {
        next(error);
    }
}
