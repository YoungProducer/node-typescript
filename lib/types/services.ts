import { Response } from 'express';

import {
    UserProfile,
    SignInCredentials,
} from './auth';
import { User, Role } from '../../prisma/generated/prisma-client';

export interface UserUpdateFields {
    email?: string;
    password?: string;
    previousPassword?: string;
    userName?: string;
}

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
    updateUserData(id: string, fields: UserUpdateFields): Promise<UserProfile>;
}

export interface JWTCookiesService {
    pushAccessTokenToClient(userProfile: UserProfile, res: Response): Promise<void>;
    pushRefreshTokenToClient(userProfile: UserProfile, res: Response): Promise<void>;
}

export interface AdminOnlyService {
    setRootsToUser(userId: string, role: Role): Promise<boolean>;
}
