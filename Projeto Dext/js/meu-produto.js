// Dados das colmeias (vazios)
let colmeias = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 }
];


const dashboard = document.getElementById("dashboard");
const details = document.getElementById("details");
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebar-toggle");

// Função para criar cards das colmeias
function criarCardsColmeias() {
  dashboard.innerHTML = ""; // Limpa os cards atuais
  colmeias.forEach(colmeia => {
    const card = document.createElement("div");
    card.className = "beehive-card";
    card.innerHTML = `
      <h3>Colmeia ${colmeia.id}</h3>
      <p>Umidade: --%</p>
      <p>Temperatura: --°C</p>
      <p>Nível de CO₂: -- ppm</p>
    `;
    card.onclick = () => mostrarDetalhesVazios(colmeia);
    dashboard.appendChild(card);
  });
}

// Função para exibir detalhes vazios da colmeia e preencher a sidebar
function mostrarDetalhesVazios(colmeia) {
  details.innerHTML = `
    <h2>Detalhes da Colmeia ${colmeia.id}</h2>
    <canvas id="humidityChart-${colmeia.id}"></canvas>
    <canvas id="tempChart-${colmeia.id}"></canvas>
    <canvas id="co2Chart-${colmeia.id}"></canvas>
    <p class="no-data">Nenhum dado disponível no momento.</p>
  `;

  const labels = ['00h', '06h', '12h', '18h', '24h'];
  const dadosVazios = [null, null, null, null, null];

  // Gráfico de Umidade
  new Chart(document.getElementById(`humidityChart-${colmeia.id}`), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Umidade (%)',
        data: dadosVazios,
        borderColor: 'red',
        fill: false,
        pointRadius: 0
      }]
    },
    options: opcoesPadraoGrafico()
  });

  // Gráfico de Temperatura
  new Chart(document.getElementById(`tempChart-${colmeia.id}`), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Temperatura (°C)',
        data: dadosVazios,
        borderColor: 'blue',
        fill: false,
        pointRadius: 0
      }]
    },
    options: opcoesPadraoGrafico()
  });

  // Gráfico de CO₂
  new Chart(document.getElementById(`co2Chart-${colmeia.id}`), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'CO₂ (ppm)',
        data: dadosVazios,
        borderColor: 'orange',
        fill: false,
        pointRadius: 0
      }]
    },
    options: opcoesPadraoGrafico()
  });

  // Preenche a sidebar com informações da colmeia
  document.getElementById("info-id").textContent = colmeia.id;
  document.getElementById("info-umidade").textContent = "--%";
  document.getElementById("info-temperatura").textContent = "--°C";
  document.getElementById("info-co2").textContent = "-- ppm";
  document.getElementById("info-estado").textContent = "Sem dados";
}

// Opções padrão para os gráficos
function opcoesPadraoGrafico() {
  return {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { display: false }
      },
      x: {
        ticks: { display: false }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  };
}

// Função para adicionar nova colmeia
function adicionarColmeia() {
  const input = document.getElementById("colmeiaId");
  const novoId = parseInt(input.value);

  if (!novoId || isNaN(novoId)) {
    alert("Por favor, insira um ID válido.");
    return;
  }

  const existe = colmeias.some(c => c.id === novoId);
  if (existe) {
    alert("Já existe uma colmeia com esse ID.");
    return;
  }

  colmeias.push({ id: novoId });
  input.value = "";
  criarCardsColmeias(); 
}

// Função para alternar entre expandido e recolhido
function toggleSidebar() {
  sidebar.classList.toggle("active");
  sidebarToggle.classList.toggle("active");
}

// Adicionar evento de clique ao botão
if (sidebarToggle) {
  sidebarToggle.addEventListener("click", toggleSidebar);
}

//  Logout
document.getElementById("logout-button").addEventListener("click", function(event) {
  event.preventDefault();
  window.location.href = "../html/home.html";
});

// Inicialização
criarCardsColmeias();
