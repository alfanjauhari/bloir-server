import { Request, Response, Router } from 'express';
import User, { IUser } from './user.model';
import { response } from '../../libs';
import _ from 'lodash';
import { NotFoundError } from '../../errors';

class UserController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public init(): void {
    this.router.get('/', this.getAllUsers.bind(this));
    this.router.get('/:username', this.getOneUser.bind(this));
  }

  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users: IUser[] = await User.find();

      if (_.isEmpty(users)) {
        throw new NotFoundError("Can't find users data!");
      }

      return response(res, {
        code: 200,
        success: true,
        message: 'Successful fetch all users data!',
        content: users
      });
    } catch (error) {
      if (error.name === 'NotFoundError') {
        return response(res, {
          code: 404,
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

  public async getOneUser(req: Request, res: Response): Promise<Response> {
    const { username } = req.params;

    try {
      const user: IUser | null = await User.findOne({ username });

      if (!user) {
        throw new NotFoundError(`User with username ${username} not found!`);
      }

      return response(res, {
        code: 200,
        success: true,
        message: `Successful get user with username ${username}`,
        content: user
      });
    } catch (error) {
      if (error.name === 'NotFoundError') {
        return response(res, {
          code: 404,
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
}

export default new UserController();
