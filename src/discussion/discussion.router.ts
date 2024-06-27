import { Router } from 'express';
import multer from 'multer';
import { DiscussionController } from './controller/discussion.controller';

const upload = multer({ dest: 'uploads/' });
const router = Router();
const controller = new DiscussionController();

router.post('/create', upload.single('file'), controller.create);

export default router;
