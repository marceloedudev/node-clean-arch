import HttpException from './HttpException';

class NotFoundError extends HttpException {
    constructor(message: string) {
        super(message, 404, 'Not Found');
    }
}
export default NotFoundError;
