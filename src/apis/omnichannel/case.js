import express from 'express';
import {
  statusAnswer,
  // parseError,
  // encodeData,
} from '../../utils/helpers';
import loggerFunction from '../../services/logger';
import {
  getCases,
  getCase,
} from '../../interfaces/omnichannel/case';


const filePath = __filename;

const router = express.Router();


router.get('/', async (req, res) => {
  loggerFunction('caseClient', filePath, 'someData', 'debug');

  return res.json(await statusAnswer(false, '00', 'OK', getCases()));
});

router.get('/:id', async (req, res) => {
  if (req.params.id) {
    loggerFunction('contact_typeClient', filePath, req.params.id, 'debug');

    return res.json(await statusAnswer(false, '00', 'OK', getCase()));
  }

  const errorData = await statusAnswer(true, '08', 'There is no id');
  loggerFunction('contact_typeClient', filePath, errorData, 'error');
  return res.json(errorData);
});

module.exports = router;
