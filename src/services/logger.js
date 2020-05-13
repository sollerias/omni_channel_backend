import { LOG } from '../settings/folderPath';

const path = require('path');

const opts = {
  logDirectory: path.join(`${LOG}`),
  fileNamePattern: 'dynamic-<date>.log',
  dateFormat: 'DD.MM.YYYY',
  // domain: `MyApplication-${port}`,
  level: 'trace',
  // loggerConfigFile: `${__dirname}/logger-config.json`,
  refresh: 60 * 1000, // read/refresh each 60 seconds
};

// const SimpleLogger = require('simple-node-logger');
const log = require('simple-node-logger').createRollingFileLogger(opts);

/**
 * loggerFunction() - создает сущность логгера
 * @param {string} logName - название лога
 * @param {string} filePath - путь до файла, где произошло логирование
 * @param {multiple} logData - данные для логирования
 * @param {string} logLevel - уровень логирования. Один из шести:
 * trace, debug, info, warn, error, fatal
 */
const loggerFunction = (logName, filePath, logData, logLevel) => {
  log.setLevel('trace');

  let logDataResult;

  if (typeof logData === 'object') {
    logDataResult = JSON.stringify(logData);
  } else {
    logDataResult = logData;
  }

  const logText = `| ${logName} | Path to file: ${filePath} | Log data: ${logDataResult} | Acepted at ${new Date().toJSON()}`;

  switch (logLevel) {
    case 'trace':
      log.trace(logText);
      break;
    case 'debug':
      log.debug(logText);
      break;
    case 'info':
      log.info(logText);
      break;
    case 'warn':
      log.warn(logText);
      break;
    case 'error':
      log.error(logText);
      break;
    case 'fatal':
      log.fatal(logText);
      break;
    default:
      log.error('unknown logLevel');
      break;
  }

  const appender = log.getAppenders()[0];
  console.log('logLevel: ', logLevel, 'write to file: ', appender.__protected().currentFile);
};

export default loggerFunction;
