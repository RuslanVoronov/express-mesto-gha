const JWT = require('jsonwebtoken')
// const SECRET_KEY = 'SECRET';
// || !authorization.startsWith('Bearer ')
module.exports = (req, res, next) => {
  const authorization = req.cookies.token;
  if (!authorization) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = JWT.verify(authorization, 'some-secret-key');
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next();
};