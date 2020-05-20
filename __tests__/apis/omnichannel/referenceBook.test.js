const request = require('supertest');
const app = require('../../../src/app');

const referenceBookUrl = '/api/omnichannel/reference_book';

describe('Get channel types', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .get(`${referenceBookUrl}/channel_types`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
        value: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
          }),
        ]),
      }),
    );
  });
});

describe('Get contact types', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .get(`${referenceBookUrl}/contact_types`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
        value: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
          }),
        ]),
      }),
    );
  });
});

describe('Get customer types', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .get(`${referenceBookUrl}/customer_types`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
        value: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
          }),
        ]),
      }),
    );
  });
});

describe('Get status types', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .get(`${referenceBookUrl}/status_types`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
        value: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
          }),
        ]),
      }),
    );
  });
});

describe('Get direction types', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .get(`${referenceBookUrl}/direction_types`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
        value: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
          }),
        ]),
      }),
    );
  });
});

describe('Get content types', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .get(`${referenceBookUrl}/content_types`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
        value: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
          }),
        ]),
      }),
    );
  });
});

describe('Get signal_status types', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .get(`${referenceBookUrl}/signal_status_types`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
        value: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
          }),
        ]),
      }),
    );
  });
});
