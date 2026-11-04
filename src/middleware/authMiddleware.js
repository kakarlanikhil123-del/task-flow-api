import jwt from "jsonwebtoken";

export function authToken( req, res, next){

    try{
        const header = req.headers.authorization;

        if( ! header ){
            const error = new Error(" unauthorized");
            error.statusCode = 401;
            return next(error);
        };

        const [scheme, token] = header.split(" ");

        if( scheme !== "Bearer" || !token){
            const error = new Error (" unauthorized");
            error.statusCode = 401;
            return next(error);
        };

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decode.id,
            role: decode.role
        };
        next();
    }catch (error) {
    next(error);
}
}
