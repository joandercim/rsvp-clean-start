const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT;

const connectToDB = require('./config/db');
const guestsRouter = require('./routes/router');

connectToDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/posts', guestsRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
