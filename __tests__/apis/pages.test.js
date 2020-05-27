// import request from 'supertest';
// import request from 'supertest-session';
import session from 'supertest-session';
import csrf from 'csurf';

// const express = require('express');
// const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = require('../../src/app');

app.use(cookieParser());

let testSession = null;

beforeEach(async () => {
  testSession = await session(app);
});

const csrfProtection = csrf({ cookie: true });

const userOne = {
  login: 'kek',
  password: 'vorobek',
};

const loginUrl = '/api/pages/login';
const mainUrl = '/api/pages/main';
const loggerUrl = '/api/pages/logger';
const logoutUrl = '/api/pages/logout';



// const agent = request.agent(app);
/**
 * TODO: fix this error on test launch:
 * Jest did not exit one second after the test run has completed.
 * This usually means that there are asynchronous operations that
 * weren't stopped in your tests. Consider running Jest
 * with `--detectOpenHandles` to troubleshoot this issue.
 */

describe('Страница входа пользователя в приложение', () => {
  // it('Must get csrf key', async () => {
  // it('Must get csrf key', function () {
  //   const response = request(app)
  //     .get('/api/pages/carma')
  //     // .set('Cookie', `XSRF-TOKEN: ${request.csrfToken()}`)
  //     .expect(200, function (err, res) {
  //       if (err) return done(err)
  //       var token = res.text

  //       request(server)
  //         .post('/')
  //         .set('Cookie', cookies(res))
  //         .send('_csrf=' + encodeURIComponent(token))
  //         .expect(200, done)
  //     });
  //   // console.log(response.body);
  //   // console.log(response.header);
  //   // console.log(response.signedCookies);

  //   // expect(response.body).toBeNull();
  // });

  it('Должен осуществиться вход существующего пользователя', async () => {
    const response = await testSession
      .post(loginUrl)
      .set('authorization', `Basic ${process.env.OMNI_TOKEN}`)
      .send(userOne)
      .expect(200);

    // console.log(response.body);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: false,
        status: '00',
        text: 'OK',
        value: expect.any(String),
      }),
    );
  });

  test('Не должен осуществиться вход несуществующего пользователя', async () => {
    const response = await testSession
      .post(loginUrl)
      .send({
        login: 'shmyak',
        password: '123',
      })
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
      }),
    );
    expect(response.body.value).toBeNull();
  });

  test('Не должен осуществиться вход если не введен логин', async () => {
    // console.log(app)
    const response = await testSession
      .post(loginUrl)
      .send({
        password: '123',
      })
      .expect(200);
      // console.log(response.body)
    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
      }),
    );
    expect(response.body.value).toBeNull();
  });

  test('Не должен осуществиться вход если не введен пароль', async () => {
    const response = await testSession
      .post(loginUrl)
      .send({
        login: 'shmyak',
      })
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
      }),
    );
    expect(response.body.value).toBeNull();
  });
});

describe('another pages', () => {
  beforeEach(async () => {
    // testSession = await session(app);
    await testSession
      .post(loginUrl)
      .set('authorization', `Basic ${process.env.OMNI_TOKEN}`)
      .send(userOne)
      .expect(200);
  });

  it('Should allow user to get main page', async () => {
    const response = await testSession
      .post(mainUrl)
      .set('authorization', `Basic ${process.env.OMNI_TOKEN}`)
      .send(userOne)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: false,
        status: '00',
        text: 'OK',
        value: expect.any(String),
      }),
    );
  });

  it('Should allow user to get logger page', async () => {
    const response = await testSession
      .post(loggerUrl)
      .set('authorization', `Basic ${process.env.OMNI_TOKEN}`)
      .send(userOne)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: false,
        status: '00',
        text: 'OK',
        value: expect.any(String),
      }),
    );
  });

  it('Should allow user to get logout page', async () => {
    const response = await testSession
      .delete(logoutUrl)
      .set('authorization', `Basic ${process.env.OMNI_TOKEN}`)
      .send(userOne)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: false,
        status: '00',
        text: 'OK',
        value: 'Session Logout succeeded',
      }),
    );
  });
});
