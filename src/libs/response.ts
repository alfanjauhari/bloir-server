import { Response } from 'express';
import { IResponseData } from '../interfaces';

export default function response(res: Response, data: IResponseData): Response {
  return res.status(data.code).json(data);
}
