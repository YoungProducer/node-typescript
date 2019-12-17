import {
    Request,
    Response,
    NextFunction,
} from 'express';

import { jwtRefresh } from '../auth-strategies/jwt-refresh';
import { UserProfile } from '../types/auth';

export const jwtRefreshMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userProfile: UserProfile = await jwtRefresh.authenticate(req);
        req.body.userProfile = userProfile;
        next();
    } catch (error) {
        next(error);
    }
};
