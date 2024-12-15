const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swaggerConfig');
const securityHeaders = require('./middlewares/securityHeaders');
const locationRoutes = require('./routes/locationsRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

app.use(express.json());
// Configuração do EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configuração do express-session
app.use(session({
  secret: process.env.SESSION_SECRET || 'chave-secreta', // Use variável de ambiente para segurança
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Ajuste para "true" em produção com HTTPS
}));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Permite o cabeçalho Authorization
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Adiciona suporte para formulários HTML
app.use(securityHeaders);

// Diretório estático configurado
const frontendPath = path.join(__dirname, '../frontend/public');
app.use(express.static(frontendPath));

// Rotas do Swagger e API
app.use('/', dashboardRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);



// Rota inicial - renderiza index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Middleware de fallback para servir login.html se acessar diretamente
app.get('/login', (req, res) => {
  res.sendFile(path.join(frontendPath, 'login.html'));
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
  console.log(`Swagger disponível em: http://localhost:${port}/api-docs`);
});