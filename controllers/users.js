const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const getUsers = (req, res) => {
    User.find().then(users => {
        res.send({ data: users })
    })
        .catch(err => res.status(500).send({ message: 'На сервере произошла ошибка' }))
}

const getCurrentUser = (req, res) => {
    const id = req.user._id;
    User.findById(id)
        .then((user) => {
            console.log(id)
            res.status(200).send({ data: user })
        })
        .catch((err) => res.status(500).send({ message: ' ошибка' }))
};

const getUserById = (req, res) => {
    console.log(req.params)
    const { id } = req.params;
    User.findById(id)
        .orFail(new Error("NotValidId"))
        .then((user) => {
            res.status(200).send({ data: user })
        })
        .catch((err) => {
            if (err.name === "CastError") {
                res.status(400).send({ message: 'Некорректный id' })
                return
            };
            if (err.message === "NotValidId") {
                res.status(404).send({ message: 'Пользователь не найден' })
            } else {
                res.status(500).send({ message: 'На сервере произошла ошибка' })
            }
        })
}


const createUser = (req, res) => {
    const { name, about, avatar, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => User.create({ name, about, avatar, email, password: hash }))
        .then(user => res.status(200).send({
            _id: user._id,
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
        }))
        .catch((err) => {
            if (err.code === 11000) {
                res.status(409).send({ message: 'Пользователь с таким email уже существует' })
                return
            }
            if (err.message = "ValidationError") {
                res.status(400).send({ message: 'Поля неверно заполнены' })
            } else {
                res.status(500).send({ message: 'На сервере произошла ошибка' });
            }
        })
}

const updateUser = (req, res) => {
    const { name, about } = req.body;
    User.findByIdAndUpdate(req.user._id, { name, about },
        {
            new: true,
            runValidators: true,
            upsert: true
        }
    )
        .then(user => res.send({ data: user }))
        .catch((err) => {
            if (err.name === "ValidationError") {
                res.status(400).send({ message: 'Поля неверно заполнены' })
            } else {
                res.status(500).send({ message: 'На сервере произошла ошибка' });
            }
        })
}

const updateAvatar = (req, res) => {
    const { avatar } = req.body;
    User.findByIdAndUpdate(req.user._id, { avatar },
        {
            new: true,
            runValidators: true,
            upsert: true
        }
    )
        .then(user => res.send({ data: user }))
        .catch(err => res.status(500).send({ message: "На сервере произошла ошибка" }));
}

const login = (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password })
    User.findUserByCredentials(email, password)
        .then((user) => {
            const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
            res.cookie('token', token, { httpOnly: true });
            res.send({ token });
        })
        .catch(err => res.status(401).send({ message: "Произошла ошибка" }))
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    updateAvatar,
    getCurrentUser,
    login
}