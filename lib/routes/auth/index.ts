import * as express from 'express';
import {
    Request,
    Response,
    NextFunction,
} from 'express';
import * as _ from 'lodash';

// Custom imports
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
    router.post(
        '/auth/signin',
        async (
            req: Request,
            res: Response,
            next: NextFunction,
        ) => {
            const { userName, password }: IUserModel = req.body;
            res.send('hello').status(200).end();
        }),
    router.post(
        '/auth/signup',
        async (
            req: Request,
            res: Response,
            next: NextFunction,
        ) => {
            const user: Credentials = req.body;

            validateCredentials(_.pick(user, ["userName", "password"]));

            user.password = await passwordHasher.hashPassword(user.password);

            try {
                const savedUser = await UserController.create({
                    userName: user.userName,
                    password: user.password,
                });

                res.send(savedUser)
                    .status(200)
                    .end();
            } catch (error) {
                console.log(error);
                next(error);
            }
        })
);

export default routes();
