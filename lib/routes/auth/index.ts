import * as express from 'express';
import {
    Request,
    Response,
    NextFunction,
} from 'express';

const uuid = require('uuid/v4');
const router: express.Router = express.Router();

router.get('/auth/signin', async (
        req: Request,
        res: Response,
        next: NextFunction,
) => {
    res.send({
        hash: uuid(),
    });
    res.end();
});

export default router;
