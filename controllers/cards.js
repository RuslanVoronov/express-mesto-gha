const Card = require('../models/card');

const getCards = (req, res) => {
    return User.find({})
        .then(users => res.status(200).send(users));
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
    likeCard,
    dislikeCard
}