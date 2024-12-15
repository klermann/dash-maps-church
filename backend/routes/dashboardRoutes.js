const express = require('express');
const DashboardController = require('../controllers/DashboardController');
const LocationService = require('../services/LocationService');
const AuthService = require('../services/authService');

const LocationRepository = require('../repositories/LocationRepository');
const UserRepository = require('../repositories/UserRepository');

const db = require('../../database/db'); // Caminho corrigido para o arquivo db.js
const router = express.Router();

// Instâncias de serviços e repositórios
const locationRepository = new LocationRepository(db);
const userRepository = new UserRepository(db);
const locationService = new LocationService(locationRepository);
const authService = new AuthService(userRepository);
const dashboardController = new DashboardController(locationService, authService);

// Rotas do painel de controle
router.get('/dashboard', (req, res, next) => {
    req.session.token = 'token-teste'; // Token fixo para simular a autenticação
    next();
}, dashboardController.renderDashboard.bind(dashboardController));
router.post('/dashboard/locations', dashboardController.addLocation.bind(dashboardController));

// Rota de teste
router.get('/test', (req, res) => res.send('Rota funcionando!'));

module.exports = router;
