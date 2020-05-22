const request = require('supertest');
const app = require('../../../src/app');

const customerUrl = '/api/omnichannel/customer';
const customerId = 'd95df7a0-bc64-40d0-8730-ecae4ef290e4';

describe('Get customer', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .get(`${customerUrl}/${customerId}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
        value:
          expect.objectContaining({
            customer_id: expect.any(String),
            customer_type_id: expect.any(String),
            first_name: expect.any(String),
            last_name: expect.any(String),
            middle_name: expect.any(String),
          }),
      }),
    );
  });
});

describe('Get contacts', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .get(`${customerUrl}/${customerId}/contact`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
        value: expect.arrayContaining([
          expect.objectContaining({
            contact_id: expect.any(String),
            customer_id: expect.any(String),
            contact_type_id: expect.any(String),
            channel_type_id: expect.any(String),
            detail: expect.any(String),
          }),
        ]),
      }),
    );
  });
});
