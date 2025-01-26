import { CreateUserDTO } from "../dto/createUserDTO";
import { LoginUserDTO } from "../dto/loginUserDTO";
import { UserResponseDTO } from "../dto/userResponseDTO";
import { User } from "../entities/user";

export class UserMapper {
  // Map raw request body or entity to CreateUserDTO
  static mapToCreateUserDTO(rawData: any): CreateUserDTO {
    return {
      Username: rawData.Username,
      Email: rawData.Email,
      FullName: rawData.FullName,
      Password: rawData.Password,
      UserType: rawData.UserType,
    };
  }

  // Map entity to LoginUserDTO
  static mapToLoginDTO(user: User): LoginUserDTO {
    return {
      Email: user.Email,
      Password: user.PasswordHash,
    };
  }

  // Map entity to UserResponseDTO
  static mapToUserResponseDTO(user: User): UserResponseDTO {
    return {
      Username: user.Username,
      Email: user.Email,
      message: "User created successfully",
    };
  }
}
