import { AuthenticatedRequest } from "../dto/authDTO.js";
import { NextFunction, Response } from "express";

export const authorizeOwner = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.user) {
    res.status(401).json({ message: "Não autenticado" });
    return;
  }

  const isOwner = req.user.id === Number(req.params.id);

  if (!isOwner) {
    res.status(403).json({ message: "Sem permissão" });
    return;
  }

  next();
};
