import { Request, Response } from "express";
import { DeleteUserValidation, SearchUserValidation, UpdateUserValidation, UserListValidation } from "../validation/user.validation";
import { UserService } from "../service/user.service";
import { AuthenticatedRequest } from "../../utility/interfaces/AuthenticatedRequest.interface";
import { IDeleteUser, IUpdateUser } from "../interface/user.interface";

export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  update = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { error } = UpdateUserValidation(req.body);
      if (error) {
        return res.status(400).send({ success: false, error: error.message });
      }
      const result = await this.userService.update(req.user?._id, req.body as IUpdateUser);
      return res.status(200).send({ success: true, data: result });
    } catch (err: any) {
      console.error(err);
      return res.status(err.err_code ?? 500).send({ success: false, error: err.message });
    }
  }

  delete = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { error } = DeleteUserValidation(req.body);
      if (error) {
        return res.status(400).send({ success: false, error: error.message });
      }
      await this.userService.delete(req.user!, req.body as IDeleteUser);
      return res.status(200).clearCookie("authToken").send({ success: true, message: "User removed." });
    } catch (err: any) {
      console.error(err);
      return res.status(err.err_code ?? 500).send({ success: false, error: err.message });
    }
  }

  userList = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { error } = UserListValidation(req.body);
      if (error) {
        return res.status(400).send({ success: false, error: error.message });
      }
      const response = await this.userService.userList(req.body);
      return res.status(200).send({ success: true, data: response });
    } catch (err: any) {
      console.error(err);
      return res.status(err.err_code ?? 500).send({ success: false, error: err.message });
    }
  }

  searchUserByName = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { error } = SearchUserValidation(req.body);
      if (error) {
        return res.status(400).send({ success: false, error: error.message });
      }
      const name = req.body.name as string;
      const response = await this.userService.searchUserByName(name);
      return res.status(200).send({ success: true, data: response });
    } catch (err: any) {
      console.error(err);
      return res.status(err.err_code ?? 500).send({ success: false, error: err.message });
    }
  }
}