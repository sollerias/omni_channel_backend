const request = require('supertest');
const app = require('../../../src/app');

const ticketUrl = '/api/omnichannel/ticket';
const ticketId = '00ca4f0a-a133-4907-8a89-f565e2611285';

const assignTicketData = {
  status_type_id: '2',
  assigned_to: '786',
};

const joinTicketData = {
  status_type_id: '3',
  assigned_to: '786',
};

const requestForNewAssignyData = {
  status_type_id: '4',
  assigned_to: '786',
};

const stickToCaseData = {
  status_type_id: '2',
  assigned_to: '786',
  case_id: '1567899',
};

const archiveTicketData = {
  status_type_id: '5',
  assigned_to: '786',
};

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
                ticket_id: expect.any(String),
                created_by: expect.any(String),
                created_at: expect.any(String),
                // updated_at: expect.any(String),
                channel_id: expect.any(String),
                status_type_id: expect.any(String),
                customer_id: expect.any(String),
                assigned_to: expect.any(String),
                case_id: expect.any(String),
                remark: expect.any(String),
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
            channel_id: expect.any(String),
            channel_type_id: expect.any(String),
          }),
      }),
    );
  });
});

describe('Put methods with Ticket', () => {
  it('Should assign ticket', async () => {
    const response = await request(app)
      .put(`${ticketUrl}/${ticketId}`)
      .send(assignTicketData)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
      }),
    );
  });

  it('Should join ticket', async () => {
    const response = await request(app)
      .put(`${ticketUrl}/${ticketId}`)
      .send(joinTicketData)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
      }),
    );
  });

  it('Should request for a new assignee', async () => {
    const response = await request(app)
      .put(`${ticketUrl}/${ticketId}`)
      .send(requestForNewAssignyData)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
      }),
    );
  });

  it('Should stick to a case', async () => {
    const response = await request(app)
      .put(`${ticketUrl}/${ticketId}`)
      .send(stickToCaseData)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(Boolean),
        status: expect.any(String),
        text: expect.any(String),
      }),
    );
  });

  it('Should archive ticket', async () => {
    const response = await request(app)
      .put(`${ticketUrl}/${ticketId}`)
      .send(archiveTicketData)
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
