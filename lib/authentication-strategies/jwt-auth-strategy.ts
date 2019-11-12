import {
    Request,
    Response,
    NextFunction,
} from 'express';
import * as HttpErrors from 'http-errors';

export const JwtAuthStrategy = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log(req.headers);
    next(new HttpErrors.Unauthorized('Worked!'));
    // TODO: Complete strategy
};
