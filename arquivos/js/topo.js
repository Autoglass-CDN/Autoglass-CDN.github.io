
function centerArrow() {
  let categoriaAtiva = document.querySelector('.painel-categorias__menu .painel-categorias__categoria.ativo');
  let arrow = document.querySelector('.arrow');
  let arrowPositions = arrow.getBoundingClientRect();
  let positions = categoriaAtiva.getBoundingClientRect();
  arrow.style.left = ((positions.left + (categoriaAtiva.offsetWidth - arrow.offsetWidth) / 2) - (arrowPositions.left - parseInt(getComputedStyle(arrow).left, 10))) + 'px';
}

function activateCategory(element) {
  let categoriaAnterior = document.querySelector('.painel-categorias__menu .painel-categorias__categoria.ativo');
  if (categoriaAnterior) {
    categoriaAnterior.classList.remove('ativo');
  }
  element.classList.add('ativo');
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

  slider.style.transform = `translateX(-${width - fullWidth}px)`;
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
  console.log('translateX: ', matrix.m41);
}

function slidePrev() { 
  let slider = document.querySelector('.painel-categorias__menu > ul');
  slider.style.transform = `translateX(0px)`;
  toggleVisibility('next-btn');
  toggleVisibility('prev-btn');
}

(() => {
  let slider = document.querySelector('.painel-categorias__menu > ul');
  if (getTranslateX(slider) < 0) document.getElementById('next-btn').style.visibility = 'hidden';
  else document.getElementById('prev-btn').style.visibility = 'hidden';
  
  document
    .querySelectorAll('.painel-categorias__menu .painel-categorias__categoria')
    .forEach(category => {
      category.addEventListener('mouseenter', (event) => {
        activateCategory(category);
        centerArrow();
      })
    });
}
)();
