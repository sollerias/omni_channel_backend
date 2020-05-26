const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const rateLimiterMemoryMiddleware = require('./services/middleware/rateLimiterMemory');

require('dotenv').config({ path: './src/config/dev_local.env' });
// const login = require('./apis/login.js');
const pages = require('./apis/pages');

const omnichannelReferenceBook = require('./apis/omnichannel/referenceBook');
const omnichannelCustomer = require('./apis/omnichannel/customer');
const omnichannelCase = require('./apis/omnichannel/case');
const omnichannelTicket = require('./apis/omnichannel/ticket');
const omnichannelSignal = require('./apis/omnichannel/signal');
const omnichannelSocket = require('./apis/omnichannel/socket');

const app = express();
app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(rateLimiterMemoryMiddleware);
app.use(helmet());
app.use(hpp());
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:8081',
    'http://localhost:3001',
    'http://localhost:3000',
  ],
  credentials: true,
}));

app.use('/api/pages', pages);
app.use('/api/omnichannel/reference_book', omnichannelReferenceBook);
app.use('/api/omnichannel/customer', omnichannelCustomer);
app.use('/api/omnichannel/case', omnichannelCase);
app.use('/api/omnichannel/ticket', omnichannelTicket);
app.use('/api/omnichannel/signal', omnichannelSignal);
app.use('/api/omnichannel/socket', omnichannelSocket);

// const posts = [
//   {
//     kek: 'vorobek',
//   },
// ];

// app.get('/posts', (req, res) => {
//   res.json(posts);
// });


module.exports = app;
