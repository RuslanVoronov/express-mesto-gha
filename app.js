const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mesto');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParse.json());

app.use(routes);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Ваш сервер был запущен на порту : ${PORT}`);
});
