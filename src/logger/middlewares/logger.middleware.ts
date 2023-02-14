import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ExpressRequest } from '../../types/express-request.interface';
import { Logger } from '../logger';
import * as process from 'process';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {
    this.logger.setContext('AppService');
  }

  public async use(req: ExpressRequest, res: Response, next: NextFunction) {
    const { url, params, body } = req;
    const { statusCode } = res;

    process.on('uncaughtException', (err) => {
      this.logger.error(`Uncaught Exception: ${err.message}`, err.stack);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      this.logger.error(`Unhandled Rejection: ${reason}`, promise);
      process.exit(1);
    });

    this.logger.requestLog({ url, params, body, statusCode });

    next();
  }
}
