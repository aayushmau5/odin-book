import { Request, Response } from "express";

export interface Context {
  currentUserId: string;
  currentProfileId: string;
  token: string;
  req: Request;
  res: Response;
}
