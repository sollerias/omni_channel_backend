/**
 * File: pages.js
 * -----------------
 * Приём запросов со страниц приложения.
 */
import * as path from 'path';

// import { userClientValidation } from '../services/login';
import express from 'express';
import session from 'express-session';
import { userClientValidation } from '../services/validations/user';
import getUser from '../interfaces/pyLogin';
import { statusAnswer, parseError } from '../utils/helpers';

const MemoryStore = require('memorystore')(session);
// const chalk = require('chalk');

// Начало: Логирование
const logging = require('../log/loggin');
const logDirectory = require('../log/server.log');
// const errorLogDirectory = require('../log/serverError.log');

const dirname = path.dirname(__filename);
const fileName = path.basename(__filename);
// Конец: Логирование

const router = express.Router();
const SESS_LIFETIME = 1000 * 60 * 60 * 8;
const {
  SESS_NAME,
  SESS_SECRET,
  SESSION_ENV,
} = process.env;
// console.log(SESS_NAME, SESS_SECRET, SESSION_ENV)
const IN_PROD = SESSION_ENV === 'production';
// Содержит данные по сессиям пользователя. Пр.: { 489: ['sdfsdfdsf', 'gdgdgdgdfgdfg']}
const userGeneralObject = {};

// Инициализация сессии
router.use(session({
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  store: new MemoryStore({
    checkPeriod: 86400000, // prune expired entries every 24h
  }),
  secret: SESS_SECRET,
  cookie: {
    path: '/',
    maxAge: SESS_LIFETIME,
    // Must have HTTPS to work 'secret:true'
    secure: IN_PROD,
    sameSite: false,
  },
}));

/**
 * Middleware - Проверяет аутентификацию пользователя
 * Вносит данные из БД в локальное хранилище сервера - оперативку.
 */
// TODO:  make verify user on token. Create token for certain user and verify it,
// not password.
// eslint-disable-next-line consistent-return
router.use(async (req, res, next) => {
  console.log('middleware/req.body: ', req.body);
  console.log('middleware/client cookie: ', req.headers);
  // console.log('middleware/client host : ', req.headers.host);
  console.log('middleware/client host : ', req.get('host'));
  console.log('middleware/client authorization : ', req.get('authorization'));


  // console.log('req protocol: ', req.protocol);
  // console.log('This is middleware session: ', req.session);
  console.log('middleware session.id: ', req.session.id);
  if (req.get('host')) {
    const { userId, login, password } = req.session;
    // console.log(chalk.blue.bgWhite('We are in the middleware: ', i++))
    if (userId) {
      const userData = await getUser({ login, password });
      res.locals.user = userData;
    }
    next();
  } else {
    return res.json(statusAnswer(true, '03', 'Authentication failed: wrong headers'));
  }
});

/**
 *  redirectLogin() - Отправляет на клиент инфу, что нужно редиректить в логин.
 *  Срабатывает, если не установлена сессия
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
// eslint-disable-next-line consistent-return
const redirectLogin = (req, res, next) => {
  console.log('redirectLogin req: ', req.body);
  // console.log(chalk.white.bgBlack('This is redirectLogin session: ', req.session.userId))
  if (!req.session.userId) {
    return res.send({ error: statusAnswer('02', 'Not authorized session') });
  }
  next();
};

/**
* /login - обрабатывает данные, приходящие со страницы /login.
* Производит аутентификацию пользователя. Добавляет в сессию параметры.
* @param {integer} req.session.blocked - принимает значение 0 или 1.
* Если параметр = 1, то на клиенте происходит блокировка экрана приложения.
*/
router.post('/login', async (req, res) => {
  console.log('login client cookie: ', req.headers);
  // console.log('req protocol: ', req.protocol);
  // console.log('login req.body: ', req.body);
  // console.log('login session.id 0: ', session.id);

  // const journalName = 'login';
  try {
    const { login, password } = req.body;
    const userValidationData = await userClientValidation(login, password);

    if (userValidationData.error === false) {
      const userData = await getUser({ login, password });

      if (userData.error === false) {
        req.session.userId = userData.id;
        req.session.login = userData.login;
        req.session.password = userData.password;
        return res.json(userData);
      }
      // logging.writeLog(errorLogDirectory, dirname, fileName, journalName, userData);
      return res.json(userData);
    }

    return res.json(userValidationData);
  } catch (error) {
    return res.status(400).send(parseError(error));
  }
});

/**
 * /main - обрабатывает данные, приходящие со страницы /main.
 * Отправляет клиенту все данные по пользователю из локального хранилища.
 */
router.post('/main', redirectLogin, (req, res) => {
  console.log('main session.id: ', req.session.id);
  // console.log('Main method req.session: ', req.session)
  const { user } = res.locals;
  console.log('main session.id: ', res.locals);
  return res.json(user);
});

/**
 * /logout - срабатывает при нажатии кнопки Выход на клиенте.
 * Удаляет сессию. Очищает куки.
 */
router.delete('/logout', redirectLogin, (req, res) => {
  const journalName = 'logout';
  // console.log(req.body.userId)
  // console.log('This is logout: ', userGeneralObject)
  // console.log('This is logout: ', req.session)
  const data = JSON.stringify({ 'logout userGeneralObject': userGeneralObject });
  logging.writeLog(logDirectory, dirname, fileName, journalName, data);
  req.session.destroy((err) => {
    if (err) {
      return res.send({ error: 'Logout error' });
    }
    res.clearCookie(SESS_NAME);
    return res.send({ logout: 'success' });
  });
});

module.exports = router;
