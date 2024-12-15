const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swaggerConfig');
const securityHeaders = require('./middlewares/securityHeaders');
const locationRoutes = require('./routes/locationsRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3000;

// Middlewares globais
app.use(cors());
app.use(bodyParser.json());
app.use(securityHeaders);

// Servir arquivos estáticos do frontend
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(path.join(frontendPath, 'public')));

// Rotas do Swagger e API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/locations', locationRoutes);
app.use('/auth', authRoutes);

// Rota inicial - renderiza index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
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
