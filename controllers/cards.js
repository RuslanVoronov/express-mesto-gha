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
        .then(user => res.send({ data: user }))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

const likeCard = (req, res) => Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
)

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
)

module.exports = {
    getCards,
    createCard,
    deleteCard,
    likeCard,
    dislikeCard
}