const path = require('path');
const express = require('express');
const authenticateJWT = require('../middlewares/authMiddleware');
const router = express.Router();

// Servir o HTML do dashboard
router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/dashboard.html'));
});

// Rota protegida para dados do dashboard
router.get('/api/locations', authenticateJWT, async (req, res) => {
    try {
        const locations = await locationService.getAllLocations();
        console.log('Localizações enviadas pelo backend:', locations); // Log para depuração
        res.json(locations);
    } catch (err) {
        console.error('Erro ao buscar localizações:', err.message);
        res.status(500).json({ message: 'Erro ao buscar localizações.' });
    }
});

module.exports = router;