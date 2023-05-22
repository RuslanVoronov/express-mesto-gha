const { getUsers, getUserById, updateUser, updateAvatar, getCurrentUser, login } = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');


const router = require('express').Router();

router.get('/', getUsers);

router.patch('/me', celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
    })
}), updateUser);

router.get('/me', getCurrentUser);

router.get('/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.string().hex().length(24),
    })
}), getUserById);

router.patch('/me/avatar', celebrate({
    body: Joi.object().keys({
        avatar: Joi.string().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/)
    })
}), updateAvatar)
router.use(errors())

module.exports = router;