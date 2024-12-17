const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'sua-chave-secreta'; // Use variável de ambiente em produção

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verifica e decodifica o token
    req.user = decoded; // Adiciona as informações do usuário decodificado à requisição
    next(); // Prossegue para a próxima etapa
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};

module.exports = authenticateJWT;