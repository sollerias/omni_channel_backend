import { LOG } from '../settings/folderPath';

const path = require('path');

const loggerFilePath = path.join(`${LOG}/test.log`);
const SimpleLogger = require('simple-node-logger');

const manager = new SimpleLogger({
  errorEventName: 'error',
  fileNamePattern: 'roll-<DATE>.log',
  dateFormat: 'YYYY.MM.DD',
});


process.on('error', (msg) => {
  console.log('Error event caught: ', JSON.stringify(msg));
});
/**
 * loggerFunction() - создает сущность логгера
 * @param {string} logName - название лога
 * @param {string} filePath - путь до файла, где произошло логирование
 * @param {multiple} logData - данные для логирования
 * @param {string} logLevel - уровень логирования. Один из шести:
 * trace, debug, info, warn, error, fatal
 */
const loggerFunction = (logName, filePath, logData, logLevel) => {
  manager.createConsoleAppender();
  manager.createFileAppender({ logFilePath: loggerFilePath });

  const log = manager.createLogger(logName, 'trace');
  let logDataResult;
  // logName = manager.createLogger('CategoryOne', 'trace');
  if (typeof logData === 'object') {
    logDataResult = JSON.stringify(logData);
  } else {
    logDataResult = logData;
  }
  const logText = `| Path to file: ${filePath} | Log data: ${logDataResult} | Acepted at ${new Date().toJSON()}`;
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

  // log1.trace('this is a simple trace log statement (should not show)');
  // log1.debug('this is a simple debug log statement (should not show)');
  // log1.info('this is a simple info log statement/entry');
  // log2.warn('this is a simple warn log statement/entry');
  // log1.error('this is a simple error log statement/entry');
  // log1.error();
  // log2.fatal('this is a simple fatal log statement/entry');
  // log2.trace('this is a simple trace log statement (should show)');
  // log1.debug('this is a simple debug log statement (should show)');

  const loggers = manager.getLoggers();
  loggers.forEach((logger) => {
    console.log('stats: ', logger.getCategory(), logger.getStats());
  });
};

export default loggerFunction;
