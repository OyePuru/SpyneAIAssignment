import { Router } from 'express';
import { UserController } from '../controller/user.controller';

const router = Router();
const userController = new UserController();

router.put('/', userController.update);
router.delete('/', userController.delete);
router.post('/list', userController.userList);
router.post('/search', userController.searchUserByName)

export default router;