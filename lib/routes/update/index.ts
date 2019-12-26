import {
    Request,
    Response,
    NextFunction,
    Router,
} from 'express';
import * as _ from 'lodash';
import * as HttpErrors from 'http-errors';

// Prisma import
import { prisma, User, Role } from '../../../prisma/generated/prisma-client';

// Custom imports
import restfull from '../../utils/restfull';
import {
    SignUpCredentials,
    SignInCredentials,
    UserProfile,
    securityId,
} from '../../types/auth';
import { UserUpdateFields } from '../../types/services';

// Services
import userService from '../../services/user-service';
import userJWTCookiesService from '../../services/jwt-cookies-service';
import adminService from '../../services/admin-service';

// Middlewares
import { jwtRefreshMiddleware } from '../../middleware/jwtRefreshMiddleware';
import { jwtAccessMiddleware } from '../../middleware/jwtAccessMiddleware';

const router: Router = Router();

const routes = () => (
    router.all(
        '/update/user',
        jwtAccessMiddleware,
        restfull({
            post: async (
                req: Request,
                res: Response,
                next: NextFunction,
            ) => {
                // Extract user profile from request
                const userProfile: UserProfile = req.body.userProfile;

                // Extract fields for update from request
                const fields: UserUpdateFields = req.body.fields;

                try {
                    const newUserProfile: UserProfile = await userService.updateUserData(userProfile[securityId], fields);

                    await userJWTCookiesService.pushAccessTokenToClient(newUserProfile, res);
                    await userJWTCookiesService.pushRefreshTokenToClient(newUserProfile, res);

                    return res.send({ ...newUserProfile, id: newUserProfile[securityId] }).end();
                } catch (error) {
                    next(error);
                }
            },
        }),
    ),
    router.all(
        '/update/user/roots',
        jwtAccessMiddleware,
        restfull({
            patch: async (
                req: Request,
                res: Response,
                next: NextFunction,
            ) => {
                const userProfile: UserProfile = req.body.userProfile;

                const newRole: Role = req.body.data.newRole;
                const userId: string = req.body.data.userId;

                const role: Role = userProfile.role;

                try {
                    if (role !== 'ADMIN') {
                        throw new HttpErrors.Unauthorized('Invalid roots.');
                    }

                    await adminService.setRootsToUser(userId, newRole);

                    return res.send('Success').end();
                } catch (error) {
                    next(error);
                }
            },
        }),
    )
);

export default routes();
