const Card = require('../models/card');

const getCards = (req, res) => {
    return Card.find({})
        .then(cards => res.status(200).send(cards))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

const createCard = (req, res) => {
    const { name, link } = req.body;
    const userId = req.user._id;
    Card.create({ name, link, owner: userId })
        .then(card => res.status(200).send({ data: card }))
        .catch(err => {
            if (err.name === "ValidationError") {
                res.status(400).send({ message: 'Поля неверно заполнены' })

            } else {
                res.status(500).send({ message: 'Что-то пошло не так' })
            }
        });

}

const deleteCard = (req, res) => {
    const id = req.params.cardid;
    Card.findByIdAndRemove(id)
        .orFail(new Error("NotValidId"))
        .then(card => res.send({ data: card }))
        .catch(err => {
            if (err.name === "CastError") {
                res.status(400).send({ message: 'Некорректный id' })
                return
            };
            if (err.message === "NotValidId") {
                res.status(404).send({ message: 'Несуществующий в БД id карточки' })
            } else {
                res.status(500).send({ message: 'Что-то пошло не так' })
            }
        });
}

const likeCard = (req, res) => {
    const id = req.params.cardid;
    Card.findByIdAndUpdate(
        id,
        { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
        { new: true },
    )
        .orFail(new Error("NotValidId"))
        .then(card => res.send({ data: card }))
        .catch(err => {
            if (err.name === "CastError") {
                res.status(400).send({ message: 'Некорректный id' })
                return
            };
            if (err.message === "NotValidId") {
                res.status(404).send({ message: 'Несуществующий в БД id карточки' })
            } else {
                res.status(500).send({ message: 'Что-то пошло не так' })
            }
        });
}

const dislikeCard = (req, res) => {
    const id = req.params.cardid;
    console.log(id)
    Card.findByIdAndUpdate(
        id,
        { $pull: { likes: req.user._id } }, // убрать _id из массива
        { new: true },
    )
        .orFail(new Error("NotValidId"))
        .then(card => res.send({ data: card }))
        .catch(err => {
            if (err.name === "CastError") {
                res.status(400).send({ message: 'Некорректный id' })
                return
            };
            if (err.message === "NotValidId") {
                res.status(404).send({ message: 'Несуществующий в БД id карточки' })
            } else {
                console.log(err.message)
                res.status(500).send({ message: 'Что-то пошло не так' })

            }
        });
}

module.exports = {
    getCards,
    createCard,
    deleteCard,
    likeCard,
    dislikeCard
}