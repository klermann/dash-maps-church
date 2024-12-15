const jwt = require('jsonwebtoken');
const SECRET_KEY = 'sua-chave-secreta';

function authenticateJWT(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).send('Token não fornecido');
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).send('Token inválido');
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateJWT;
