import express from 'express';
import {
  statusAnswer,
  // parseError,
  // encodeData,
} from '../../utils/helpers';
import loggerFunction from '../../services/logger';
import {
  getChannelTypes,
  getContactTypes,
  getCustomerTypes,
  getStatusTypes,
  getDirectionTypes,
  getContentTypes,
  getSignalStatusTypes,
} from '../../interfaces/omnichannel/referenceBook';


const filePath = __filename;

const router = express.Router();


router.get('/channel_type', async (req, res) => {
  loggerFunction('channel_typeClient', filePath, 'someData', 'debug');

  return res.json(await statusAnswer(false, '00', 'OK', getChannelTypes()));
});

router.get('/contact_type', async (req, res) => {
  loggerFunction('contact_typeClient', filePath, 'someData', 'debug');
  return res.json(await statusAnswer(false, '00', 'OK', getContactTypes()));
});

router.get('/customer_type', async (req, res) => {
  loggerFunction('customer_typeClient', filePath, 'someData', 'debug');

  return res.json(await statusAnswer(false, '00', 'OK', getCustomerTypes()));
});

router.get('/status_type', async (req, res) => {
  loggerFunction('status_typeClient', filePath, 'someData', 'debug');

  return res.json(await statusAnswer(false, '00', 'OK', getStatusTypes()));
});

router.get('/direction_type', async (req, res) => {
  loggerFunction('direction_typeClient', filePath, 'someData', 'debug');

  return res.json(await statusAnswer(false, '00', 'OK', getDirectionTypes()));
});

router.get('/content_type', async (req, res) => {
  loggerFunction('content_typeClient', filePath, 'someData', 'debug');

  return res.json(await statusAnswer(false, '00', 'OK', getContentTypes()));
});

router.get('/signal_status_type', async (req, res) => {
  loggerFunction('signal_statusClient', filePath, 'someData', 'debug');

  return res.json(await statusAnswer(false, '00', 'OK', getSignalStatusTypes()));
});

module.exports = router;
