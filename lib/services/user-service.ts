import * as HttpErrors from 'http-errors';
import * as isemail from 'isemail';

import { BcryptHasher } from '../services/bcrypt-hasher';
import {
    UserService,
    PasswordHasher,
    UserUpdateFields,
} from '../types/services';
import {
    SignInCredentials,
    UserProfile,
    securityId,
} from '../types/auth';
import { prisma, User } from '../../prisma/generated/prisma-client';

export class MyUserService implements UserService {
    constructor(
        protected bcryptHasher: PasswordHasher = new BcryptHasher(),
    ) { }

    async verifyCredentials(credentials: SignInCredentials): Promise<User> {
        const { email, password } = credentials;

        const foundUser = await prisma.user({ email });

        if (!foundUser) {
            throw new HttpErrors.Unauthorized('User not found');
        }

        const passwordMatched = await this.bcryptHasher.comparePasswords(password, foundUser.password);

        if (!passwordMatched) {
            throw new HttpErrors.Unauthorized('Incorrect password');
        }

        return foundUser;
    }

    convertToUserProfile(user: User): UserProfile {
        return {
            [securityId]: user.id,
            userName: user.userName || "",
            email: user.email,
            role: user.role,
        };
    }

    async updateUserData(id: string, fields: UserUpdateFields): Promise<UserProfile> {
        if (fields.email) {
            if (!isemail.validate(fields.email)) {
                throw new HttpErrors.BadRequest('Email pattern is invalid!');
            }

            const foundUser = await prisma.user({ email: fields.email });

            if (foundUser) {
                throw new HttpErrors.Conflict('Email already in use!');
            }
        }

        if (fields.userName) {
            const foundUser = await prisma.user({ userName: fields.userName });

            if (foundUser) {
                throw new HttpErrors.Conflict('UserName already in use!');
            }
        }

        if (fields.password) {
            if (fields.password.length < 8) {
                throw new HttpErrors.BadRequest('Too short password!');
            }

            if (!fields.previousPassword) {
                throw new HttpErrors.Conflict('Missing previous password');
            }

            const foundUser = await prisma.user({ id });

            if (!await this.bcryptHasher.comparePasswords(fields.previousPassword, foundUser.password)) {
                throw new HttpErrors.Conflict('Inccorect previous password');
            }

            fields.password = await this.bcryptHasher.hashPassword(fields.password);

            delete fields.previousPassword;
        }
        if (!fields.email) {
            delete fields.email;
        }
        if (!fields.userName) {
            delete fields.userName;
        }
        if (!fields.password) {
            delete fields.password;
        }
        if (!fields.previousPassword) {
            delete fields.previousPassword;
        }

        // Update user and get updated user record
        const user: User = await prisma.updateUser({ data: fields, where: { id } });

        console.log(user);

        // Conver to user profile
        const userProfile: UserProfile = this.convertToUserProfile(user);
        console.log(userProfile);
        return userProfile;
    }
}

export default new MyUserService();
