import Joi from '@hapi/joi';
import { statusAnswer } from '../../utils/helpers';

// const { LOG } = path.join(`${__dirname}/../settings/folderPath`);

// Начало: Логирование
// const logging = path.join(`${LOG}/loggin`);
// const logDirectory = path.join(`${LOG}/server.log`);
// const errorLogDirectory = path.join(`${LOG}/serverError.log`);
// const dirname = path.dirname(__filename);
// const fileName = path.basename(__filename);
// Конец: Логирование


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
    // console.log('huy', err);
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
    // console.log('huy', err);
    return statusAnswer(true, '01', err.details[0].message);
  }
};

// console.log(userClientValidation('kek', 'vorobek'));
