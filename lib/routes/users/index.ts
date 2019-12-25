import {
    Request,
    Response,
    NextFunction,
    Router,
} from 'express';
import restfull from '../../utils/restfull';
import { prisma } from '../../../prisma/generated/prisma-client';

const router: Router = Router();

const routes = () => (
    router.all(
        '/users/findByName',
        restfull({
            get: async (
                req: Request,
                res: Response,
                next: NextFunction,
            ) => {
                const filter: string = req.query.filter;

                try {
                    const users = await prisma.users({ where: {
                        userName_contains: filter,
                    }}).$fragment(`fragment EvadePassword on User { id, email, userName, role }`);

                    return res.send(users).end();
                } catch (error) {
                    next(error);
                }
            },
        }),
    ),
    router.all(
        '/users/findByEmail',
        restfull({
            get: async (
                req: Request,
                res: Response,
                next: NextFunction,
            ) => {
                const filter: string = req.query.filter;

                if (!filter) {
                    return res.send([]).end();
                }

                try {
                    const users = await prisma.users({ where: {
                        email_contains: filter,
                    }}).$fragment(`fragment EvadePassword on User { id, email, userName, role }`);

                    return res.send(users).end();
                } catch (error) {
                    next(error);
                }
            },
        }),
    )
);

export default routes();
