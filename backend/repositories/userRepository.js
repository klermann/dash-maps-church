class UserRepository {
    constructor(db) {
        this.db = db;
    }

    async findByToken(token) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE token = ? LIMIT 1';
            this.db.query(query, [token], (err, results) => {
                if (err) return reject(err);
                resolve(results[0] || null); // Retorna o primeiro usuário ou null se não encontrado
            });
        });
    }
}

module.exports = UserRepository;
