const request = require('supertest');
const app = require('../../../src/app');

const socketUrl = '/api/omnichannel/socket';
const newTicketData = {
  'new assigned ticket': {
    id: '1e3551f1-a939-4c32-a9da-fb86168198f5',
    created_by: '123',
    created_at: '2020-05-04 10:34:49',
    updated_at: null,
    channel_id: '00ca4f0a-a133-4907-8a89-f565e2611285',
    status_type_id: '1',
    customer_id: 'f2b12e92-2711-4ec8-bf66-9aea645e0c5f',
    assigned_to: null,
    case_id: null,
  },
};

const newSignalData = {
  'new signal': {
    id: 'a3e6a38a-6db2-479e-9cfe-c5a10bbdbfec',
    created_by: '1',
    created_at: '2020-05-04 10:34:49',
    updated_at: null,
    ticket_id: '1e3551f1-a939-4c32-a9da-fb86168198f5',
    direction_type_id: '1',
    content_type_id: '1',
    signal_status_type_id: '2',
    detail: 'Добрый день, мне нужна помощь.',
  },
};

const requestForNewAssigneeData = {
  'request for a new assignee': {
    id: '1e3551f1-a939-4c32-a9da-fb86168198f5',
    created_by: '123',
    created_at: '2020-05-04 10:34:49',
    updated_at: null,
    channel_id: '00ca4f0a-a133-4907-8a89-f565e2611285',
    status_type_id: '1',
    customer_id: 'f2b12e92-2711-4ec8-bf66-9aea645e0c5f',
    assigned_to: '123',
    case_id: null,
  },
};

const newIncomingTicketData = {
  'new incoming ticket': {
    id: '1e3551f1-a939-4c32-a9da-fb86168198f5',
    created_by: '123',
    created_at: '2020-05-04 10:34:49',
    updated_at: null,
    channel_id: '00ca4f0a-a133-4907-8a89-f565e2611285',
    status_type_id: '1',
    customer_id: 'f2b12e92-2711-4ec8-bf66-9aea645e0c5f',
    assigned_to: null,
    case_id: null,
  },
};

describe('Socket new ticket', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .post(`${socketUrl}/`)
      .send(newTicketData)
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

describe('Socket new signal', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .post(`${socketUrl}/`)
      .send(newSignalData)
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

describe('Socket request for a new assignee', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .post(`${socketUrl}/`)
      .send(requestForNewAssigneeData)
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

describe('New incoming ticket', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .post(`${socketUrl}/`)
      .send(newIncomingTicketData)
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
