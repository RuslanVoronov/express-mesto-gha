const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards')
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const router = require('express').Router();

router.get('/', getCards);

router.delete('/:cardid', deleteCard);

router.post('/', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        link: Joi.string().required().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
    })
}), createCard)

router.put('/:cardid/likes', likeCard);

router.delete('/:cardid/likes', dislikeCard);
router.use(errors())

module.exports = router;