import type { Request, Response } from "express";
import { UserService } from "../services/userService/userService.js";
import { UserServiceImpl } from "../services/userService/impl/userServiceImpl.js";
import { logger } from "../utils/logger/logger.js";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserServiceImpl();
  }

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
