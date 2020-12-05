import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User, { IUser } from '../api/users/user.model';
import { NotFoundError } from '../errors';
import { IResponseData } from '../interfaces';

interface IAuthData {
  identifier: string;
  password: string;
}

interface IAuthResponse extends IResponseData {
  content: {
    user: IUser;
    token: string;
  };
}

class WrongPasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WrongPasswordError';
  }
}

class Auth {
  public async login(data: IAuthData): Promise<IAuthResponse> {
    const { identifier, password } = data;

    const user: IUser | null = await User.findOne({
      $or: [
        {
          username: identifier
        },
        {
          email: identifier
        }
      ]
    });

    if (!user) {
      throw new NotFoundError('User data not found on our records!');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new WrongPasswordError('Wrong password');
    }

    const token: string = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET || '123456'
    );

    return {
      code: 200,
      success: true,
      message: `Successful login as ${user.firstName} ${user.lastName}`,
      content: {
        user,
        token
      }
    };
  }

  public async register(data: IUser): Promise<IAuthResponse> {
    data.password = await bcrypt.hash(data.password, 10);
    const user: IUser = await User.create(data);

    const token: string = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET || '123456'
    );

    return {
      code: 201,
      success: true,
      message: `Successful register and login as ${user.firstName} ${user.lastName}`,
      content: {
        user,
        token
      }
    };
  }
}

export default new Auth();
