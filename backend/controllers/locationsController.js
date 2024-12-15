const db = require('../../database/db');

const getAllLocations = (req, res) => {
    const query = 'SELECT * FROM locations';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar localizações:', err);
            return res.status(500).send('Erro ao buscar localizações');
        }
        res.status(200).send(results.map(location => ({
            ...location,
            tags: JSON.parse(location.tags || '[]')
        })));
    });
};

const getLocationById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM locations WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar localização:', err);
            return res.status(500).send('Erro ao buscar localização');
        }
        if (results.length === 0) return res.status(404).send('Localização não encontrada');
        const location = results[0];
        location.tags = JSON.parse(location.tags || '[]');
        res.status(200).send(location);
    });
};

const createLocations = (req, res) => {
    const locations = req.body;
    if (!Array.isArray(locations)) {
        return res.status(400).send({ error: "O corpo da requisição deve ser um array de localizações." });
    }
    const query = `INSERT INTO locations (lat, lng, name, region, country, description, type, category, icon, image, 
                                          population, area, density, address, website, status, lastUpdated, tags, rating) 
                  VALUES ?`;

    const values = locations.map(location => [
        location.lat,
        location.lng,
        location.name,
        location.region,
        location.country,
        location.description,
        location.type,
        location.category,
        location.icon,
        location.image,
        location.population,
        location.area,
        location.density,
        location.address,
        location.website,
        location.status,
        location.lastUpdated || null,
        JSON.stringify(location.tags),
        location.rating
    ]);

    db.query(query, [values], (err, result) => {
        if (err) {
            console.error('Erro ao inserir localizações:', err);
            return res.status(500).send('Erro ao inserir localizações');
        }
        res.status(201).send({
            message: `${result.affectedRows} localizações inseridas com sucesso`,
            insertedIds: result.insertId
        });
    });
};

const updateLocation = (req, res) => {
    const { id } = req.params;
    const { lat, lng, name, region, country, description, type, category, icon, image,
            population, area, density, address, website, status, lastUpdated, tags, rating } = req.body;

    const query = `UPDATE locations SET lat = ?, lng = ?, name = ?, region = ?, country = ?, description = ?, type = ?, 
                  category = ?, icon = ?, image = ?, population = ?, area = ?, density = ?, address = ?, website = ?, 
                  status = ?, lastUpdated = ?, tags = ?, rating = ? WHERE id = ?`;

    db.query(query, [lat, lng, name, region, country, description, type, category, icon, image,
                     population, area, density, address, website, status, lastUpdated, JSON.stringify(tags), rating, id], 
        (err, result) => {
        if (err) {
            console.error('Erro ao atualizar localização:', err);
            return res.status(500).send('Erro ao atualizar localização');
        }
        if (result.affectedRows === 0) return res.status(404).send('Localização não encontrada');
        res.status(200).send(req.body);
    });
};

const deleteLocation = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM locations WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erro ao deletar localização:', err);
            return res.status(500).send('Erro ao deletar localização');
        }
        if (result.affectedRows === 0) return res.status(404).send('Localização não encontrada');
        res.status(200).send('Localização deletada com sucesso');
    });
};


const getLocationsByFilter = (req, res) => {
    const { country, region, city } = req.query;

    let query = 'SELECT * FROM locations WHERE 1=1';
    const params = [];

    if (country) {
        query += ' AND LOWER(country) = LOWER(?)';
        params.push(country);
    }

    if (region) {
        query += ' AND LOWER(region) = LOWER(?)';
        params.push(region);
    }

    if (city) {
        query += ' AND LOWER(name) = LOWER(?)';
        params.push(city);
    }

    console.log('Query:', query);
    console.log('Params:', params);

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Erro ao buscar localizações:', err);
            return res.status(500).send('Erro ao buscar localizações');
        }

        if (results.length === 0) {
            return res.status(404).send({ message: 'Nenhuma localização encontrada', query, params });
        }

        res.status(200).send(results.map(location => ({
            ...location,
            tags: JSON.parse(location.tags || '[]'),
        })));
    });
};

const getLocationsByCriteria = (req, res) => {
    const { type, value } = req.query;

    console.log('Type:', type); 
    console.log('Value:', value); 

    if (!type || !value) {
        return res.status(400).send({
            message: "Os parâmetros 'type' e 'value' são obrigatórios. Exemplo: ?type=country&value=United Kingdom"
        });
    }

    const validTypes = {
        continent: 'continent',
        country: 'country',
        region: 'region',
        city: 'name',
        other: 'type',
    };

    const column = validTypes[type.toLowerCase()];

    console.log('Column:', column); // Log para depuração

    if (!column) {
        return res.status(400).send({
            message: `O tipo fornecido '${type}' não é válido. Tipos válidos: ${Object.keys(validTypes).join(', ')}`
        });
    }

    const query = `SELECT * FROM locations WHERE LOWER(${column}) = LOWER(?)`;
    const params = [value];

    console.log('Generated Query:', query); // Log para depuração
    console.log('Parameters:', params);    // Log para depuração

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Erro ao buscar localizações:', err);
            return res.status(500).send('Erro ao buscar localizações');
        }

        if (results.length === 0) {
            console.log('Nenhuma localização encontrada:', { type, value });
            return res.status(404).send({ message: 'Nenhuma localização encontrada', type, value });
        }

        res.status(200).send(results.map(location => ({
            ...location,
            tags: JSON.parse(location.tags || '[]'),
        })));
    });
};

module.exports = {
    getAllLocations,
    getLocationById,
    createLocations,
    updateLocation,
    deleteLocation,
    getLocationsByFilter,     
    getLocationsByCriteria,
};