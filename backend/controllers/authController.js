// Importar módulos necessários
const express = require('express');
const bcrypt = require('bcrypt'); // Para comparar senhas com hash
const jwt = require('jsonwebtoken'); // Para gerar tokens JWT
const router = express.Router();

// Mock de banco de dados (substitua pelo seu banco real)
const users = [
    { username: 'admin', password: '$2b$10$KIXt0rjOkp3/hUXKxsYSAuEaqXmopEFz9ynOwOeEyFSqblJwKf3DO' } // Senha: admin123
];

// Chave secreta do JWT
const SECRET_KEY = 'sua-chave-secreta-aqui';

// Endpoint de login
router.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Procurar usuário no banco de dados
        const user = users.find(user => user.username === username);
        if (!user) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }

        // Comparar senha fornecida com a do banco (hash)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }

        // Gerar token JWT
        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        // Retornar sucesso com o token
        res.json({ message: 'Login bem-sucedido', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
    }
});

module.exports = router;