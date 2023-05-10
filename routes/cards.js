const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards')

const router = require('express').Router();

router.get('/', getCards);

router.delete('/:cardid', deleteCard);

router.post('/', createCard)

router.put('/:cardid/likes', likeCard);

router.delete('/:cardid/likes', dislikeCard);

module.exports = router;