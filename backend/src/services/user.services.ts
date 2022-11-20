import User from '../database/models/user'
import { IService } from "./IService";

export class UserService implements IService<User> {

    async create({ username, password }): Promise<User> {
        const passwordHash = passwordService.encryptPassword(password);

        const user: User = await User.create({ email, passwordHash, name, phone });
        return user;
    }
}