class AuthService {
  constructor() {}

  // Simula retorno de um usuário válido
  async getUser(token) {
      if (!token) throw new Error('Token inválido');

      // Usuário estático simulado
      return { id: 1, username: 'usuario_teste', token };
  }
}

module.exports = AuthService;


/* const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');

const SECRET_KEY = process.env.SECRET_KEY || 'sua-chave-secreta';

class AuthService {
  constructor() {
    this.users = [
      { id: 1, username: 'usuario', password: bcrypt.hashSync('senha123', 10), twoFactorSecret: null },
    ];
  }

  authenticateUser(username, password) {
    const user = this.users.find((u) => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '15m' });
    return { token, userId: user.id };
  }

  setupTwoFactor(userId) {
    const user = this.users.find((u) => u.id === userId);
    if (!user) throw new Error('Usuário não encontrado');

    const secret = speakeasy.generateSecret({ length: 20 });
    user.twoFactorSecret = secret.base32;

    return { secret: secret.base32, otpauth_url: secret.otpauth_url };
  }

  verifyTwoFactor(userId, token) {
    const user = this.users.find((u) => u.id === userId);
    if (!user || !user.twoFactorSecret) throw new Error('2FA não configurado');

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 1,
    });

    if (!verified) throw new Error('Token inválido ou expirado');

    return true;
  }
}

module.exports = AuthService; // Agora exporta como classe
 */