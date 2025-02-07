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

    async loginUser(email: string, password: string): Promise<any> {
        const user = await this.authRepository.findByEmail(email);
        if (user) {
            const isPasswordValid = await this.authRepository.comparePasswords(password, user.password);
            if (isPasswordValid) {
                return { ...user, accessToken: this.helper.generateAccessToken({ id: user._id }), refreshToken: this.helper.generateRefreshToken({ id: user._id }) };
            }
        }
        return null;
    }
}