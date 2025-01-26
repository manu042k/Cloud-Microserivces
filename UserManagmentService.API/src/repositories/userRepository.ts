import { User } from "../entities/user";
import { CreateUserDTO } from "../dto/createUserDTO";
import { LoginUserDTO } from "../dto/loginUserDTO";

export class UserRepository {
  async createUser(userData: CreateUserDTO): Promise<User> {
    const { Username, Email, FullName, Password, UserType } = userData;
    const user = await User.create({
      Username,
      Email,
      FullName,
      PasswordHash: Password,
      UserType,
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { Email: email } });
  }
}
