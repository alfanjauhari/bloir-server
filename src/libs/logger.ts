import { join } from 'path';
import { createLogger, Logger, transports, format } from 'winston';

const logger: Logger = createLogger({
  level: 'info',
  exitOnError: false,
  handleExceptions: true,
  transports: [
    new transports.File({
      level: 'error',
      filename: join(process.cwd(), 'logs', 'error.log')
    }),
    new transports.File({
      filename: join(process.cwd(), 'logs', 'access.log')
    }),
    new transports.Console({ format: format.json() })
  ]
});

export default logger;
