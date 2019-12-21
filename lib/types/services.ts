import {
    UserProfile,
    SignInCredentials,
} from './auth';
import { User } from '../../prisma/generated/prisma-client';

export interface PasswordHasher<T = string> {
    hashPassword(password: T): Promise<string>;
    comparePasswords(providedpass: T, storedPass: T): Promise<boolean>;
}

export interface AccessTokenService {
    verifyToken(token: string): Promise<UserProfile>;
    generateToken(userProfile: UserProfile): Promise<string>;
}

export interface RefreshTokenService {
    verifyToken(token: string): Promise<UserProfile>;
    generateToken(userProfile: UserProfile): Promise<string>;
}

export interface LogoutService {
    logout(loginId: string): Promise<boolean>;
    logoutAll(userId: string): Promise<boolean>;
}

export interface UserService {
    verifyCredentials(credentials: SignInCredentials): Promise<User>;
    convertToUserProfile(user: User): UserProfile;
}
