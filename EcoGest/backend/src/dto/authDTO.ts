import { Request } from "express";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    profile: string;
  };
}

export interface AuthenticatedRequest extends Request {
  user?: { id: number; profile: string };
}
