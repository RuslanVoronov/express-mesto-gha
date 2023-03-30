const User = require('../models/user')

const getUsers = (req, res) => {
    return User.find({})
        .then(users => res.status(200).send(users));
}

const getUserById = (req, res) => {
    const { id } = req.params;
    return User.findById(id)
        .then(users => res.status(200).send(users))
}

const createUser = () => {
    User.create({ ...req.body })
        .then(users => res.status(200).send(req.body))

}

module.exports = {
    getUsers,
    getUserById,
    createUser
}