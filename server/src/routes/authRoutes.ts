import express from 'express';
import AuthController from '../controller/authController';
import AuthService from '../service/authService';
import AuthRepository from '../repository/authRepository';

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

const router = express.Router();

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/logout', authController.logout.bind(authController));
router.get('/verify', authController.verifyUser.bind(authController));

export default router;
