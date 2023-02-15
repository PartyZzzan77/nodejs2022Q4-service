import { Injectable, Scope, ConsoleLogger, LogLevel } from '@nestjs/common';
import * as process from 'process';
import 'dotenv/config';

const LEVEL = process.env.LOG_LEVEL as LogLevel;
const LOGS_FOLDER = process.env.LOGS_FOLDER;
const MAX_FILE_SIZE = +process.env.MAX_LOG_FILE_SIZE;

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  constructor(
    private logDir: string = LOGS_FOLDER,
    private fileSize = MAX_FILE_SIZE,
    private logCounter = 0,
    private warnCounter = 0,
    private errorCounter = 0,
  ) {
    super('App', { logLevels: [LEVEL] });

    process.on('uncaughtException', (err) => {
      this.error(`Uncaught Exception: ${err.message}`, err.stack);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      this.error(`Unhandled Rejection: ${reason}`, promise);
      process.exit(1);
    });
  }
  async log(message: any) {
    super.log(message);
  }
}
