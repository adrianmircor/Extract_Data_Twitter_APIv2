
import { Router } from 'express';
import { uploadDataTwitterController } from '../controller/uploadDataTwitter.controller';

const router = Router();

/* GET: /api/upload */
router.get('/upload', uploadDataTwitterController);

export default router;
