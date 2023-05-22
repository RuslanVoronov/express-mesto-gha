const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const routes = require('./routes');
const auth = require('./middlewares/auth.js')
const { createUser, login } = require('./controllers/users')
const { celebrate } = require('celebrate');
const Joi = require('joi');
const { PORT = 3000 } = process.env;
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

mongoose.connect('mongodb://127.0.0.1:27017/mesto');

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParse.json())
// app.use((req, res, next) => {
//     req.user = {
//         _id: '6459a57c993e0ee47b75a9f2' // вставьте сюда _id созданного в предыдущем пункте пользователя
//     };
//     next();
// });

app.post('/signin', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string()
    })
}), login);
app.post('/signup', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/)
    })
}), createUser);
app.use(errors())
app.use(cookieParser());
app.use(auth);

app.use(routes);

app.listen(PORT, () => {
    console.log(`Ваш сервер был запущен на порту : ${PORT}`);
})