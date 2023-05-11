const User = require('../models/user')
// const users = require('../user-db.json')

const getUsers = (req, res) => {
    User.find().then(users => {
        res.send({ data: users })
    })
        .catch(err => res.status(500).send({ message: 'Что-то пошло не так' }))
}

const getUserById = (req, res) => {
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
                res.status(500).send({ message: 'Что-то пошло не так' })
            }
        })
}


const createUser = (req, res) => {
    const { name, about, avatar } = req.body;
    User.create({ name, about, avatar })
        .then(user => res.status(200).send({ data: user }))

        .catch((err) => {
            if (err.message = "ValidationError") {
                res.status(400).send({ message: 'Поля неверно заполнены' })
            } else {
                res.status(500).send({ message: 'Произошла ошибка' });
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
                // }
                // if (err.message === "NotValidId") {
                //     res.status(404).send({ message: 'Пользователь не найден' })
            } else {
                res.status(500).send({ message: 'Произошла ошибка' });
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
        .catch(err => res.status(500).send({ message: "Данные не прошли валидацию. Либо произошло что-то совсем немыслимое" }));
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    updateAvatar
}