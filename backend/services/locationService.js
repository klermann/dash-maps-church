// Arquivo: services/LocationService.js
class LocationService {
    constructor(locationRepository) {
        this.locationRepository = locationRepository;
    }

    /*async getAllLocations() {
        return this.locationRepository.findAll();
    }*/

    async addLocation(locationData) {
        return this.locationRepository.create(locationData);
    }

    async getAllLocations() {
        return await this.locationRepository.getAllLocations();
    }
}

module.exports = LocationService;