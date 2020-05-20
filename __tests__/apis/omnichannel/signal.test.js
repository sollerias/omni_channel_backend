const request = require('supertest');
const app = require('../../../src/app');

const signalUrl = '/api/omnichannel/signal';
const ticketId = '00ca4f0a-a133-4907-8a89-f565e2611285';
const sendSignalData = {
  created_by: '1',
  ticket_id: '1e3551f1-a939-4c32-a9da-fb86168198f5',
  content_type_id: '1',
  detail: 'Доктор будет через 15 минут.',
};

describe('Get signals', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .get(`${signalUrl}/${ticketId}`)
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
                  ticket_id: expect.any(String),
                  direction_type_id: expect.any(String),
                  content_type_id: expect.any(String),
                  signal_status_type_id: expect.any(String),
                  detail: expect.any(String),
                }),
              ]),
            }),
      }),
    );
  });
});

describe('Send signal', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .post(`${signalUrl}/${ticketId}`)
      .send(JSON.stringify(sendSignalData))
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
      }),
    );
  });
});
