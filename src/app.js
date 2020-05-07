const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');

require('dotenv').config({ path: './src/config/dev_local.env' });
// const login = require('./apis/login.js');
const pages = require('./apis/pages.js');


const app = express();
app.use(express.json({ extended: false }));
app.use(helmet());
app.use(hpp());
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:8081',
  ],
  credentials: true,
}));

// app.use('/api/login', login);
app.use('/api/pages', pages);

// const posts = [
//   {
//     kek: 'vorobek',
//   },
// ];

// app.get('/posts', (req, res) => {
//   res.json(posts);
// });


module.exports = app;
