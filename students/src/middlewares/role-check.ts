// role-check-middleware.ts
import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "@deanery-common/shared";

export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (
      !req.currentUser ||
      !req.currentUser.userData.roles! ||
      !req.currentUser.userData.roles.includes(role)
    ) {
      throw new NotAuthorizedError();
    }

    next();
  };
};
