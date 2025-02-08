import { Request, Response } from "express";

import AuthService from "../service/authService";


export default class AuthController {

    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }


    async register(req: Request, res: Response) {

    }

    async login(req: Request, res: Response) {

    }
}