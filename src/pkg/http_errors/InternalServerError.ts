import HttpException from './HttpException';

class InternalServerError extends HttpException {
    constructor(message: string, causes?: Array<string>) {
        super(message, 500, 'Internal Server Error', causes);
    }
}

export default InternalServerError;
