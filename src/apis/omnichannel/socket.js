import express from 'express';
import {
  statusAnswer,
  // parseError,
  // encodeData,
} from '../../utils/helpers';
import loggerFunction from '../../services/logger';
// import {
//   getCases,
//   getCase,
// } from '../../interfaces/omnichannel/socket';


const filePath = __filename;

const router = express.Router();


router.post('/new_ticket', async (req, res) => {
  if (req.body) {
    loggerFunction('caseClient', filePath, req.body, 'debug');

    return res.json(await statusAnswer(false, '00', 'OK'));
  }
  const errorData = await statusAnswer(true, '09', 'There is no data');
  loggerFunction('contact_typeClient', filePath, errorData, 'error');
  return res.json(errorData);
});


module.exports = router;
