import { Router } from 'express';
import { AuthController } from '../controller/auth.controller';

const router = Router();

const controller = new AuthController();

router.post('/sign-up', controller.signup); // Also Create User
router.post('/sign-in', controller.signin);

export default router;
