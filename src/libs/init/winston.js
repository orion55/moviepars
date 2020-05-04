const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

const logDir = 'log';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = path.join(logDir, 'movie.log');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'DD.MM.YYYY HH:mm:ss',
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
      ),
    }),
    new transports.File({ filename }),
  ],
});

export default logger;
