import express from 'express';
import {
  statusAnswer,
  // parseError,
  // encodeData,
} from '../../utils/helpers';
import loggerFunction from '../../services/logger';
import {
  getSignals,
} from '../../interfaces/omnichannel/signal';


const filePath = __filename;

const router = express.Router();


router.get('/:id', async (req, res) => {
  if (req.params.id) {
    loggerFunction('signalClient', filePath, req.params.id, 'debug');

    return res.json(await statusAnswer(false, '00', 'OK', getSignals()));
  }

  const errorData = await statusAnswer(true, '08', 'There is no id');
  loggerFunction('contact_typeClient', filePath, errorData, 'error');
  return res.json(errorData);
});

router.post('/:id', async (req, res) => {
  if (req.params.id) {
    loggerFunction('sendSignalClient', filePath, req.body, 'debug');

    return res.json(await statusAnswer(false, '00', 'OK'));
  }

  const errorData = await statusAnswer(true, '08', 'There is no id');
  loggerFunction('contact_typeClient', filePath, errorData, 'error');
  return res.json(errorData);
});

module.exports = router;
