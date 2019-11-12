import * as express from 'express';
import {
    Request,
    Response,
    NextFunction,
} from 'express';
import * as HttpErrors from 'http-errors';
import * as _ from 'lodash';

// Custom imports
import restfull from '../../utils/restfull';
import
    UserController,
    {
        IUserModel,
        Credentials,
    } from '../../models/user';
import BcryptHasher, { PasswordHasher } from '../../services/bcrypt-password-service';
import DefaultUserService, { UserService } from '../../services/user-service';
import { JWTService } from '../../services/jwt-service';
import { validateCredentials } from '../../services/validator';
import { JwtAuthStrategy } from '../../authentication-strategies/jwt-auth-strategy';

// Import types
import { TokenService, UserProfile } from '../../types/auth';

const router: express.Router = express.Router();

const routes = (
    passwordHasher: PasswordHasher = new BcryptHasher(),
    userService: UserService = new DefaultUserService(),
    tokenService: TokenService = new JWTService(),
) => (
    router.all(
        '/auth/signin',
        restfull({
            post: async (
                req: Request,
                res: Response,
                next: NextFunction,
            ) => {
                const credentials: Credentials = req.body;

                try {
                    const user: IUserModel = await userService.verifyCredentials(credentials);

                    const userProfile: UserProfile = userService.convertToUserProfile(user);

                    const token = await tokenService.generateToken(userProfile);

                    return res.send({
                        accessToken: token,
                    });
                } catch (error) {
                    next(error);
                }
            },
        }),
    ),
    router.all(
        '/auth/signup',
        restfull({
            post: async (
                req: Request,
                res: Response,
                next: NextFunction,
            ) => {
                const credentials: IUserModel = req.body;

                try {
                    validateCredentials(_.pick(credentials, ["email", "password"]));

                    credentials.password = await passwordHasher.hashPassword(credentials.password);

                    const savedUser = await UserController.create({
                        userName: credentials.userName,
                        email: credentials.email,
                        password: credentials.password,
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
        '/protected',
        JwtAuthStrategy,
        restfull({
            get: async (req: Request, res: Response, next: NextFunction) => {
                return res.send('Good');
            },
        }),
    )
);

export default routes();
