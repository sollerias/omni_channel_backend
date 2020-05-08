const request = require('supertest');
const app = require('../src/app');

const userOne = {
  login: 'kek',
  password: 'vorobek',
};

const loginUrl = '/api/pages/login';



describe('Страница входа пользователя в приложение', () => {
  test('Должен осуществиться вход существующего пользователя', async () => {
    // console.log(app)
    const response = await request(app)
      .post(loginUrl)
      .send(userOne)
      .expect(200);

    // console.log(response.body);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
        value: expect.any(String),
      }),
    );
  });

  test('Не должен осуществиться вход несуществующего пользователя', async () => {
    const response = await request(app)
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
    const response = await request(app)
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
    const response = await request(app)
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

afterAll(async (done) => {
  done();
});
