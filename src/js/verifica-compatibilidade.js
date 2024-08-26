(function(){
  const searchHistory = JSON.parse(localStorage.getItem('smartSelectHistory'));
  const placa = searchHistory?.params?.plate;

  function exibeInput() {
      $('.botao-compatibilidade').hide();
      $('.input-container').show();
  }

  $('.botao-placa').on('click', function() {
      $('.tag').hide();
      $('.botao-compatibilidade').show();
      $("#placa-input-compatibilidade").val("");
  });

  $('.botao-compatibilidade').on('click', function() {
      exibeInput();
  });

  if (placa) {
      $(".tag").show();
      $(".texto-placa").text(placa);
      $(".botao-compatibilidade").hide();
  }

  /** BUSCA POR PLACA */
  const Service = ServiceAPI();
  const View = ViewAPI();
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
    ORIGIN: "https://dev2autoglass.myvtex.com", // location.origin,
  };

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

  _init();

  async function _init() {
    const categoryTree = await Service.getCategoryTree();
    const childrenCategories = [];

    categoryTree
    .filter((x) => x.hasChildren)
    .forEach((x) => {
      childrenCategories.push(...x.children);
    });
    _initBuscaPlaca(childrenCategories);
  }

  function ServiceAPI() {
    return {
      getCategoryTree,
    };

    async function getCategoryTree() {
      return await $.get(
        `${CONFIG.ORIGIN}/api/catalog_system/pub/category/tree/${CONFIG.ASYNC.TREE_LEVEL}`
      );
    }
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

  function _initBuscaPlaca(values) {
    PLACA_SELECTS[0].values = values;

    View.buildList(PLACA_SELECTS[0].values, PLACA_SELECTS[0].id);

    View._initSelect_(PLACA_SELECTS[0]);

    restoreBuscaPlaca();

    let formBuscaPlaca = document.querySelector("#form-busca-placa-compatibilidade");

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
        const placa = document.querySelector("#placa-input-compatibilidade").value;
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
  }

  function restoreBuscaPlaca() {
    let { pathname, search } = location;

    const searchHistory = JSON.parse(localStorage.getItem('smartSelectHistory'));
    const isHistoryValid = true;

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
        document.querySelector("#placa-input-compatibilidade").value = searchHistory.params.plate;
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

    $('.c-busca__tab-content .c-busca__input #placa-input-compatibilidade').click().focus();
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
      document.querySelector("a[href='#busca-peca-compatibilidade']").click();
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
      const urlApi = window.location.href.includes("dev")
        ? "https://api-hml.autoglass.com.br"
        : "https://api.autoglass.com.br";
      try{
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
      }catch{
        throw new VehicleNotFoundException(placaSemCaracteresEspeciais);
      }
    }
  }

  function mapeiaModeloParaNomenclaturaVtex(modelo, montadoraTermos) {
    switch (true) {
      case "NEW CLASSIC" === modelo:
        return "CLASSIC";
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
})();
