import BadRequestError from '@/pkg/http_errors/BadRequestError';

export class UserName {
    public static async create(name: string): Promise<string> {
        if (!name || name === '') {
            throw new BadRequestError('Field name is required');
        }

        if (name.length > 60) {
            throw new BadRequestError('Name cannot be longer than 60');
        }

        return name;
    }
}
