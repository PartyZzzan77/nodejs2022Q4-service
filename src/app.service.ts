import { Injectable } from '@nestjs/common';
import * as process from 'process';

const port = process.env.PORT || 4000;
@Injectable()
export class AppService {
  getHello(): string {
    return `Documentation can be found at  http://localhost:${port}/doc`;
  }
}
