const { getUsers, getUserById, updateUser, updateAvatar, getCurrentUser, login } = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

router.get('/', getUsers);

router.patch('/me', updateUser);

router.get('/me', getCurrentUser);

router.get('/:id', getUserById);

router.patch('/me/avatar', updateAvatar)

module.exports = router;