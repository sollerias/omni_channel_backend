import express from 'express';
import {
  statusAnswer,
  // parseError,
  // encodeData,
} from '../../utils/helpers';
import loggerFunction from '../../services/logger';
import {
  getCustomer,
  getContacts,
} from '../../interfaces/omnichannel/customer';


const filePath = __filename;

const router = express.Router();


router.get('/:id', async (req, res) => {
  if (req.params.id) {
    loggerFunction('customerClient', filePath, req.params.id, 'debug');

    return res.json(await statusAnswer(false, '00', 'OK', getCustomer()));
  }
  const errorData = await statusAnswer(true, '08', 'There is no id');

  return res.json(errorData);
});

router.get('/:id/contact', async (req, res) => {
  if (req.params.id) {
    loggerFunction('customerContactClient', filePath, req.params.id, 'debug');
    return res.json(await statusAnswer(false, '00', 'OK', getContacts()));
  }
  const errorData = await statusAnswer(true, '08', 'There is no id');

  return res.json(errorData);
});

module.exports = router;
