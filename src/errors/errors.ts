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

export {
    WipError
}