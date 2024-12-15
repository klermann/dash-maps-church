const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticateUser, setupTwoFactor, verifyTwoFactor } = require('../services/authService');

const router = express.Router();
const SECRET_KEY = 'sua-chave-secreta';

// Middleware para validar JWT e obter userId
function authenticateJWT(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });

    req.userId = user.userId; // Adiciona userId no request
    next();
  });
}

// Rota de login
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "usuario"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna token JWT
 */
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    const result = authenticateUser(username, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// Rota para configurar 2FA (protegida)
router.post('/2fa/setup', authenticateJWT, (req, res) => {
  try {
    const result = setupTwoFactor(req.userId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para verificar o 2FA (protegida)
router.post('/2fa/verify', authenticateJWT, (req, res) => {
  try {
    const { token } = req.body;
    const isValid = verifyTwoFactor(req.userId, token);
    if (!isValid) throw new Error('Código 2FA inválido');

    res.json({ message: '2FA verificado com sucesso' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
