(function () {
  /** BUSCA POR PEÇA */
  const Service = ServiceAPI();
  const View = ViewAPI();
  const Controller = ControllerAPI();
  let activeTab = '#busca-peca';

  const CONFIG = {
    ASYNC: {
      MAP_PARAMS: [
        "PS=20&map=c,c,c", // DEFAULT
        ",specificationFilter_36", // MONTADORA
        ",specificationFilter_50", // VEICULO
        ",specificationFilter_48", // ANO
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
    ORIGIN: location.origin,
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
      title: "Peça",
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
  ];

  _init();

  async function _init() {
    const categoryTree = await Service.getCategoryTree();
    const childrenCategories = [];

    categoryTree
      .filter((x) => x.hasChildren)
      .forEach((x) => {
        childrenCategories.push(...x.children);
      });

    _initBucaPlaca(childrenCategories);
    await _initBucaPeca(childrenCategories);
  }

  async function _initBucaPeca(values) {

    PECA_SELECTS[0].values = values;

    await Controller.checkRouterParams();

    View.buildList(PECA_SELECTS[0].values, PECA_SELECTS[0].id);

    PECA_SELECTS.forEach(View._initSelect_);

    // Create Button Function
    $("#form-busca-peca").submit((e) => { e.preventDefault(); Service.search() });
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

      /* $(`.c-busca__tab-content #${select.id} > div:first-child`)
        .focus(() => {

          $(`.c-busca__tab-content #${select.id} > div:first-child`).on(
            "keyup",
            (event) => {
              if (event.key === "Delete" || event.key === "Backspace") {
                const index = PECA_SELECTS.findIndex((x) => x.id === select.id);
                View.resetResults(index);
                $(`.c-busca__tab-content #${select.id}`).click();
              }

              if (event.key === "Enter")
                $(`.c-busca__tab-content #${select.id}`).click();
            }
          );
        })
        .blur(() => {
          $(`.c-busca__tab-content #${select.id} > div:first-child`).unbind(
            "keyup"
          );
        }); */

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
                handleSelection(event, _id);
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
        select.routeSelected = optionSelected.url
          ? optionSelected.url.replace(new URL(optionSelected.url).origin, "")
          : optionSelected.name;
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

          // Caso seja Ano (Ultimo campo) tem que ser decrescente
          index + 1 === PECA_SELECTS.length - 1
            ? values.sort((a, b) => b.name.localeCompare(a.name))
            : values.sort((a, b) => a.name.localeCompare(b.name));

          nextSelect.values = values;
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

    async function checkRouterParams() {
      let { pathname, search } = location;

      if (search && search.includes(CONFIG.ASYNC.MAP_PARAMS[0])) {
        CONFIG.CANT_OPEN = true;
        const arrayPaths = decodeURI(pathname)
          .split("/")
          .filter((x) => x);

        const { input, ...rest } = arrayPaths
          .slice(0, 3)
          .join("/")
          .match(/(\w+\/\w+)/);

        const params = [
          rest[0],
          input,
          ...arrayPaths.slice(3, arrayPaths.length),
        ];

        for (let i = 0; i < params.length; i++) {
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

      if (paths) {
        url += paths;  
        url += `?${buildMapFilters(index - 1)}`;
      }

      localStorage.setItem('smartSelectHistory', JSON.stringify({
        type: activeTab,
        params: {
          plate: null,
          url,
        },
      }));

      location.href = url;
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

  /** CÓDIGO PARA TROCAR AS TABS */
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

  function _initBucaPlaca(values) {
    
    PLACA_SELECTS[0].values = values;

    View.buildList(PLACA_SELECTS[0].values, PLACA_SELECTS[0].id);

    View._initSelect_(PLACA_SELECTS[0]);

    restoreBuscaPlaca();

    let formBuscaPlaca = document.querySelector("#form-busca-placa");

    formBuscaPlaca.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const placa = document.querySelector("#placa-input").value;
      const regexPlaca = /^[A-Z]{3}[\-_]?[0-9][0-9A-Z][0-9]{2}$/i;

      if(0 === placa.length) {
        alert('Você deve inserir a placa do seu veículo!');
      } else if(!placa.trim().match(regexPlaca)) {
        alert('Sua placa não segue um padrão válido!');
      } else {
        buscaPorPlaca(placa);
      }
    });
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
  
        handleSelection(
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
        document
          .querySelector("a[href='#busca-placa']").click();
        document
          .querySelector("#placa-input").value = searchHistory.params.plate;
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

      const buscaVaziaContainer = $("#busca-ft span");
      if(buscaVaziaContainer.length) {
        buscaVaziaContainer.text(searchTerm + '.');
      }
    }
  }

  function handleSelection(event, _id) {
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
    };
  
    const modalDeCarregamento = new ModalDeCarregamento();
    let placaSemCaracteresEspeciais = sanitizePlate(placaString);
  
    try {
      modalDeCarregamento.mostarSpinner();
  
      const response = await fetch(
        `https://crawler-keplaca.herokuapp.com/placa/${placaSemCaracteresEspeciais}`
      );

      const [montadora, modelo, anoModelo] = await response.json();

      if (
        null === montadora &&
        null === modelo &&
        null === anoModelo
      ) {
        throw new VehicleNotFoundException(placaSemCaracteresEspeciais);
      }

      registerGaEvent(placaSemCaracteresEspeciais, `${modelo} ${anoModelo}`);

      const responseMontadorasVtex = await fetch(
        `${CONFIG.ORIGIN}/api/catalog_system/pub/specification/fieldValue/${FILTROS_VTEX.MONTADORA}`
      );
      const montadorasVTEX = await responseMontadorasVtex.json();
      const regexMontadoras = obterRegexMontadoras(montadora);
      let montadorasEncontradas = montadorasVTEX.filter((item) => regexMontadoras.test(item.Value));
  
      const responseModelosVtex = await fetch(
        `${CONFIG.ORIGIN}/api/catalog_system/pub/specification/fieldValue/${FILTROS_VTEX.VEICULO}`
      );
      const modelosVTEX = await responseModelosVtex.json();
      const regexModelos = obterRegexModelos(montadora, modelo);
      let modelosEncontrados = modelosVTEX.filter((item) => regexModelos.test(item.Value));
  
      const responseAnosVtex = await fetch(
        `${CONFIG.ORIGIN}/api/catalog_system/pub/specification/fieldValue/${FILTROS_VTEX.ANO}`
      );
      const anosVTEX = await responseAnosVtex.json();
      const regexAnos = obterRegexAnos(anoModelo);
      let anosEncontrados = anosVTEX.filter((item) => regexAnos.test(item.Value));
  
      let url = "",
        parametrosUrl = "?PS=24&map=";
  
      if (
        !anosEncontrados.length &&
        !montadorasEncontradas.length &&
        !modelosEncontrados.length
      ) {
        throw new VehicleNotFoundException(placaSemCaracteresEspeciais);
      }

      if(select.routeSelected.length) {
        url += select.routeSelected;
        parametrosUrl += `c,c,`;
      }
  
      if (anosEncontrados.length) {
        url += `/${anosEncontrados[0].Value}`;
        parametrosUrl += `specificationFilter_${FILTROS_VTEX.ANO},`;
      }
  
      if (montadorasEncontradas.length) {
        let montadora1 = montadorasEncontradas[0].Value;
        montadora1 = montadora1 === 'Gm' ? 'Chevrolet' : montadora1;

        url += `/${montadora1}`;
        parametrosUrl += `specificationFilter_${FILTROS_VTEX.MONTADORA},`;
      }
  
      if (modelosEncontrados.length) {
        url += `/${modelosEncontrados[0].Value}`;
        parametrosUrl += `specificationFilter_${FILTROS_VTEX.VEICULO}`;
      }
  
      url += parametrosUrl;

      localStorage.setItem('smartSelectHistory', JSON.stringify({
        type: activeTab,
        params: {
          plate: placaSemCaracteresEspeciais,
          url,
        },
      }));

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
      const montadoraTerms = montadora.split(" ")
        .filter((item) => new RegExp(/[^\W_]+/, "gi").test(item));
  
      const modeloSemMontadora = modelo.replace(
        new RegExp(montadoraTerms.join('|'), "gi"), "").trim().split(" ")[0];
  
      const pattern = `${modeloSemMontadora}$` + montadoraTerms.reduce(
        (acc, montadoraTerm) => {
          return `${acc}|${montadoraTerm} ${modeloSemMontadora}$`
        }, "");
  
      return new RegExp(pattern, "gi");
    }
  
    function obterRegexAnos(anoModelo) {
      return new RegExp(anoModelo.trim(), "gi")
    }

    function VehicleNotFoundException(value) {
      this.value = value;
      this.message = " não retornou resultados.";
      this.toString = function() {
        return this.value + this.message;
      };
    }

    function registerGaEvent(placa, modelo) {
      ga('send', 'event', 'Busca por placa', `Consultar ${placa}`, `Resultado: ${modelo}`);
    }
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
})();
