// src/routes/userRoutes.ts
import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const controller = new UserController();

router.post('/register', (req, res) => controller.register(req, res));
router.post('/login', (req, res) => controller.login(req, res));
router.post('/videos/add', (req, res) => controller.addVideo(req, res));
router.get('/videos', (req, res) => controller.getAllVideos(req, res));

export default router;
