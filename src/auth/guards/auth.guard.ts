import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ExpressRequest } from '../../types/express-request.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest<ExpressRequest>();

    if (!req.user) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
