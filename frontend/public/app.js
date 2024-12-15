// Inicializar o mapa
const initMap = () => {
    const map = L.map('map').setView([-14.235, -51.9253], 5); // Coordenadas do centro do Brasil
  
    // Adicionar os tiles do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);
  
    return map;
  };
  
  // Criar um grupo de clusters
  const createClusterGroup = () => {
    return L.markerClusterGroup();
  };
  
  // Criar um marcador com popup
  const createMarker = (location) => {
    return L.marker([location.lat, location.lng], {
      title: location.name, // Exibe o nome ao passar o mouse
    }).bindPopup(`
      <h3>${location.name}</h3>
      <p><b>Descrição:</b> ${location.description}</p>
      <p><b>População:</b> ${location.population}</p>
      <p><b>Área:</b> ${location.area} km²</p>
      <p><b>Densidade:</b> ${location.density} hab/km²</p>
      <p><b>Tags:</b> ${location.tags.join(', ')}</p>
      <p><b>Website:</b> <a href="${location.website}" target="_blank">${location.website}</a></p>
      <img src="${location.image}" alt="${location.name}" style="width:100%;max-width:200px;">
    `);
  };
  
  // Adicionar marcadores ao grupo de clusters
  const addMarkersToCluster = (data, clusterGroup) => {
    data.forEach((location) => {
      const marker = createMarker(location);
      clusterGroup.addLayer(marker);
    });
  };
  
  // Buscar dados do backend
  const fetchLocations = async (url) => {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Erro ao carregar os dados do backend:', error);
      throw error;
    }
  };
  
  // Função principal para inicializar o mapa e carregar os dados
  const main = async () => {
    const map = initMap();
    const markers = createClusterGroup();
  
    try {
      const data = await fetchLocations('http://localhost:3000/locations');
      addMarkersToCluster(data, markers);
      map.addLayer(markers);
    } catch (error) {
      console.error('Erro ao processar os dados:', error);
    }
  };
  
  // Executar o script principal
  main();
  