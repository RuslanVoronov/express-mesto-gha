const { getUsers, getUserById, createUser, updateUser, updateAvatar, login } = require('../controllers/users')

const router = require('express').Router();

router.get('/', getUsers);

router.get('/:id', getUserById);

router.patch('/me', updateUser);

router.get('/me',);

router.patch('/me/avatar', updateAvatar)

module.exports = router;