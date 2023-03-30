const { getCards, likeCard, dislikeCard } = require('../controllers/cards')

const router = require('express').Router();

router.get('/', getCards);

router.delete('/:cardid',);

router.post('/',)

router.put('/:cardid/likes', likeCard);

router.delete('/:cardid/likes', dislikeCard);

module.exports = router;