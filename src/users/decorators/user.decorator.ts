import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExpressRequest } from '../../types/express-request.interface';

export const UserDec = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<ExpressRequest>();

    if (!req.user) {
      return null;
    }
    if (data) {
      return req.user[data];
    }

    return req.user;
  },
);
