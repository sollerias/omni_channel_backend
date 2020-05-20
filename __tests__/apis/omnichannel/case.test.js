const request = require('supertest');
const app = require('../../../src/app');

const caseUrl = '/api/omnichannel/case';
const caseId = 2385585;

describe('Get cases', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .get(`${caseUrl}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
        value:
          expect.objectContaining({
            count: expect.any(Number),
            next: expect.any(String),
            previous: expect.any(String),
            results: expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
                created_by: expect.any(String),
                created_at: expect.any(String),
                // updated_at: expect.any(String),
                ref_nr: expect.any(String),
                fullname: expect.any(String),
                dob: expect.any(String),
              }),
            ]),
          }),
      }),
    );
  });
});

describe('Get case', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .get(`${caseUrl}/${caseId}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
        value:
          expect.objectContaining({
            id: expect.any(String),
            created_by: expect.any(String),
            created_at: expect.any(String),
            updated_at: expect.any(String),
            ref_nr: expect.any(String),
            fullname: expect.any(String),
            dob: expect.any(String),
          }),
      }),
    );
  });
});
