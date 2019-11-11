import * as isemail from 'isemail';
import * as HttpError from 'http-errors';

// Custom imports
import { Credentials } from '../models/user';
import { USER_SERVICE } from '../keys';

export const validateCredentials = (credentials: Credentials) => {
    // TODO: in future add email validator

    if (credentials.password.length < 8) {
        throw new HttpError.Unauthorized(USER_SERVICE.SHORT_PASSWORD);
    }
};
