const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParse = require('body-parse')
const routes = require('./routes')
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParse.json())
app.use((req, res, next) => {
    req.user = {
        _id: '642376ff002f8d57f9a9484f' // вставьте сюда _id созданного в предыдущем пункте пользователя
    };

    next();
});
app.use(routes);

app.listen(PORT, () => {
    console.log('Privet))');
})