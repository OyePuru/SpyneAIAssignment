import { Router } from 'express';
import userRouter from './user/router/user.router';
import authRouter from './auth/router/auth.router';
import { verifyAuth } from './auth/middlewares/auth.middleware';

const router = Router();

router.use('/auth', authRouter);
router.use((req, res, next) => verifyAuth(req, res, next))
router.use('/users', userRouter);

export default router;
