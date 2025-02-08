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

}