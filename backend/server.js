const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const securityHeaders = require('./middlewares/securityHeaders');

const app = express();
const port = 4000;

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
const frontendPath = path.join(__dirname, '../frontend/public');
app.use(express.static(frontendPath));

// Rota inicial - renderiza index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Middleware de fallback para servir login.html se acessar diretamente
app.get('/login', (req, res) => {
  res.sendFile(path.join(frontendPath, 'login.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(frontendPath, 'dashboard.html'));
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