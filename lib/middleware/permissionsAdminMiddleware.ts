import {
    Request,
    Response,
    NextFunction,
} from 'express';
import * as HttpErrors from 'http-errors';

import { UserProfile } from '../types/auth';
import { jwtAuth } from '../auth-strategies/jwt-auth';

export const permissionsAdminMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userProfile: UserProfile = await jwtAuth.authenticate(req);

        if (userProfile.role !== 'ADMIN') {
            throw new HttpErrors.Unauthorized('Invalud permissions!');
        }

        next();
    } catch (error) {
        next(error);
    }
};
