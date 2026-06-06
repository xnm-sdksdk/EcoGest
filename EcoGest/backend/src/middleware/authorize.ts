import { NextFunction, Response } from "express";
import { UserProfile } from "../entity/userEntity.js";
import { AuthenticatedRequest } from "../dto/authDTO.js";

export const authorize = (...profiles: UserProfile[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): void => {
    if (!req.user) {
      res.status(401).json({ message: "Não autenticado" });
      return;
    }

    if (!profiles.includes(req.user.profile as UserProfile)) {
      res.status(403).json({ message: "Sem permissão" });
      return;
    }

    next();
  };
};
