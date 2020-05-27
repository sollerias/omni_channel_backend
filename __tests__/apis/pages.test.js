/**
 * File: pages.test.js
 * -----------------
 * Tests for apis/pages.js file to test all routers
 */

import session from 'supertest-session';

const app = require('../../src/app');

let testSession = null;

let csrfToken = '';

const userOne = {
  login: 'kek',
  password: 'vorobek',
};

const tokenUrl = '/api/pages/carma';
const loginUrl = '/api/pages/login';
const mainUrl = '/api/pages/main';
const loggerUrl = '/api/pages/logger';
const logoutUrl = '/api/pages/logout';

beforeEach(async () => {
  testSession = await session(app);

  // Request for getting csrfToken value
  await testSession
    .get(tokenUrl)
    .set('authorization', `Basic ${process.env.OMNI_TOKEN}`)
    .send(userOne)
    .expect(200);

  const token = testSession.cookies.find((cookie) => cookie.name === 'XSRF-TOKEN');
  csrfToken = token.value;
});

/**
 * TODO: fix this error on test launch:
 * Jest did not exit one second after the test run has completed.
 * This usually means that there are asynchronous operations that
 * weren't stopped in your tests. Consider running Jest
 * with `--detectOpenHandles` to troubleshoot this issue.
 */
describe('Login page', () => {
  it('Should get csrf token', async () => {
    const response = await testSession
      .get(tokenUrl)
      .set('authorization', `Basic ${process.env.OMNI_TOKEN}`)
      .send(userOne)
      .expect(200);

    const token = testSession.cookies.find((cookie) => cookie.name === 'XSRF-TOKEN');
    csrfToken = token.value;

    expect(response.body).toEqual({});
  });

  it('Should login user', async () => {
    const response = await testSession
      .post(loginUrl)
      .set('X-XSRF-TOKEN', `${csrfToken}`)
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

  test('Should not login nonexistent user', async () => {
    const response = await testSession
      .post(loginUrl)
      .set('X-XSRF-TOKEN', `${csrfToken}`)
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
        value: null,
      }),
    );
  });

  test('Should not login user without username', async () => {
    // console.log(app)
    const response = await testSession
      .post(loginUrl)
      .set('X-XSRF-TOKEN', `${csrfToken}`)
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

  test('Should not login user without password', async () => {
    const response = await testSession
      .post(loginUrl)
      .set('X-XSRF-TOKEN', `${csrfToken}`)
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
  // Authorization to get sessionId
  beforeEach(async () => {
    await testSession
      .post(loginUrl)
      .set('X-XSRF-TOKEN', `${csrfToken}`)
      .set('authorization', `Basic ${process.env.OMNI_TOKEN}`)
      .send(userOne)
      .expect(200);
  });

  it('Should allow user to get main page', async () => {
    const response = await testSession
      .post(mainUrl)
      .set('X-XSRF-TOKEN', `${csrfToken}`)
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
      .set('X-XSRF-TOKEN', `${csrfToken}`)
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
      .set('X-XSRF-TOKEN', `${csrfToken}`)
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
