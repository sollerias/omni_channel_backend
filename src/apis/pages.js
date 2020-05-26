/**
 * File: pages.js
 * -----------------
 * Приём запросов со страниц приложения.
 */
import express from 'express';
import session from 'express-session';
import { userClientValidation } from '../services/validations/user';
import getUser from '../interfaces/pyLogin';
import {
  statusAnswer,
  parseError,
  encodeData,
} from '../utils/helpers';
import loggerFunction from '../services/logger';

const csrf = require('csurf');
const MemoryStore = require('memorystore')(session);

// const csrfProtection = csrf({ cookie: true });
const csrfProtection = csrf({
  cookie: {
    key: '_csrf-omnichannel',
    // path: '/context-route',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600, // 1-hour
  },
});

const filePath = __filename;
const router = express.Router();
const SESS_LIFETIME = 1000 * 60 * 60 * 8;
const {
  SESS_NAME,
  SESS_SECRET,
  SESSION_ENV,
} = process.env;
// // console.log(SESS_NAME, SESS_SECRET, SESSION_ENV)
const IN_PROD = SESSION_ENV === 'production';

// router.use(cookieParser);
// router.use(csrfProtection);
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
  // console.log('middleware/req.body: ', req.body);
  // console.log('middleware/client cookie: ', req.headers);
  // // console.log('req protocol: ', req.protocol);
  const csrfHeaderToken = req.get('x-xsrf-token');
  if (!csrfHeaderToken && req.path !== '/carma') {
    const negativeAnswer = await statusAnswer(true, '05', 'Authentication failed: wrong headers');
    loggerFunction('generalMiddlewareError', filePath, negativeAnswer, 'error');

    return res.json(negativeAnswer);
  }

  if (req.get('authorization') === `Basic ${process.env.OMNI_TOKEN}`) {
    const {
      userId,
      login,
      password,
      csrfToken,
    } = req.session;

    if (userId && csrfToken === csrfHeaderToken) {
      const userData = await getUser({
        login,
        password,
      });
      res.locals.user = userData;
    }
    next();
  } else {
    const negativeAnswer = await statusAnswer(true, '03', 'Authentication failed: wrong headers');
    loggerFunction('generalMiddlewareError', filePath, negativeAnswer, 'warn');

    return res.json(negativeAnswer);
  }
});

/**
 *  redirectLogin() - Отправляет на клиент инфу, что нужно редиректить в логин.
 *  Срабатывает, если на клиенте не установлена сессия
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
// eslint-disable-next-line consistent-return
const redirectLogin = async (req, res, next) => {
  // console.log('redirectLogin req: ', req.body);
  // // console.log(chalk.white.bgBlack('This is redirectLogin session: ', req.session.userId))
  if (!req.session.userId) {
    const logInfo = await statusAnswer(true, '02', 'Not authorized session');
    loggerFunction('redirectLoginError', filePath, logInfo, 'warn');
    return res.json(logInfo);
  }
  next();
};
// Token path
router.get('/carma', csrfProtection, (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  return res.json({});
});
/**
 * /login - обрабатывает данные, приходящие со страницы /login.
 * Производит аутентификацию пользователя. Добавляет в сессию параметры.
 * @param {integer} req.session.blocked - принимает значение 0 или 1.
 * Если параметр = 1, то на клиенте происходит блокировка экрана приложения.
 */
router.post('/login', async (req, res) => {
  // // console.log('login session.id 0: ', session.id);
  try {
    const {
      login,
      password,
    } = req.body;
    const userValidationData = await userClientValidation(login, password);

    if (userValidationData.error === false) {
      const userData = await getUser({
        login,
        password,
      });

      if (userData.error === false) {
        const csrfToken = req.get('x-xsrf-token');
        req.session.userId = userData.id;
        req.session.login = userData.login;
        req.session.password = userData.password;
        req.session.csrfToken = csrfToken;

        const answerToClient = await statusAnswer(false, '00', 'OK', await encodeData(userData));

        return res.json(answerToClient);
      }
      loggerFunction('userValidationError', filePath, userData, 'warn');

      return res.json(userData);
    }

    loggerFunction('userValidationError', filePath, userValidationData, 'warn');

    return res.json(userValidationData);
  } catch (error) {
    loggerFunction('userCreditError', filePath, parseError(error), 'error');

    return res.status(400).send(parseError(error));
  }
});

/**
 * /main - обрабатывает данные, приходящие со страницы /main.
 * Отправляет клиенту все данные по пользователю из локального хранилища.
 */
router.post('/main', redirectLogin, async (req, res) => {
  const {
    user,
  } = res.locals;
  loggerFunction('mainPageSuccess', filePath, await statusAnswer(false, '00', 'OK'), 'info');

  return res.json(await statusAnswer(false, '00', 'OK', await encodeData(user)));
});

/**
 * /main - обрабатывает данные, приходящие со страницы /main.
 * Отправляет клиенту все данные по пользователю из локального хранилища.
 */
router.post('/dashboard', redirectLogin, async (req, res) => {
  // console.log('main session.id: ', req.session.id);
  // // console.log('Main method req.session: ', req.session)
  const {
    user,
  } = res.locals;
  loggerFunction('mainPageSuccess', filePath, await statusAnswer(false, '00', 'OK'), 'info');
  return res.json(await statusAnswer(false, '00', 'OK', await encodeData(user)));
});

/**
 * logger - логгер данных, приходящих от клиента.
 */
router.post('/logger', redirectLogin, async (req, res) => {
  // console.log('logger: ', req.body);
  const logInfo = JSON.stringify(req.body);
  loggerFunction('logFromClient', filePath, logInfo, 'error');

  return res.json(await statusAnswer(false, '00', 'OK', 'Log is written successfully'));
});

/**
 * /logout - срабатывает при нажатии кнопки Выход на клиенте.
 * Удаляет сессию. Очищает куки.
 */
router.delete('/logout', redirectLogin, async (req, res) => {
  // const journalName = 'logout';
  // // console.log(req.body.userId)
  // // console.log('This is logout: ', req.session)
  // logging.writeLog(logDirectory, dirname, fileName, journalName, data);
  req.session.destroy(async (err) => {
    if (err) {
      const negativeAnswer = await statusAnswer(true, '04', 'Session Logout error', err);
      loggerFunction('sessionLogout', filePath, negativeAnswer, 'error');

      return res.json(negativeAnswer);
    }
    res.clearCookie(SESS_NAME);
    const positiveAnswer = await statusAnswer(false, 'OK', 'OK', 'Session Logout succeeded');
    loggerFunction('sessionLogout', filePath, positiveAnswer, 'info');

    return res.json(positiveAnswer);
  });
});

// Error handler for csrf-token errors.
// Чтобы воспроизвести ошибку, необходимо залогиниться,
// перейти на страницу main, затереть все куки, затем
// обновить страницу.
router.use(async (err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err);
  }
  const negativeAnswer = await statusAnswer(true, '04', 'Authentication failed: wrong token');
  loggerFunction('csrfToken', filePath, negativeAnswer, 'error');

  res.status(403);
  return res.json(negativeAnswer);
});

module.exports = router;
