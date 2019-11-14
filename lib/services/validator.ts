import * as isemail from 'isemail';
import * as HttpErrors from 'http-errors';

// Custom imports
import { Credentials } from '../models/user';
import { USER_SERVICE } from '../keys';

export const validateCredentials = (credentials: Credentials) => {

    if (credentials.email === undefined || credentials.password === undefined) {
        throw new HttpErrors.UnprocessableEntity('Incorrect request. Missed email or password property');
    }

    if (!isemail.validate(credentials.email)) {
        throw new HttpErrors.Unauthorized(USER_SERVICE.INVALID_EMAIL);
    }

    if (credentials.password.length < 8) {
        throw new HttpErrors.Unauthorized(USER_SERVICE.SHORT_PASSWORD);
    }
};
