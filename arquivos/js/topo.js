
function centerArrow() {
  let categoriaAtiva = document.querySelector('.painel-categorias__menu .painel-categorias__categoria.ativo');
  let arrow = document.querySelector('.arrow');
  let arrowPositions = arrow.getBoundingClientRect();
  let positions = categoriaAtiva.getBoundingClientRect();
  arrow.style.left = ((positions.left + (categoriaAtiva.offsetWidth - arrow.offsetWidth) / 2) - (arrowPositions.left - parseInt(getComputedStyle(arrow).left, 10))) + 'px';
}

function activateCategory(categoriaAtual, indexConteudoAtual) {
  let categoriaAnterior = document.querySelector('.painel-categorias__menu .painel-categorias__categoria.ativo');
  let conteudoAtual = document
    .querySelectorAll('.painel-categorias__categoria-conteudo .painel-categorias__categoria-itens')[indexConteudoAtual];

  if (categoriaAnterior) {
    categoriaAnterior
      .querySelector('.painel-categorias__categoria-header.ativo')
      .classList.remove('ativo');
    categoriaAnterior.classList.remove('ativo');
    document
      .querySelector('.painel-categorias__categoria-conteudo .painel-categorias__categoria-itens.ativo')
      .classList.remove('ativo');

    // event.target.style.transition = '0.8s';
    // event.target.style.opacity = 0;
  }
  categoriaAtual
    .querySelector('.painel-categorias__categoria-header')
    .classList.add('ativo');
  categoriaAtual.classList.add('ativo');
  conteudoAtual.classList.add('ativo');
}

function slideNext() {
  let categories = document.querySelectorAll('.painel-categorias__categoria');
  let slider = document.querySelector('.painel-categorias__menu > ul');

  if (getTranslateX(slider) < 0) return;

  let fullWidth = Array.from(categories)
    .reduce((width, category) => width + (parseInt(getComputedStyle(category).width, 10) + parseInt(getComputedStyle(category).marginLeft, 10) + parseInt(getComputedStyle(category).marginRight, 10)), 0);

  let width = slider.clientWidth
    + parseInt(getComputedStyle(slider).marginRight, 10)
    + parseInt(getComputedStyle(slider).marginLeft, 10);

  slider.style.transform = `translateX(${width - fullWidth}px)`;
  
  slider.addEventListener("transitionend", (e) => centerArrow(), { once: true });
  toggleVisibility('next-btn');
  toggleVisibility('prev-btn');
}

function toggleVisibility(id){
  let element = document.getElementById(id);
  element.style.visibility = element.style.visibility === 'hidden' ? 'visible' : 'hidden';
}

function getTranslateX(element) {
  let transform = getComputedStyle(element).getPropertyValue('transform');
  let matrix = new WebKitCSSMatrix(transform);
  return matrix.m41;
}

function slidePrev() { 
  let slider = document.querySelector('.painel-categorias__menu > ul');
  slider.style.transform = `translateX(0px)`;
  
  slider.addEventListener("transitionend", (e) => centerArrow(), { once: true });
  toggleVisibility('next-btn');
  toggleVisibility('prev-btn');
}

async function checkLogin() {
  var accountComponent = document.querySelector(".topo .usuario");

  let response = await fetch("/no-cache/profileSystem/getProfile");
  let data = await response.json();

  try {
    if (data.IsUserDefined) {
      var emailReceived = data.Email;
      var nameUser = data.FirstName && data.FirstName.length ? data.FirstName : emailReceived.match(/([^{0-9}|.|@|-]+)/).pop();
      //var nameUser = data.FirstName.length ? data.FirstName : emailReceived.match(/([^{0-9}|.|@|-]+)/).pop();
      accountComponent.innerHTML = `<div class="user-avatar-icon"></div>
        <span>
          Olá, <b>${nameUser}</b>
          <i class="arrow-down-icon-white"></i>
        </span>
        <ul class="usuario__opcoes">
          <li><a href="/_secure/account">Dados Pessoais</a></li>
          <li><a href="/_secure/account#/orders">Meus Pedidos</a></li>
          <li><a href="/_secure/account#/cards">Cartões</a></li>
          <li><a href="/_secure/account#/addresses">Endereços</a></li>
          <li id="logout"><a href="/no-cache/user/logout">Sair</a></li>
        </ul>`;
      //<a id="logout" href="/no-cache/user/logout">Sair</a>
    } else {
      accountComponent.innerHTML = `<div class="user-avatar-icon"></div>
      <a id="login">
        <b>Entrar ou Cadastrar</b>
        <i class="arrow-down-icon-white"></i>
      </a>`;
      document.body.classList.add("not-logged-user");

    }
  } catch (e) {
    if (typeof console !== "undefined" && typeof console.info === "function")
      console.info("Ops, algo saiu errado com o login.", e.message)
  }
}

(() => {
  let slider = document.querySelector('.painel-categorias__menu > ul');
  let prevBtn = document.getElementById('prev-btn');
  let nextBtn = document.getElementById('next-btn');

  prevBtn.addEventListener('click', slidePrev);
  nextBtn.addEventListener('click', slideNext);

  if (getTranslateX(slider) < 0) nextBtn.style.visibility = 'hidden';
  else prevBtn.style.visibility = 'hidden';

  let menu = document
    .querySelector('.menu-categorias');

  menu
    .addEventListener('mouseenter', (event) => {
      menu.classList.add('ativo');
      centerArrow();
    });

  let painelCategorias = document.querySelector('.painel-categorias');

  painelCategorias.addEventListener('mouseout', (event) => {
    menu.classList.remove('ativo');
  });

  document
    .querySelectorAll('.painel-categorias__menu .painel-categorias__categoria')
    .forEach((categoria, index) => {
      categoria.addEventListener('mouseenter', (event) => {
        activateCategory(categoria, index);
        centerArrow();
      })
    });
  checkLogin();
}
)();
