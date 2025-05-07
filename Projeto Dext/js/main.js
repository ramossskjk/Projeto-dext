
const menuIcon = document.querySelector('.menu-icon');
const navList = document.querySelector('.nav-list');

menuIcon.addEventListener('click', () => {
    navList.classList.toggle('ativo');
});

//  modo claro/escuro
const themeToggle = document.getElementById('theme-toggle');

themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
