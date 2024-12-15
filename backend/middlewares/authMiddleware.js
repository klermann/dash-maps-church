const jwt = require('jsonwebtoken');
const SECRET_KEY = 'sua-chave-secreta';

function authenticateJWT(req, res, next) {
    console.log('Cabeçalhos recebidos no backend:', req.headers);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log('Nenhum token recebido'); // Log específico
        return res.status(403).json({ message: 'Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token recebido no backend:', token); // Log do token recebido

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.log('Erro ao verificar token:', err.message);
            return res.status(403).json({ message: 'Token inválido.' });
        }

        console.log('Token validado com sucesso, usuário:', user);
        req.user = user; // Armazena os dados do token decodificado no objeto req
        next();
    });
}

module.exports = authenticateJWT;
