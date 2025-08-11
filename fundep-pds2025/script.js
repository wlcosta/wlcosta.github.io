let map = L.map('map').setView([-14.235, -51.9253], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 8,
}).addTo(map);

let projetosData = [];
fetch('projetos.json')
  .then(res => res.json())
  .then(data => {
    projetosData = data;
    carregarMapa();
  });

let geojsonLayer;
function carregarMapa() {
  fetch('brasil_estados.geojson')
    .then(res => res.json())
    .then(estadosData => {
      if (geojsonLayer) {
        map.removeLayer(geojsonLayer);
      }

      geojsonLayer = L.geoJson(estadosData, {
        style: {
          color: '#555',
          weight: 1,
          fillColor: '#ccc',
          fillOpacity: 0.6
        },
        onEachFeature: function (feature, layer) {
          layer.on('mouseover', function () {
            let estado = feature.properties.name;
            let categoria = document.getElementById('categoria').value;
            let projetos = projetosData.filter(p =>
              p.estado === estado &&
              (categoria === 'todos' || p.categoria === categoria)
            );

            if (projetos.length > 0) {
              let lista = projetos.map(p =>
                `<b>${p.ict}</b>: ${p.titulo} <br><i>${p.coordenador}</i>`
              ).join('<br><br>');

              layer.bindTooltip(`<b>${estado}</b><br><br>${lista}`, {
                sticky: true
              }).openTooltip();
            }
          });
        }
      }).addTo(map);
    });
}

document.getElementById('categoria').addEventListener('change', carregarMapa);