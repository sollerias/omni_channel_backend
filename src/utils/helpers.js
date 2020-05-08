import {
  statusAnswerValidation,
  encodeDataValidation,
} from '../services/validations/helpers';


export const parseError = (err) => {
  // console.log('!!!!', err);
  if (err.isJoi) { return err.details[0]; }
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
};

/**
 * statusAnswer() - возвращает клиенту подготовленный объект с данными
 * по запросу .
 * @param {boolean} error - наличие ошибки в запросе от клиента
 * @param {string} status - статус ошибки или статус 00 - запрос выполнен
 * @param {string} text - текст ошибки или ОК - запрос выполнен
 * @param {multiple} value - различного рода данные
 */
export const statusAnswer = async (error, status, text, value = null) => {
  const validation = await statusAnswerValidation(error, status, text, value);
  // console.log('statusAnswer validation result: ', validation);
  return validation;
};

export const encodeData = async (data) => {
  const validation = await encodeDataValidation(data);

  console.log('encodeData/data: ', validation);
  // const buff = Buffer.from(JSON.stringify(data));
  const buff = Buffer.from(JSON.stringify(validation));

  const base64data = buff.toString('base64');

  return base64data;
};
