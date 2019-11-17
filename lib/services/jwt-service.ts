import { promisify } from 'util';
import * as HttpErrors from 'http-errors';

// Custom imports
import { JWT_SERVICE } from '../keys';
import { TokenService, UserProfile, securityId } from '../types/auth';

const uuid = require('uuid/v4');
const jwt = require("jsonwebtoken");
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JWTService implements TokenService {
    async verifyToken(token: string): Promise<UserProfile> {
        if (!token) {
            throw new HttpErrors.Unauthorized(
                `Error verifying token : 'token' is null`,
            );
        }

        let userProfile: UserProfile;

        try {
            const decodedToken = await verifyAsync(token, JWT_SERVICE.JWT_SECRET);

            userProfile = Object.assign(
                { [securityId]: "", name: "" },
                { [securityId]: decodedToken.bind, name: decodedToken.name },
            );
        } catch (error) {
            throw new HttpErrors.Unauthorized(
                `Error verifying token : ${error.message}`,
            );
        }

        return userProfile;
    }

    async generateAccessToken(userProfile: UserProfile): Promise<string> {
        if (!userProfile) {
            throw new HttpErrors.Unauthorized(
                `Error generating token : userProfile is null`,
            );
        }

        const userInfoForToken = {
            id: userProfile[securityId],
            name: userProfile.name,
            email: userProfile.email,
        };

        let token: string;

        try {
            token = await signAsync(userInfoForToken, JWT_SERVICE.JWT_SECRET, {
                expiresIn: Number(JWT_SERVICE.JWT_EXPIRES_IN),
            });
        } catch (error) {
            throw new HttpErrors.Unauthorized(
                `Error encoding token : ${error.message}`,
            );
        }

        return token;
    }

    async verifyRefreshToken(token: string) : Promise<UserProfile> {
        if (!token) {
            throw new HttpErrors.Unauthorized(
                `Error verifying token : 'token' is null`,
            );
        }

        let userProfile: UserProfile;

        try {
            const decodedToken = await verifyAsync(token, JWT_SERVICE.REFRESH_TOKEN_SECRET);

            userProfile = Object.assign(
                {
                    [securityId]: "",
                    name: "",
                    email: "",
                    hash: "",
                },
                {
                    [securityId]: decodedToken.bind,
                    name: decodedToken.name,
                    email: decodedToken.email,
                    hash: decodedToken.hash,
                },
            );
        } catch (error) {
            throw new HttpErrors.Unauthorized(
                `Error verifying token : ${error.message}`,
            );
        }

        return userProfile;
    }

    async generateRefreshToken(userProfile: UserProfile): Promise<string> {
        if (!userProfile) {
            throw new HttpErrors.Unauthorized(
                `Error generating token : userProfile is null`,
            );
        }

        const userInfoForToken = {
            id: userProfile[securityId],
            email: userProfile.email,
            name: userProfile.name,
            hash: uuid(),
        };

        let token: string;

        try {
            token = await signAsync(userInfoForToken, JWT_SERVICE.REFRESH_TOKEN_SECRET, {
                expiresIn: Number(JWT_SERVICE.REFRESH_EXPIRES_IN),
            });
        } catch (error) {
            throw new HttpErrors.Unauthorized(
                `Error encoding token : ${error.message}`,
            );
        }

        return token;
    }
}
