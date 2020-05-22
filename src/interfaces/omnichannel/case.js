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

const getCases = () => {
  const result = {
    count: 121,
    next: 'http://127.0.0.1:8000/api/v1/case/?page=5',
    previous: 'http://127.0.0.1:8000/api/v1/case/?page=3',
    results: [
      {
        case_id: '1567899',
        created_by: '123',
        created_at: '2020-05-04 10:34:49',
        updated_at: '2020-05-04 11:27:56',
        ref_nr: '50387562-1',
        fullname: 'Джон Кузнецов',
        dob: '1985-05-14',
      },
      {
        case_id: '2385585',
        created_by: '123',
        created_at: '2020-05-04 10:34:49',
        updated_at: '2020-05-04 11:27:56',
        ref_nr: '50120238-1',
        fullname: 'Мария Иванова',
        dob: '2000-01-01',
      },
      {
        case_id: '2385586',
        created_by: '123',
        created_at: '2020-05-05 15:01:10',
        updated_at: null,
        ref_nr: '50120238-1',
        fullname: 'Мария Иванова',
        dob: '2000-01-01',
      },
    ],
  };
  return result;
};

const getCase = () => {
  const result = {
    case_id: '2385585',
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
  getCases,
  getCase,
};
