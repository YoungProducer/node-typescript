import { genSalt, hash, compare } from 'bcryptjs';

// Custom imports
import { BCRYPT_HASHER } from '../keys';

export interface PasswordHasher<T = string> {
    hashPassword(password: T): Promise<T>;
    comparePassword(providedPass: T, storedPass: T): Promise<boolean>;
}

export default class BcryptHasher implements PasswordHasher<string> {
    async hashPassword(password: string): Promise<string> {
        const salt = await genSalt(BCRYPT_HASHER.BCRYPT_ROUNDS);
        return hash(password, salt);
    }

    async comparePassword(providedPass: string, storedPass: string): Promise<boolean> {
        const isPasswordsMatched = await compare(providedPass, storedPass);
        return isPasswordsMatched;
    }
}
