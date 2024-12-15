const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'localizations_db'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');

    // Teste inicial para garantir que o banco está funcionando
    db.query('SELECT 1', (err) => {
        if (err) {
            console.error('Erro ao testar o banco de dados:', err);
        } else {
            console.log('Teste de banco de dados bem-sucedido.');
        }
    });
});

module.exports = db;
