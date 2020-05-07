// import * as path from 'path';

// const rp = require('request-promise-native');
// const Joi = require('@hapi/joi');

// const { LOG } = path.join(`${__dirname}/../settings/folderPath`);

// Начало: Логирование
// const logging = path.join(`${LOG}/loggin`);
// const logDirectory = path.join(`${LOG}/server.log`);
// const errorLogDirectory = path.join(`${LOG}/serverError.log`);
// const dirname = path.dirname(__filename);
// const fileName = path.basename(__filename);
// Конец: Логирование
const { statusAnswer } = require('../utils/createCallbackAnswer');

// const token = '12435340adsfa44523';
// const headers = {
//   Authentication: `Bearer ${token}`,
//   'Content-Type': 'application/json; charset=utf-8',
//   Accept: 'application/json',
//   'Cache-Control': 'no-cache',
//   Pragma: 'no-cache',
// };
// const url = process.env.PY_SERVER_URL;
// let errorBody = {};

/**
 * sendData() - отправляет данные на сервер backend_socketio
 * @param {json} body - данные в формате JSON
 */
const getUser = (body) => {
  // const journalName = 'interfaces/pyLogin.js';
  console.log(body);
  const pipka = {
    error: false,
    id: 343,
    login: 'kek',
    password: 'vorobek',
    status: '245',
    text: 'some text',
  };

  // Begin pattern
  if (body.login === 'kek' && body.password === 'vorobek') {
    return pipka;
  }
  return statusAnswer(true, '02', 'Authentication failed');
  // End pattern
  // // console.log(body)
  // const options = {
  //   method: 'post',
  //   body,
  //   json: true,
  //   url,
  //   headers,
  // };
  // return new Promise((resolve, reject) => {
  //   resolve(rp(options));
  //   reject(error);
  // })
  //   .then((response) => {
  //     console.log('rp response: ', response);
  //     if (response.error) {
  //       logging.writeLog(errorLogDirectory, dirname, fileName,
  //         journalName, JSON.stringify(response.error));
  //       return response;
  //     }
  //     return response;
  //   })
  //   .catch((e) => {
  //     errorBody = {
  //       error: e.name,
  //       error_text: e.message,
  //       error_status_code: e.statusCode,
  //     };
  //     // console.log('rp error: ', errorBody)
  //     logging.writeLog(errorLogDirectory, dirname, fileName, journalName,
  //       JSON.stringify(errorBody));
  //     return errorBody;
  //   });
};

export default getUser;
// console.log(getUser({ login: 'kek', password: 'vorobek' }));
// module.exports = {
//   getUser,
// };
