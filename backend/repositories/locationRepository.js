class LocationRepository {
    constructor(db) {
        this.db = db;
    }

    async findAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM locations';
            this.db.query(query, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    async create(locationData) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO locations SET ?';
            this.db.query(query, locationData, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
}

module.exports = LocationRepository;
