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

import { UserProfile, securityId } from '../types/auth';

export interface UserService {
    verifyCredentials(credentials: Credentials): Promise<IUserModel>;
    convertToUserProfile(user: IUserModel): UserProfile;
}

export default class DefaultUserService implements UserService {
    constructor(
        public bcryptHasher: PasswordHasher = new BcryptHasher(),
    ) {}

    async verifyCredentials(credentials: Credentials): Promise<IUserModel> {
        const { email, password } = credentials;

        const foundUser = await UserController.findOne({ email });

        if (!foundUser) {
            throw new HttpError.Unauthorized(USER_SERVICE.INVALID_CREDENTIALS_ERROR);
        }

        const passwordMatched = await this.bcryptHasher.comparePassword(password, foundUser.password);

        if (!passwordMatched) {
            throw new HttpError.Unauthorized(USER_SERVICE.INVALID_CREDENTIALS_ERROR);
        }

        return foundUser;
    }

    convertToUserProfile(user: IUserModel): UserProfile {
        return {
            [securityId]: user.email,
            name: user.userName,
        };
    }
}
