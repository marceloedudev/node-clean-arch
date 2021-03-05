class HttpException extends Error {
    message: string;

    status: number;

    error?: string;

    causes?: Array<string> | null;

    timestamp?: Date;

    constructor(
        message: string,
        status: number,
        error: string,
        causes?: Array<string>,
        timestamp: Date = new Date(),
    ) {
        super();
        this.message = message;
        this.status = status;
        this.error = error;
        this.causes = causes || null;
        this.timestamp = timestamp;
    }
}

export default HttpException;
