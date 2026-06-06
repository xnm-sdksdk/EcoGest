import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { AuthenticatedRequest } from "../dto/authDTO.js";

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Erro no Token" });
    return;
  }

  try {
    req.user = jwt.verify(token, config.jwtSecret) as unknown as {
      id: number;
      profile: string;
    };
    next();
  } catch {
    res.status(401).json({ message: "Token inválido ou expirado" });
  }
};
