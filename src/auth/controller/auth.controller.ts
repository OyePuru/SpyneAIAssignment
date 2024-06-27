import { CookieOptions, Request, Response } from "express";
import { IUser } from "../../user/interface/user.interface";
import { AuthService } from "../service/auth.service";
import { ISignIn } from "../interface/auth.interface";
import { SignInValidation, SignUpValidation } from "../validation/auth.validation";

export class AuthController {
  private authService: AuthService;
  constructor () {
    this.authService = new AuthService();
  }

  signup = async (req: Request, res: Response) => {
    try {
      const { error } = SignUpValidation(req.body);
      if (error) {
        return res.status(400).send({ success: false, error: error.message });
      }
      const userDetails = req.body as IUser;
      await this.authService.signup(userDetails);
      return res.status(200).send({
        success: true,
        message: "User created."
      });  
    } catch (err: any) {
      console.error(err);
      return res.status(err.err_code ?? 500).send({ success: false, error: err.message });
    }
  }

  signin = async (req: Request, res: Response) => {
    try {
      const { error } = SignInValidation(req.body);
      if (error) {
        return res.status(400).send({ success: false, error: error.message });
      }
      const signInCredentials = req.body as ISignIn;
      const token = await this.authService.signin(signInCredentials);
      const options: CookieOptions = {
        domain: process.env.COOKIE_DOMAIN,
        maxAge: 2592000000, // 30 days
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'local' ? 'lax' : 'strict',
        secure: process.env.NODE_ENV === 'local' ? false : true
      };
      return res.status(200)
        .cookie("authToken", token, options)
        .send({ success: true, message: 'Login success!' });
    } catch (err: any) {
      console.error(err);
      return res.status(err.err_code ?? 500).send({ success: false, error: err.message });
    }
  }
}