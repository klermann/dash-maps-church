class DashboardController {
    constructor(locationService, authService) {
        this.locationService = locationService;
        this.authService = authService;
    }

    async renderDashboard(req, res) {
        try {
            const token = req.session.token || 'token-teste';
            const user = await this.authService.getUser(token);
            const locations = await this.locationService.getAllLocations();

            res.render('dashboard', { user, locations });
        } catch (error) {
            console.error("Erro ao carregar o painel de controle:", error.message);
            res.status(500).send('Erro ao carregar o painel de controle.');
        }
    }

    async addLocation(req, res) {
        try {
            const { name, latitude, longitude } = req.body;
            await this.locationService.addLocation({ name, latitude, longitude });
            res.redirect('/dashboard');
        } catch (error) {
            res.status(400).send('Erro ao adicionar a localização.');
        }
    }

    
    async getLocations(req, res) {
        try {
            const locations = await this.locationService.getAllLocations();
            res.json({ locations });
        } catch (err) {
            console.error('Erro ao buscar localizações:', err.message);
            res.status(500).json({ message: 'Erro ao buscar localizações.' });
        }
    }
}

module.exports = DashboardController;
