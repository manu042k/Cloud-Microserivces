import { CreateUserDTO } from '../dto/createUserDTO';
import { LoginUserDTO } from '../dto/loginUserDTO';
import { User } from '../entities/user';

export class UserMapper {
  static mapToDTO(user: User): CreateUserDTO {
    return {
      Username: user.Username,
      Email: user.Email,
      Password: user.PasswordHash,
      UserType: user.UserType,
    };
  }

  static mapToLoginDTO(user: User): LoginUserDTO {
    return {
      Email: user.Email,
      Password: user.PasswordHash,
    };
  }
}
