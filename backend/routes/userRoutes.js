// backend/routes/userRoutes.js
const express = require('express');
const UserController = require('../controllers/userController'); // Importa o controlador

const router = express.Router();

// Rotas
router.post('/register', UserController.register); // Aponta para a função correta
router.post('/login', UserController.login);       // Aponta para a função correta

module.exports = router;
