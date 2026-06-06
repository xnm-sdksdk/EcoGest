import type { Request, Response } from "express";
import { AuthService } from "../services/authService/authService.js";
import { AuthServiceImpl } from "../services/authService/impl/authServiceImpl.js";
import { logger } from "../utils/logger/logger.js";

export class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthServiceImpl();
  }

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "Email e password são obrigatórios" });
        return;
      }

      const result = await this.authService.login({ email, password });

      if (!result) {
        res.status(401).json({ message: "Credenciais inválidas" });
        return;
      }

      res.status(200).json(result);
    } catch (error: any) {
      logger.error({ error }, "Erro no login");
      res.status(500).json({ error: error.message });
    }
  };
}
