import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ExpressRequest } from '../../types/express-request.interface';
import { Logger } from '../logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  public async use(req: ExpressRequest, res: Response, next: NextFunction) {
    res.on('finish', async () => {
      const { url, params, body } = req;
      const { statusCode } = res;
      const msg = `➡️ url: ${url} params: ${JSON.stringify(
        params,
      )} body: ${JSON.stringify(body)} CODE: ${statusCode}`;
      await this.logger.log(msg);
    });

    next();
  }
}
