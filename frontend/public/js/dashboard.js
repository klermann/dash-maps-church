class AuthService {
  static getToken() {
    return localStorage.getItem('authToken');
  }

  static redirectIfUnauthorized() {
    const token = this.getToken();
    if (!token) {
      alert('Você precisa fazer login primeiro.');
      window.location.href = '/login';
    }
    return token;
  }
}

class ApiService {
  static async fetchData(url, token) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao carregar dados. Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error.message);
      throw error;
    }
  }

  static async postData(url, token, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar dados. Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error.message);
      throw error;
    }
  }
}

class DashboardRenderer {
  static renderLocations(locations) {
    const ul = document.getElementById('locations');
    ul.innerHTML = ''; // Limpa o conteúdo anterior
    if (!locations || locations.length === 0) {
      ul.textContent = 'Nenhuma localização encontrada.';
    } else {
      locations.forEach((location) => {
        const li = document.createElement('li');
        li.textContent = `${location.name} - (${location.lat}, ${location.lng})`;
        ul.appendChild(li);
      });
    }
  }
}

const handleAddLocation = async (event) => {
  event.preventDefault();

  const token = AuthService.getToken();
  const name = document.getElementById('name').value;
  const latitude = document.getElementById('latitude').value;
  const longitude = document.getElementById('longitude').value;

  const newLocation = { name, latitude, longitude };

  try {
    const response = await ApiService.postData('http://localhost:3000/api/locations', token, newLocation);
    alert(response.message);

    // Recarrega as localizações após adicionar
    initDashboard();
  } catch (error) {
    alert('Erro ao adicionar localização. Tente novamente.');
  }
};

const initDashboard = async () => {
  const token = AuthService.redirectIfUnauthorized();
  if (!token) return;

  try {
    const locations = await ApiService.fetchData('http://localhost:3000/api/locations', token);
    DashboardRenderer.renderLocations(locations);
  } catch (error) {
    alert('Erro ao carregar as localizações. Por favor, tente novamente.');
    window.location.href = '/login';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
  document.getElementById('addLocationForm').addEventListener('submit', handleAddLocation);
});
