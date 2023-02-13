import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ExpressRequest } from '../../types/express-request.interface';
import { verify } from 'jsonwebtoken';
import { TokenResponse } from '../types/token-response.interface';
import { SECRET } from '../auth.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}
  public async use(req: ExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      return;
    }

    const tokenHeader = req.headers.authorization.split(' ');
    const schemaType = tokenHeader[0];

    if (schemaType !== 'Bearer') {
      req.user = null;
      return;
    }
    const token = tokenHeader[1];
    try {
      const { id, exp } = verify(token, SECRET) as TokenResponse;
      if (Date.now() >= exp * 1000) {
        req.user = null;
        return;
      }

      const user = await this.usersService.findOne(id);
      delete user.password;
      req.user = user;

      next();
    } catch {
      req.user = null;
      next();
    }
  }
}
