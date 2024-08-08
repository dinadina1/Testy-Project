// Error class
class ErrorHandler extends Error{
    constructor(message, stausCode){
        super(message);
        this.statusCode = stausCode
        Error.captureStackTrace(this, this.constructor)
    }
}

// export class
module.exports = ErrorHandler;