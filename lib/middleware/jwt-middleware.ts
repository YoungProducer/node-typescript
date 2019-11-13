import {
    Request,
    Response,
    NextFunction,
} from 'express';
import * as HttpErrors from 'http-errors';

// Custom imports
import { JWTAuthStrategy } from '../auth-strategies/jwt-auth-strategy';

// Types
import { AuthStrategy, UserProfile } from '../types/auth';

export const JWTMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const authStrategy: AuthStrategy = new JWTAuthStrategy();

    try {
        const userProfile: UserProfile = await authStrategy.authenticate(req);

        if (!userProfile) {
            throw new HttpErrors.Unauthorized(`Invalid authorization token.`);
        }

        req.body.email = userProfile.email;
        req.body.userName = userProfile.name;

        next();
    } catch (error) {
        next(error);
    }
};
