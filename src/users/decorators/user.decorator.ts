import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserDec = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    if (!req.user) {
      return null;
    }
    if (data) {
      return req.user[data];
    }

    return req.user;
  },
);
