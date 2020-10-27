
function centerArrow() {
  let categoriaAtiva = document.querySelector('.painel-categorias__menu .painel-categorias__categoria.ativo');
  let arrow = document.querySelector('.arrow');
  let arrowPositions = arrow.getBoundingClientRect();
  let positions = categoriaAtiva.getBoundingClientRect();
  arrow.style.left = ((positions.left + (categoriaAtiva.offsetWidth - arrow.offsetWidth) / 2) - (arrowPositions.left - parseInt(arrow.style.left, 10))) + 'px';
  console.log(arrow.style.left);
}

function activateCategory(element) {
  let categoriaAnterior = document.querySelector('.painel-categorias__menu .painel-categorias__categoria.ativo');
  if (categoriaAnterior) {
    categoriaAnterior.classList.remove('ativo');
  }
  element.classList.add('ativo');
}

(() => {
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