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
import RefreshTokenController from "../../models/active-refresh-token";
import BcryptHasher, { PasswordHasher } from '../../services/bcrypt-password-service';
import DefaultUserService, { UserService } from '../../services/user-service';
import { JWTService } from '../../services/jwt-service';
import { validateCredentials } from '../../services/validator';
import { JWTMiddleware } from '../../middleware/jwt-middleware';

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

                    const token = await tokenService.generateAccessToken(userProfile);
                    const refreshToken = await tokenService.generateRefreshToken(userProfile);

                    const expirationDate = new Date();
                    expirationDate.setMinutes(expirationDate.getMinutes() + 15);

                    return res.cookie('accessToken', `Bearer ${token}`, {
                        httpOnly: true,
                        // secure: true // Uncomment in production mode
                        expires: expirationDate,
                    }).send({}).end();
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
        // JWTMiddleware,
        // csrfProtection,
        restfull({
            post: async (req: Request, res: Response, next: NextFunction) => {
                const user = await UserController.findById('5dd19d5b7c034c1bb8123eff');
                user.save(async err => {
                    const refreshToken = await RefreshTokenController.create({
                        userId: '5dd19d5b7c034c1bb8123eff',
                        token: '1231da32131',
                        tokenId: '131d-21313213112',
                    });

                    if (err) {
                        console.log(err);
                    }

                    refreshToken.save(err => {
                        if (err) {
                            console.log(err);
                        }
                    });
                });

                return res.send('ok');
            },
        }),
    ),
    router.all(
        '/tokens',
        restfull({
            get: async (req: Request, res: Response, next: NextFunction) => {
                let atokens;
                await UserController.findById('5dd19d5b7c034c1bb8123eff')
                    .populate('refreshTokens')
                    .exec((err, tokens) => {
                        if (err) {
                            console.log(err);
                        }
                        atokens = tokens;
                    });
                res.send(atokens).end();
            },
        }),
    )
    // router.post(
    //     '/auth/protected',
    //     csrfProtection,
    //     JWTMiddleware,
    //     async (
    //         req: Request,
    //         res: Response,
    //         next: NextFunction,
    //     ) => {
    //         return res.send(req.csrfToken());
    //     },
    // )
);

export default routes();
