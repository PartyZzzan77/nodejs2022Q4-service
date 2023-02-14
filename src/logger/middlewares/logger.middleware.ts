import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ExpressRequest } from '../../types/express-request.interface';
import { Logger } from '../logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {
    this.logger.setContext('AppService');
  }

  public async use(req: ExpressRequest, res: Response, next: NextFunction) {
    const { url, params, body } = req;
    const { statusCode } = res;
    this.logger.requestLog({ url, params, body, statusCode });
    next();
  }
}
