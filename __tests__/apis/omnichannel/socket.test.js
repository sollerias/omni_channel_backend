const request = require('supertest');
const app = require('../../../src/app');

const socketUrl = '/api/omnichannel/socket';
const newTicketData = {
  'new assigned ticket': {
    id: '1e3551f1-a939-4c32-a9da-fb86168198f5',
    created_by: '123',
    created_at: '2020-05-04 10:34:49',
    updated_at: null,
    channel_id: '2',
    status_type_id: '1',
    customer_id: 'f2b12e92-2711-4ec8-bf66-9aea645e0c5f',
    assigned_to: null,
    case_id: null,
  },
};
describe('Socket new ticket', () => {
  it('Should send request', async () => {
    const response = await request(app)
      .post(`${socketUrl}/new_ticket`)
      .send(JSON.stringify(newTicketData))
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
