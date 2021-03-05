import HttpException from './HttpException';

class BadRequestError extends HttpException {
    constructor(message: string, causes?: Array<string>) {
        super(message, 400, 'Bad Request', causes);
    }
}

export default BadRequestError;
