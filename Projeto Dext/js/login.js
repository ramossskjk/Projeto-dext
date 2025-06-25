       
  const formContainer = document.getElementById('formContainer');
  const formTitle = document.getElementById('formTitle');
  const form = document.getElementById('form');

  let isLogin = true;

  function toggleForm() {
    isLogin = !isLogin;
    formTitle.textContent = isLogin ? 'Login' : 'Cadastro';
    form.innerHTML = isLogin
      ? `
      <input type="email" placeholder="Email" required>
      <input type="password" placeholder="Senha" required>
      <button type="submit">Entrar</button>
      <div class="toggle">
        Não tem conta? <a href="#" onclick="toggleForm()">Cadastre-se</a>
      </div>
      `
      : `
      <input type="text" placeholder="Nome" required>
      <input type="email" placeholder="Email" required>
      <input type="password" placeholder="Senha" required>
      <button type="submit">Cadastrar</button>
      <div class="toggle">
        Já tem conta? <a href="#" onclick="toggleForm()">Entrar</a>
      </div>
      `;

    attachSubmitHandler(); 
  }

  function attachSubmitHandler() {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      window.location.href = 'meu-produto.html'; // Redireciona para meu-produto.html ( sem autenticação )
    });
  }
    attachSubmitHandler();
    

    // Função para gerenciar o login
function setupLogin() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Credenciais simuladas
    const usuarioValido = "admin";
    const senhaValida = "1234";

    if (username === usuarioValido && password === senhaValida) {
      // Salva usuário logado no localStorage
      localStorage.setItem("usuarioLogado", JSON.stringify({
        username,
        logado: true,
        timestamp: new Date().toISOString()
      }));

      // Redireciona para a página protegida
      window.location.href = "../html/meu-produto.html";
    } else {
      alert("Usuário ou senha inválidos.");
    }
  });
}

// Função para verificar se o usuário está logado (usada em páginas restritas)
function verificarLogin() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!usuario || !usuario.logado) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "../html/login.html";
  }
}

// Função para logout
function setupLogout() {
  const botaoLogout = document.getElementById("logout-button");
  if (!botaoLogout) return;

  botaoLogout.addEventListener("click", function(event) {
    event.preventDefault();

    // Remove o status de logado
    localStorage.removeItem("usuarioLogado");

    // Redireciona para home
    window.location.href = "../html/home.html";
  });
}

// Inicializa as funções conforme a página
document.addEventListener("DOMContentLoaded", () => {
  // Se estiver na página de login
  if (document.getElementById("loginForm")) {
    setupLogin();
  }

  // Se estiver na página protegida
  if (document.getElementById("dashboard")) {
    verificarLogin();
  }

  // Se tiver botão de logout
  if (document.getElementById("logout-button")) {
    setupLogout();
  }
});
