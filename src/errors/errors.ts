class ApplicationError {

    message: string;
    reason: string;

    constructor(rsn?: string) {
        this.message = 'Unexpected error occured.';
        rsn ? (this.reason = rsn) : this.reason = 'Unspecified reason';
    }

    setMessage(message: string) {
        this.message = message;
    }

}

class WipError extends ApplicationError {

    constructor(reason?: string) {
        super(reason);
        super.setMessage('Not implemented yet. Work in progress.');
    }
}

class AuthError extends ApplicationError {
    constructor(reason?: string) {
        super(reason);
        super.setMessage('Authentication failed.');
    }
}

class ResourceNotFoundError extends ApplicationError {

    constructor(reason?: string) {
        super(reason);
        super.setMessage('Resource not found.');
    }
}

class BadRequestError extends ApplicationError {

    constructor(reason?: string) {
        super(reason);
        super.setMessage('Bad request. Invalid parameters entered.');
        
    }
}

class InsuficentFundsError extends ApplicationError {

    constructor(reason?: string) {
        super(reason);
        super.setMessage('You do not have enough funds for this transaction.');
    }
}

class InternalServerError extends ApplicationError {

    constructor(reason?: string) {
        super(reason);
        super.setMessage('Internal Server Error.');
    }
}

class UsernameNotAvailableError extends ApplicationError {

    constructor(reason?: string) {
        super(reason);
        super.setMessage('Username not available.');
    }
}

export {
    WipError,
    ResourceNotFoundError,
    BadRequestError,
    InsuficentFundsError,
    InternalServerError,
    AuthError,
    UsernameNotAvailableError
}