document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken'); // Recupera o token JWT do localStorage

    if (!token) {
        alert('Você precisa fazer login primeiro.');
        window.location.href = '/login';
    } else {
        fetchLocations(token);
    }
});

// Faz a requisição para buscar localizações
async function fetchLocations(token) {
    try {
        const response = await fetch('http://localhost:3000/api/locations', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Envia o token no cabeçalho
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro ao carregar localizações. Status: ${response.status}`);
        }

        const locations = await response.json();
        console.log('Localizações carregadas:', locations); // Log para depuração
        renderLocations(locations);
    } catch (error) {
        console.error('Erro:', error.message);
        alert('Erro ao carregar as localizações. Por favor, tente novamente.');
        window.location.href = '/login';
    }
}

// Renderiza as localizações no HTML
function renderLocations(locations) {
    const ul = document.getElementById('locations');
    if (ul) {
        ul.innerHTML = ''; // Limpa o conteúdo anterior
        if (!locations || locations.length === 0) {
            ul.textContent = 'Nenhuma localização encontrada.';
        } else {
            locations.forEach(location => {
                const li = document.createElement('li');
                li.textContent = `${location.name} - (${location.lat}, ${location.lng})`;
                ul.appendChild(li);
            });
        }
    }
}
