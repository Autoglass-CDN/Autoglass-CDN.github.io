(function () {
    /** BUSCA POR PEÇA */
    const Service = ServiceAPI();
    const View = ViewAPI();
    const Controller = ControllerAPI();
    let activeTab = "#busca-peca";
    let firstRouteSelected = "";
  
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
      ORIGIN: "https://www.autoglassonline.com.br", // location.origin,
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
  
      console.log(PECA_SELECTS);
  
      await Controller.checkRouterParams();
  
      View.buildList(PECA_SELECTS[0].values, PECA_SELECTS[0].id);
  
      PECA_SELECTS.forEach(View._initSelect_);
  
      // Create Button Function
      $("#form-busca-peca").submit((e) => {
        e.preventDefault();
        Service.search();
      });
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
                case "#busca-peca":
                  Controller.addClick(event, _id);
                  break;
                case "#busca-placa":
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
        } else {
          firstRouteSelected = optionSelected.url
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
  
        if (
          (search && search.includes(CONFIG.ASYNC.MAP_PARAMS[0])) ||
          search.includes("?PS=20&map=c,c")
        ) {
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
  
          if (search.match(/\?PS=20&map=c,c$/)) {
            params = [rest[0]];
          }
  
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
  
        if (firstRouteSelected.length === 0) {
          alert("Selecione pelo menos o produto!");
          return;
        }
  
        if (paths) {
          url += paths;
          url += `?${buildMapFilters(index - 1)}`;
        }
  
        if (index < 1) {
          url = getUrlForFirstSelect(firstRouteSelected, url);
        }
  
        localStorage.setItem(
          "smartSelectHistory",
          JSON.stringify({
            type: activeTab,
            params: {
              plate: null,
              url,
            },
          })
        );
  
        location.href = url;
      }
  
      function getUrlForFirstSelect(route, url) {
        const routeSelected = route.includes("/") ? route : `/${route}`;
  
        return url + routeSelected + "?PS=20&map=c,c";
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
  
        activeTab = tab.querySelector("a").attributes.href.nodeValue;
  
        let tabContentDivs = document.querySelectorAll(".c-busca__tab-content");
  
        tabContentDivs.forEach((div) => div.classList.remove("is-active"));
  
        let selectedSection = document.querySelector(tab.querySelector("a").hash);
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
  
      formBuscaPlaca.addEventListener("submit", (event) => {
        event.preventDefault();
  
        const [isUniversalProduct, redirectUrl] = checkIfUniversalProductSearch();
  
        if (isUniversalProduct) {
          const modalDeCarregamento = new ModalDeCarregamento();
          modalDeCarregamento.mostarSpinner();
  
          location.href = redirectUrl;
        } else {
          const placa = document.querySelector("#placa-input").value;
          const regexPlaca = /^[A-Z]{3}[\-_]?[0-9][0-9A-Z][0-9]{2}$/i;
  
          if (0 === placa.length) {
            alert("Você deve inserir a placa do seu veículo!");
          } else if (!placa.trim().match(regexPlaca)) {
            alert("Sua placa não segue um padrão válido!");
          } else {
            buscaPorPlaca(placa);
          }
        }
      });
    }
  
    function restoreBuscaPlaca() {
      let { pathname, search } = location;
  
      const searchHistory = JSON.parse(
        localStorage.getItem("smartSelectHistory")
      );
      const isHistoryValid =
        searchHistory && searchHistory.type == "#busca-placa";
  
      if (search && search.includes("?PS=24&map=")) {
        if (search.includes("c,c,")) {
          const arrayPaths = decodeURI(pathname)
            .split("/")
            .filter((x) => x);
  
          const param = arrayPaths.slice(0, 2).join("/");
  
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
  
        if (isHistoryValid) {
          document.querySelector("a[href='#busca-placa']").click();
          document.querySelector("#placa-input").value =
            searchHistory.params.plate;
        }
      }
  
      if (isHistoryValid && searchHistory.params.url) {
        if (!search) {
          search = "";
        }
        if (!pathname) {
          pathname = "";
        }
  
        if (!search.includes("?PS=24&map=") && !pathname.includes("buscavazia")) {
          localStorage.removeItem("smartSelectHistory");
          return;
        }
  
        const [path, query] = searchHistory.params.url.split("?");
        const paths = path.split("/").filter((x) => x);
  
        let params = query.includes("c,c,")
          ? paths.slice(2, paths.length)
          : paths;
  
        if (params.length === 3) params.splice(1, 1);
  
        const searchTerm = params.reverse().join(" ");
  
        const termContainer = $(".resultado-busca-termo");
        if (termContainer.length) {
          termContainer.addClass("has-value");
          termContainer.find(".value").text(searchTerm);
        }
  
        const buscaVaziaContainer = $("#busca-ft span:empty");
        if (buscaVaziaContainer.length) {
          buscaVaziaContainer.text(searchTerm + ".");
        }
      }
    }
  
    function handleSelection(event, _id) {
      const select = PLACA_SELECTS[0];
      const optionSelected = select.values.find((x) => x.id == event.target.id);
  
      select.routeSelected = optionSelected.url
        ? optionSelected.url.replace(new URL(optionSelected.url).origin, "")
        : "/" + optionSelected.name.toLowerCase();
  
      $(`.c-busca__tab-content  #${select.id} > div > span`).html(
        event.target.innerHTML
      );
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
  
      $(".c-busca__tab-content .c-busca__input #placa-input").click().focus();
    }
  
    async function buscaPorPlaca(placaString) {
      const select = PLACA_SELECTS[0];
  
      /* const LABEL_DADOS_TABELA = {
        MONTADORA: "Marca",
        MODELO: "Modelo",
        ANO_MODELO: "Ano",
        FIPE: "FIPE",
      }; */
  
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
          // Foi configurado um Crawler em Pyhton nesse endereço que busca no Keplaca
          // Ele evita o bloqueio do CloudFlare e de CORS, e já faz o parsing no HTML
          `https://crawler-keplaca.herokuapp.com/placa/${placaSemCaracteresEspeciais}`
        );
  
        let [montadora, modelo, anoModelo] = await response.json();
  
        if (null === montadora && null === modelo && null === anoModelo) {
          throw new VehicleNotFoundException(placaSemCaracteresEspeciais);
        }
  
        /**
         * Teste com API do Fraga, ao invés do Crawler em Python
         *
        const endpointFragaAuth = 'https://admin.catalogofraga.com.br/connect/token';
        const fragaAuthResponse = await fetch(endpointFragaAuth, {
          method: 'POST',
          headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded",
          }),
          body: (() => {
            return 'grant_type=client_credentials&' +
              'client_id=f5cf87e8-88b8-400e-b494-047' +
              'client_secret=81a77f34df5cf48402b2a12'; // Pegar o correto no e-mail
          })()
        });
  
        const { access_token } = await fragaAuthResponse.json();
        const endpointFragaApi = 'https://api.catalogofraga.com.br/v1/veiculos?placa=';
        const fragaApiResponse = await fetch(endpointFragaApi + placaSemCaracteresEspeciais, {
          method: 'GET',
          headers: new Headers({
            "Authorization": "Bearer " + access_token,
          }),
        });
  
        const {
          marca:  montadora,
          modelos: [{ modelo }],
          anoModelo: ano
        } = await fragaApiResponse.json();
        const anoModelo = ano.toString();
        */
  
        /**
         * Parsing antigo feito diretamento no Front. Isso é feito pelo Crawler em Python agora
         * 
        const html = await response.text();
        const DOM = new DOMParser().parseFromString(html, "text/html");
        const secaoDetalhesDoVeiculo = DOM.querySelector(".fipeTablePriceDetail");
    
        console.log(DOM);
    
        const obterConteudoPeloTituloDaLinhaDaTabela = async (titulo) => {
          const xPathStringTdContemTexto = `//TD[contains(B,'${titulo}')]`;
          const label = document.evaluate(
            xPathStringTdContemTexto,
            secaoDetalhesDoVeiculo,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;
    
          if (!label) {
            return console.error(`Não foi possível encontrar o campo ${titulo}.`);
          }
    
          let valor = label.closest("tr").querySelectorAll("td")[1].innerText;
    
          return valor;
        };
    
        const montadora = await obterConteudoPeloTituloDaLinhaDaTabela(
          LABEL_DADOS_TABELA.MONTADORA
        );
        const modelo = await obterConteudoPeloTituloDaLinhaDaTabela(
          LABEL_DADOS_TABELA.MODELO
        );
        const anoModelo = await obterConteudoPeloTituloDaLinhaDaTabela(
          LABEL_DADOS_TABELA.ANO_MODELO
        );
        */
  
        console.table({
          Montadora: montadora,
          Modelo: modelo,
          Ano: anoModelo,
        });
  
        const responseMontadorasVtex = await fetch(
          `${CONFIG.ORIGIN}/api/catalog_system/pub/specification/fieldValue/${FILTROS_VTEX.MONTADORA}`
        );
        const montadorasVTEX = await responseMontadorasVtex.json();
        const regexMontadoras = obterRegexMontadoras(montadora);
        let montadorasEncontradas = montadorasVTEX.filter((item) =>
          regexMontadoras.test(item.Value)
        );
  
        console.log(montadorasEncontradas);
  
        const responseModelosVtex = await fetch(
          `${CONFIG.ORIGIN}/api/catalog_system/pub/specification/fieldValue/${FILTROS_VTEX.VEICULO}`
        );
        const modelosVTEX = await responseModelosVtex.json();
        const regexModelos = obterRegexModelos(montadora, modelo);
        let modelosEncontrados = modelosVTEX.filter((item) =>
          regexModelos.test(item.Value)
        );
  
        console.log(modelosEncontrados);
  
        const responseAnosVtex = await fetch(
          `${CONFIG.ORIGIN}/api/catalog_system/pub/specification/fieldValue/${FILTROS_VTEX.ANO}`
        );
        const anosVTEX = await responseAnosVtex.json();
        const regexAnos = obterRegexAnos(anoModelo);
        let anosEncontrados = anosVTEX.filter((item) =>
          regexAnos.test(item.Value)
        );
  
        console.log(anosEncontrados);
  
        let url = "",
          parametrosUrl = "?PS=24&map=";
  
        if (
          !anosEncontrados.length &&
          !montadorasEncontradas.length &&
          !modelosEncontrados.length
        ) {
          throw new VehicleNotFoundException(placaSemCaracteresEspeciais);
        }
  
        if (select.routeSelected.length) {
          url += select.routeSelected;
          parametrosUrl += `c,c,`;
        }
  
        if (anosEncontrados.length) {
          url += `/${anosEncontrados[0].Value}`;
          parametrosUrl += `specificationFilter_${FILTROS_VTEX.ANO},`;
        }
  
        if (montadorasEncontradas.length) {
          let montadora1 = montadorasEncontradas[0].Value;
          montadora1 = montadora1 === "Gm" ? "Chevrolet" : montadora1;
  
          url += `/${montadora1}`;
          parametrosUrl += `specificationFilter_${FILTROS_VTEX.MONTADORA},`;
        }
  
        if (modelosEncontrados.length) {
          url += `/${modelosEncontrados[0].Value}`;
          parametrosUrl += `specificationFilter_${FILTROS_VTEX.VEICULO}`;
        }
  
        url += parametrosUrl;
  
        localStorage.setItem(
          "smartSelectHistory",
          JSON.stringify({
            type: activeTab,
            params: {
              plate: placaSemCaracteresEspeciais,
              url,
            },
          })
        );
  
        console.log(url);
        // location.href = url;
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
          console.error(error);
        }
  
        modalDeCarregamento.ocultarSpinner();
        document.querySelector("a[href='#busca-peca']").click();
      }
  
      function sanitizePlate(plate) {
        return plate
          .trim()
          .replace(/[\W_]+/g, "")
          .toUpperCase();
      }
  
      function obterRegexMontadoras(montadora) {
        return new RegExp(montadora.split(" ").join("|"), "gi");
      }
  
      function obterRegexModelos(montadora, modelo) {
        const montadoraTerms = montadora
          .split(" ")
          .filter((item) => new RegExp(/[^\W_]+/, "gi").test(item));
  
        if (montadoraTerms[0].toUpperCase() === "VOLKSWAGEN") {
          montadoraTerms.push("VW");
        }
  
        if (montadoraTerms[0].toUpperCase() === "GM") {
          montadoraTerms.push("CHEV");
        }
  
        const modeloSemMontadoraTerms = modelo
          .replace(new RegExp(montadoraTerms.join("|"), "gi"), "")
          .trim()
          .split(" ");
  
        const newVariants = ["NOVA", "NOVO"];
        let modeloSemMontadora = newVariants.some((e) =>
          modeloSemMontadoraTerms.find((o) => o.toUpperCase() === e)
        )
          ? modeloSemMontadoraTerms[1]
          : modeloSemMontadoraTerms[0];
  
        if (
          modeloSemMontadoraTerms[0].toUpperCase() === "PAJERO" &&
          modeloSemMontadoraTerms[1]
        ) {
          modeloSemMontadora =
            modeloSemMontadoraTerms[0] + " " + modeloSemMontadoraTerms[1];
        }
  
        const modeloSemCaractesEspeciais = modeloSemMontadora.replace(
          /[\W]+/gi,
          ""
        );
  
        const patternMontadora = `(${montadoraTerms.join("|")})`;
        const patternModelo =
          modeloSemMontadora === modeloSemCaractesEspeciais
            ? modeloSemMontadora
            : `(${modeloSemMontadora}|${modeloSemCaractesEspeciais})`;
  
        const isModeloStrada =
          modeloSemCaractesEspeciais.toUpperCase() === "STRADA";
  
        const pattern = `${
          isModeloStrada ? "^" : ""
        }${patternModelo}$|${patternMontadora} ${patternModelo}$`;
  
        console.log(pattern);
  
        return new RegExp(pattern, "gi");
      }
  
      function obterRegexAnos(anoModelo) {
        return new RegExp(anoModelo.trim(), "gi");
      }
  
      function VehicleNotFoundException(value) {
        this.value = value;
        this.message = " não retornou resultados.";
        this.toString = function () {
          return this.value + this.message;
        };
      }
  
      // const regexPotenciaDoMotor = /\d\.\d[A-z]/g;
      // const regexCaracteresAlfabeticos = /[A-z]/g;
  
      // let regexStringFipeDeveConter = modelo
      //   .split(" ")
      //   .map((parteDoModelo) =>
      //     regexPotenciaDoMotor.test(parteDoModelo)
      //       ? parteDoModelo.replace(regexCaracteresAlfabeticos, "")
      //       : parteDoModelo
      //   )
      //   .map((parteDoModelo) => `(?=.*${parteDoModelo})`)
      //   .join(""); //Exemplo: /(?=.*HB20S)(?=.*1.6)(?=.*PREM)/i
  
      // console.log(regexStringFipeDeveConter);
  
      // let regexFipeDeveConterCaseInsensitive = new RegExp(
      //   regexStringFipeDeveConter,
      //   "i"
      // );
  
      // let sugestoesFipe = DOM.querySelector(".fipe-mobile");
  
      // const xPathStringTdContemTextoModelo = `//TD[contains(text(),'Modelo:')]`;
  
      // let iterator = document.evaluate(
      //   xPathStringTdContemTextoModelo,
      //   sugestoesFipe,
      //   null,
      //   XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
      //   null
      // );
  
      // let possiveisFipe = retornarFipesPossiveis(
      //   iterator,
      //   regexFipeDeveConterCaseInsensitive
      // );
  
      // let modeloUrl = retornarUrlDeBusca();
      // let modeloUrl2 = retornarUrlDeBusca2();
  
      // console.log(
      //   montadora,
      //   modelo,
      //   anoModelo,
      //   regexFipeDeveConterCaseInsensitive,
      //   placa,
      //   possiveisFipe,
      //   modeloUrl,
      //   modeloUrl2
      // );
  
      // function retornarUrlDeBusca2(anoModelo, montadora, modelo) {
      //   return `https://autoglassonline.com.br/vidros?fq=specificationFilter_48:${anoModelo}&fq=specificationFilter_36:${montadora
      //     .replaceAll(" ", "%20")
      //     .replace(/\w\S*/g, function (txt) {
      //       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      //     })}&fq=specificationFilter_50:${modelo
      //     .replaceAll(" ", "%20")
      //     .replace(/\w\S*/g, function (txt) {
      //       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      //     })}`;
      // }
  
      // function retornarUrlDeBusca(anoModelo, montadora, modelo) {
      //   return `https://www.autoglassonline.com.br/${anoModelo}/${montadora
      //     .replaceAll(" ", "%20") //Substitui espaços por %20
      //     .replace(/\w\S*/g, function (txt) {
      //       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      //     })}/${modelo.replaceAll(" ", "%20").replace(/\w\S*/g, function (txt) {
      //     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      //   })}?PS=24&map=specificationFilter_${FILTROS_VTEX.ANO},specificationFilter_${
      //     FILTROS_VTEX.MONTADORA
      //   },specificationFilter_${FILTROS_VTEX.VEICULO}`;
      // }
  
      // function retornarFipesPossiveis(
      //   iterator,
      //   regexFipeDeveConterCaseInsensitive
      // ) {
      //   let possiveisFipe = [];
  
      //   try {
      //     var thisNode = iterator.iterateNext();
      //     while (thisNode) {
      //       if (regexFipeDeveConterCaseInsensitive.test(thisNode.innerText)) {
      //         possiveisFipe.push(thisNode.innerText.replace("Modelo:", "").trim());
      //         console.log(thisNode.innerText, thisNode);
      //       }
      //       thisNode = iterator.iterateNext();
      //     }
      //   } catch (e) {
      //     console.log(
      //       "Erro: A árvore de documentos foi modificada durante a iteração " + e
      //     );
      //   }
      //   return possiveisFipe;
      // }
    }
  
    function checkIfUniversalProductSearch() {
      const select = PLACA_SELECTS[0];
  
      if (select.routeSelected.length) {
        const selectedRoute = select.routeSelected;
        const universalProducts = ["/lampadas", "/filtros", "/higienizadores"];
  
        if (universalProducts.some((o) => selectedRoute.includes(o))) {
          return [true, `${selectedRoute}?PS=20&map=c,c`];
        } else if (selectedRoute.includes("/borrachas-e-outros/borracha")) {
          return [
            true,
            `/borrachas-e-outros/borracha/borracha-universal-parabrisa?PS=20&map=c,c,c`,
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
        const modal = document.querySelector(".c-busca .smart-select__modal");
        // const cabecalho = document.querySelector(".smart-select__header");
  
        // this.elementos = [...listasDeResultados, modal, cabecalho];
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
  