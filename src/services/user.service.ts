import { getRepository } from "typeorm";
import { User } from "../models/user.model";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import { comparePasswords } from "../utils/auth";
import { generateToken } from "../utils/jwt";
import { NotFoundError, UnauthorizedError } from "../utils/response";

export class UserService {
  private userRepository = getRepository(User);

  async createUser(userData: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: userData.email },
    });
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const user = this.userRepository.create(userData);
    await this.userRepository.save(user);

    delete user.password;
    return user;
  }

  async authenticateUser(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials");
    }

    return generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    delete user.password;
    return user;
  }

  async updateUser(userId: string, updateData: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(userId);
    Object.assign(user, updateData);
    await this.userRepository.save(user);
    delete user.password;
    return user;
  }
}
