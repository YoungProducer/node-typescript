import { Router } from 'express';

import auth from './auth';
import update from './update';
import users from './users';

const router: Router = Router();

router.use(auth);
router.use(update);
router.use(users);

export default router;
