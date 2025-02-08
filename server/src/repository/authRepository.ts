import { IUser } from "../model/user";
import User from "../model/user";
import Crypto from "node:crypto";

export default class AuthRepository {

    async createUser(user: IUser): Promise<IUser> {
        const hashedPassword = Crypto.createHash('sha256').update(user.password).digest('hex');
        user.password = hashedPassword;
        return await User.create(user);
    }

    async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        const hash = Crypto.createHash('sha256').update(password).digest('hex');
        return hash === hashedPassword;
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }

    async findByUsername(username: string): Promise<IUser | null> {
        return await User.findOne({ username });
    }

}