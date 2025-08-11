let map = L.map('map').setView([-14.235, -51.9253], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 8,
}).addTo(map);

const categoryLabels = {
  veiculos_autonomos: "Veículos Autônomos",
  conectividade: "Conectividade Veicular",
  manutencao: "Manutenção Preventiva/Preditiva",
  seguranca_dados: "Privacidade e Segurança de Dados",
  assistencia_conducao: "Assistência à Condução e Segurança",
  logistica: "Logística, Meio Ambiente e Descarbonização"
};

let projetosData = [];
fetch('projetos.json')
  .then(res => res.json())
  .then(data => {
    projetosData = data;
    carregarMapa();
  });

// Gradiente do "heatmap" por quantidade
function getColor(qtd) {
  return qtd > 6 ? '#084081' :
         qtd > 4 ? '#0868ac' :
         qtd > 2 ? '#2b8cbe' :
         qtd > 0 ? '#4eb3d3' :
                   '#f0f0f0';
}

// Conta projetos do estado conforme a categoria selecionada
function countProjetos(estado, categoriaSel) {
  return projetosData.filter(p =>
    p.estado === estado &&
    (categoriaSel === 'todos' || p.categoria === categoriaSel)
  ).length;
}

// Agrupa projetos por categoria (já respeitando o seletor)
function groupByCategoria(estado, categoriaSel) {
  const grupos = {};
  projetosData.forEach(p => {
    if (p.estado !== estado) return;
    if (categoriaSel !== 'todos' && p.categoria !== categoriaSel) return;
    if (!grupos[p.categoria]) grupos[p.categoria] = [];
    grupos[p.categoria].push(p);
  });
  return grupos;
}

let geojsonLayer;
function carregarMapa() {
  fetch('brasil_estados.geojson')
    .then(res => res.json())
    .then(estadosData => {
      if (geojsonLayer) map.removeLayer(geojsonLayer);

      geojsonLayer = L.geoJson(estadosData, {
        style: function(feature) {
          const estado = feature.properties.name;
          const categoriaSel = document.getElementById('categoria').value;
          const qtd = countProjetos(estado, categoriaSel);
          return {
            color: '#555',
            weight: 1,
            fillColor: getColor(qtd),
            fillOpacity: 0.7
          };
        },
        onEachFeature: function (feature, layer) {
          layer.on('mouseover', function () {
            const estado = feature.properties.name;
            const categoriaSel = document.getElementById('categoria').value;

            const grupos = groupByCategoria(estado, categoriaSel);
            const categorias = Object.keys(grupos);

            if (categorias.length === 0) {
              layer.bindTooltip(`<b>${estado}</b><br><br>Sem projetos nessa seleção.`, { sticky: true }).openTooltip();
              return;
            }

            // Monta HTML agrupado por categoria
            let html = `<b>${estado}</b><br><br>`;
            categorias
              .sort((a, b) => (categoryLabels[a] || a).localeCompare(categoryLabels[b] || b))
              .forEach(cat => {
                html += `<div style="margin-bottom:6px;"><u>${categoryLabels[cat] || cat}</u></div>`;
                html += grupos[cat].map(p =>
                  `<div style="margin-left:8px;">
                    <b>${p.ict}</b>: ${p.titulo}<br><i>${p.coordenador}</i>
                  </div>`
                ).join('<br>');
                html += `<br>`;
              });

            layer.bindTooltip(html, { sticky: true }).openTooltip();
          });

          layer.on('mouseout', function () {
            layer.closeTooltip();
          });
        }
      }).addTo(map);
    });
}

document.getElementById('categoria').addEventListener('change', carregarMapa);
