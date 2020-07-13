import { format, transports, createLogger, LoggerOptions, Logger } from 'winston';
import { get } from 'config';

import { getDateInYYYYMMDDFormat, isProductionEnv } from '../utils/common.util';
import { ServerConfig } from '../models/config/server.config';

const { combine, timestamp, json } = format;

const TEN_MBS_IN_BYTES = 10000000;

const serverConfig = get<ServerConfig>('server');

const loggerConfig: LoggerOptions = {
  format: combine(timestamp(), json()),
  transports: [
    new transports.File({
      dirname: 'logs',
      filename: `server-${getDateInYYYYMMDDFormat(new Date())}.log`,
      maxsize: TEN_MBS_IN_BYTES,
      level: process.env.LOG_LEVEL || serverConfig.logLevel || 'info',
    }),
  ],
};

export class LoggerService {
  private static loggerServiceInstance: LoggerService;
  private logger: Logger;

  static getLoggerServiceInstance() {
    if (this.loggerServiceInstance === undefined) {
      this.loggerServiceInstance = new LoggerService();
    }
    return this.loggerServiceInstance;
  }

  private constructor() {
    if (!isProductionEnv()) {
      (loggerConfig.transports as any[]).push(
        new transports.Console({
          level: 'debug',
        }),
      );
    }

    this.logger = createLogger(loggerConfig);
  }

  info(namespace: string, message?: any, ...meta: any[]) {
    this.logger.log(`info`, message, { namespace, meta });
  }

  error(namespace: string, trace: any, message?: any, ...meta: any[]) {
    this.logger.log(`error`, message, { namespace, trace, meta });
  }

  warn(namespace: string, message?: any, ...meta: any[]) {
    this.logger.log(`warn`, message, { namespace, meta });
  }

  debug(namespace: string, message?: any, ...meta: any[]) {
    this.logger.log(`debug`, message, { namespace, meta });
  }

  log(message: any, namespace: string) {
    this.logger.log(`info`, message, { namespace });
  }
}
