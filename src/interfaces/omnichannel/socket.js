/**
 * File: socket.js
 * -----------------
 * Отправка данных на сервер сокетов.
 */
// import * as path from 'path';
import {
  statusAnswer,
} from '../../utils/helpers';
import loggerFunction from '../../services/logger';

const rp = require('request-promise-native');
// const Joi = require('@hapi/joi');

const filePath = __filename;
const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  // 'Accept': 'application/json',
  // 'Cache-Control': 'no-cache',
  // 'Pragma': 'no-cache'
};

const url = process.env.SOCKET_NOTIFY_URL;

const sendDataToOmnichannelSocket = (body) => {
  // console.log('body: ', body);
  const options = {
    method: 'post',
    body,
    json: true,
    url,
    headers,
  };
  return new Promise((resolve) => {
    resolve(rp(options));
  })
    .then(async (response) => {
      // console.log('rp response: ', response);
      if (response.error) {
        const errorData = await statusAnswer(true, '10', 'Ошибка отправки данных на сокет', response.error);
        loggerFunction('interfaces/newTicket', filePath, errorData, 'error');

        return response;
      }
      const responseData = await statusAnswer(false, '00', 'ОK', response);
      loggerFunction('interfaces/newTicket', filePath, responseData, 'info');

      return responseData;
    })
    .catch(async (e) => {
      const errorBody = {
        error: e.name,
        error_text: e.message,
        error_status_code: e.statusCode,
      };
      const errorData = await statusAnswer(true, '10', 'Ошибка отправки данных на сокет', errorBody);
      loggerFunction('interfaces/newTicket', filePath, errorData, 'error');

      return errorData;
    });
};

export default sendDataToOmnichannelSocket;
