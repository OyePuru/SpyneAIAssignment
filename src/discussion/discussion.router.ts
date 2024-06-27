import { Router } from 'express';
import multer from 'multer';
import { DiscussionController } from './controller/discussion.controller';

const upload = multer({ dest: 'uploads/' });
const router = Router();
const controller = new DiscussionController();

router.post('/', upload.single('file'), controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/tag/:id', controller.getDiscussionByTagIds);
router.get('/search', controller.getDiscussionBySearching);

export default router;
