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

// Import services
import { validateCredentials } from '../../services/validator';
import { jwtAccessService } from '../../services/access-service';
import { jwtRefreshService } from '../../services/refresh-service';
import { bcryptHasher } from '../../services/bcrypt-hasher';
import { userService } from '../../services/user-service';
import { userLogoutService } from '../../services/logout-service';

import { JWT_SERVICE } from '../../constants';

import { jwtAccessMiddleware } from '../../middleware/jwtAccessMiddleware';
import { jwtRefreshMiddleware } from '../../middleware/jwtRefreshMiddleware';

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
                        id: userProfile[securityId],
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
                return res.send({ ...userProfile }).end();
            },
        }),
    ),
    router.all(
        '/auth/refresh',
        jwtRefreshMiddleware,
        restfull({
            post: async(
                req: Request,
                res: Response,
                next: NextFunction,
            ) => {
                try {
                    const userProfile: UserProfile = req.body.userProfile;

                    // Generate new access token
                    const accessToken = await jwtAccessService.generateToken(userProfile);
                    // Generate new refresh token
                    const refreshToken: string = await jwtRefreshService.generateToken(userProfile);

                    // Calculate expiration date
                    const timezoneOffset = new Date().getTimezoneOffset();
                    const accessTokenExpirationDate = new Date(Date.now() + (timezoneOffset * -1 * 60 * 1000) + (Number(JWT_SERVICE.JWT_EXPIRES_IN)));
                    const refreshTokenExpirationDate = new Date(Date.now() + (timezoneOffset * -1 * 60 * 1000) + (Number(JWT_SERVICE.REFRESH_EXPIRES_IN)));

                    res.cookie('accessToken', `Bearer ${accessToken}`, {
                        httpOnly: true,
                        // secure: // Uncomment in production mode,
                        expires: accessTokenExpirationDate,
                        path: '/',
                    });

                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        // secure: // Uncommemt in production mode.
                        expires: refreshTokenExpirationDate,
                        path: '/',
                    });

                    return res.send(userProfile).end();
                } catch (error) {
                    next(error);
                }
            },
        }),
    ),
    router.all(
        '/auth/logout',
        jwtRefreshMiddleware,
        restfull({
            post: async(
                req: Request,
                res: Response,
                next: NextFunction,
            ) => {
                const loginId: string = req.body.userProfile.hash;

                try {
                    const isLoggedOut: boolean = await userLogoutService.logout(loginId);

                    res.clearCookie('accessToken', { path: '/' });
                    res.clearCookie('refreshToken', { path: '/' });

                    return res.send({ isLoggedOut }).end();
                } catch (error) {
                    next(error);
                }
            },
        }),
    ),
    router.all(
        '/auth/logoutall',
        jwtRefreshMiddleware,
        restfull({
            post: async(
                req: Request,
                res: Response,
                next: NextFunction,
            ) => {
                const userId: string = req.body.userProfile.id;

                try {
                    const isLoggedOut: boolean = await userLogoutService.logoutAll(userId);

                    res.clearCookie('accessToken', { path: '/' });
                    res.clearCookie('refreshToken', { path: '/' });

                    return res.send({ isLoggedOut }).end();
                } catch (error) {
                    next(error);
                }
            },
        }),
    )
);

export default routes();
