import { Response } from 'express';

import { JWTCookiesService } from "../types/services";
import { UserProfile } from "../types/auth";
import jwtAccessService from "./access-service";

import { JWT_SERVICE } from '../constants';
import jwtRefreshService from './refresh-service';

class UserJWTCookiesService implements JWTCookiesService {
    async pushAccessTokenToClient(userProfile: UserProfile, res: Response): Promise<void> {
        // Generate access token
        const accessToken: string = await jwtAccessService.generateToken(userProfile);

        // Calculate expiration date
        const timezoneOffset = new Date().getTimezoneOffset();
        const accessTokenExpirationDate = new Date(Date.now() + (timezoneOffset * -1 * 60 * 1000) + (Number(JWT_SERVICE.JWT_EXPIRES_IN)));

        // Set access token to cookies
        res.cookie('accessToken', `Bearer ${accessToken}`, {
            httpOnly: true,
            // secure: // Uncomment in production mode,
            expires: accessTokenExpirationDate,
            // domain: 'http://localhost:8080',
            path: '/',
        });
    }

    async pushRefreshTokenToClient(userProfile: UserProfile, res: Response): Promise<void> {
        // Generate refresh token
        const refreshToken: string = await jwtRefreshService.generateToken(userProfile);

        // Calculate expiration date
        const timezoneOffset = new Date().getTimezoneOffset();
        const refreshTokenExpirationDate = new Date(Date.now() + (timezoneOffset * -1 * 60 * 1000) + (Number(JWT_SERVICE.REFRESH_EXPIRES_IN)));

        // Set refresh token to cookies
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            // secure: // Uncomment in production mode,
            expires: refreshTokenExpirationDate,
            // domain: 'http://localhost:8080',
            path: '/',
        });
    }
}

export default new UserJWTCookiesService();
