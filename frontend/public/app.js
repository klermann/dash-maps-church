// Classe para gerenciar o mapa
class MapManager {
  constructor(containerId, centerCoords, zoomLevel) {
    this.map = L.map(containerId).setView(centerCoords, zoomLevel);
    this.clusterGroup = L.markerClusterGroup();
    this.initTileLayer();
  }

  initTileLayer() {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);
  }

  createMarker(location) {
    return L.marker([location.lat, location.lng], { title: location.name })
      .bindPopup(this.createPopupContent(location));
  }

  createPopupContent(location) {
    return `
      <h3>${location.name}</h3>
      <p><b>Descrição:</b> ${location.description}</p>
      <p><b>População:</b> ${location.population}</p>
      <p><b>Área:</b> ${location.area} km²</p>
      <p><b>Densidade:</b> ${location.density} hab/km²</p>
      <p><b>Tags:</b> ${location.tags?.join(', ') || 'N/A'}</p>
      <p><b>Website:</b> <a href="${location.website}" target="_blank">${location.website}</a></p>
      <img src="${location.image}" alt="${location.name}" style="width:100%;max-width:200px;">
    `;
  }

  addMarkers(locations) {
    locations.forEach((location) => {
      const marker = this.createMarker(location);
      this.clusterGroup.addLayer(marker);
    });
    this.map.addLayer(this.clusterGroup);
  }
}

// Classe para consumir a API
class ApiService {
  static async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Erro ao carregar os dados do backend:', error);
      throw error;
    }
  }
}

// Função principal para inicializar o mapa
const main = async () => {
  const mapManager = new MapManager('map', [-14.235, -51.9253], 5);

  try {
    const locations = await ApiService.fetchData('http://localhost:3000/api/locations');
    mapManager.addMarkers(locations);
  } catch (error) {
    console.error('Erro ao processar os dados:', error);
  }
};

// Executar o script principal
main();
