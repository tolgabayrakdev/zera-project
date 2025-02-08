import { Request, Response } from "express";

import AuthService from "../service/authService";
import HttpException from "../exception/httpException";


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
            console.log(error);
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await this.authService.loginUser(email, password);
            res.cookie('accessToken', user.accessToken, { httpOnly: true });
            res.cookie('refreshToken', user.refreshToken, { httpOnly: true });
            res.status(200).json({ message: "Login successful" });
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
    }
}