const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректный id'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const id = req.params.cardid;
  Card.findByIdAndRemove(id)
    .orFail(new Error('NotValidId'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Удалять можно только свои карточки');
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Некорректный id'));
      }
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Несуществующий в БД id карточки'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  const id = req.params.cardid;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Некорректный id'));
      }
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Несуществующий в БД id карточки'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  const id = req.params.cardid;
  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Некорректный id'));
      }
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Несуществующий в БД id карточки'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
