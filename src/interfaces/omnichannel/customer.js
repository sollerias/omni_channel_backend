/**
 * File: customer.js
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

const getCustomer = () => {
  const result = {
    id: 'd95df7a0-bc64-40d0-8730-ecae4ef290e4',
    customer_type_id: '1',
    first_name: 'Петр',
    last_name: 'Иванов',
    middle_name: '',
  };

  return result;
};

const getContacts = () => {
  const result = [
    {
      id: '5eee4b11-6c3b-45b8-84c7-08c5a258f71d',
      customer_id: 'd95df7a0-bc64-40d0-8730-ecae4ef290e4',
      contact_type_id: '1',
      channel_type_id: '1',
      detail: '79022507686',
    },
  ];

  return result;
};


export {
  getCustomer,
  getContacts,
};
