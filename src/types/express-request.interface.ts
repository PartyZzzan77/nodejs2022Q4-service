import { Request } from 'express';
import { User } from '../users/Entities/user.entitie';
export interface ExpressRequest extends Request {
  user?: User;
}
