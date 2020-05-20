import express from 'express';
import {
  statusAnswer,
  // parseError,
  // encodeData,
} from '../../utils/helpers';
import loggerFunction from '../../services/logger';
import {
  getTickets,
  getChannel,
} from '../../interfaces/omnichannel/ticket';


const filePath = __filename;

const router = express.Router();


router.get('/', async (req, res) => {
  loggerFunction('ticketClient', filePath, 'someData', 'debug');

  return res.json(await statusAnswer(false, '00', 'OK', getTickets()));
});

router.get('/channel/:id', async (req, res) => {
  if (req.params.id) {
    loggerFunction('channelClient', filePath, req.params.id, 'debug');

    return res.json(await statusAnswer(false, '00', 'OK', getChannel()));
  }

  const errorData = await statusAnswer(true, '08', 'There is no id');
  loggerFunction('contact_typeClient', filePath, errorData, 'error');
  return res.json(errorData);
});

router.put('/assign_ticket/:id', async (req, res) => {
  if (req.params.id) {
    loggerFunction('channelClient', filePath, req.params.id, 'debug');

    return res.json(await statusAnswer(false, '00', 'OK'));
  }

  const errorData = await statusAnswer(true, '08', 'There is no id');
  loggerFunction('contact_typeClient', filePath, errorData, 'error');
  return res.json(errorData);
});

router.put('/join_ticket/:id', async (req, res) => {
  if (req.params.id) {
    loggerFunction('channelClient', filePath, req.params.id, 'debug');

    return res.json(await statusAnswer(false, '00', 'OK'));
  }

  const errorData = await statusAnswer(true, '08', 'There is no id');
  loggerFunction('contact_typeClient', filePath, errorData, 'error');
  return res.json(errorData);
});

router.put('/reques_for_new_assignee/:id', async (req, res) => {
  if (req.params.id) {
    loggerFunction('channelClient', filePath, req.params.id, 'debug');

    return res.json(await statusAnswer(false, '00', 'OK'));
  }

  const errorData = await statusAnswer(true, '08', 'There is no id');
  loggerFunction('contact_typeClient', filePath, errorData, 'error');
  return res.json(errorData);
});

router.put('/stick_to_case/:id', async (req, res) => {
  if (req.params.id) {
    loggerFunction('channelClient', filePath, req.params.id, 'debug');

    return res.json(await statusAnswer(false, '00', 'OK'));
  }

  const errorData = await statusAnswer(true, '08', 'There is no id');
  loggerFunction('contact_typeClient', filePath, errorData, 'error');
  return res.json(errorData);
});

router.put('/archive_ticket/:id', async (req, res) => {
  if (req.params.id) {
    loggerFunction('channelClient', filePath, req.params.id, 'debug');

    return res.json(await statusAnswer(false, '00', 'OK'));
  }

  const errorData = await statusAnswer(true, '08', 'There is no id');
  loggerFunction('contact_typeClient', filePath, errorData, 'error');
  return res.json(errorData);
});

module.exports = router;
