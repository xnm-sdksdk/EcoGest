import type { Request, Response } from "express";
import { UserService } from "../services/userService/userService.js";
import { UserServiceImpl } from "../services/userService/impl/userServiceImpl.js";
import { logger } from "../utils/logger/logger.js";
import { UpdateUserDTO, UserDTO } from "../dto/userDTO.js";

export class UserController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserServiceImpl();
  }

  getUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.findAll();

      const usersDTO: UserDTO[] = users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.profile,
        active: user.active,
      }));

      res.status(200).json(usersDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get all users");
      res.status(500).json({ error: error.message });
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      if (Number.isNaN(userId) || userId <= 0) {
        res.status(400).json({ error: "Invalid User ID" });
        return;
      }

      const user = await this.userService.findUserById(userId);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const userDTO: UserDTO = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.profile,
        active: user.active,
      };

      res.status(200).json(userDTO);
    } catch (error: any) {
      logger.error(
        { err: error, projectId: req.params.id },
        "Failed to get user by id.",
      );
      res.status(500).json({ error: error.message });
    }
  };

  updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      if (Number.isNaN(userId) || userId <= 0) {
        res.status(400).json({ error: "Invalid User ID" });
        return;
      }

      const data: UpdateUserDTO = req.body;

      const updatedUser = await this.userService.updateUserById(userId, data);
      if (!updatedUser) {
        res.status(404).json({ error: "Usder not found" });
        return;
      }

      const userDTO: UserDTO = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        active: updatedUser.active,
      };

      res.status(200).json(userDTO);
    } catch (error: any) {
      logger.error(
        { err: error, userId: req.params.id },
        "Failed to update user",
      );
      res.status(500).json({ error: error.message });
    }
  };

  deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      if (Number.isNaN(userId) || userId <= 0) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
      }
      await this.userService.removeUserById(userId);
      logger.info({ userId }, "User deleted");
      res.status(204).send();
    } catch (error: any) {
      logger.error({ err: error }, "Failed to delete user");
      res.status(500).json({ error: error.message });
    }
  };
}
