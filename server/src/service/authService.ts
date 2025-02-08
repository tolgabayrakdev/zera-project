import HttpException from "../exception/httpException";
import { IUser } from "../model/user";
import AuthRepository from "../repository/authRepository";
import Helper from "../util/helper";


export default class AuthService {
    private authRepository: AuthRepository;
    private helper: Helper;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
        this.helper = new Helper();
    }

    async registerUser(user: IUser): Promise<IUser> {
        return await this.authRepository.createUser(user);
    }

    async loginUser(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
        const user = await this.authRepository.findByEmail(email);
        if (!user) {
            throw new HttpException(404, "User not found");
        }
        const isPasswordValid = await this.authRepository.comparePasswords(password, user.password);
        if (!isPasswordValid) {
            throw new HttpException(401, "Invalid password");
        }
        const accessToken = this.helper.generateAccessToken({ id: user._id });
        const refreshToken = this.helper.generateRefreshToken({ id: user._id });
        return { accessToken, refreshToken };
    }
}