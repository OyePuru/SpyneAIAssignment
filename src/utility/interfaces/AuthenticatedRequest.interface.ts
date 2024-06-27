import { Request } from "express";
import { User } from "../../user/models/User";

export interface AuthenticatedRequest extends Request {
  user?: User;
}
