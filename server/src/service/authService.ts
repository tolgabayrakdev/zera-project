import HttpException from '../exception/httpException';
import { IUser } from '../model/user';
import AuthRepository from '../repository/authRepository';
import Helper from '../util/helper';

interface IUserResponse {
    username: string;
    email: string;
    _id: string;
    _v: number;
}

export default class AuthService {
    private authRepository: AuthRepository;
    private helper: Helper;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
        this.helper = new Helper();
    }

    async registerUser(user: IUser): Promise<IUserResponse> {
        // 1. Kullanıcı adı var mı kontrol et
        const existingUsername = await this.authRepository.findByUsername(user.username);
        if (existingUsername) {
            throw new HttpException(400, 'Username already exists');
        }

        // 2. E-posta var mı kontrol et
        const existingEmail = await this.authRepository.findByEmail(user.email);
        if (existingEmail) {
            throw new HttpException(400, 'Email already exists');
        }

        // 3. Kullanıcı oluştur
        const createdUser = await this.authRepository.createUser(user);
        const userObject = createdUser.toObject();
        delete userObject.password; // Password'ü kaldırıyoruz
        return userObject;
    }

    async loginUser(
        email: string,
        password: string,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const user = await this.authRepository.findByEmail(email);
        if (!user) {
            throw new HttpException(404, 'User not found');
        }
        const isPasswordValid = await this.authRepository.comparePasswords(password, user.password);
        if (!isPasswordValid) {
            throw new HttpException(401, 'Invalid password');
        }
        const accessToken = this.helper.generateAccessToken({ id: user._id });
        const refreshToken = this.helper.generateRefreshToken({ id: user._id });
        return { accessToken, refreshToken };
    }

    async verifyUser(token: string) {
        try {
            const payload: any = this.helper.decodeToken(token);
            const user = await this.authRepository.findById(payload.id);
            if (!user) {
                throw new HttpException(404, 'User not found');
            }
            return {
                username: user.username,
                email: user.email,
                role: user.role,
            };
        } catch (error) {
            throw new HttpException(401, 'Invalid token');
        }
    }
}
