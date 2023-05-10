const Card = require('../models/card');

const getCards = (req, res) => {
    console.log('Карты на месте')

    return Card.find({})
        .then(cards => res.status(200).send(cards))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

const createCard = (req, res) => {
    console.log(req.user._id); // _id станет доступен
    const { name, link } = req.body;
    Card.create({ name, link })
        .then(users => res.status(200).send(req.body))
        .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}

const deleteCard = (req, res) => {
    Card.findByIdAndRemove(req.params.id)
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