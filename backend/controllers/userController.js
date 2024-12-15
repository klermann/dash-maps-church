const db = require('../../database/db'); // Ajuste conforme necessário
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'sua-chave-secreta'; // Substitua por uma variável de ambiente em produção


// Função para registrar usuário
exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios' });
  }

  try {
    // Hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, results) => {
      if (err) {
        console.error('Erro ao registrar usuário:', err.message);
        return res.status(500).json({ message: 'Erro ao registrar usuário', error: err.message });
      }

      res.status(201).json({
        message: 'Usuário registrado com sucesso',
        userId: results.insertId,
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar registro', error: error.message });
  }
};

// Função para login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios' });
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error('Erro ao fazer login:', err);
      return res.status(500).json({ message: 'Erro ao fazer login' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const user = results[0];

    // Verificar senha com bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: '1h', // Token expira em 1 hora
    });

    // Retornar resposta com token
    res.status(200).json({
      message: 'Login efetuado com sucesso!',
      token: token,
    });
  });
};