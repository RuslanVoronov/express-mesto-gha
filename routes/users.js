const { getUsers, getUserById, createUser } = require('../controllers/users')

const router = require('express').Router();

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', createUser)

router.patch('/me', createUser)

router.patch('/me/avatar', createUser)

module.exports = router;