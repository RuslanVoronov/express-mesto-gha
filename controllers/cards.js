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
        .catch(err => res.status(500).send({ message: 'Что-то пошло не так' }));

}

const deleteCard = (req, res) => {

    Card.findByIdAndRemove(req.params.cardid)
        .then(card => res.send({ data: card }))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

const likeCard = (req, res) => {
    Card.findByIdAndUpdate(
        req.params.cardid,
        { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
        { new: true },
    )

        .then(card => res.send({ data: card }))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

const dislikeCard = (req, res) => {
    Card.findByIdAndUpdate(
        req.params.cardid,
        { $pull: { likes: req.user._id } }, // убрать _id из массива
        { new: true },
    )
        .then(card => res.send({ data: card }))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports = {
    getCards,
    createCard,
    deleteCard,
    likeCard,
    dislikeCard
}