(function () {
  let categoryTree;
  let produtos, pecas, montadoras, veiculos, anos;

  const LID_FILTER = 'lid=bf120500-baab-4185-8b70-cc630f7d1c70';
  const URL_REMOVE = 'https://autoglass.vtexcommercestable.com.br';

  const BUTTONS = ['produtos', 'peca', 'montadora', 'veiculo', 'ano'];

  const CLICKS = {
    'produtos': function ({ target }) {
      resetResults(0);

      const produto = produtos.find(x => x.id == target.id);

      if (produto) {
        pecas = produto.children;

        buildList(pecas, 'peca');

        $('.smart-select__main > .produtos > div > span').html(target.innerText);
        $('.smart-select__main > .peca').removeClass('empty').click();
      }
    },
    'peca': async function ({ target }) {
      resetResults(1);

      const peca = pecas.find(x => x.id == target.id);

      const url = `${location.origin}${peca.url.replace(URL_REMOVE, '')}?${LID_FILTER}&${buildMapFilters(0)}`;

      const response = await $.get(url);

      montadoras = virtualizedDOM(response, '.Compatibilidade.Montadora');

      buildList(montadoras, 'montadora');

      $('.smart-select__main > .peca > div > span').html(target.innerText);
      $('.smart-select__main > .montadora').removeClass('empty').click();
    },
    'montadora': async function ({ target }) {
      resetResults(2);

      const montadora = montadoras.find(x => x.id === target.id);

      const url = `${location.origin}${montadora.pathname}?${LID_FILTER}&${buildMapFilters(1)}`;

      const response = await $.get(url);

      veiculos = virtualizedDOM(response, '.Veículo');

      buildList(veiculos, 'veiculo');

      $('.smart-select__main > .montadora > div > span').html(target.innerText);
      $('.smart-select__main > .veiculo').removeClass('empty').click();
    },
    'veiculo': async function ({ target }) {
      resetResults(3);

      const veiculo = veiculos.find(x => x.id === target.id);

      const url = `${location.origin}${veiculo.pathname}?${LID_FILTER}&${buildMapFilters(2)}`;

      const response = await $.get(url);

      anos = virtualizedDOM(response, '.Ano');

      console.log(anos)
      buildList(anos, 'ano');

      $('.smart-select__main > .veiculo > div > span').html(target.innerText);
      $('.smart-select__main > .ano').removeClass('empty').click();
    },
    'ano': function ({ target }) {
      $('.smart-select__main > .ano > div > span').html(target.innerText);
      $('.smart-select__main > .ano > div > span').click();
    },
    'button': function () {
      const ano = anos?.find(x => x.name === $('.smart-select__main > .ano > div > span').html());
      const montadora = montadoras?.find(x => x.name === $('.smart-select__main > .montadora > div > span').html());
      const veiculo = veiculos?.find(x => x.name === $('.smart-select__main > .veiculo > div > span').html());

      if (ano && montadora && veiculo) {
        let route = location.origin
        route += `${montadora.pathname}/${veiculo.name}/${ano.name}`
        route += `?${buildMapFilters(3)}`;

        window.location.href = route;
      }
    }
  }

  init();

  async function init() {
    const MAX_LEVEL = 2;

    categoryTree = await getCategoryTree(MAX_LEVEL);
    produtos = [];

    categoryTree
      .filter(x => x.hasChildren)
      .forEach(x => {
        produtos.push(...x.children);
      });

    buildList(produtos, 'produtos');

    // Create dropdown
    BUTTONS.forEach(type => {
      $(`.smart-select__main > .${type}`).click((e) => {
        const array = getArray(type);

        $(`.smart-select__main > .${type} .smart-select__main-results input`)
          .val('');

        if (array) {
          buildList(array, type);

          if (array.length !== 0) {
            $(`.smart-select__main > .${type} .smart-select__main-results`)
              .slideToggle('fast')
              .addClass('open')
              .click(e => e.stopPropagation());
          }
        }
      });

      $(`.smart-select__main > .${type} .smart-select__main-results input`)
        .on('keyup', e => filterResults(e, type));

      $(document).on("click", (e) => {
        var container = $(`.smart-select__main > .${type}`);

        if (!$(e.target).closest(container).length) {
          $(`.smart-select__main > .${type} .smart-select__main-results`)
            .slideUp('fast');
        }
      });
    });

    // Create Button Function
    $('#smart-select-btn').click(CLICKS['button']);
  }

  function buildList(objects, type) {
    let html = '';

    objects.forEach(x => html += `<li id="${x.id}">${x.name}</li>`);

    $(`.smart-select__main > .${type} ul`).html(html);

    $(`.smart-select__main > .${type} ul li`).click(CLICKS[type]);
  }

  function buildMapFilters(step) {
    const mapParams = [
      'PS=20&map=c,c,c', // DEFAULT
      ',specificationFilter_36',// MONTADORA
      ',specificationFilter_50', //VEICULO
      ',specificationFilter_48' //ANO
    ];

    let params = '';

    for (let i = 0; i <= step; i++) {
      params += mapParams[i];
    }

    return params;
  }

  function resetResults(step) {
    const resets = [
      () => {
        $('.smart-select__main > .peca').addClass('empty');
        $('.smart-select__main > .peca > div > span').html('Peça');
        pecas = [];
      },
      () => {
        $('.smart-select__main > .montadora').addClass('empty');
        $('.smart-select__main > .montadora > div > span').html('Montadora');
        montadoras = [];
      },
      () => {
        $('.smart-select__main > .veiculo').addClass('empty');
        $('.smart-select__main > .veiculo > div > span').html('Veículo');
        veiculos = []
      },
      () => {
        $('.smart-select__main > .ano').addClass('empty');
        $('.smart-select__main > .ano > div > span').html('Ano');
        anos = [];
      }
    ];

    for (let i = step; i <= (resets.length - 1); i++) {
      resets[i]();
    }
  }

  function filterResults({ target }, type) {
    const array = getArray(type);

    if (target.value) {
      const filtered = array.filter(y => y.name.toUpperCase().includes(target.value.toUpperCase()))
      filtered.length > 0
        ? buildList(filtered, type)
        : $(`.smart-select__main > .${type} ul`)
          .html(`<li style="background: white; color:#707070; cursor: default">Nenhum resultado encontrado.</li>`);
    }
    else {
      buildList(array, type);
    }
  }

  function virtualizedDOM(elements, tagReturn) {
    const DOM = document.createElement('div');

    DOM.innerHTML = elements;

    return [...DOM.querySelectorAll(`${tagReturn} > li > a`)]
      .map(x => ({
        id: x.href,
        name: x.innerHTML.replace(/\s\(\d+\)/, ''),
        pathname: x.pathname,
        search: x.search
      }));
  }

  function getArray(type) {
    switch (type) {
      case 'produtos':
        return produtos;
      case 'peca':
        return pecas;
      case 'montadora':
        return montadoras;
      case 'veiculo':
        return veiculos;
      case 'ano':
        return anos;
    }
  }

  async function getCategoryTree(level) {
    return await $.get(`api/catalog_system/pub/category/tree/${level}`);
  }
})();