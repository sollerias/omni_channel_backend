/**
 * File: case.js
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

const getSignals = () => {
  const result = {
    count: 2,
    next: 'http://127.0.0.1:8000/api/v1/ticket/{id}/signal/?page=5',
    previous: 'http://127.0.0.1:8000/api/v1/ticket/{id}/signal/?page=3',
    results: [
      {
        id: 'a3e6a38a-6db2-479e-9cfe-c5a10bbdbfec',
        created_by: '1',
        created_at: '2020-05-04 10:34:49',
        updated_at: '2020-05-04 11:27:56',
        ticket_id: '1e3551f1-a939-4c32-a9da-fb86168198f5',
        direction_type_id: '1',
        content_type_id: '1',
        signal_status_type_id: '2',
        detail: 'Добрый день, мне нужна помощь.',
      },
      {
        id: '4ac62768-d7e4-4a41-b12b-0e8ca6976e6a',
        created_by: '123',
        created_at: '2020-05-04 10:35:05',
        updated_at: '2020-05-04 10:35:05',
        ticket_id: '1e3551f1-a939-4c32-a9da-fb86168198f5',
        direction_type_id: '2',
        content_type_id: '1',
        signal_status_type_id: '2',
        detail: 'Добрый день, чем можем помочь?',
      },
    ],
  };

  return result;
};

const sendSignal = () => {
  const result = {
    id: '2385585',
    created_by: '123',
    created_at: '2020-05-04 10:34:49',
    updated_at: '2020-05-04 11:27:56',
    ref_nr: '50120238-1',
    fullname: 'Мария Иванова',
    dob: '2000-01-01',
  };

  return result;
};


export {
  getSignals,
  sendSignal,
};
