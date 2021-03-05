import BadRequestError from '@/pkg/http_errors/BadRequestError';

export class UserEmail {
    private static isValidEmail(email: string) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    public static async create(email: string): Promise<string> {
        if (!email || email === '') {
            throw new BadRequestError('Field email is required');
        }

        if (!this.isValidEmail(email)) {
            throw new BadRequestError('Field email is invalid');
        }

        return email;
    }
}
