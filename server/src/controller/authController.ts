import { Request, Response } from 'express';

import AuthService from '../service/authService';
import HttpException from '../exception/httpException';

export default class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    async register(req: Request, res: Response) {
        try {
            const userData = req.body;
            const newUser = await this.authService.registerUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await this.authService.loginUser(email, password);
            res.cookie('accessToken', user.accessToken, { httpOnly: true });
            res.cookie('refreshToken', user.refreshToken, { httpOnly: true });
            res.status(200).json({
                accessToken: user.accessToken,
                refreshToken: user.refreshToken,
            });
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }

    async logout(_req: Request, res: Response) {
        try {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }

    async verifyUser(req: Request, res: Response) {
        try {
            const token: string = req.cookies.access_token;
            const user = await this.authService.verifyUser(token);
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }
}
