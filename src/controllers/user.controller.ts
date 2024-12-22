import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import { hashPassword } from "../utils/auth";

export class UserController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response) {
    try {
      const userData: CreateUserDto = req.body;
      userData.password = await hashPassword(userData.password);
      const user = await this.userService.createUser(userData);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await this.userService.authenticateUser(email, password);
      return res.json({ token });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(req.user.id);
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const updateData: UpdateUserDto = req.body;
      if (updateData.password) {
        updateData.password = await hashPassword(updateData.password);
      }
      const user = await this.userService.updateUser(req.user.id, updateData);
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
