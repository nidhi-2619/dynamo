// we are using inheritance 
class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong", // this error msg does not count as best practice for production grade code
        errors = [],
        stack = ""
    
    ) {
        super(message);// this means it will take msg from the parent class, if not modified in child class
        this.statusCode = statusCode;
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors 

        // this is used to get the exact error 
        if (stack){
            this.stack =stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }


    }
}

export {ApiError};