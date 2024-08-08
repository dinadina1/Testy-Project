module.exports = (err, req, res, next) => {
    // check if status code is present or not
    err.statusCode = err.statusCode || 500;

    // return response if development environment
    if(process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack,
            error: err
        });
    }

    // return response if production environment
    if(process.env.NODE_ENV === 'production') {
        let message = err.message;
        let error = new Error(message);

        // check if validataion error
        if(err.name == "ValidationError"){
            message = Object.values(err.errors).map(value => value.message);
            error = new Error(message);
            err.statusCode = 400;
        }

        // check if validator error
        if(err.name == "ValidatorError"){
            message = Object.values(err.errors).map(value => value.message);
            error = new Error(message);
            err.statusCode = 400;
        }

        // check if cast error
        if(err.name == "CastError"){
            message = `Resource not found. Invalid ${err.path}`;
            error = new Error(message);
            err.statusCode = 400;
        }

        // check if duplicate key error
        if(err.code == 11000){
            message = `Duplicate ${Object.keys(err.keyValue)} error`;
            error = new Error(message);
            err.statusCode = 400;
        }

        // check if json web token error
        if(err.name == "JsonWebTokenError"){
            message = `Json web token is invalid. Try again`;
            error = new Error(message);
            err.statusCode = 400;
        }

        // check if token expire error
        if(err.name == "TokenExpireError"){
            message = `Json web token is expired. Try again`;
            error = new Error(message);
            err.statusCode = 400;
        }

        res.status(err.statusCode).json({
            success: false,
            message: err.message || "Internal Server Error"
        });
    }
}