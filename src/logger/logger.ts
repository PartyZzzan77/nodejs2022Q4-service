import { Injectable, Scope, ConsoleLogger, LogLevel } from '@nestjs/common';
import * as process from 'process';
import 'dotenv/config';
import { appendFileSync, existsSync, mkdirSync } from 'node:fs';
import { appendFile, stat, readdir } from 'node:fs/promises';
import * as path from 'node:path';

const LEVEL = process.env.LOG_LEVEL as LogLevel;
const LOGS_FOLDER = process.env.LOGS_FOLDER;
const MAX_FILE_SIZE = +process.env.MAX_LOG_FILE_SIZE;

const logsDir = path.join(LOGS_FOLDER);
const logDir = path.join(LOGS_FOLDER + '/log');
const warnDir = path.join(LOGS_FOLDER + '/warn');
const errorDir = path.join(LOGS_FOLDER + '/error');

@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends ConsoleLogger {
  constructor() {
    super('App', { logLevels: [LEVEL] });
    this.setContext('App');

    this.initLogsDir(logsDir);
    this.initLogsDir(logDir, true, `/1.log.txt`);
    this.initLogsDir(warnDir, true, `/1.log.txt`);
    this.initLogsDir(errorDir, true, `/1.log.txt`);

    process.on('uncaughtException', async (err) => {
      await this.error(`Uncaught Exception: ${err.message}`, err.stack);
    });

    process.on('unhandledRejection', async (reason, promise) => {
      await this.error(`Unhandled Rejection: ${reason}`, promise);
    });
  }
  async log(message: any) {
    super.log(message);
    const { length } = await this.getFolderLength(logDir);

    const pathDist = path.join(`${logDir}/${length}.log.txt`);

    await this.checkFileSize(pathDist, 'logCounter');

    await this.writeLog(pathDist, message);
  }

  async warn(message: any) {
    super.warn(message);
    const { length } = await this.getFolderLength(warnDir);

    const pathDist = path.join(`${warnDir}/${length}.log.txt`);

    await this.checkFileSize(pathDist, 'warnCounter');

    await this.writeLog(pathDist, message);
  }

  async error(message: any, stack?: any, context?: string) {
    super.error(message, stack, context);
    const { length } = await this.getFolderLength(errorDir);

    const pathDist = path.join(`${errorDir}/${length}.log.txt`);

    await this.checkFileSize(pathDist, 'errorCounter');

    await this.writeLog(
      pathDist,
      `message: >>>${message}<<< - stack: [${stack}]`,
    );
  }

  private initLogsDir(dist, isFile = false, file = '') {
    if (!existsSync(dist)) {
      mkdirSync(dist);
    }
    if (isFile) {
      const fileDist = path.join(dist + file);

      if (existsSync(fileDist)) {
        return;
      }
      const msg = `\n${new Date().toISOString()} - init`;

      appendFileSync(fileDist, msg);
    }
  }

  private async checkFileSize(fileDist, counterName) {
    const { size } = await stat(fileDist);

    if (size >= MAX_FILE_SIZE) {
      const msg = `\n${new Date().toISOString()} - init new log file`;

      if (counterName === 'logCounter') {
        const { length } = await this.getFolderLength(logDir);
        const pathDist = path.join(`${logDir}/${length + 1}.log.txt`);

        await appendFile(pathDist, msg);
        return;
      } else if (counterName === 'warnCounter') {
        const { length } = await this.getFolderLength(warnDir);
        const pathDist = path.join(`${warnDir}/${length + 1}.log.txt`);

        await appendFile(pathDist, msg);
        return;
      } else {
        const { length } = await this.getFolderLength(errorDir);
        const pathDist = path.join(`${errorDir}/${length + 1}.log.txt`);

        await appendFile(pathDist, msg);
        return;
      }
    }
  }

  private async getFolderLength(folderName: string) {
    const { length } = await readdir(folderName);
    return { length };
  }

  private async writeLog(fileDist, message) {
    try {
      const msg = `\n${new Date().toISOString()} - ${JSON.stringify(message)}`;

      await appendFile(fileDist, msg);
    } catch (err) {
      console.error(err);
    }
  }
}
