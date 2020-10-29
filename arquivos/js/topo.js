
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
}
)();
