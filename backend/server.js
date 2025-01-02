const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const securityHeaders = require('./middlewares/securityHeaders');
const authenticateJWT = require('./middlewares/authMiddleware');
const helmet = require('helmet');

const app = express();
const port = 4000;

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' https://*.tile.openstreetmap.org https://unpkg.com https://via.placeholder.com https://maps.gstatic.com https://maps.googleapis.com data:; script-src 'self' https://maps.googleapis.com");
  next();
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'chave-secreta', // Use uma chave segura em produção
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS em produção
    httpOnly: true,
    maxAge: 1000 * 60 * 30 // 30 minutos
  }
}));

app.use(express.json());
// Configuração do EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configure o middleware CORS
const corsOptions = {
  origin: 'http://localhost:4000', // Substitua pela URL do seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

// Ativando o CORS com as opções configuradas
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Adiciona suporte para formulários HTML
app.use(securityHeaders);

// Diretório estático configurado
// Configuração do diretório estático
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// Rota inicial
app.get('/', authenticateJWT, (req, res) => {
  res.sendFile(path.join(frontendPath, 'public', 'index.html'));
});

// Rota para login.html
app.get('/login', (req, res) => {
  res.sendFile(path.join(frontendPath, 'dashboard', 'login.html'));
});

// Rota para dashboard.html
app.get('/dashboard', authenticateJWT, (req, res) => {
  res.sendFile(path.join(frontendPath, 'public', 'index.html'));
});

app.use((req, res, next) => {
  console.log('Requisição recebida de:', req.headers.origin);
  next();
});

// Ajustar Content-Type para arquivos JavaScript
app.use((req, res, next) => {
  if (req.path.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

// Middleware de fallback para rotas não encontradas
app.use((req, res) => {
  res.status(404).send('Rota não encontrada.');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}`);
});