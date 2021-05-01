import { Request, Response } from "express";

export interface Context {
  currentUserId: string;
  currentProfileId: string;
  req: Request;
  res: Response;
}
