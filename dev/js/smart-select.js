// Cenários 2, 3 faltam ser realizados.

(function () {
  const Service = ServiceAPI();
  const View = ViewAPI();
  const Controller = ControllerAPI();

  const CONFIG = {
    ASYNC: {
      MAP_PARAMS: [
        'PS=20&map=c,c,c', // DEFAULT
        ',specificationFilter_36', // MONTADORA
        ',specificationFilter_50', // VEICULO
        ',specificationFilter_48' // ANO
      ],
      TREE_LEVEL: 2,
      LID_FILTER: 'lid=bf120500-baab-4185-8b70-cc630f7d1c70',
    },
    CSS: {
      HIGHLIGHT: 'highlight',
      EMPTY: 'empty',
      ARROW_DOWN: 'fa-caret-down',
      CLOSE: 'fa-close',
      SELECTED: 'selected',
    },
    CANT_OPEN: false,
  }

  const SELECTS = [
    {
      title: 'Produto',
      class: 'produtos',
      values: [],
      routeSelected: '',
      isAsyncSearch: false,
      asyncSearchTerm: '',
      canBeClear: false,
    },
    {
      title: 'Peça',
      class: 'peca',
      values: [],
      routeSelected: '',
      isAsyncSearch: true,
      asyncSearchTerm: '',
      canBeClear: true,
    },
    {
      title: 'Montadora',
      class: 'montadora',
      values: [],
      routeSelected: '',
      isAsyncSearch: true,
      asyncSearchTerm: '.Compatibilidade.Montadora',
      canBeClear: true,
    },
    {
      title: 'Veículo',
      class: 'veiculo',
      values: [],
      routeSelected: '',
      isAsyncSearch: true,
      asyncSearchTerm: '.Veículo',
      canBeClear: true,
    },
    {
      title: 'Ano',
      class: 'ano',
      values: [],
      routeSelected: '',
      isAsyncSearch: true,
      asyncSearchTerm: '.Ano',
      canBeClear: true,
    },
  ];

  _init();

  async function _init() {
    let categoryTree = await Service.getCategoryTree();

    categoryTree
      .filter(x => x.hasChildren)
      .forEach(x => {
        SELECTS[0].values.push(...x.children);
      });

    Controller.checkRouterParams();

    View.buildList(SELECTS[0].values, SELECTS[0].class);

    SELECTS.forEach(View._initSelect_);

    // Create Button Function
    $('#smart-select-btn').click(Service.search);

  }

  function ViewAPI() {
    return {
      _initSelect_,
      buildList,
      selectOptionIfButtonHasValue,
      filterResults,
      resetResults,
      virtualizedDOM,
      createNavigation
    }

    function _initSelect_(select) {
      $(`.smart-select__main > .${select.class}`).click((e) => {
        $(`.smart-select__main > .${select.class} .smart-select__main-results input`)
          .val('');

        if (select.values) {
          View.buildList(select.values, select.class);
          View.selectOptionIfButtonHasValue(select.class);

          if (select.values.length !== 0) {
            $(`.smart-select__main > .${select.class} .smart-select__main-results`)
              .slideToggle('fast')
              .click(e => e.stopPropagation());

            $(`.smart-select__main > .${select.class} .smart-select__main-results input`)
              .focus();
          }
        }
      });

      $(`.smart-select__main > .${select.class} > div:first-child`)
        .focus(() => {
          $(`.smart-select__main > .${select.class} > div:first-child`)
            .on('keyup', event => {
              if (event.key === 'Delete' || event.key === 'Backspace') {
                const index = SELECTS.findIndex(x => x.class === select.class);
                View.resetResults(index);
                $(`.smart-select__main > .${select.class}`).click();
              }

              if (event.key === 'Enter')
                $(`.smart-select__main > .${select.class}`).click();
            })
        })
        .blur(() => {
          $(`.smart-select__main > .${select.class} > div:first-child`).unbind('keyup');
        });

      $(`.smart-select__main > .${select.class} .smart-select__main-results input`)
        .on('keydown', e => {
          if (e.key === 'Tab' || e.key === 'Enter') {
            e.preventDefault();
            $(`.smart-select__main > .${select.class} ul li.${CONFIG.CSS.HIGHLIGHT}`).click();
          }

          if (e.key === 'ArrowDown') {
            let index = 0;

            $(`.smart-select__main > .${select.class} ul li`)
              .each((i, element) => {
                if (element.classList.contains(CONFIG.CSS.HIGHLIGHT)) {
                  index += i + 2;
                  $(element).removeClass(CONFIG.CSS.HIGHLIGHT);
                }
              });

            if (index <= $(`.smart-select__main > .${select.class} ul li`).length) {
              $(`.smart-select__main > .${select.class} ul li:nth-child(${index})`)
                .addClass(CONFIG.CSS.HIGHLIGHT);

              $(`.smart-select__main > .${select.class} .smart-select__main-results ul`)
                .animate({
                  scrollTop: $(`.smart-select__main > .${select.class} ul li:nth-child(${index})`)[0].offsetTop
                    - $(`.smart-select__main > .${select.class} ul li:nth-child(${index})`)[0].scrollHeight
                    - $(`.smart-select__main > .${select.class} ul li:nth-child(${index})`)[0].scrollHeight / 2
                }, 100);
            }
            else {
              $(`.smart-select__main > .${select.class} ul li:nth-child(1)`)
                .addClass(CONFIG.CSS.HIGHLIGHT);

              $(`.smart-select__main > .${select.class} .smart-select__main-results ul`)
                .animate({
                  scrollTop: $(`.smart-select__main > .${select.class} ul li:nth-child(1)`)[0].offsetTop
                    - ($(`.smart-select__main > .${select.class} ul li:nth-child(1)`)[0].scrollHeight
                      + $(`.smart-select__main > .${select.class} ul li:nth-child(1)`)[0].scrollHeight / 2)
                }, 100);
            }
          }

          if (e.key === 'ArrowUp') {
            let index = 0;

            $(`.smart-select__main > .${select.class} ul li`)
              .each((i, element) => {
                if (element.classList.contains(CONFIG.CSS.HIGHLIGHT)) {
                  index = i;
                  $(element).removeClass(CONFIG.CSS.HIGHLIGHT);
                }
              });

            if (index !== 0) {
              $(`.smart-select__main > .${select.class} ul li:nth-child(${index})`)
                .addClass(CONFIG.CSS.HIGHLIGHT);

              $(`.smart-select__main > .${select.class} .smart-select__main-results ul`)
                .animate({
                  scrollTop: $(`.smart-select__main > .${select.class} ul li:nth-child(${index})`)[0].offsetTop
                    - ($(`.smart-select__main > .${select.class} ul li:nth-child(${index})`)[0].scrollHeight
                      + $(`.smart-select__main > .${select.class} ul li:nth-child(${index})`)[0].scrollHeight / 2)
                }, 100);
            }
            else {
              $(`.smart-select__main > .${select.class} ul li:nth-child(${$(`.smart-select__main > .${select.class} ul li`).length})`)
                .addClass(CONFIG.CSS.HIGHLIGHT);

              $(`.smart-select__main > .${select.class} .smart-select__main-results ul`)
                .animate({
                  scrollTop: $(`.smart-select__main > .${select.class} ul li:nth-child(${$(`.smart-select__main > .${select.class} ul li`).length})`)[0].offsetTop
                    - ($(`.smart-select__main > .${select.class} ul li:nth-child(${$(`.smart-select__main > .${select.class} ul li`).length})`)[0].scrollHeight
                      + $(`.smart-select__main > .${select.class} ul li:nth-child(${$(`.smart-select__main > .${select.class} ul li`).length})`)[0].scrollHeight / 2)
                }, 100);
            }
          }
        })
        .on('keyup', e => {
          if (!['Tab', 'ArrowDown', 'ArrowUp', 'Enter'].find(x => x === e.key))
            View.filterResults(e, select);
        });

      // Fecha todos os selects caso já tenha algum aberto.
      $(document).on("click", (e) => {
        var container = $(`.smart-select__main > .${select.class}`);

        if (!$(e.target).closest(container).length) {
          $(`.smart-select__main > .${select.class} .smart-select__main-results`)
            .slideUp('fast');
        }
      });
    }

    function buildList(objects, _class) {
      let html = '';

      if (objects) {
        objects.forEach(x => html += `<li role="treeitem" id="${x.id}">${x.name}</li>`);

        $(`.smart-select__main > .${_class} ul`).html(html);

        $(`.smart-select__main > .${_class} ul li`)
          .hover(event => {
            $(`.smart-select__main > .${_class} ul li`)
              .removeClass(CONFIG.CSS.HIGHLIGHT);

            $(event.target).addClass(CONFIG.CSS.HIGHLIGHT);
          })
          .click(event => Controller.addClick(event, _class));

        $(`.smart-select__main > .${_class} ul li`).first().addClass(CONFIG.CSS.HIGHLIGHT);
      } else {
        $(`.smart-select__main > .${_class} ul`)
          .html(`<li style="background: white; color:#707070; cursor: default">Nenhum resultado encontrado.</li>`);
      }
    }

    function selectOptionIfButtonHasValue(type) {
      $(`.smart-select__main > .${type} ul li`)
        .each((_, element) => {
          if (element.innerHTML === $(`.smart-select__main > .${type} div > span`).html())
            $(element).addClass(CONFIG.CSS.SELECTED)
        });
    };

    function filterResults(event, select) {
      if (event.target.value) {
        const filtered = select.values.filter(y =>
          replaceDiacritics(y.name.toUpperCase())
            .includes(
              replaceDiacritics(event.target.value.toUpperCase())
            )
        );

        buildList(filtered, select.class)
      }
      else {
        buildList(select.values, select.class);
      }
    };

    function resetResults(_index) {
      for (let i = _index; i <= (SELECTS.length - 1); i++) {
        const select = SELECTS[i];
        const nextSelect = SELECTS[i + 1];

        $(`.smart-select__main > .${select.class} > div > span`).html(select.title);
        select.routeSelected = '';

        if (nextSelect && nextSelect.canBeClear) {
          $(`.smart-select__main > .${nextSelect.class}`).addClass(CONFIG.CSS.EMPTY);

          nextSelect.values = [];
          nextSelect.routeSelected = '';
        }

        $(`.smart-select__main > .${select.class} > div > .${CONFIG.CSS.ARROW_DOWN}`).show();
        $(`.smart-select__main > .${select.class} > div > .${CONFIG.CSS.CLOSE}`).hide();
      }
    }

    function createNavigation(_class, new_title) {
      const index = SELECTS.findIndex(x => x.class === _class);
      const select = SELECTS[index];
      const nextSelect = SELECTS[index + 1];

      $(`.smart-select__main > .${select.class} > div > span`).html(new_title);
      $(`.smart-select__main > .${select.class} > div > .${CONFIG.CSS.ARROW_DOWN}`).hide();
      $(`.smart-select__main > .${select.class} > div > .${CONFIG.CSS.CLOSE}`)
        .show()
        .on('click', () => resetResults(index));

      if (nextSelect) {
        $(`.smart-select__main > .${nextSelect.class}`)
          .removeClass(CONFIG.CSS.EMPTY);

        if (!CONFIG.CANT_OPEN) {
          $(`.smart-select__main > .${nextSelect.class}`)
            .click();
        }
      } else {
        if (!CONFIG.CANT_OPEN) {
          $(`.smart-select__main > .${select.class}`).click().focus();
        }
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

    function replaceDiacritics(str) {
      const diacritics = [
        { char: 'A', base: /[\300-\306]/g },
        { char: 'a', base: /[\340-\346]/g },
        { char: 'E', base: /[\310-\313]/g },
        { char: 'e', base: /[\350-\353]/g },
        { char: 'I', base: /[\314-\317]/g },
        { char: 'i', base: /[\354-\357]/g },
        { char: 'O', base: /[\322-\330]/g },
        { char: 'o', base: /[\362-\370]/g },
        { char: 'U', base: /[\331-\334]/g },
        { char: 'u', base: /[\371-\374]/g },
        { char: 'N', base: /[\321]/g },
        { char: 'n', base: /[\361]/g },
        { char: 'C', base: /[\307]/g },
        { char: 'c', base: /[\347]/g }
      ]

      diacritics.forEach(function (letter) {
        str = str.replace(letter.base, letter.char);
      });

      return str;
    };
  }

  function ControllerAPI() {
    return {
      addClick,
      checkRouterParams
    };

    async function addClick(event, _class) {
      const index = SELECTS.findIndex(x => x.class === _class);
      const select = SELECTS[index];
      const nextSelect = SELECTS[index + 1];
      // Não pode ser === Pq um pode ser INT e outro STRING, mas o valores são iguais;
      const optionSelected = select.values.find(x => x.id == event.target.id);

      View.resetResults(index);

      if (index !== 0) {
        select.routeSelected = optionSelected.url
          ? optionSelected.url.replace(location.origin, '')
          : optionSelected.name;
      }

      if (nextSelect) {
        if (optionSelected && select.isAsyncSearch) {
          const response = await Service.getFilters(index, select, optionSelected);

          let values = View.virtualizedDOM(response, nextSelect.asyncSearchTerm);

          // Caso seja Ano (Ultimo campo) tem que ser decrescente
          (index + 1) === (SELECTS.length - 1)
            ? values.sort((a, b) => b.name.localeCompare(a.name))
            : values.sort((a, b) => a.name.localeCompare(b.name))

          nextSelect.values = values;
        } else {
          nextSelect.values = optionSelected.children
            .sort((a, b) => a.name.localeCompare(b.name));
        }

        View.buildList(nextSelect.values, nextSelect.class);
      }

      View.createNavigation(select.class, event.target.innerHTML);
    }

    async function checkRouterParams() {
      let { pathname, search } = location;

      if (search) {
        CONFIG.CANT_OPEN = true;
        const arrayPaths = pathname.split('/').filter(x => x);

        const { input, ...rest } = arrayPaths
          .slice(0, 3)
          .join('/')
          .match(/(\w+\/\w+)/);

        const params = [
          rest[0],
          input,
          ...arrayPaths.slice(3, arrayPaths.length)
        ];

        for (let i in params) {
          const select = SELECTS[i];
          const value = select.values.find(x =>
            x.url
              ? x.url.includes(params[i])
              : x.name.includes(params[i])
          );

          await Controller.addClick(
            {
              target: {
                id: value.id,
                innerHTML: value.name
              }
            },
            select.class
          );
        }
      }

      CONFIG.CANT_OPEN = false;
    }
  }

  function ServiceAPI() {
    return {
      buildMapFilters,
      buildURL,
      getCategoryTree,
      getFilters,
      search
    };

    async function getCategoryTree() {
      return await $.get(`api/catalog_system/pub/category/tree/${CONFIG.ASYNC.TREE_LEVEL}`);
    }

    async function getFilters(index, select, optionSelected) {
      const url = Service.buildURL(index, select, optionSelected);

      return await $.get(url);
    }

    function getPaths() {
      return SELECTS
        .filter(x => x.routeSelected)
        .map(x => x.routeSelected.includes('/')
          ? x.routeSelected
          : `/${x.routeSelected}`)
        .join('');
    }

    async function search() {
      const index = SELECTS.filter(x => x.routeSelected).length;
      const paths = getPaths();
      let url = location.origin;

      if (paths) {
        url += paths;
        url += `?${buildMapFilters(index - 1)}`;

        console.log(SELECTS.filter(x => x.routeSelected).map(x => x.routeSelected))
        console.log(url);
      }
    }

    function buildMapFilters(step) {
      let params = '';

      for (let i = 0; i <= step; i++) {
        params += CONFIG.ASYNC.MAP_PARAMS[i];
      }

      return params;
    }

    function buildURL(index, select, optionSelected) {
      const paths = getPaths();
      let url = '';

      if (select.asyncSearchTerm) {
        url += location.origin;
        url += paths;
      } else {
        url += optionSelected.url;
      }

      url += `?${CONFIG.ASYNC.LID_FILTER}&${buildMapFilters(--index)}`;

      return url;
    }
  }
})();