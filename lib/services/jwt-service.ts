import { promisify } from 'util';
import * as HttpErrors from 'http-errors';

// Custom imports
import { JWT_SERVICE } from '../keys';
import { TokenService, UserProfile, securityId } from '../types/auth';

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

    async generateToken(userProfile: UserProfile): Promise<string> {
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

        console.log(token);

        return token;
    }
}
