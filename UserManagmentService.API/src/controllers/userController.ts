import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { CreateUserDTO } from "../dto/createUserDTO";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async register(req: Request, res: Response) {
    try {
      const userDTO: CreateUserDTO = req.body;
      const user = await this.userService.register(userDTO);
      res.status(201).json(user);
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
