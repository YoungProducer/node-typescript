import { Router } from 'express';

import auth from './auth';
import update from './update';

const router: Router = Router();

router.use(auth);
router.use(update);

export default router;
