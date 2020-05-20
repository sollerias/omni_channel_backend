/**
 * File: referenceBook.js
 * -----------------
 * Обращение к серверу pyLogin для запроса данных.
 */
// import * as path from 'path';
// import {
//   statusAnswer,
//   parseError,
//   encodeData,
// } from '../../utils/helpers';
// import loggerFunction from '../../services/logger';


// const rp = require('request-promise-native');
// const Joi = require('@hapi/joi');

const getChannelTypes = () => {
  const result = [
    {
      id: '1',
      name: 'Viber',
    },
    {
      id: '2',
      name: 'WhatsApp',
    },
    {
      id: '3',
      name: 'Telegram',
    },
    {
      id: '4',
      name: 'Skype',
    },
  ];

  return result;
};

const getContactTypes = () => {
  const result = [
    {
      id: '1',
      name: 'Телефон',
    },
    {
      id: '2',
      name: 'Email',
    },
    {
      id: '3',
      name: 'Логин',
    },
  ];

  return result;
};

const getCustomerTypes = () => {
  const result = [
    {
      id: '1',
      name: 'Физическое лицо',
    },
    {
      id: '2',
      name: 'Страховая компания',
    },
    {
      id: '3',
      name: 'Провайдер',
    },
  ];

  return result;
};

const getStatusTypes = () => {
  const result = [
    {
      id: '1',
      name: 'Физическое лицо',
    },
    {
      id: '2',
      name: 'Страховая компания',
    },
    {
      id: '3',
      name: 'Провайдер',
    },
  ];

  return result;
};

const getDirectionTypes = () => {
  const result = [
    {
      id: '1',
      name: 'Входящее',
    },
    {
      id: '2',
      name: 'Исходящее',
    },
  ];

  return result;
};

const getContentTypes = () => {
  const result = [
    {
      id: '1',
      name: 'Текст',
    },
    {
      id: '2',
      name: 'Файл',
    },
    {
      id: '3',
      name: 'Изображение',
    },
    {
      id: '4',
      name: 'Локация',
    },
    {
      id: '5',
      name: 'Номер телефона',
    },
  ];

  return result;
};

const getSignalStatusTypes = () => {
  const result = [
    {
      id: '1',
      name: 'Отправлено',
    },
    {
      id: '2',
      name: 'Доставлено',
    },
    {
      id: '3',
      name: 'Прочитано',
    },
    {
      id: '4',
      name: 'Не удалось отправить',
    },
  ];

  return result;
};

export {
  getChannelTypes,
  getContactTypes,
  getCustomerTypes,
  getStatusTypes,
  getDirectionTypes,
  getContentTypes,
  getSignalStatusTypes,
};
