const { getUsers, getUserById, createUser, updateUser, updateAvatar } = require('../controllers/users')

const router = require('express').Router();

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', createUser)

router.patch('/me', updateUser)

router.patch('/me/avatar', updateAvatar)

module.exports = router;