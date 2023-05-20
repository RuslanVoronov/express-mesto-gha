const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const routes = require('./routes');
const auth = require('./middlewares/auth.js')
const {login, createUser} = require('./controllers/users')

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mesto');

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParse.json())
app.use((req, res, next) => {
    req.user = {
        _id: '6459a57c993e0ee47b75a9f2' // вставьте сюда _id созданного в предыдущем пункте пользователя
    };
    next();
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(routes);

app.listen(PORT, () => {
    console.log(`Ваш сервер был запущен на порту : ${PORT}`);
})