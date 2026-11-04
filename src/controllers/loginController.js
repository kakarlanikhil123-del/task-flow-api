import {login } from "../services/loginService.js";
import {sendSuccess} from "../utils/response.js";

export async function loginController(req,res,next){
    try{
        if (
            !req.body ||
            typeof req.body !== "object" ||
            Array.isArray(req.body)
        ) {
            const error = new Error("Validation Error");
            error.statusCode = 400;
            error.errors = ["Request body must be a valid object"];
            return next(error);
        }

        let {email, password }= req.body;

        if (!email || !password) {
            const error = new Error("Validation Error");
            error.statusCode = 400;
            error.errors = [ "Enter the email and password" ];
            return next(error);
        };

        if( typeof email!== "string" || typeof password !== "string"){
            const error = new Error ("Validation Error");
            error.statusCode = 400;
            error.errors = [ "email and password must be strings" ];
            return next(error);
        };

        if(!password.trim() ){
            const error = new Error("Validation Error");
            error.statusCode = 400;
            error.errors = [ " enter the password" ];
            return next(error);
        };

        email = email.trim().toLowerCase();

        if( !email ){
            const error = new Error ("Validation Error");
            error.statusCode = 400;
            error.errors = [ " Enter the email" ];
            return next(error);
        };

        const user = await login( email, password );

        return sendSuccess ( res, "login successfully", user, 200 );
    
    }catch(error){
        next (error);
    };
};