const express = require('express');
const {
    getAllLocations,
    getLocationById,
    createLocations,
    updateLocation,
    deleteLocation,
    getLocationsByFilter,
    getLocationsByCriteria,
} = require('../controllers/locationsController');

const router = express.Router();

router.use((req, res, next) => {
    console.log(`Rota acessada: ${req.path}`);
    next();
});


/**
 * @swagger
 * /api/locations/criteria:
 *   get:
 *     summary: Busca localizações por critério específico
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: O tipo de filtro (continent, country, region, city, other)
 *       - in: query
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *         description: O valor do filtro
 *     responses:
 *       200:
 *         description: Localizações encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *       404:
 *         description: Nenhuma localização encontrada
 */
router.get('/criteria', getLocationsByCriteria);


/**
 * @swagger
 * /api/locations/filter:
 *   get:
 *     summary: Busca localizações por filtro específico (país, estado, cidade)
 *     parameters:
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filtra por país
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: Filtra por estado ou região
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filtra por cidade
 *     responses:
 *       200:
 *         description: Localizações encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *       404:
 *         description: Nenhuma localização encontrada
 */
router.get('/filter', getLocationsByFilter);


/**
 * @swagger
 * /api/locations/{id}:
 *   get:
 *     summary: Busca uma localização por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Localização encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Localização não encontrada
 */
router.get('/:id', getLocationById);


/**
 * @swagger
 * /api/locations/{id}:
 *   put:
 *     summary: Atualiza uma localização existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Localização atualizada com sucesso
 *       404:
 *         description: Localização não encontrada
 */
router.put('/:id', updateLocation);

/**
 * @swagger
 * /api/locations/{id}:
 *   delete:
 *     summary: Deleta uma localização
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Localização deletada com sucesso
 *       404:
 *         description: Localização não encontrada
 */
router.delete('/:id', deleteLocation);

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da localização
 *         lat:
 *           type: number
 *           description: Latitude da localização
 *         lng:
 *           type: number
 *           description: Longitude da localização
 *         name:
 *           type: string
 *           description: Nome da localização
 *         region:
 *           type: string
 *           description: Região da localização
 *         country:
 *           type: string
 *           description: País da localização
 *         description:
 *           type: string
 *           description: Descrição da localização
 *         type:
 *           type: string
 *           description: Tipo da localização
 *         category:
 *           type: string
 *           description: Categoria da localização
 *         icon:
 *           type: string
 *           description: URL do ícone da localização
 *         image:
 *           type: string
 *           description: URL da imagem da localização
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associadas à localização
 */

/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Lista todas as localizações
 *     responses:
 *       200:
 *         description: Lista de localizações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 */
router.get('/', getAllLocations);


/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Cria uma nova localização
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: Localização criada com sucesso
 */
router.post('/', createLocations);
module.exports = router;
