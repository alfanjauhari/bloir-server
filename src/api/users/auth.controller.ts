import { Request, Response, Router } from 'express';
import { response } from '../../libs';
import Auth from '../../providers/auth';
import { IUser } from './user.model';

class AuthController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public init(): void {
    this.router.post('/login', this.login.bind(this));
    this.router.post('/register', this.register.bind(this));
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { identifier, password } = req.body;

    try {
      const data = await Auth.login({ identifier, password });

      res.cookie('token', data.content.token);
      return response(res, data);
    } catch (error) {
      if (
        error.name === 'NotFoundError' ||
        error.name === 'WrongPasswordError'
      ) {
        return response(res, {
          code: 400,
          success: false,
          message: error.message
        });
      }

      return response(res, {
        code: 500,
        success: false,
        message: error.message || 'Something went wrong',
        content: error
      });
    }
  }

  public async register(req: Request, res: Response): Promise<Response> {
    try {
      const body: IUser = req.body;
      const data = await Auth.register(body);

      return response(res, data);
    } catch (error) {
      return response(res, {
        code: 500,
        success: false,
        message: error.message || 'Something went wrong',
        content: error
      });
    }
  }
}

export default new AuthController();
