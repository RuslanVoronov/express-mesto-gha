const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
  }),
}), createUser);
router.use(cookieParser());

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use((req, res, next) => {
  next(new NotFoundError('Что-то пошло не так'));
});

module.exports = router;
