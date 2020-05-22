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
      channel_type_id: '1',
      name: 'Viber',
    },
    {
      channel_type_id: '2',
      name: 'WhatsApp',
    },
    {
      channel_type_id: '3',
      name: 'Telegram',
    },
    {
      channel_type_id: '4',
      name: 'Skype',
    },
  ];

  return result;
};

const getContactTypes = () => {
  const result = [
    {
      contact_type_id: '1',
      name: 'Телефон',
    },
    {
      contact_type_id: '2',
      name: 'Email',
    },
    {
      contact_type_id: '3',
      name: 'Логин',
    },
  ];

  return result;
};

const getCustomerTypes = () => {
  const result = [
    {
      customer_type_id: '1',
      name: 'Физическое лицо',
    },
    {
      customer_type_id: '2',
      name: 'Страховая компания',
    },
    {
      customer_type_id: '3',
      name: 'Провайдер',
    },
  ];

  return result;
};

const getStatusTypes = () => {
  const result = [
    {
      status_type_id: '1',
      name: 'Новое',
    },
    {
      status_type_id: '2',
      name: 'Назначен ответственный',
    },
    {
      status_type_id: '3',
      name: 'Активное',
    },
    {
      status_type_id: '4',
      name: 'Запрос на изменение ответственного',
    },
    {
      status_type_id: '5',
      name: 'Архив',
    },
  ];

  return result;
};

const getDirectionTypes = () => {
  const result = [
    {
      direction_type_id: '1',
      name: 'Входящее',
    },
    {
      direction_type_id: '2',
      name: 'Исходящее',
    },
  ];

  return result;
};

const getContentTypes = () => {
  const result = [
    {
      content_type_id: '1',
      name: 'Текст',
    },
    {
      content_type_id: '2',
      name: 'Файл',
    },
    {
      content_type_id: '3',
      name: 'Изображение',
    },
    {
      content_type_id: '4',
      name: 'Локация',
    },
    {
      content_type_id: '5',
      name: 'Номер телефона',
    },
  ];

  return result;
};

const getSignalStatusTypes = () => {
  const result = [
    {
      signal_status_type_id: '1',
      name: 'Отправлено',
    },
    {
      signal_status_type_id: '2',
      name: 'Доставлено',
    },
    {
      signal_status_type_id: '3',
      name: 'Прочитано',
    },
    {
      signal_status_type_id: '4',
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
