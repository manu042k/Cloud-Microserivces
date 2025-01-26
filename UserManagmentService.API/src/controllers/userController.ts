import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { CreateUserDTO } from "../dto/createUserDTO";
import { UserMapper } from "../mappers/userMapper";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async register(req: Request, res: Response) {
    try {
      // Map raw request body to CreateUserDTO
      const userDTO: CreateUserDTO = UserMapper.mapToCreateUserDTO(req.body);

      // Call the service to register the user
      const createdUser = await this.userService.register(userDTO);

      // Map the created user entity to UserResponseDTO
      const responseDTO = UserMapper.mapToUserResponseDTO(createdUser);

      res.status(201).json(responseDTO);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await this.userService.login(email, password);
      res.json(token);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
