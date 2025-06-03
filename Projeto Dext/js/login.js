       
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
    