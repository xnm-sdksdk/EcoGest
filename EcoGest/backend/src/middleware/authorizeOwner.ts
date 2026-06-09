import { AuthenticatedRequest } from "../dto/authDTO.js";
import { NextFunction, Response } from "express";
import { UserProfile } from "../entity/userEntity.js";

export const authorizeOwnerOrAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.user) {
    res.status(401).json({ message: "Não autenticado" });
    return;
  }

  const isOwner = req.user.id === Number(req.params.id);
  const isAdmin = req.user.profile === UserProfile.ADMIN;

  if (!isOwner || !isAdmin) {
    res.status(403).json({ message: "Sem permissão" });
    return;
  }

  next();
};
