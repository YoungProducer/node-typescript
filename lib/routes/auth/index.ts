import * as express from 'express';
import {
    Request,
    Response,
    NextFunction,
} from 'express';
import * as HttpError from 'http-errors';
import * as _ from 'lodash';

// Custom imports
import restfull from '../../utils/restfull';
import UserController, { IUserModel, Credentials } from '../../models/user';
import BcryptHasher, { PasswordHasher } from '../../services/bcrypt-password-service';
import DefaultUserService, { UserService } from '../../services/user-service';
import { validateCredentials } from '../../services/validator';

const uuid = require('uuid/v4');
const router: express.Router = express.Router();

const routes = (
    passwordHasher: PasswordHasher = new BcryptHasher(),
    userService: UserService = new DefaultUserService(),
) => (
    router.all(
        '/auth/signin',
        restfull({
            post: async (
                req: Request,
                res: Response,
                next: NextFunction,
            ) => {

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
                const user: Credentials = req.body;

                try {
                    validateCredentials(_.pick(user, ["userName", "password"]));

                    user.password = await passwordHasher.hashPassword(user.password);

                    const savedUser = await UserController.create({
                        userName: user.userName,
                        password: user.password,
                    });

                    return res.send(savedUser)
                        .status(200)
                        .end();
                } catch (error) {
                    if (error.errors) {
                        if (error.errors.userName) {
                            return next(new HttpError.Unauthorized('Username already exist'));
                        }
                    } else {
                        return next(error);
                    }
                }
            },
        }),
    )
);

export default routes();
