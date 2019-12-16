import {
    Request,
    Response,
    NextFunction,
} from 'express';

import { jwtAuth } from '../auth-strategies/jwt-auth';
import { UserProfile } from '../types/auth';

export const jwtAccessMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userProfile: UserProfile = await jwtAuth.authenticate(req);
        req.body.userProfile = userProfile;
        next();
    } catch (error) {
        next(error);
    }
};
