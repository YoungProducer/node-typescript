import { Request, NextFunction } from 'express';

export declare const securityId: unique symbol;

export interface Principal {
    [securityId]: string;
    [attribute: string]: any;
}

export interface UserProfile extends Principal {
    email?: string;
    name?: string;
    hash?: string;
}

export interface TokenService {
    verifyToken(token: string): Promise<UserProfile>;
    generateAccessToken(userProfile: UserProfile): Promise<string>;
    generateRefreshToken(userProfile: UserProfile): Promise<string>;
}

export interface AuthStrategy {
    authenticate(request: Request): Promise<UserProfile>;
    extractCredentials(request: Request): string;
}
