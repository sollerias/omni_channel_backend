import Joi from '@hapi/joi';
import { statusAnswer } from '../../utils/helpers';
import loggerFunction from '../logger';

const filePath = __filename;


export const userClientValidation = async (login, password) => {
  const schema = Joi.object({
    login: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
  });

  try {
    const value = await schema.validateAsync({ login, password });

    return statusAnswer(false, '00', 'OK', value);
  } catch (err) {
    const logInfo = JSON.stringify({ catchError: err.details });
    loggerFunction('userClientValidation', filePath, logInfo, 'warn');

    return statusAnswer(true, '01', err.details[0].message);
  }
};
/**
 * Валидация данных пользователя, пришедших от сервера API
 * @param {object} userObject
 */
export const userObjectFromServerValidation = async (userObject) => {
  const schema = Joi.object({
    login: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),

    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),

    id: Joi.integer()
      .required(),
  });

  try {
    const value = await schema.validateAsync(userObject);

    return statusAnswer(false, '00', 'OK', value);
  } catch (err) {
    const logInfo = JSON.stringify({ catchError: err.details });
    loggerFunction('userObjectFromServerValidation', filePath, logInfo, 'warn');

    return statusAnswer(true, '01', err.details[0].message);
  }
};
