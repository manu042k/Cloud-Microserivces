import { UserRepository } from "../repositories/userRepository";
import { CreateUserDTO } from "../dto/createUserDTO";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async register(createUserDTO: CreateUserDTO) {
    const { Email, Password } = createUserDTO;

    const existingUser = await this.userRepository.findByEmail(Email);
    if (existingUser) throw new Error("User already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const user = await this.userRepository.createUser({
      ...createUserDTO,
      Password: hashedPassword,
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.PasswordHash);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { UserId: user.UserId },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );

    return { token };
  }
}
