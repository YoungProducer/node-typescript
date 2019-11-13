import {
    Request,
    Response,
    NextFunction,
} from 'express';
import * as HttpErrors from 'http-errors';

// Custom imports
import { JWTService } from '../services/jwt-service';

// Types
import { AuthStrategy, TokenService, UserProfile } from '../types/auth';

export class JWTAuthStrategy implements AuthStrategy {
    constructor(
        public tokenService: TokenService = new JWTService(),
    ) {}

    async authenticate(request: Request): Promise<UserProfile | undefined> {
        const token: string = this.extractCredentials(request);
        const userProfile: UserProfile = await this.tokenService.verifyToken(token);
        return userProfile;
    }

    extractCredentials(request: Request): string {
        if (!request.headers.authorization) {
            throw new HttpErrors.Unauthorized(`Authorization header not found.`);
        }

        const authHeaderValue = request.headers.authorization;

        if (!authHeaderValue.startsWith('Bearer')) {
            throw new HttpErrors.Unauthorized(
                `Authrorization header is not of type 'Bearer'.`,
            );
        }

        const parts = authHeaderValue.split(' ');

        if (parts.length !== 2) {
            throw new HttpErrors.Unauthorized(
                `Authorization header value has too many parts. It must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.`,
            );
        }

        const token = parts[1];

        return token;
    }
}
