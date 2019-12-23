import {
    Request,
} from 'express';
import * as HttpErrors from 'http-errors';

import {
    AuthStrategy,
    UserProfile,
} from '../types/auth';
import jwtRefreshService from '../services/refresh-service';

export class JWTRefresh implements AuthStrategy {
    async authenticate(request: Request): Promise<UserProfile | undefined> {
        try {
            const token: string = this.extractCredentials(request);
            const userProfile: UserProfile = await jwtRefreshService.verifyToken(token);
            return userProfile;
        } catch (error) {
            throw error;
        }
    }

    extractCredentials(request: Request): string {
        if (!request.cookies['refreshToken']) {
            throw new HttpErrors.Unauthorized('Refresh token not found');
        }

        const token = request.cookies['refreshToken'];

        return token;
    }
}

export const jwtRefresh = new JWTRefresh();
