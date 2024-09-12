(function () {

  $(document).ready(function() {
    const buscaPlaca = JSON.parse(localStorage.getItem('buscaPlaca'));

    if(buscaPlaca){
      const searchHistory = JSON.parse(localStorage.getItem('smartSelectHistory'));
      const placa = searchHistory?.params?.plate;
      const infoPlaca = JSON.parse(localStorage.getItem('infoBuscaPLaca'));
      $('.tag').show();
      $('.texto-compatibilidade').hide();
      $('.input-container').hide();
      $('.carro-compativel').text("Compatível com: " + infoPlaca[0].modelo + " " + infoPlaca[0].montadora);
      $(".texto-placa").text(placa);
    }

    $('.botao-placa').on('click', function() {
      $('.tag').hide();
      $('.input-container').show();
      $('.texto-compatibilidade').show();
      $("#placa-input-compatibilidade").val("");
      $('.carro-compativel').hide();
    });
  });

  let activeTab = '#busca-peca';
  selectRightSearchMethod();

  /** BUSCA POR PEÇA DEV */
  const Service = ServiceAPI();
  const View = ViewAPI();
  const Controller = ControllerAPI();
  let firstRouteSelected = "";
  let vehicle = "";
  window.buttonBuscarSelected = false;


  const CONFIG = {
    ASYNC: {
      MAP_PARAMS: [
        "PS=20&map=c,c,c", // DEFAULT
        ",specificationFilter_36", // MONTADORA
        ",specificationFilter_50", // VEICULO
        ",specificationFilter_48", // ANO
        ",specificationFilter_79" //VERSAOFIPE
      ],
      TREE_LEVEL: 2,
      LID_FILTER: "lid=bf120500-baab-4185-8b70-cc630f7d1c70",
    },
    CSS: {
      HIGHLIGHT: "highlight",
      EMPTY: "empty",
      ARROW_DOWN: "fa-caret-down",
      CLOSE: "fa-close",
      SELECTED: "selected",
    },
    CANT_OPEN: false,
    ORIGIN: "https://hml.autoglassonline.com.br", // location.origin,
  };

  const PECA_SELECTS = [
    {
      title: "Produto",
      id: "produtos-select",
      values: [],
      routeSelected: "",
      isAsyncSearch: false,
      asyncSearchTerm: "",
      canBeClear: false,
    },
    {
      title: "Produto",
      id: "pecas-select",
      values: [],
      routeSelected: "",
      isAsyncSearch: true,
      asyncSearchTerm: "",
      canBeClear: true,
    },
    {
      title: "Montadora",
      id: "montadora-select",
      values: [],
      routeSelected: "",
      isAsyncSearch: true,
      asyncSearchTerm: ".Compatibilidade.Montadora",
      canBeClear: true,
    },
    {
      title: "Veículo",
      id: "veiculo-select",
      values: [],
      routeSelected: "",
      isAsyncSearch: true,
      asyncSearchTerm: ".Veículo",
      canBeClear: true,
    },
    {
      title: "Ano",
      id: "ano-select",
      values: [],
      routeSelected: "",
      isAsyncSearch: true,
      asyncSearchTerm: ".Ano",
      canBeClear: true,
    },
    {
      title: "Versão",
      id: "versao-select",
      values: [],
      routeSelected: "",
      isAsyncSearch: true,
      asyncSearchTerm: ".Versão.Fipe",
      canBeClear: true,
    },
  ];

  _init();

  async function _init() {
    const categoryTree = await Service.getCategoryTree();
    const childrenCategories = [];
    const grandchildenCategories = [];

    categoryTree
      .filter((x) => x.hasChildren)
      .forEach((x) => {
        childrenCategories.push(...x.children);
      });

      childrenCategories.forEach((y) => {
        grandchildenCategories.push(...y.children);
      });

    _initBuscaPlaca(childrenCategories);
    await _initBuscaPeca(grandchildenCategories);
  }

  async function _initBuscaPeca(values) {

    PECA_SELECTS[1].values = values;

    await Controller.checkRouterParams();

    View.buildList(PECA_SELECTS[1].values, PECA_SELECTS[1].id);

    PECA_SELECTS.forEach(View._initSelect_);

    // Create Button Function
    $("#form-busca-peca").submit((e) => { e.preventDefault(); Service.search() ; window.localStorage.setItem('buscaPlaca', false);});
  }

  function ViewAPI() {
    return {
      _initSelect_,
      buildList,
      selectOptionIfButtonHasValue,
      filterResults,
      resetResults,
      virtualizedDOM,
      createNavigation,
    };

    function _initSelect_(select) {
      $(`.c-busca__tab-content #${select.id}`).click((e) => {
        $(
          `.c-busca__tab-content #${select.id} .smart-select__main-results input`
        ).val("");

        if (select.values) {
          View.buildList(select.values, select.id);
          View.selectOptionIfButtonHasValue(select.id);

          if (select.values.length !== 0) {
            $(`.c-busca__tab-content #${select.id} .smart-select__main-results`)
              .slideToggle("fast")
              .click((e) => e.stopPropagation());

            $(
              `.c-busca__tab-content #${select.id} .smart-select__main-results input`
            ).focus();
          }
        }
      });

      $(`.c-busca__tab-content #${select.id} .smart-select__main-results input`)
        .on("keydown", (e) => {
          if (e.key === "Tab" || e.key === "Enter") {
            e.preventDefault();
            $(
              `.c-busca__tab-content #${select.id} ul li.${CONFIG.CSS.HIGHLIGHT}`
            ).click();
          }

          if (e.key === "ArrowDown") {
            let index = 0;

            $(`.c-busca__tab-content #${select.id} ul li`).each(
              (i, element) => {
                if (element.classList.contains(CONFIG.CSS.HIGHLIGHT)) {
                  index += i + 2;
                  $(element).removeClass(CONFIG.CSS.HIGHLIGHT);
                }
              }
            );

            if (
              index <= $(`.c-busca__tab-content #${select.id} ul li`).length
            ) {
              $(
                `.c-busca__tab-content #${select.id} ul li:nth-child(${index})`
              ).addClass(CONFIG.CSS.HIGHLIGHT);

              $(
                `.c-busca__tab-content #${select.id} .smart-select__main-results ul`
              ).animate(
                {
                  scrollTop:
                    $(
                      `.c-busca__tab-content #${select.id} ul li:nth-child(${index})`
                    )[0].offsetTop -
                    $(
                      `.c-busca__tab-content #${select.id} ul li:nth-child(${index})`
                    )[0].scrollHeight -
                    $(
                      `.c-busca__tab-content #${select.id} ul li:nth-child(${index})`
                    )[0].scrollHeight /
                      2,
                },
                100
              );
            } else {
              $(
                `.c-busca__tab-content #${select.id} ul li:nth-child(1)`
              ).addClass(CONFIG.CSS.HIGHLIGHT);

              $(
                `.c-busca__tab-content #${select.id} .smart-select__main-results ul`
              ).animate(
                {
                  scrollTop:
                    $(
                      `.c-busca__tab-content #${select.id} ul li:nth-child(1)`
                    )[0].offsetTop -
                    ($(
                      `.c-busca__tab-content #${select.id} ul li:nth-child(1)`
                    )[0].scrollHeight +
                      $(
                        `.c-busca__tab-content #${select.id} ul li:nth-child(1)`
                      )[0].scrollHeight /
                        2),
                },
                100
              );
            }
          }

          if (e.key === "ArrowUp") {
            let index = 0;

            $(`.c-busca__tab-content #${select.id} ul li`).each(
              (i, element) => {
                if (element.classList.contains(CONFIG.CSS.HIGHLIGHT)) {
                  index = i;
                  $(element).removeClass(CONFIG.CSS.HIGHLIGHT);
                }
              }
            );

            if (index !== 0) {
              $(
                `.c-busca__tab-content #${select.id} ul li:nth-child(${index})`
              ).addClass(CONFIG.CSS.HIGHLIGHT);

              $(
                `.c-busca__tab-content #${select.id} .smart-select__main-results ul`
              ).animate(
                {
                  scrollTop:
                    $(
                      `.c-busca__tab-content #${select.id} ul li:nth-child(${index})`
                    )[0].offsetTop -
                    ($(
                      `.c-busca__tab-content #${select.id} ul li:nth-child(${index})`
                    )[0].scrollHeight +
                      $(
                        `.c-busca__tab-content #${select.id} ul li:nth-child(${index})`
                      )[0].scrollHeight /
                        2),
                },
                100
              );
            } else {
              $(
                `.c-busca__tab-content #${select.id} ul li:nth-child(${
                  $(`.c-busca__tab-content #${select.id} ul li`).length
                })`
              ).addClass(CONFIG.CSS.HIGHLIGHT);

              $(
                `.c-busca__tab-content #${select.id} .smart-select__main-results ul`
              ).animate(
                {
                  scrollTop:
                    $(
                      `.c-busca__tab-content #${select.id} ul li:nth-child(${
                        $(`.c-busca__tab-content #${select.id} ul li`).length
                      })`
                    )[0].offsetTop -
                    ($(
                      `.c-busca__tab-content #${select.id} ul li:nth-child(${
                        $(`.c-busca__tab-content #${select.id} ul li`).length
                      })`
                    )[0].scrollHeight +
                      $(
                        `.c-busca__tab-content #${select.id} ul li:nth-child(${
                          $(`.c-busca__tab-content #${select.id} ul li`).length
                        })`
                      )[0].scrollHeight /
                        2),
                },
                100
              );
            }
          }
        })
        .on("keyup", (e) => {
          console.log(`Filtrando`);
          if (
            !["Tab", "ArrowDown", "ArrowUp", "Enter"].find((x) => x === e.key)
          )
            View.filterResults(e, select);
        });

      // Fecha todos os selects caso já tenha algum aberto.
      $(document).on("click", (e) => {
        var container = $(`.c-busca__tab-content #${select.id}`);

        if (!$(e.target).closest(container).length) {
          $(
            `.c-busca__tab-content #${select.id} .smart-select__main-results`
          ).slideUp("fast");
        }
      });
    }

    function buildList(objects, _id) {
      let html = "";

      if (objects) {
        objects.forEach(
          (x) => (html += `<li role="treeitem" id="${x.id}">${x.name}</li>`)
        );

        $(`.c-busca__tab-content  #${_id} ul`).html(html);

        $(`.c-busca__tab-content  #${_id} ul li`)
          .hover((event) => {
            $(`.c-busca__tab-content  #${_id} ul li`).removeClass(
              CONFIG.CSS.HIGHLIGHT
            );

            $(event.target).addClass(CONFIG.CSS.HIGHLIGHT);
          })
          .click((event) => {
            switch (activeTab) {
              case '#busca-peca':
                Controller.addClick(event, _id)
                break;
              case '#busca-placa':
                handleBuscaPlacaSelection(event, _id);
                break;
            }
          });

        $(`.c-busca__tab-content  #${_id} ul li`)
          .first()
          .addClass(CONFIG.CSS.HIGHLIGHT);
      } else {
        $(`.c-busca__tab-content  #${_id} ul`).html(
          `<li style="background: white; color:#707070; cursor: default">Nenhum resultado encontrado.</li>`
        );
      }
    }

    function selectOptionIfButtonHasValue(type) {
      $(`.c-busca__tab-content > .${type} ul li`).each((_, element) => {
        if (
          element.innerHTML ===
          $(`.c-busca__tab-content > .${type} div > span`).html()
        )
          $(element).addClass(CONFIG.CSS.SELECTED);
      });
    }

    function filterResults(event, select) {
      if (event.target.value) {
        const filtered = select.values.filter((y) =>
          replaceDiacritics(y.name.toUpperCase()).includes(
            replaceDiacritics(event.target.value.toUpperCase())
          )
        );

        buildList(filtered, select.id);
      } else {
        buildList(select.values, select.id);
      }
    }

    function resetResults(_index) {
      for (let i = _index; i <= PECA_SELECTS.length - 1; i++) {
        const select = PECA_SELECTS[i];
        const nextSelect = PECA_SELECTS[i + 1];

        $(`.c-busca__tab-content  #${select.id} > div > span`).html(
          select.title
        );
        select.routeSelected = "";

        if (nextSelect && nextSelect.canBeClear) {
          $(`.c-busca__tab-content #${nextSelect.id}`).addClass(
            CONFIG.CSS.EMPTY
          );

          nextSelect.values = [];
          nextSelect.routeSelected = "";
        }

        $(
          `.c-busca__tab-content  #${select.id} > div > .${CONFIG.CSS.ARROW_DOWN}`
        ).show();
        $(
          `.c-busca__tab-content  #${select.id} > div > .${CONFIG.CSS.CLOSE}`
        ).hide();
      }
    }

    function createNavigation(_class, new_title) {
      const index = PECA_SELECTS.findIndex((x) => x.id === _class);
      const select = PECA_SELECTS[index];
      const nextSelect = PECA_SELECTS[index + 1];

      $(`.c-busca__tab-content  #${select.id} > div > span`).html(new_title);
      $(
        `.c-busca__tab-content  #${select.id} > div > .${CONFIG.CSS.ARROW_DOWN}`
      ).hide();
      $(`.c-busca__tab-content  #${select.id} > div > .${CONFIG.CSS.CLOSE}`)
        .show()
        .on("click", () => resetResults(index));

      if (nextSelect) {
        $(`.c-busca__tab-content #${nextSelect.id}`).removeClass(
          CONFIG.CSS.EMPTY
        );

        if (!CONFIG.CANT_OPEN) {
          $(`.c-busca__tab-content #${nextSelect.id}`).click();
        }
      } else {
        if (!CONFIG.CANT_OPEN) {
          $(`.c-busca__tab-content  #${select.id}`).click().focus();
        }
      }
    }

    function virtualizedDOM(elements, tagReturn) {
      const DOM = document.createElement("div");

      DOM.innerHTML = elements;

      return [...DOM.querySelectorAll(`${tagReturn} > li > a`)].map((x) => ({
        id: x.href,
        name: x.innerHTML.replace(/\s\(\d+\)/, ""),
        pathname: x.pathname,
        search: x.search,
      }));
    }

    function replaceDiacritics(str) {
      const diacritics = [
        { char: "A", base: /[\300-\306]/g },
        { char: "a", base: /[\340-\346]/g },
        { char: "E", base: /[\310-\313]/g },
        { char: "e", base: /[\350-\353]/g },
        { char: "I", base: /[\314-\317]/g },
        { char: "i", base: /[\354-\357]/g },
        { char: "O", base: /[\322-\330]/g },
        { char: "o", base: /[\362-\370]/g },
        { char: "U", base: /[\331-\334]/g },
        { char: "u", base: /[\371-\374]/g },
        { char: "N", base: /[\321]/g },
        { char: "n", base: /[\361]/g },
        { char: "C", base: /[\307]/g },
        { char: "c", base: /[\347]/g },
      ];

      diacritics.forEach(function (letter) {
        str = str.replace(letter.base, letter.char);
      });

      return str;
    }
  }

  function ControllerAPI() {
    return {
      addClick,
      checkRouterParams,
    };

    async function addClick(event, _id) {
      const index = PECA_SELECTS.findIndex((x) => x.id === _id);
      const select = PECA_SELECTS[index];
      const nextSelect = PECA_SELECTS[index + 1];
      // Não pode ser === Pq um pode ser INT e outro STRING, mas o valores são iguais;
      const optionSelected = select.values.find((x) => x.id == event.target.id);

      const modalDeCarregamento = new ModalDeCarregamento();
      modalDeCarregamento.mostarSpinner();

      View.resetResults(index);

      if (index !== 0) {
        select.routeSelected = getSelectedRouteByOption(optionSelected);
      } else {
        firstRouteSelected = getSelectedRouteByOption(optionSelected);
      }

      //Se o index for veículo, ele salva o nome do veículo selecionado.
      if(index === 3){
        vehicle = optionSelected.name.toLowerCase();
      }

      if (nextSelect) {
        if (optionSelected && select.isAsyncSearch) {
          const response = await Service.getFilters(
            index,
            select,
            optionSelected
          );

          let values = View.virtualizedDOM(
            response,
            nextSelect.asyncSearchTerm
          );

          index + 1 === PECA_SELECTS.length - 1
            ? values = filterVersaoFipe(values, vehicle)
            : values;

          // Caso seja Ano (Penultimo campo [-2]) altera para decrescente
          index + 1 === PECA_SELECTS.length - 2
            ? values.sort((a, b) => b.name.localeCompare(a.name))
            : values.sort((a, b) => a.name.localeCompare(b.name));

          nextSelect.values = nextSelect.title == "Veículo"
            ? vehiclesWithoutBrand(values, optionSelected.name)
            : values;

            hideDivVersaoFipe(values.length, nextSelect.title)
        } else {
          nextSelect.values = optionSelected.children.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
        }

        View.buildList(nextSelect.values, nextSelect.id);
      }

      View.createNavigation(select.id, event.target.innerHTML);

      modalDeCarregamento.ocultarSpinner();
    }

    function hideDivVersaoFipe(length, title) {
      const divSelectVersaoFipe = $('#select-versao-fipe');

      if (title === "Versão") {
          if (length === 0) {
            divSelectVersaoFipe.hide();
          } else {
            divSelectVersaoFipe.show();
          }
      }
    }

    function filterVersaoFipe(values, vehicle){
      return values.filter(value => value.name.toLowerCase().includes(vehicle))
    }

    function vehiclesWithoutBrand(vehicles, brand){
      return vehicles.filter(vehicle => !RegExp(`\\b${brand}\\b`, 'i').test(vehicle.name));
    }

    function getSelectedRouteByOption(optionSelected) {
      return optionSelected.url
          ? optionSelected.url.replace(new URL(optionSelected.url).origin, "")
          : optionSelected.name;
    }

    async function checkRouterParams() {
      let { pathname, search } = location;

      search = decodeURIComponent(search);

      if (search && search.includes(CONFIG.ASYNC.MAP_PARAMS[0]) ||
                    search.includes('?PS=20&map=c,c')) {
        CONFIG.CANT_OPEN = true;
        const arrayPaths = decodeURI(pathname)
          .split("/")
          .filter((x) => x);

        const { input, ...rest } = arrayPaths
          .slice(0, 3)
          .join("/")
          .match(/(\w+\/\w+)/);

        let params = [
          rest[0],
          input,
          ...arrayPaths.slice(3, arrayPaths.length),
        ];

        if(search.match(/\?PS=20&map=c,c$/)) {
          params = [
            rest[0],
          ];
        }

        for (let i = 1; i < params.length; i++) {
          const select = PECA_SELECTS[i];
          const value = select.values.find((x) =>
            x.url ? x.url.includes(params[i]) : x.name.includes(params[i])
          );

          await Controller.addClick(
            {
              target: {
                id: value.id,
                innerHTML: value.name,
              },
            },
            select.id
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
      search,
    };

    async function getCategoryTree() {
      return await $.get(
        `${CONFIG.ORIGIN}/api/catalog_system/pub/category/tree/${CONFIG.ASYNC.TREE_LEVEL}`
      );
    }

    async function getFilters(index, select, optionSelected) {
      const url = Service.buildURL(index, select, optionSelected);

      return await $.get(url);
    }

    function getPaths() {
      return PECA_SELECTS.filter((x) => x.routeSelected)
        .map((x) =>
          x.routeSelected.includes("/")
            ? x.routeSelected
            : `/${x.routeSelected}`
        )
        .join("");
    }

    async function search() {
      const index = PECA_SELECTS.filter((x) => x.routeSelected).length;
      const paths = getPaths();
      let url = CONFIG.ORIGIN;

      if(firstRouteSelected.length === 1) {
        alert("Selecione pelo menos o primeiro campo!");
        return;
      }

      if (paths) {
        url += paths;
        url += `?${buildMapFilters(index - 1)}`;
      }

      if(index < 1) {
        url = getUrlForFirstSelect(firstRouteSelected, url);
      }

      window.buttonBuscarSelected = true;
      window.localStorage.setItem('buttonBuscarSelected', window.buttonBuscarSelected);

      saveSearchInLocalStorage(null, url);

      location.href = url;
    }

    function getUrlForFirstSelect(route, url) {
      const routeSelected = route.includes("/") ? route : `/${route}`;

      return url + routeSelected + '?PS=20&map=c,c';
    }

    function buildMapFilters(step) {
      let params = "";

      for (let i = 0; i <= step; i++) {
        params += CONFIG.ASYNC.MAP_PARAMS[i];
      }

      return params;
    }

    function buildURL(index, select, optionSelected) {
      const paths = getPaths();
      let url = "";

      if (select.asyncSearchTerm) {
        url += CONFIG.ORIGIN;
        url += paths;
      } else {
        let absolutePath = new URL(optionSelected.url);
        //teste
        url += CONFIG.ORIGIN;

        url += absolutePath.href.replace(absolutePath.origin, "");
      }

      url += `?${CONFIG.ASYNC.LID_FILTER}&${buildMapFilters(--index)}`;

      return url;
    }
  }

  // Em dispositivos mobile e tablet, rola a tela diretamente para resultado das buscas
  window.onload = () => {
    if (window.matchMedia("(max-width: 1100px)").matches) {
      var aimElement = $(".system-error-qd-v1"); // Busca com resultado
      if (!aimElement.length) {
        aimElement = $(".search-qd-v1-result"); // Busca vazia
        if (!aimElement.length) return; // Não é pagina de busca
      }

      aimElementTopOffset = aimElement.offset().top;
      offsets = $("header.nav").height() + $("div.topo").height();
      pixelsToScroll = aimElementTopOffset - offsets;
      $("html, body").animate({ scrollTop: pixelsToScroll }, "slow");
    }
  };

  // Alterna as abas da busca
  let tabs = document.querySelectorAll(".c-busca__tabs li");

  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();

      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");

      activeTab = tab.querySelector('a').attributes.href.nodeValue;

      let tabContentDivs = document.querySelectorAll(
        ".c-busca__tab-content"
      );

      tabContentDivs.forEach((div) => div.classList.remove("is-active"));

      let selectedSection = document.querySelector(
        tab.querySelector("a").hash
      );
      selectedSection.classList.add("is-active");
    });
  });

  /** BUSCA POR PLACA */
  const PLACA_SELECTS = [
    {
      title: "Produto",
      id: "categoria-select",
      values: [],
      routeSelected: "",
      isAsyncSearch: false,
      asyncSearchTerm: "",
      canBeClear: false,
    },
  ];

  function _initBuscaPlaca(values) {

    PLACA_SELECTS[0].values = values;

    View.buildList(PLACA_SELECTS[0].values, PLACA_SELECTS[0].id);

    View._initSelect_(PLACA_SELECTS[0]);

    restoreBuscaPlaca();

    let formBuscaPlaca = document.querySelector("#form-busca-placa");

    formBuscaPlaca.addEventListener('submit', (event) => {
      event.preventDefault();

      const [
        isUniversalProduct,
        redirectUrl
      ] = checkIfUniversalProductSearch();

      if(isUniversalProduct) {
        const modalDeCarregamento = new ModalDeCarregamento();
        modalDeCarregamento.mostarSpinner();

        location.href = redirectUrl;
      } else {
        const placa = document.querySelector("#placa-input").value;
        const regexPlaca = /^[A-Z]{3}[\-_]?[0-9][0-9A-Z][0-9]{2}$/i;

        if(0 === placa.length) {
          alert('Você deve inserir a placa do seu veículo!');
        } else if(!placa.trim().match(regexPlaca)) {
          alert('Sua placa não segue um padrão válido!');
        } else {
          buscaPorPlaca(placa);
        }
      }
    });

    let formBuscaPlacaCompatibilidade = document.querySelector("#form-busca-placa-compatibilidade");
    if (formBuscaPlacaCompatibilidade) {
      formBuscaPlacaCompatibilidade.addEventListener('submit', (event) => {
        event.preventDefault();

        const [isUniversalProduct, redirectUrl] = checkIfUniversalProductSearch();

        if (isUniversalProduct) {
          const modalDeCarregamento = new ModalDeCarregamento();
          modalDeCarregamento.mostarSpinner();
          location.href = redirectUrl;
        } else {
          const placa = document.querySelector("#placa-input-compatibilidade").value;
          const regexPlaca = /^[A-Z]{3}[\-_]?[0-9][0-9A-Z][0-9]{2}$/i;

          if (placa.length === 0) {
            alert('Você deve inserir a placa do seu veículo!');
          } else if (!placa.trim().match(regexPlaca)) {
            alert('Sua placa não segue um padrão válido!');
          } else {
            buscaPorPlaca(placa);
          }
        }
      });
    } else {
      console.error("Formulário de compatibilidade não encontrado.");
    }
  }

  function restoreBuscaPlaca() {
    let { pathname, search } = location;

    const searchHistory = JSON.parse(localStorage.getItem('smartSelectHistory'));
    const isHistoryValid = searchHistory && searchHistory.type == '#busca-placa';

    if (search && search.includes('?PS=24&map=')) {
      if(search.includes('c,c,')) {
        const arrayPaths = decodeURI(pathname)
          .split("/")
          .filter((x) => x);

        const param = arrayPaths
          .slice(0, 2)
          .join("/");

        const select = PLACA_SELECTS[0];
        const value = select.values.find((x) =>
          x.url ? x.url.includes(param) : x.name.includes(param)
        );

        handleBuscaPlacaSelection(
          {
            target: {
              id: value.id,
              innerHTML: value.name,
            },
          },
          select.id
        );
      }

      if(isHistoryValid) {
        document.querySelector("#placa-input").value = searchHistory.params.plate;
      }
    }

    if(isHistoryValid && searchHistory.params.url) {
      if(!search) { search = "" };
      if(!pathname) { pathname = "" };

      if(!search.includes('?PS=24&map=') && !pathname.includes('buscavazia')) {
        localStorage.removeItem('smartSelectHistory');
        return;
      }

      const [ path, query ] = searchHistory.params.url.split('?');
      const paths = path
        .split("/")
        .filter((x) => x);

      let params = query.includes('c,c,') ? paths.slice(2, paths.length) : paths;

      if(params.length === 3)
        params.splice(1, 1);

      const searchTerm = params.reverse().join(" ");

      const termContainer = $(".resultado-busca-termo");
      if(termContainer.length) {
        termContainer.addClass("has-value");
        termContainer.find('.value').text(searchTerm);
      }

      const buscaVaziaContainer = $("#busca-ft span:empty");
      if(buscaVaziaContainer.length) {
        buscaVaziaContainer.text(searchTerm + '.');
      }
    }
  }

  function handleBuscaPlacaSelection(event, _id) {
    const select = PLACA_SELECTS[0];
    const optionSelected = select.values.find((x) => x.id == event.target.id);

    select.routeSelected = optionSelected.url
        ? optionSelected.url.replace(new URL(optionSelected.url).origin, "")
        : '/' + optionSelected.name.toLowerCase();

    $(`.c-busca__tab-content  #${select.id} > div > span`).html(event.target.innerHTML);
    $(
      `.c-busca__tab-content  #${select.id} > div > .${CONFIG.CSS.ARROW_DOWN}`
      ).hide();
    $(`.c-busca__tab-content  #${select.id} > div > .${CONFIG.CSS.CLOSE}`)
      .show()
      .on("click", () => {
        $(`.c-busca__tab-content  #${select.id} > div > span`).html(
          select.title
        );
        select.routeSelected = "";

        $(
          `.c-busca__tab-content  #${select.id} > div > .${CONFIG.CSS.ARROW_DOWN}`
        ).show();
        $(
          `.c-busca__tab-content  #${select.id} > div > .${CONFIG.CSS.CLOSE}`
        ).hide();
      });

    $('.c-busca__tab-content .c-busca__input #placa-input').click().focus();
  }

  async function buscaPorPlaca(placaString) {
    const select = PLACA_SELECTS[0];

    const FILTROS_VTEX = {
      MONTADORA: 36,
      VEICULO: 50,
      ANO: 48,
      FIPE: 76,
    };

    const modalDeCarregamento = new ModalDeCarregamento();
    let placaSemCaracteresEspeciais = sanitizePlate(placaString);

    try {
      modalDeCarregamento.mostarSpinner();

      const {
        montadora,
        modelo,
        anoModelo,
        fipe,
      } = await obterDadosDoVeiculoViaOlhoNoCarro(placaSemCaracteresEspeciais);

      let [
        montadorasEncontradas,
        modelosEncontrados,
        anosEncontrados,
        fipesEncontrados,
      ] = await Promise.all([
        encontrarDadosNoCadastroVtex({
          filtro: FILTROS_VTEX.MONTADORA,
          regex: obterRegexMontadoras(montadora),
        }),

        encontrarDadosNoCadastroVtex({
          filtro: FILTROS_VTEX.VEICULO,
          regex: obterRegexModelos(montadora, modelo),
        }),

        encontrarDadosNoCadastroVtex({
          filtro: FILTROS_VTEX.ANO,
          regex: obterRegexAnos(anoModelo, fipe),
        }),

        encontrarDadosNoCadastroVtex({
          filtro: FILTROS_VTEX.FIPE,
          regex: obterRegexFipes(fipe),
        }),
      ]);

      if (
        !anosEncontrados.length &&
        !montadorasEncontradas.length &&
        !modelosEncontrados.length &&
        !fipesEncontrados.length
      ) {
        throw new VehicleNotFoundException(placaSemCaracteresEspeciais);
      }

      let url = "",
        parametrosUrl = "?PS=24&map=";

      if(select.routeSelected.length) {
        url += select.routeSelected;
        parametrosUrl += `c,c,`;
      }


      if (fipesEncontrados.length) {
        url += `/${fipesEncontrados[0].Value}`;
        parametrosUrl += `specificationFilter_${FILTROS_VTEX.FIPE},`;
      }

      if (anosEncontrados.length) {
        url += `/${anosEncontrados[0].Value}`;
        parametrosUrl += `specificationFilter_${FILTROS_VTEX.ANO},`;
      }

      if (modelosEncontrados.length) {
        url += `/${modelosEncontrados[0].Value}`;
        parametrosUrl += `specificationFilter_${FILTROS_VTEX.VEICULO},`;
      }

      if (montadorasEncontradas.length) {
        url += `/${montadorasEncontradas[0].Value}`;
        parametrosUrl += `specificationFilter_${FILTROS_VTEX.MONTADORA}`;
      }

      window.buttonBuscarSelected = true;
      window.localStorage.setItem('buttonBuscarSelected', window.buttonBuscarSelected);
      window.localStorage.setItem('buscaPlaca', true);
      $(".texto-placa").text(placaSemCaracteresEspeciais);
      registerGaEvent(placaSemCaracteresEspeciais, url);

      url += parametrosUrl;

      saveSearchInLocalStorage(placaSemCaracteresEspeciais, url);

      location.href = url;
    } catch (error) {
      if (error instanceof VehicleNotFoundException) {
        alert(
          "Desculpe, não conseguimos encontrar o seu veículo, favor utilizar a busca por " +
          "peça ou digitar seu carro e produto na busca livre no topo do site."
        );
      } else {
        alert(
          "Perdão pelo inconveniente! O serviço de busca por placa está fora do " +
          "ar no momento. Favor utilizar a busca por peça!"
        );
      }

      modalDeCarregamento.ocultarSpinner();
      document.querySelector("a[href='#busca-peca']").click();
      registerGaEvent(placaSemCaracteresEspeciais, `não encontrado`);
    }

    function sanitizePlate(plate) {
      return plate.trim().replace(/[\W_]+/g, "").toUpperCase();
    }

    function obterRegexMontadoras(montadora) {
      return new RegExp(montadora.split(" ").join("|"), "gi");
    }

    function obterRegexModelos(montadora, modelo) {
      const montadoraTermos = montadora.split(" ")
        .filter((item) => new RegExp(/[^\W_]+/, "gi").test(item));

      const modeloSemMontadora = mapeiaModeloParaNomenclaturaVtex(modelo, montadoraTermos);
      const modeloSemMontadoraSanitizado = modeloSemMontadora.replace(/[\W]+/gi, "");

      const patternMontadora = `(${montadoraTermos.join('|')})`;
      const patternModelo = `(${modeloSemMontadora}|${modeloSemMontadoraSanitizado})`;

      const pattern = `^${patternModelo}$|${patternMontadora} ${patternModelo}$`;

      return new RegExp(pattern, "gi");
    }

    function obterRegexAnos(anoModelo) {
      return new RegExp(anoModelo.trim(), "gi");
    }

    function obterRegexFipes(fipe) {
      const fipeFormatado = fipe.replace(/(\d+)(\d)$/, '0$1-$2');
      return new RegExp(fipeFormatado, "i");
    }

    async function encontrarDadosNoCadastroVtex({ filtro, regex }) {
      const responseVtex = await fetch(
        `${CONFIG.ORIGIN}/api/catalog_system/pub/specification/fieldValue/${filtro}`
      );

      const dadosVtex = await responseVtex.json();
      const dadosVtexFiltrados = dadosVtex.filter((item) => regex.test(item.Value));

      return dadosVtexFiltrados;
    }

    function VehicleNotFoundException(value) {
      this.value = value;
      this.message = " não retornou resultados.";
      this.toString = function() {
        return this.value + this.message;
      };
    }

    function registerGaEvent(placa, pathGerado) {
      ga('create', 'UA-133498560-1', 'autoglassonline.com', 'gaBPTracker');
      ga('gaBPTracker.set', 'transport', 'beacon');
      ga('gaBPTracker.send', 'event', 'Busca por placa', `Consultar placa (${placa})`, `Resultado: ${pathGerado}`);
    }

    async function obterDadosDoVeiculoViaOlhoNoCarro(placa) {
      const urlApi = window.location.href.includes("hml")
        ? "https://api-hml.autoglass.com.br"
        : "https://api.autoglass.com.br";

      const response = await fetch(`${urlApi}/integracao-b2c/api/web-app/veiculos/${placa}/placas`);
      const veiculo = await response.json();

      montadora = veiculo.Body.Data.Marca;
      modelo = veiculo.Body.Data.Modelo;
      anoModelo = veiculo.Body.Data.DadosBasicosDoVeiculo.AnoModelo;
      fipe = veiculo.Body.Data.DadosBasicosDoVeiculo.InformacoesFipe[0].FipeId;

      var infoBuscaPLaca = JSON.parse(localStorage.getItem('infoBuscaPLaca')) || [];
      infoBuscaPLaca = [{
        montadora: montadora,
        modelo: modelo,
        anoModelo: anoModelo,
        fipe: fipe,
        timestamp: new Date().toLocaleString()
      }];
      localStorage.setItem('infoBuscaPLaca', JSON.stringify(infoBuscaPLaca));

      return { montadora, modelo, anoModelo, fipe };
    }
  }

  function mapeiaModeloParaNomenclaturaVtex(modelo, montadoraTermos) {
    switch (true) {
      case "NEW CLASSIC" === modelo:
        return "CLASSIC";
      case "UP" === modelo:
      case "CROSS UP!" === modelo:
        return "Up!";
      case "FH 520" === modelo:
        return "FH 520";
      case (new RegExp(/^FH (12 )?\d{3}$/i).test(modelo)):
        return "FH 12 Globetroter";
      case (new RegExp(/^FH 16 \d{3}$/i).test(modelo)):
        return "FH 16 Globetroter";
      case (new RegExp(/^NH 12 \d{3}$/i).test(modelo)):
        return "NH 12";
      case (new RegExp(/^NH 10 \d{3}$/i).test(modelo)):
        return "NH 10";
      case "XC70" === modelo:
        return "S40";
      case "E-DELIVERY" === modelo:
        return "DELIVERY";
      case "POLO CLASSIC" === modelo:
        return "Polo Sedan";
      case "SS10" === modelo:
        return "S10";
      case "TTS" === modelo:
        return "TT";
      case (new RegExp(/^[A-Z]-CLASS$/i).test(modelo)):
        return "Classe " + modelo.replace(/-CLASS/gi, "");
      default:
        const modeloSemMontadoraTermos = modelo.replace(
          new RegExp(montadoraTermos.join(' '), "gi"), "").trim();
        return modeloSemMontadoraTermos;
    }
  }

  function saveSearchInLocalStorage(placa, url) {
    localStorage.setItem('smartSelectHistory', JSON.stringify({
      type: activeTab,
      params: {
        plate: placa,
        url,
      },
    }));
  }

  function checkIfUniversalProductSearch() {
    const select = PLACA_SELECTS[0];

    if(select.routeSelected.length) {
      const selectedRoute = select.routeSelected;
      const universalProducts = ['/lampadas', '/higienizadores-e-filtros/higienizadores'];

      if(universalProducts.some(o => selectedRoute.includes(o))) {
        return [
          true,
          `${selectedRoute}?PS=20&map=c,c`
        ];
      } else if(selectedRoute.includes('/borrachas-e-outros/borracha')) {
        return [
          true,
          `/borrachas-e-outros/borracha/borracha-universal-parabrisa?PS=20&map=c,c,c`
        ];
      }
    }
    return [false, ""];
  }

  class ModalDeCarregamento {
    constructor() {
      const listasDeResultados = document.querySelectorAll(
        ".smart-select__main-results"
      );
      const modal = document.querySelector(
        ".c-busca .smart-select__modal"
      );

      this.elementos = [...listasDeResultados, modal];
    }

    mostarSpinner() {
      this.elementos.forEach((elemento) =>
        elemento.classList.add("loader-modal--show")
      );
    }

    ocultarSpinner() {
      this.elementos.forEach((elemento) =>
        elemento.classList.remove("loader-modal--show")
      );
    }
  }

  function selectRightSearchMethod() {
    const { search } = location;
    const smartSelectHistory = JSON.parse(localStorage.getItem('smartSelectHistory'));
    const isValidSearch = smartSelectHistory !== null && smartSelectHistory.type == "#busca-placa";
    const isProductsListPage = search && search.includes('?PS=24&map=');

    if(isValidSearch && isProductsListPage) {
      activeTab = '#busca-placa';

      document.querySelector("a[href='#busca-peca']").parentNode.classList.remove("is-active");
      document.querySelector("#form-busca-peca").parentNode.classList.remove("is-active");
      document.querySelector("a[href='#busca-placa']").parentNode.classList.add("is-active");
      document.querySelector("#form-busca-placa").parentNode.classList.add("is-active");
    }
  }
})();
