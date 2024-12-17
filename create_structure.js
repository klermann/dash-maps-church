const fs = require('fs');
const path = require('path');

// Função para criar pastas e arquivos
function createStructure(baseDir, structure) {
    for (const key in structure) {
        const fullPath = path.join(baseDir, key);

        if (typeof structure[key] === 'object') {
            // É uma pasta, então cria a pasta e chama recursivamente
            fs.mkdirSync(fullPath, { recursive: true });
            createStructure(fullPath, structure[key]);
        } else {
            // É um arquivo, então cria o arquivo
            fs.writeFileSync(fullPath, structure[key], 'utf8');
        }
    }
}

// Estrutura de pastas e arquivos
const projectStructure = {
    'frontend': {
        'index.html': '<!-- Arquivo HTML principal -->',
        'js': {
            'main.js': '// Script principal (lógica geral)',
            'dashboard.js': '// Lógica e interações do Dashboard',
            'auth.js': '// Autenticação e controle de sessões',
            'charts.js': '// Configuração e manipulação dos gráficos Chart.js',
            'cookies.js': '// Gerenciamento de cookies',
            'dark_mode.js': '// Script para alternar entre temas claro e escuro'
        },
        'css': {
            'styles.css': '/* Estilização customizada */',
            'dark_mode.css': '/* Tema escuro */',
            'plugins': {
                'tooltipster.css': '/* CSS do plugin Tooltipster */'
            }
        },
        'vendor': {
            'jquery': {},
            'bootstrap': {},
            'chartjs': {},
            'tooltipster': {}
        },
        'assets': {
            'images': {
                'logo.png': ''
            },
            'favicons': {
                'favicon.ico': ''
            }
        }
    }
};

// Diretório de base
const baseDir = process.cwd();

// Cria a estrutura
createStructure(baseDir, projectStructure);

console.log('Estrutura de pastas e arquivos criada com sucesso!');
