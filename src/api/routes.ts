import { Router } from 'express';
import UserController from './users/users.controller';
import AuthController from './users/auth.controller';

const router: Router = Router();

router.use('/api/v1/users', UserController.router);
router.use('/api/v1/auth', AuthController.router);

export default router;
