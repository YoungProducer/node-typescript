import {
    Request,
    Response,
    NextFunction,
    Router,
} from 'express';
import * as _ from 'lodash';
import * as HttpErrors from 'http-errors';

// Prisma import
import { prisma, User } from '../../../prisma/generated/prisma-client';

// Custom imports
import restfull from '../../utils/restfull';
import {
    SignUpCredentials,
    SignInCredentials,
    UserProfile,
    securityId,
} from '../../types/auth';
import { validateCredentials } from '../../services/validator';
import { jwtAccessService } from '../../services/access-service';
import { jwtRefreshService } from '../../services/refresh-service';
import { bcryptHasher } from '../../services/bcrypt-hasher';
import { userService } from '../../services/user-service';
import { JWT_SERVICE } from '../../constants';

import { jwtAccessMiddleware } from '../../middleware/jwtAccessMiddleware';

const router = Router();

const routes = () => (
    router.all(
        '/auth/signup',
        restfull({
            post: async (
                req: Request,
                res: Response,
                next: NextFunction,
            ) => {
                const credentials: SignUpCredentials = req.body;

                try {
                    validateCredentials(_.pick(credentials, ['email', 'password']));

                    credentials.password = await bcryptHasher.hashPassword(credentials.password);

                    const savedUser = await prisma.createUser({
                        email: credentials.email,
                        password: credentials.password,
                        userName: credentials.userName,
                        role: 'DEFAULT_USER',
                    });

                    return res.send(savedUser)
                        .status(200)
                        .end();
                } catch (error) {
                    if (error.errors) {
                        if (error.errors.userName) {
                            return next(new HttpErrors.Unauthorized('The userName is already in use'));
                        }
                        if (error.errors.email) {
                            return next(new HttpErrors.Unauthorized('The email is already in use'));
                        }
                    }
                    return next(error);
                }
            },
        }),
    ),
    router.all(
        '/auth/signin',
        restfull({
            post: async (
                req: Request,
                res: Response,
                next: NextFunction,
            ) => {
                const credentials: SignInCredentials = req.body;

                try {
                    // Verify user's credentials
                    const user: User = await userService.verifyCredentials(credentials);

                    // Create user profile
                    const userProfile: UserProfile = userService.convertToUserProfile(user);

                    // Generate new access token
                    const accessToken = await jwtAccessService.generateToken(userProfile);
                    // Generate new refresh token
                    const refreshToken = await jwtRefreshService.generateToken(userProfile);

                    const timezoneOffset = new Date().getTimezoneOffset();
                    const accessTokenExpirationDate = new Date(Date.now() + (timezoneOffset * -1 * 60 * 1000) + (Number(JWT_SERVICE.JWT_EXPIRES_IN)));
                    const refreshTokenExpirationDate = new Date(Date.now() + (timezoneOffset * -1 * 60 * 1000) + (Number(JWT_SERVICE.REFRESH_EXPIRES_IN)));

                    res.cookie('accessToken', `Bearer ${accessToken}`, {
                        httpOnly: true,
                        // secure: // Uncomment in production mode,
                        expires: accessTokenExpirationDate,
                        // domain: 'http://localhost:8080',
                        path: '/',
                    });

                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        // secure: // Uncomment in production mode,
                        expires: refreshTokenExpirationDate,
                        // domain: 'http://localhost:8080',
                        path: '/',
                    });

                    return res.send({
                        ...userProfile,
                    }).end();
                } catch (error) {
                    return next(error);
                }
            },
        }),
    ),
    router.all(
        '/auth/me',
        jwtAccessMiddleware,
        restfull({
            get: async(
                req: Request,
                res: Response,
                next: NextFunction,
            ) => {
                const userProfile: UserProfile = req.body;
                return res.send(userProfile).end();
            },
        }),
    )
);

export default routes();
