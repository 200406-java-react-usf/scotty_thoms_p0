class ApplicationError {

    statusCode: number;
    message: string;
    reason: string;
    timestamp: Date;

    constructor(statusCode: number, rsn?: string) {
        this.statusCode = statusCode;
        this.message = 'Unexpected error occured.';
        this.timestamp = new Date();
        rsn ? (this.reason = rsn) : this.reason = 'Unspecified reason';
    }

    setMessage(message: string) {
        this.message = message;
    }

}

class AuthError extends ApplicationError {
    constructor(reason?: string) {
        super(401, reason);
        super.setMessage('Authentication failed.');
    }
}

class ResourceNotFoundError extends ApplicationError {

    constructor(reason?: string) {
        super(404, reason);
        super.setMessage('Resource not found.');
    }
}

class BadRequestError extends ApplicationError {

    constructor(reason?: string) {
        super(400, reason);
        super.setMessage('Bad request. Invalid parameters entered.');
        
    }
}

class InsuficentFundsError extends ApplicationError {

    constructor(reason?: string) {
        super(400, reason);
        super.setMessage('You do not have enough funds for this transaction.');
    }
}

class InternalServerError extends ApplicationError {

    constructor(reason?: string) {
        super(500, reason);
        super.setMessage('Internal Server Error.');
    }
}

class ResourcePersistenceError extends ApplicationError {

    constructor(reason?: string) {
        super(409, reason);
        super.setMessage('The resource was not persisted.');
    }
    
}

export {
    ResourceNotFoundError,
    BadRequestError,
    InsuficentFundsError,
    InternalServerError,
    AuthError,
    ResourcePersistenceError
}