import * as HttpError from 'http-errors';

// Custom imports
import BcryptHasher, { PasswordHasher }  from './bcrypt-password-service';
import { USER_SERVICE } from '../keys';
import
    UserController,
{
    Credentials,
    IUserModel,
} from '../models/user';

export interface UserService {
    verifyCredentials(credentials: Credentials): Promise<IUserModel>;
}

export default class DefaultUserService implements UserService {
    constructor(
        public bcryptHasher: PasswordHasher = new BcryptHasher(),
    ) {}

    async verifyCredentials(credentials: Credentials): Promise<IUserModel> {
        const { userName, password } = credentials;

        const foundUser = await UserController.findOne({ userName });

        if (!foundUser) {
            throw new HttpError.Unauthorized(USER_SERVICE.INVALIDE_CREDENTIALS_ERROR);
        }

        const passwordMatched = await this.bcryptHasher.comparePassword(password, foundUser.password);

        if (!passwordMatched) {
            throw new HttpError.Unauthorized(USER_SERVICE.INVALIDE_CREDENTIALS_ERROR);
        }

        return foundUser;
    }
}
