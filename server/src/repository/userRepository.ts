import { IUser } from '../model/user';
import User from '../model/user';

export default class UserRepository {
    async findByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }

    async findById(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }
}
