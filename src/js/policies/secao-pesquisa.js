document.addEventListener("DOMContentLoaded", function () {
  const tabItems = document.querySelectorAll(".tab-item");
  const filterGroup = document.querySelector(".filter-group");

  const filtros = {
    placa: gerarFiltroPlaca(),
    pecaModelo: gerarFiltroPecaModelo(),
    categorias: gerarFiltroCategorias()
  };

  inicializarAbas();

  function gerarFiltroPlaca() {
    return `
      <div class="info-box">
        <i class="fas fa-info-circle"></i>
        <span>Essa é a busca mais eficaz para garantir a compatibilidade das peças com o seu veículo</span>
      </div>
      <div class="input-group">
        <input type="text" class="input-placa" placeholder="Digite a placa do veículo">
        <select id="select-produto" class="filter-select">
          <option>Produto</option>
        </select>
        <button class="btn btn-search">
          <i class="fas fa-search"></i> Buscar
        </button>
      </div>
      <button class="btn btn-clear">
        <i class="fas fa-times"></i> Limpar
      </button>`;
  }

  function gerarFiltroPecaModelo() {
      return `
        <select id="select-tipo-peca" class="filter-select">
          <option>Tipo de Peça</option>
        </select>
        <select id="select-montadora" class="filter-select">
          <option>Montadora</option>
        </select>
        <select id="select-modelo-veiculo" class="filter-select">
          <option>Modelo do Veículo</option>
        </select>
        <select id="select-ano" class="filter-select">
          <option>Ano</option>
        </select>
        <button class="btn btn-search">
          <i class="fas fa-search"></i> Buscar
        </button>
        <button class="btn btn-clear">
          <i class="fas fa-times"></i> Limpar
        </button>`;
  }


  function gerarFiltroCategorias() {
      return `
      <div class="category-container">
        <div class="category-list">
          <ul>
            <li>Vidros</li>
            <li>Parachoques, Grades e Molduras</li>
            <li>Retrovisores internos e externos</li>
            <li>Faróis, Lanternas e Lâmpadas</li>
            <li>Palhetas e Borrachas</li>
            <li>Radiadores e condensadores</li>
            <li>Paralama e Capô</li>
            <li>Higienizadores e Filtros</li>
            <li>Ferramentas</li>
            <li>Colas e Adesivos</li>
            <li>Suspensão</li>
            <li>Direção</li>
          </ul>
        </div>
        <div class="close-button">
          <a href="#" class="fechar-link"> <i class="fas fa-times"></i> Fechar</a>
        </div>
      </div>`;
  }

  function inicializarAbas() {
    tabItems.forEach((tabItem, index) => {
      if (!tabItem.classList.contains("no-click")) {
        tabItem.addEventListener("click", () => selecionarAba(index));
      }
    });

    selecionarAba(1);
  }

  function selecionarAba(index) {
    atualizarAbaAtiva(index);
    atualizarFiltros(index);
  }

  function atualizarAbaAtiva(index) {
    tabItems.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });
  }

  function atualizarFiltros(index) {
    const filtroSelecionado = {
      1: filtros.placa,
      2: filtros.pecaModelo,
      3: filtros.categorias
    }[index] || filtros.placa;
    filterGroup.innerHTML = filtroSelecionado;
  }
});
