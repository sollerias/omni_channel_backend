/**
 * File: ticket.js
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

const getTickets = () => {
  const result = {
    count: 21,
    next: 'http://127.0.0.1:8000/api/v1/ticket/?page=5',
    previous: 'http://127.0.0.1:8000/api/v1/ticket/?page=3',
    results: [
      {
        id: '1e3551f1-a939-4c32-a9da-fb86168198f5',
        created_by: '123',
        created_at: '2020-05-04 10:34:49',
        updated_at: '2020-05-04 11:27:56',
        channel_id: '2',
        status_type_id: '1',
        customer_id: 'f2b12e92-2711-4ec8-bf66-9aea645e0c5f',
        assigned_to: '786',
        case_id: '1567899',
      },
      {
        id: '5ef54883-f15c-4091-a092-f6b545eafe18',
        created_by: '123',
        created_at: '2020-05-04 10:34:49',
        updated_at: '2020-05-04 11:27:56',
        channel_id: '2',
        status_type_id: '1',
        customer_id: '21418d70-9e2a-4ca1-93be-1fea433298f1',
        assigned_to: '235',
        case_id: '2385585',
      },
    ],
  };

  return result;
};

const getChannel = () => {
  const result = {
    id: '00ca4f0a-a133-4907-8a89-f565e2611285',
    channel_type_id: '1',
  };

  return result;
};

export {
  getTickets,
  getChannel,
};
