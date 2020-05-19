const request = require('supertest');
const app = require('../../../src/app');

const ticketUrl = '/api/omnichannel/ticket';
const ticketId = '00ca4f0a-a133-4907-8a89-f565e2611285';

describe('Get tickets', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .get(`${ticketUrl}`)
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
                channel_id: expect.any(String),
                status_type_id: expect.any(String),
                customer_id: expect.any(String),
                assigned_to: expect.any(String),
                case_id: expect.any(String),
              }),
            ]),
          }),
      }),
    );
  });
});

describe('Get channel', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .get(`${ticketUrl}/channel/${ticketId}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
        value:
          expect.objectContaining({
            id: expect.any(String),
            channel_type_id: expect.any(String),
          }),
      }),
    );
  });
});

describe('Assign ticket', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .put(`${ticketUrl}/assign_ticket/${ticketId}`)
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

describe('Join ticket', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .put(`${ticketUrl}/join_ticket/${ticketId}`)
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

describe('Request for a new assignee', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .put(`${ticketUrl}/reques_for_new_assignee/${ticketId}`)
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

describe('Stick to a case', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .put(`${ticketUrl}/stick_to_case/${ticketId}`)
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

describe('Archive ticket', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .put(`${ticketUrl}/archive_ticket/${ticketId}`)
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
