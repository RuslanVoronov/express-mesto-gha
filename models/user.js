const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        default: 'Жак-Ив Кусто',
        validate: {
            validator: ({ length }) => length >= 2 && length <= 30,
            message: 'Имя пользователя должно быть длиной от 2 до 30 символов',
        },
    },
    about: {
        type: String,
        minlength: 2,
        maxlength: 30,
        default: 'Исследователь',
        validate: {
            validator: ({ length }) => length >= 2 && length <= 30,
            message: 'Имя пользователя должно быть длиной от 2 до 30 символов',
        },
    },
    avatar: {
        type: String,
        default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
        validate: {
            validator: (email) => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(email),
            message: 'Требуется ссылка на изображение',
        },
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: (email) => /.+@.+\..+/.test(email),
            message: 'Требуется ввести электронный адрес',
        },
    },
    password: {
        type: String,
        require: true
    }
});
module.exports = mongoose.model('user', userSchema);