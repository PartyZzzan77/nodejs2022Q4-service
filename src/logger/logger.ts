import { Injectable, Scope, ConsoleLogger, LogLevel } from '@nestjs/common';
import * as process from 'process';
import 'dotenv/config';
import { appendFileSync, existsSync, mkdir } from 'node:fs';
import * as path from 'node:path';

const LEVEL = process.env.LOG_LEVEL as LogLevel;
const LOGS_FOLDER = process.env.LOGS_FOLDER;
const MAX_FILE_SIZE = +process.env.MAX_LOG_FILE_SIZE;

const logsDir = path.join(LOGS_FOLDER);
const logDir = path.join(LOGS_FOLDER + '/log');
const warnDir = path.join(LOGS_FOLDER + '/warn');
const errorDir = path.join(LOGS_FOLDER + '/error');

const fileSize = MAX_FILE_SIZE;
const logCounter = 1;
const warnCounter = 1;
const errorCounter = 1;

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  constructor() {
    super('App', { logLevels: [LEVEL] });
    this.setContext('App');

    this.initLogsDir(logsDir);
    this.initLogsDir(logDir, true, `/${logCounter}.log.txt`);
    this.initLogsDir(warnDir, true, `/${warnCounter}.log.txt`);
    this.initLogsDir(errorDir, true, `/${errorCounter}.log.txt`);

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

  private initLogsDir(dist, isFile = false, file = '') {
    if (!existsSync(dist)) {
      mkdir(dist, (err) => {
        if (err) {
          return;
        }
      });
    }
    if (isFile) {
      const fileDist = path.join(dist + file);

      if (existsSync(fileDist)) {
        return;
      }

      appendFileSync(fileDist, `\n${new Date().toISOString()} - init`);
    }
  }
}
