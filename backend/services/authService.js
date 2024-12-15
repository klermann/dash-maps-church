const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');

const SECRET_KEY = 'sua-chave-secreta';

const users = [
  { id: 1, username: 'usuario', password: bcrypt.hashSync('senha123', 10), twoFactorSecret: null },
];

function authenticateUser(username, password) {
  const user = users.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error('Credenciais inválidas');
  }
  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '15m' });
  return { token, userId: user.id };
}

function setupTwoFactor(userId) {
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error('Usuário não encontrado');

  const secret = speakeasy.generateSecret();
  user.twoFactorSecret = secret.base32;

  return { secret: secret.base32, otpauth_url: secret.otpauth_url };
}

function verifyTwoFactor(userId, token) {
  const user = users.find((u) => u.id === userId);
  if (!user || !user.twoFactorSecret) throw new Error('2FA não configurado');

  return speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: 'base32',
    token,
  });
}

module.exports = { authenticateUser, setupTwoFactor, verifyTwoFactor };
