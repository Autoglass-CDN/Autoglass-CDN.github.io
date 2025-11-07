(function ($) {
  $(document).ready(function () {
    const buscaPlaca = JSON.parse(localStorage.getItem("buscaPlaca"));

    if (document.body.classList.contains('departamento') || document.body.classList.contains('categoria')) {
      window.Controller = window.Controller || {};
      Controller.checkRouterParams = () => {};
    }

    if (window.innerWidth > 1024 && document.body.classList.contains('categoria') || document.body.classList.contains('departamento')) {
      setTimeout(() => {
        $('#pecas-select-desktop .gtm-smart-peca-select span').text('Tipo de Peça');
        $('#pecas-select-desktop .fa-caret-down').show();
        $('#pecas-select-desktop .fa-close').hide();
        $('#pecas-select-desktop .smart-select__main-results').slideUp(0);
       }, 700);
    }

    if (window.innerWidth > 1024) {
      if (buscaPlaca) {
        const searchHistory = JSON.parse(
          localStorage.getItem("smartSelectHistory")
        );
        const placa = searchHistory?.params?.plate;
        const infoPlaca = JSON.parse(localStorage.getItem("infoBuscaPLaca"));
        $(".tag").show();
        $(".texto-compatibilidade").hide();
        $(".input-container").hide();
        $(".carro-compativel").text(
          "Compatível com: " +
            infoPlaca[0].modelo +
            " " +
            infoPlaca[0].montadora
        );
        $(".texto-placa").text(placa);
      }

      $(".botao-placa").on("click", function () {
        $(".tag").hide();
        $(".input-container").show();
        $(".texto-compatibilidade").show();
        $("#placa-input-compatibilidade").val("");
        $(".carro-compativel").hide();
      });
    } else {
      var abaBuscaPeca = document.getElementById("tab-busca-peca-mobile");
      abaBuscaPeca.querySelector('input[type="radio"]').checked = true;
      sessionStorage.setItem("selectedOptionCategoria", null);
      sessionStorage.setItem("selectedOptionTipoPeca", null);
      sessionStorage.setItem("selectedOptionMontadora", null);
      sessionStorage.setItem("selectedOptionVeiculo", null);
      sessionStorage.setItem("selectedOptionAno", null);
      sessionStorage.setItem("selectedOptionVersao", null);
      sessionStorage.setItem("idAba", "inputBuscaPeca");

      const inputBuscaPlaca = document.querySelector('#main-menu .c-busca__input');
      inputBuscaPlaca.style.display = 'none';
    }

   if (window.innerWidth > 1024) {
    const $todosCampos = $('.c-busca__tabs-content')
      .find('#montadora-select-desktop, #veiculo-select-desktop, #ano-select-desktop, #select-versao-fipe-desktop')
      .closest('.c-busca__select');

    const aplicarEstadoInicial = () => {
      const isNaoSeiPlaca = $('#input-nao-sei-placa').is(':checked');

      if (isNaoSeiPlaca) {
        $todosCampos.each(function () {
          this.style.display = 'none';
        });
      } else {
        $todosCampos.each(function () {
          this.style.display = 'block';
        });
      }
    };

    aplicarEstadoInicial();

    $('#input-nao-sei-placa, #input-busca-placa-desktop').on('change', aplicarEstadoInicial);

    const exibirCampo = (selector) => {
      const $el = $('.c-busca__tabs-content').find(selector).closest('.c-busca__select');
      if ($el.length > 0) {
        $el[0].style.setProperty('display', 'block', 'important');
      }
    };

    const encadearCampo = (origemId, destinoId) => {
      $(`.c-busca__tabs-content #${origemId} li`).on('click', function () {
        if (!$('#input-nao-sei-placa').is(':checked')) return;
        exibirCampo(`#${destinoId}`);
      });
    };

    encadearCampo('pecas-select-desktop', 'montadora-select-desktop');
    encadearCampo('montadora-select-desktop', 'veiculo-select-desktop');
    encadearCampo('veiculo-select-desktop', 'ano-select-desktop');
    encadearCampo('ano-select-desktop', 'select-versao-fipe-desktop');
  }

    if (window.innerWidth > 1024) {
      $('#btn-busca-peca-buscar').on('click', function (e) {
        const isNaoSeiPlaca = $('#input-nao-sei-placa').is(':checked');
        const tipoPecaSelecionado = $('#pecas-select-desktop span').text().trim();

        if (isNaoSeiPlaca && (tipoPecaSelecionado === 'Tipo de Peça' || !tipoPecaSelecionado)) {
          e.preventDefault();
          alert('Favor escolher um tipo de peça!');
          return false;
        }
      });
    }

   if (window.innerWidth <= 1024) {
      const menuPeca = $('#busca-peca-mobile #pecas-select .smart-select__main-results');
      let menuPecaAberto = false;

      $('#busca-peca-mobile #pecas-select > div').off('click').on('click', function (e) {
        e.stopPropagation();
        if (!menuPecaAberto) {
          menuPeca.slideDown('fast');
          menuPecaAberto = true;
        } else {
          menuPeca.slideUp('fast');
          menuPecaAberto = false;
        }
      });

      const menuCategoria = $('#busca-placa-mobile #categoria-select .smart-select__main-results');
      let menuCategoriaAberto = false;

      $('#busca-placa-mobile #categoria-select > div').off('click').on('click', function (e) {
        e.stopPropagation();
        if (!menuCategoriaAberto) {
          menuCategoria.slideDown('fast');
          menuCategoriaAberto = true;
        } else {
          menuCategoria.slideUp('fast');
          menuCategoriaAberto = false;
        }
      });

      $(document).on('click', function (e) {
        const abaClick = $(e.target).closest('.c-busca__tabs-mobile').length > 0;
        if (abaClick) {
          e.stopPropagation();
          return;
        }

        const isInsidePeca = $(e.target).closest('#pecas-select').length > 0;
        const isInsideCategoria = $(e.target).closest('#categoria-select').length > 0;
        const isInputBusca = $(e.target).is('#inputBuscaPeca') || $(e.target).closest('#inputBuscaPeca').length > 0;

        if (!isInsidePeca && !isInputBusca) {
          menuPeca.slideUp('fast');
          menuPecaAberto = false;
        }

        if (!isInsideCategoria) {
          menuCategoria.slideUp('fast');
          menuCategoriaAberto = false;
        }
      });
    }

    if (window.innerWidth > 1024) {
      document.querySelectorAll('.c-busca__tabs li').forEach((tab) => {
        tab.addEventListener('click', () => {
          if (tab.id === "tab-busca-placa") {
            activeTab = "#busca-placa";
          } else {
            activeTab = "#busca-peca";
          }
        });
      });
    }

    if (window.innerWidth > 1024) {
      const abaSelecionada = document.querySelector('.c-busca__tabs li.is-active a');
      activeTab = abaSelecionada ? abaSelecionada.getAttribute('href') : '#busca-peca';
    } else {
      const abaSelecionada = sessionStorage.getItem('idAba');
      activeTab = abaSelecionada === 'inputBuscaPeca' ? '#busca-peca-mobile' : '#busca-placa-mobile';
    }

     if (window.innerWidth <= 1024) {
      const campos = [
        '#montadora-select',
        '#veiculo-select',
        '#ano-select',
        '#versao-select'
      ];

      campos.forEach((id) => {
        $(document).on('click', `${id} .gtm-smart-montadora-select, ${id} .gtm-smart-veiculo-select, ${id} .gtm-smart-ano-select, ${id} .gtm-smart-versao-select`, function (e) {
          e.preventDefault();
          e.stopPropagation();

          const container = $(this).closest('.c-busca__select');
          const menu = container.find('.smart-select__main-results');

          if (menu.is(':visible')) {
            menu.slideUp('fast');
          } else {
            menu.slideDown('fast');
          }
        });
      });
    }

    if (window.innerWidth <= 1024) {
      document.getElementById('inputPlaca').addEventListener('click', () => {
        activeTab = '#busca-placa-mobile';
        sessionStorage.setItem('idAba', 'inputPlaca');
      });

      document.getElementById('inputBuscaPeca').addEventListener('click', () => {
        activeTab = '#busca-peca-mobile';
        sessionStorage.setItem('idAba', 'inputBuscaPeca');
      });
    }
    
    const $ulTabs = $('.c-busca__tabs-mobile.tab-header.search-options');

    const $localOriginal = $('.c-busca__tabs-content-mobile');
    const $buscaPecaContainer = $('.c-busca__tabs-content-mobile #busca-peca-mobile .h-flex');
    
    $('#tab-busca-peca-mobile').on('click', function (e) {
      e.preventDefault();

      const $primeiraSelect = $buscaPecaContainer.find('.c-busca__select').first();
      $ulTabs.detach().insertAfter($primeiraSelect);

      $('#tab-busca-placa-mobile').removeClass('is-active');
      $(this).addClass('is-active');
    });

    $('#tab-busca-placa-mobile').on('click', function (e) {
      e.preventDefault();

      const $divs = $localOriginal.children('div');
      if ($divs.length >= 2) {
        $ulTabs.detach().insertAfter($divs.eq(1));
      } else {
        $ulTabs.detach().appendTo($localOriginal);
      }

      $('#tab-busca-peca-mobile').removeClass('is-active');
      $(this).addClass('is-active');
    });

    $(document).on('click._menuBtnStop', '.menu-btn', function (e) {
      e.stopPropagation();
    });

    if (window.innerWidth <= 1024) {
      $('#busca-peca-mobile #pecas-select .smart-select__main-results')
        .off('click._closeOnPick')
        .on('click._closeOnPick', 'li, li input', function (e) {
          const $menu = $(e.currentTarget).closest('.smart-select__main-results');
          $menu.stop(true, true).slideUp('fast');
        });

      $('#busca-placa-mobile #categoria-select .smart-select__main-results')
        .off('click._closeOnPick')
        .on('click._closeOnPick', 'li, li input', function (e) {
          const $menu = $(e.currentTarget).closest('.smart-select__main-results');
          $menu.stop(true, true).slideUp('fast');
        });
    }
  });

  let activeTab = window.innerWidth > 1024 ? '#busca-placa' : '#busca-placa-mobile';

  /** BUSCA POR PEÇA DEV */
  const Service = ServiceAPI();
  const View = ViewAPI();
  const Controller = ControllerAPI();
  let firstRouteSelected = "";
  let vehicle = "";
  window.buttonBuscarSelected = false;

  window._initSelect_ = View._initSelect_;

  const CONFIG = {
    ASYNC: {
      MAP_PARAMS: [
        "PS=20&map=c,c,c", // DEFAULT
        ",specificationFilter_36", // MONTADORA
        ",specificationFilter_50", // VEICULO
        ",specificationFilter_48", // ANO
        ",specificationFilter_79", //VERSAOFIPE
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
      title: "Tipo de Peça",
      id: window.innerWidth > 1024 ? "pecas-select-desktop" : "pecas-select",
      values: [],
      routeSelected: "",
      isAsyncSearch: true,
      asyncSearchTerm: "",
      canBeClear: true,
    },
    {
      title: "Marca do Veículo",
      id: window.innerWidth > 1024 ? "montadora-select-desktop" : "montadora-select",
      values: [],
      routeSelected: "",
      isAsyncSearch: true,
      asyncSearchTerm: ".Marca.Veículo",
      canBeClear: true,
    },
    {
      title: "Modelo do Veículo",
      id: window.innerWidth > 1024 ? "veiculo-select-desktop" : "veiculo-select",
      values: [],
      routeSelected: "",
      isAsyncSearch: true,
      asyncSearchTerm: ".Modelo.Veículo",
      canBeClear: true,
    },
    {
      title: "Ano",
      id: window.innerWidth > 1024 ? "ano-select-desktop" : "ano-select",
      values: [],
      routeSelected: "",
      isAsyncSearch: true,
      asyncSearchTerm: ".Ano",
      canBeClear: true,
    },
    {
      title: "Versão Fipe do Veículo",
      id: window.innerWidth > 1024 ? "versao-select-desktop" : "versao-select",
      values: [],
      routeSelected: "",
      isAsyncSearch: true,
      asyncSearchTerm: ".Versão.Fipe.Veículo",
      canBeClear: true,
    },
  ];

  window.PECA_SELECTS = PECA_SELECTS;

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

    await _initBuscaPeca(grandchildenCategories);
    _initBuscaPlaca(grandchildenCategories)
    
    window._dadosCategoriasPeca = grandchildenCategories;
  }

  function verificaTelaMobile() {
    return window.innerWidth <= 1024 ? true : false;
  }

  async function _initBuscaPeca(values) {
    PECA_SELECTS[1].values = values;

    await Controller.checkRouterParams();

    View.buildList(PECA_SELECTS[1].values, PECA_SELECTS[1].id);

    if (verificaTelaMobile()) {
      PECA_SELECTS.forEach(View._initSelectMobile_);
    } else {
      PECA_SELECTS.forEach(View._initSelect_);
    }

    // Create Button Function
    window.innerWidth > 1024
      ? $("#form-busca-peca").submit((e) => {
          e.preventDefault();
          Service.search();
          window.localStorage.setItem("buscaPlaca", false);
        })
      : $("#form-busca-peca-mobile").off('submit').on('submit', (e) => {
          e.preventDefault();
          const tipoPecaSelecionada = document.getElementById('opcao-selecionada-pecas-select').textContent.trim();
          if (tipoPecaSelecionada === "") {
            alert("Favor escolher um tipo de peça!");
            return;
          }
          Service.search();
        });
        document.dispatchEvent(new Event('buscaPecaIniciada'));
        bindCloseOnPickCapture('#busca-peca-mobile #pecas-select .smart-select__main-results');
  }

  function ViewAPI() {
    return {
      _initSelect_,
      _initSelectMobile_,
      buildList,
      selectOptionIfButtonHasValue,
      filterResults,
      resetResults,
      virtualizedDOM,
      createNavigation,
    };

  function _initSelectMobile_(select) {
    const container = $(`.c-busca__tab-content-mobile.is-active #${select.id}`);
    const barra = container.find('.gtm-smart-categoria-select');
    const menu = container.find('.smart-select__main-results');

    menu.find('input').off('click').on('click', (e) => {
      e.stopPropagation();
    });

    barra.off('click');
    menu.off('click');
    container.off('click');

    barra.on('click', (e) => {
      e.stopPropagation();

      menu.find('input').val("");

      if (menu.is(':visible')) {
        menu.slideUp('fast');
      } else {
        menu.slideDown('fast');
        menu.find('input').focus();
      }
    });

    menu.on('click', (e) => {
      e.stopPropagation();
    });

    $(document).on('click', (e) => {
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        menu.slideUp('fast');
      }
    });

    if (select.values) {
      View.buildList(select.values, select.id);

      $(`.c-busca__tab-content-mobile #${select.id} .itens-lista li`).off('click._closeMenu').on('click._closeMenu', function () {
        menu.slideUp('fast');
      });
    }

    View.selectOptionIfButtonHasValue(select.id);

    showButtonVerTodas();

      $(
        `.c-busca__tab-content-mobile #${select.id} .smart-select__main-results input`
      )
        .on("keydown", (e) => {
          if (e.key === "Tab" || e.key === "Enter") {
            e.preventDefault();
            $(
              `.c-busca__tab-content-mobile #${select.id} ul li.${CONFIG.CSS.HIGHLIGHT}`
            ).click();
          }

          if (e.key === "ArrowDown") {
            let index = 0;

            $(`.c-busca__tab-content-mobile #${select.id} ul li`).each(
              (i, element) => {
                if (element.classList.contains(CONFIG.CSS.HIGHLIGHT)) {
                  index += i + 2;
                  $(element).removeClass(CONFIG.CSS.HIGHLIGHT);
                }
              }
            );

            if (
              index <=
              $(`.c-busca__tab-content-mobile #${select.id} ul li`).length
            ) {
              $(
                `.c-busca__tab-content-mobile #${select.id} ul li:nth-child(${index})`
              ).addClass(CONFIG.CSS.HIGHLIGHT);

              $(
                `.c-busca__tab-content-mobile #${select.id} .smart-select__main-results ul`
              ).animate(
                {
                  scrollTop:
                    $(
                      `.c-busca__tab-content-mobile #${select.id} ul li:nth-child(${index})`
                    )[0].offsetTop -
                    $(
                      `.c-busca__tab-content-mobile #${select.id} ul li:nth-child(${index})`
                    )[0].scrollHeight -
                    $(
                      `.c-busca__tab-content-mobile #${select.id} ul li:nth-child(${index})`
                    )[0].scrollHeight /
                      2,
                },
                100
              );
            } else {
              $(
                `.c-busca__tab-content-mobile #${select.id} ul li:nth-child(1)`
              ).addClass(CONFIG.CSS.HIGHLIGHT);

              $(
                `.c-busca__tab-content-mobile #${select.id} .smart-select__main-results ul`
              ).animate(
                {
                  scrollTop:
                    $(
                      `.c-busca__tab-content-mobile #${select.id} ul li:nth-child(1)`
                    )[0].offsetTop -
                    ($(
                      `.c-busca__tab-content-mobile #${select.id} ul li:nth-child(1)`
                    )[0].scrollHeight +
                      $(
                        `.c-busca__tab-content-mobile #${select.id} ul li:nth-child(1)`
                      )[0].scrollHeight /
                        2),
                },
                100
              );
            }
          }

          if (e.key === "ArrowUp") {
            let index = 0;

            $(`.c-busca__tab-content-mobile #${select.id} ul li`).each(
              (i, element) => {
                if (element.classList.contains(CONFIG.CSS.HIGHLIGHT)) {
                  index = i;
                  $(element).removeClass(CONFIG.CSS.HIGHLIGHT);
                }
              }
            );

            if (index !== 0) {
              $(
                `.c-busca__tab-content-mobile #${select.id} ul li:nth-child(${index})`
              ).addClass(CONFIG.CSS.HIGHLIGHT);

              $(
                `.c-busca__tab-content-mobile #${select.id} .smart-select__main-results ul`
              ).animate(
                {
                  scrollTop:
                    $(
                      `.c-busca__tab-content-mobile #${select.id} ul li:nth-child(${index})`
                    )[0].offsetTop -
                    ($(
                      `.c-busca__tab-content-mobile #${select.id} ul li:nth-child(${index})`
                    )[0].scrollHeight +
                      $(
                        `.c-busca__tab-content-mobile #${select.id} ul li:nth-child(${index})`
                      )[0].scrollHeight /
                        2),
                },
                100
              );
            } else {
              $(
                `.c-busca__tab-content-mobile #${select.id} ul li:nth-child(${
                  $(`.c-busca__tab-content-mobile #${select.id} ul li`).length
                })`
              ).addClass(CONFIG.CSS.HIGHLIGHT);

              $(
                `.c-busca__tab-content-mobile #${select.id} .smart-select__main-results ul`
              ).animate(
                {
                  scrollTop:
                    $(
                      `.c-busca__tab-content-mobile #${
                        select.id
                      } ul li:nth-child(${
                        $(`.c-busca__tab-content-mobile #${select.id} ul li`)
                          .length
                      })`
                    )[0].offsetTop -
                    ($(
                      `.c-busca__tab-content-mobile #${
                        select.id
                      } ul li:nth-child(${
                        $(`.c-busca__tab-content-mobile #${select.id} ul li`)
                          .length
                      })`
                    )[0].scrollHeight +
                      $(
                        `.c-busca__tab-content-mobile #${
                          select.id
                        } ul li:nth-child(${
                          $(`.c-busca__tab-content-mobile #${select.id} ul li`)
                            .length
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
    }

    function _initSelect_(select) {
      $(`#${select.id}`).click((e) => {
        $(
          `#${select.id} .smart-select__main-results input`
        ).val("");

        if (select.values) {
          View.buildList(select.values, select.id);
          View.selectOptionIfButtonHasValue(select.id);

          if (select.values.length !== 0) {
            $(`#${select.id} .smart-select__main-results`)
              .slideToggle("fast")
              .click((e) => e.stopPropagation());

            $(
              `#${select.id} .smart-select__main-results input`
            ).focus();
          }
        }
      });

      $(`#${select.id} .smart-select__main-results input`)
        .on("keydown", (e) => {
          if (e.key === "Tab" || e.key === "Enter") {
            e.preventDefault();
            $(
              `#${select.id} ul li.${CONFIG.CSS.HIGHLIGHT}`
            ).click();
          }

          if (e.key === "ArrowDown") {
            let index = 0;

            $(`#${select.id} ul li`).each(
              (i, element) => {
                if (element.classList.contains(CONFIG.CSS.HIGHLIGHT)) {
                  index += i + 2;
                  $(element).removeClass(CONFIG.CSS.HIGHLIGHT);
                }
              }
            );

            if (
              index <= $(`#${select.id} ul li`).length
            ) {
              $(
                `#${select.id} ul li:nth-child(${index})`
              ).addClass(CONFIG.CSS.HIGHLIGHT);

              $(
                `#${select.id} .smart-select__main-results ul`
              ).animate(
                {
                  scrollTop:
                    $(
                      `#${select.id} ul li:nth-child(${index})`
                    )[0].offsetTop -
                    $(
                      `#${select.id} ul li:nth-child(${index})`
                    )[0].scrollHeight -
                    $(
                      `#${select.id} ul li:nth-child(${index})`
                    )[0].scrollHeight /
                      2,
                },
                100
              );
            } else {
              $(
                `#${select.id} ul li:nth-child(1)`
              ).addClass(CONFIG.CSS.HIGHLIGHT);

              $(
                `#${select.id} .smart-select__main-results ul`
              ).animate(
                {
                  scrollTop:
                    $(
                      `#${select.id} ul li:nth-child(1)`
                    )[0].offsetTop -
                    ($(
                      `#${select.id} ul li:nth-child(1)`
                    )[0].scrollHeight +
                      $(
                        `#${select.id} ul li:nth-child(1)`
                      )[0].scrollHeight /
                        2),
                },
                100
              );
            }
          }

          if (e.key === "ArrowUp") {
            let index = 0;

            $(`#${select.id} ul li`).each(
              (i, element) => {
                if (element.classList.contains(CONFIG.CSS.HIGHLIGHT)) {
                  index = i;
                  $(element).removeClass(CONFIG.CSS.HIGHLIGHT);
                }
              }
            );

            if (index !== 0) {
              $(
                `#${select.id} ul li:nth-child(${index})`
              ).addClass(CONFIG.CSS.HIGHLIGHT);

              $(
                `#${select.id} .smart-select__main-results ul`
              ).animate(
                {
                  scrollTop:
                    $(
                      `#${select.id} ul li:nth-child(${index})`
                    )[0].offsetTop -
                    ($(
                      `#${select.id} ul li:nth-child(${index})`
                    )[0].scrollHeight +
                      $(
                        `#${select.id} ul li:nth-child(${index})`
                      )[0].scrollHeight /
                        2),
                },
                100
              );
            } else {
              $(
                `#${select.id} ul li:nth-child(${
                  $(`#${select.id} ul li`).length
                })`
              ).addClass(CONFIG.CSS.HIGHLIGHT);

              $(
                `#${select.id} .smart-select__main-results ul`
              ).animate(
                {
                  scrollTop:
                    $(
                      `#${select.id} ul li:nth-child(${
                        $(`#${select.id} ul li`).length
                      })`
                    )[0].offsetTop -
                    ($(
                      `#${select.id} ul li:nth-child(${
                        $(`#${select.id} ul li`).length
                      })`
                    )[0].scrollHeight +
                      $(
                        `#${select.id} ul li:nth-child(${
                          $(`#${select.id} ul li`).length
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

      if (window.innerWidth > 1024) {
        $(document).on("click", (e) => {
          const container = $(`#${select.id}`);
          const isInsideContainer = $(e.target).closest(container).length > 0;

          if (!isInsideContainer) {
            $(`#${select.id} .smart-select__main-results`).slideUp("fast");
          }
        });
        $(`#${select.id} input`).on("click", function (e) {
          e.stopPropagation();
        });
      }
  }

    function defineValorCheckbox(idTarget, _id) {
      if (window.innerWidth > 1024) _id = _id.replace("select", "select-desktop");

      switch (_id) {
        case "categoria-select":
          sessionStorage.setItem("selectedOptionCategoria", idTarget);
          break;
        case "pecas-select":
          sessionStorage.setItem("selectedOptionTipoPeca", idTarget);
          break;
        case "montadora-select":
          sessionStorage.setItem("selectedOptionMontadora", idTarget);
          break;
        case "veiculo-select":
          sessionStorage.setItem("selectedOptionVeiculo", idTarget);
          break;
        case "ano-select":
          sessionStorage.setItem("selectedOptionAno", idTarget);
          break;
        case "versao-select":
          sessionStorage.setItem("selectedOptionVersao", idTarget);
          break;
        default:
          break;
      }
    }

    function verificaValorCheckBox(_id) {
      if (window.innerWidth > 1024) _id = _id.replace("select", "select-desktop");

      switch (_id) {
        case "categoria-select":
          return sessionStorage.getItem("selectedOptionCategoria");
        case "pecas-select":
          return sessionStorage.getItem("selectedOptionTipoPeca");
        case "montadora-select":
          return sessionStorage.getItem("selectedOptionMontadora");
        case "veiculo-select":
          return sessionStorage.getItem("selectedOptionVeiculo");
        case "ano-select":
          return sessionStorage.getItem("selectedOptionAno");
        case "versao-select":
          return sessionStorage.getItem("selectedOptionVersao");
        default:
          break;
      }
    }
    
  function buildList(objects, _id) {
    let html = "";

    if (window.innerWidth <= 1024) {
      if (objects) {
        objects.sort((a, b) => a.name.localeCompare(b.name));

        const savedValue = verificaValorCheckBox(_id);

        objects.forEach((x, index) => {
          const isChecked = savedValue == x.id ? "checked" : "";
          const displayStyle = index >= 5 ? "display: none;" : "";
          html += `<div class="busca-options" style="${displayStyle}">
                      <li role="treeitem" id="${x.id}">
                        <input id="${x.id}" class="input-busca-options" type="radio" name="${_id}" value="${x.id}" ${isChecked}>
                        ${x.name}
                      </li>
                  </div>`;
        });

        $(`.c-busca__tab-content-mobile #${_id} .itens-lista`).html(html);

        $(`.c-busca__tab-content-mobile #${_id} .itens-lista li`).off().on('click', (event) => {
          event.stopPropagation();

          const liElement = event.currentTarget;
          const inputId = liElement?.id;

          switch (activeTab) {
            case "#busca-peca-mobile":
              defineValorCheckbox(inputId, _id);
              Controller.addClick({ target: { id: inputId } }, _id);
              showButtonVerTodas();
              if (_id === "versao-select")
                ajustaLayoutAposOpcoesSelecionadas();
              break;

            case "#busca-placa-mobile":
              defineValorCheckbox(inputId, _id);
              handleBuscaPlacaSelection({ target: { id: inputId } }, _id);
              break;
          }
        });

      $(`.c-busca__tab-content-mobile #${_id} .itens-lista li`)
        .first()
        .addClass(CONFIG.CSS.HIGHLIGHT);
       $(`.botao-ver-todas`).show();

    } else {
      $(`.c-busca__tab-content-mobile #${_id} .itens-lista`).html(
        `<li style="background: white; color:#707070; cursor: default">Nenhum resultado encontrado.</li>`
      );
    }

  } else if (objects) {
    objects.sort((a, b) => a.name.localeCompare(b.name));

    objects.forEach(
      (x) => (html += `<li role="treeitem" id="${x.id}">${x.name}</li>`)
    );

    $(`#${_id} ul`).html(html);

    $(`#${_id} ul li`)
      .hover((event) => {
        $(`#${_id} ul li`).removeClass(CONFIG.CSS.HIGHLIGHT);
        $(event.target).addClass(CONFIG.CSS.HIGHLIGHT);
      })
      .on('click', (event) => {
        switch (activeTab) {
              case "#busca-peca":
                Controller.addClick(event, _id);
                break;
              case "#busca-placa":
              case "#busca-categoria":
                handleBuscaPlacaSelection(event, _id);
                break;
        }
      });

    $(`#${_id} ul li`)
      .first()
      .addClass(CONFIG.CSS.HIGHLIGHT);

  } else {
    $(`#${_id} ul`).html(
      `<li style="background: white; color:#707070; cursor: default">Nenhum resultado encontrado.</li>`
    );
  }
}

    function selectOptionIfButtonHasValue(type) {
      if (window.innerWidth > 1024) {
        $(`.c-busca__tab-content > .${type} ul li`).each((_, element) => {
          if (
            element.innerHTML ===
            $(`.c-busca__tab-content > .${type} div > span`).html()
          )
            $(element).addClass(CONFIG.CSS.SELECTED);
        });
      } else {
        $(`.c-busca__tab-content-mobile > .${type} ul li`).each(
          (_, element) => {
            if (
              element.innerHTML ===
              $(`.c-busca__tab-content-mobile > .${type} div > span`).html()
            )
              $(element).addClass(CONFIG.CSS.SELECTED);
          }
        );
      }
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
        if (window.innerWidth > 1024) {
          $(` #${select.id} > div > span`).html(
            select.title
          );
          select.routeSelected = "";

          if (nextSelect && nextSelect.canBeClear) {
            $(`#${nextSelect.id}`).addClass(
              CONFIG.CSS.EMPTY
            );

            nextSelect.values = [];
            nextSelect.routeSelected = "";
          }

          $(
            ` #${select.id} > div > .${CONFIG.CSS.ARROW_DOWN}`
          ).show();
          $(
            ` #${select.id} > div > .${CONFIG.CSS.CLOSE}`
          ).hide();
        }
      }
    }

    function createNavigation(_class, new_title) {
      const index = PECA_SELECTS.findIndex((x) => x.id === _class);
      const select = PECA_SELECTS[index];
      const nextSelect = PECA_SELECTS[index + 1];
      if (window.innerWidth > 1024) {
        $(` #${select.id} > div > span`).html(new_title);
        $(
          ` #${select.id} > div > .${CONFIG.CSS.ARROW_DOWN}`
        ).hide();
        $(` #${select.id} > div > .${CONFIG.CSS.CLOSE}`)
          .show()
          .on("click", () => resetResults(index));

        if (nextSelect) {
          $(`#${nextSelect.id}`).removeClass(
            CONFIG.CSS.EMPTY
          );

          if (!CONFIG.CANT_OPEN) {
            $(`#${nextSelect.id}`).click();
          }
        } else {
          if (!CONFIG.CANT_OPEN) {
            $(` #${select.id}`).click().focus();
          }
        }
      } else {
        if (nextSelect) {
          $(`.c-busca__tab-content-mobile #${nextSelect.id}`).removeClass(
            CONFIG.CSS.EMPTY
          );

          if (!CONFIG.CANT_OPEN) {
            $(`.c-busca__tab-content-mobile #${nextSelect.id}`).click();
          }
        } else {
          if (!CONFIG.CANT_OPEN) {
            $(`.c-busca__tab-content-mobile  #${select.id}`).click().focus();
          }
        }
      }

      if ($('#tab-nao-sei-placa-desktop').hasClass('is-active')) {
        $('#busca-peca').addClass('is-active');
        $('#busca-placa').removeClass('is-active');
      } else {
        $('#busca-peca').removeClass('is-active');
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

  window.View = ViewAPI();

  function ControllerAPI() {
    return {
      addClick,
      checkRouterParams,
    };

    async function addClick(event, _id) {
      const isBuscaPorPlaca = PLACA_SELECTS.some(x => x.id === _id);
      const isBuscaPorPeca = PECA_SELECTS.some(x => x.id === _id);

      if (isBuscaPorPlaca) {
        const select = PLACA_SELECTS.find(x => x.id === _id);
        const optionSelected = select.values.find(x => x.id == event.target.id);
        const textoOpcaoSelecionada = document.getElementById(`opcao-selecionada-${select.id}`);

        if (textoOpcaoSelecionada) {
          textoOpcaoSelecionada.textContent = `${optionSelected.name}`;
        }

        select.routeSelected = optionSelected.url
          ? optionSelected.url.replace(new URL(optionSelected.url).origin, "")
          : "/" + optionSelected.name.toLowerCase();

        if (window.innerWidth <= 1024) {
          const listItems = document.querySelectorAll(`#${_id} .itens-lista li`);
          selecionarInputPorId(listItems, event.target.id);
        }

        return;
      }

      if (isBuscaPorPeca) {
        const index = PECA_SELECTS.findIndex(x => x.id === _id);
        const select = PECA_SELECTS[index];
        const nextSelect = PECA_SELECTS[index + 1];

        const optionSelected = select.values.find(x => x.id == event.target.id);
        const textoOpcaoSelecionada = document.getElementById(`opcao-selecionada-${select.id}`);
        const modalDeCarregamento = new ModalDeCarregamento();
        modalDeCarregamento.mostarSpinner();

        if (window.innerWidth <= 1024) {
          for (let i = index + 1; i < PECA_SELECTS.length; i++) {
            const nextField = PECA_SELECTS[i];
            const divSelect = document.getElementById(nextField.id);
            const spanSelecionado = document.getElementById(`opcao-selecionada-${nextField.id}`);

            if (divSelect) {
              const wrapper = divSelect.closest('.c-busca__select');
              if (wrapper) {
                wrapper.style.display = 'none';
              }

              if (spanSelecionado) {
                const textoPadrao = spanSelecionado.getAttribute('');
                spanSelecionado.textContent = textoPadrao;
              }

              nextField.values = [];
              View.resetResults(i);
            }
          }
        }

        if (textoOpcaoSelecionada) {
          textoOpcaoSelecionada.textContent = `${optionSelected.name}`;
        }

        window._naoSeiPlacaAtivo = document.getElementById('input-nao-sei-placa')?.checked || false;

        if (window.innerWidth > 1024 && select.id === 'pecas-select-desktop') {
          document.querySelector('#montadora-select-desktop')?.closest('.c-busca__select')
            ?.style.setProperty('display', 'block', 'important');
        }

        View.resetResults(index);
        if (index !== 0) {
          select.routeSelected = getSelectedRouteByOption(optionSelected);
        } else {
          firstRouteSelected = getSelectedRouteByOption(optionSelected);
        }

        if (index === 3) {
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
              ? (values = filterVersaoFipe(values, vehicle))
              : values;

            index + 1 === PECA_SELECTS.length - 2
              ? values.sort((a, b) => b.name.localeCompare(a.name))
              : values.sort((a, b) => a.name.localeCompare(b.name));

            nextSelect.values =
              nextSelect.title == "Veículo"
                ? vehiclesWithoutBrand(values, optionSelected.name)
                : values;

            hideDivVersaoFipe(values.length, nextSelect.id);
          } else {
            nextSelect.values = optionSelected.children.sort((a, b) =>
              a.name.localeCompare(b.name)
            );

            hideDivVersaoFipe(nextSelect.values.length, nextSelect.id);
          }

          View.buildList(nextSelect.values, nextSelect.id);

          if (window.innerWidth <= 1024) {
            const containerNext = $(`.c-busca__tab-content-mobile #${nextSelect.id}`);
            const menuNext = containerNext.find('.smart-select__main-results');

            if (menuNext.length) {
              menuNext.slideDown('fast');
              menuNext.find('input').focus();
            }
          }

          const $wrapper = $(`#${nextSelect.id}`).closest('.c-busca__tabs-content .c-busca__select');
          if ($wrapper.length) {
            $wrapper.css('display', 'block');
          }
        }

        if (window.innerWidth <= 1024) {
          const listItems = document.querySelectorAll(`#${_id} .itens-lista li`);

          if (select.id === "pecas-select") {
            selecionarInputPorIdBuscaPeca(listItems, event.target.id);
          } else {
            selecionarInputPorNomeBuscaPeca(event.target.innerText, select.id);
          }

          $(`.c-busca__tab-content-mobile #${select.id} .smart-select__main-results`).slideUp("fast");
          if (nextSelect)
            $(`#${nextSelect.id}`).closest('.c-busca__select').show();
        }

        View.createNavigation(select.id, event.target.innerHTML);
        modalDeCarregamento.ocultarSpinner();
      }
    }

    function selecionarInputPorIdBuscaPeca(listItems, id) {
      listItems.forEach((item) => {
        const radioInput = item.querySelector('input[type="radio"]');
        if (radioInput) {
          radioInput.checked = false;

          if (item.id === id) {
            radioInput.checked = true;
          }
        }
      });
    }

    function selecionarInputPorNomeBuscaPeca(nome, nomeSelect) {
      const secaoSelectDiv = document.getElementById(`${nomeSelect}`);
      const listItems = secaoSelectDiv.querySelectorAll("ul li");

      listItems.forEach((item) => {
        const radioInput = item.querySelector('input[type="radio"]');
        if (radioInput) {
          radioInput.checked = false;

          if (item.textContent.trim() === nome) {
            radioInput.checked = true;
          }
        }
      });
    }

    function hideDivVersaoFipe(length, id) {
      const container = document.getElementById(id)?.closest(".c-busca__select");
      if (!container) return;

      if (length === 0) {
        setTimeout(() => {
          container.style.setProperty("display", "none", "important");
        }, 0.5);
      } else {
        $(container).show();
      }
    }

    function filterVersaoFipe(values, vehicle) {
      return values.filter((value) =>
        value.name.toLowerCase().includes(vehicle)
      );
    }

    function vehiclesWithoutBrand(vehicles, brand) {
      return vehicles.filter(
        (vehicle) => !RegExp(`\\b${brand}\\b`, "i").test(vehicle.name)
      );
    }

    function getSelectedRouteByOption(optionSelected) {
      return optionSelected.url
        ? optionSelected.url.replace(new URL(optionSelected.url).origin, "")
        : optionSelected.name;
    }

    async function checkRouterParams() {
      let { pathname, search } = location;

      search = decodeURIComponent(search);

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
      return await window.jQuery.get(
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
      if (window.innerWidth <= 1024)
        document.querySelector("#side-menu .loading-overlay").style.display =
          "block";
      if (firstRouteSelected.length === 1) {
        alert("Selecione pelo menos o primeiro campo!");
        return;
      }

      if (paths) {
        url += paths;
        url += `?${buildMapFilters(index - 1)}`;
      }

      if (index < 1) {
        url = getUrlForFirstSelect(firstRouteSelected, url);
      }

      window.buttonBuscarSelected = true;
      window.sessionStorage.setItem(
        "buttonBuscarSelected",
        window.buttonBuscarSelected
      );

      saveSearchInLocalStorage(null, url);

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

  if (window.innerWidth > 1024) {
  const inputBuscaPlaca = document.getElementById('input-busca-placa-desktop');
  const inputNaoSeiPlaca = document.getElementById('input-nao-sei-placa');

  const divBuscaPlaca = document.getElementById('busca-placa');
  const divBuscaPeca = document.getElementById('busca-peca');

  const tabBuscaPlaca = document.getElementById('tab-busca-placa-desktop');
  const tabNaoSeiPlaca = document.getElementById('tab-nao-sei-placa-desktop');

  // setTimeout(() => {
  // if (inputBuscaPlaca && inputNaoSeiPlaca) {
  //     inputNaoSeiPlaca.checked = true;
  //     inputBuscaPlaca.checked = false;
  // }
  // }, 300);

  function ativarBuscaPlaca() {
    inputBuscaPlaca.checked = true;

    tabBuscaPlaca.classList.add('is-active');
    tabNaoSeiPlaca.classList.remove('is-active');

    divBuscaPlaca.classList.add('is-active');
    divBuscaPeca.classList.remove('is-active');
  }

  function ativarBuscaPeca() {
  inputNaoSeiPlaca.checked = true;

  tabNaoSeiPlaca.classList.add("is-active");
  tabBuscaPlaca.classList.remove("is-active");

  divBuscaPlaca.classList.remove("is-active");
  divBuscaPeca.classList.add("is-active");

  sessionStorage.setItem("idAba", "inputBuscaPeca");
}

  ativarBuscaPeca();

  if (inputNaoSeiPlaca && inputNaoSeiPlaca.checked) {
    ativarBuscaPeca();
  }

  inputBuscaPlaca.addEventListener('change', () => {
    ativarBuscaPlaca();
  });
  inputNaoSeiPlaca.addEventListener('change', () => {
    ativarBuscaPeca();

    const exibirCampo = (selector) => {
      const $el = $('.c-busca__tabs-content').find(selector).closest('.c-busca__select');
      if ($el.length > 0) {
        $el[0].style.setProperty('display', 'block', 'important');
      }
    };

    const encadearCampo = (origemId, destinoId) => {
      if (!$('#input-nao-sei-placa').is(':checked')) return;
      const textoSpan = $(`#${origemId} .gtm-smart-peca-select span`).text().trim();
      const liCorrespondente = $(`#${origemId} li`).filter(function() {
        return $(this).text().trim() === textoSpan;
      });

      if (liCorrespondente.length > 0) {
        liCorrespondente.trigger('click');
      }

      exibirCampo(`#${destinoId}`);
    };

    encadearCampo('pecas-select-desktop', 'montadora-select-desktop');
    encadearCampo('montadora-select-desktop', 'veiculo-select-desktop');
    encadearCampo('veiculo-select-desktop', 'ano-select-desktop');
    encadearCampo('ano-select-desktop', 'select-versao-fipe-desktop');
  });


} else {
  AlternaAbaBusca();
  window.addEventListener('DOMContentLoaded', () => { 
    menuCategoriasMobile();
  
    const tabPecaPadrao = document.getElementById('inputBuscaPeca');
  
    if (tabPecaPadrao) {
      tabPecaPadrao.checked = true;
      sessionStorage.setItem("idAba", "tabPecaPadrao");
    }
  });
}

function bindCloseOnPickCapture(selector) {
  const menu = document.querySelector(selector);
  if (!menu) return;

  menu.__closeOnPickCapture && menu.removeEventListener('click', menu.__closeOnPickCapture, true);

  menu.__closeOnPickCapture = function(e) {
    const li = e.target.closest('li');
    if (!li || !menu.contains(li)) return;

    setTimeout(() => {
      $(menu).stop(true, true).slideUp('fast');
    }, 50);
  };

  menu.addEventListener('click', menu.__closeOnPickCapture, true);
}

 function AlternaAbaBusca() {
  const tabs = document.querySelectorAll(".c-busca__tabs-mobile li");

  const escapeIdForSelector = (id) =>
    id.replace(/([ #;?%&,.+*~':"!^$[\]()=>|/])/g, '\\$1');

  function copiarEstadoEntreCampos(origemSelector, destinoSelector, origemContainer, destinoContainer) {
    const origemSpan = document.querySelector(origemSelector);
    const destinoSpan = document.querySelector(destinoSelector);

    if (origemSpan && destinoSpan && origemSpan.textContent.trim() !== "") {
      destinoSpan.textContent = origemSpan.textContent;

      const inputSelecionado = document.querySelector(`${origemContainer} input.input-busca-options:checked`);
      if (inputSelecionado) {
        const itemId = inputSelecionado.closest("li")?.id;
        const escapedId = escapeIdForSelector(itemId);
        const destinoInputSelector = `${destinoContainer} li[id="${escapedId}"] input.input-busca-options`;
        const destinoInput = document.querySelector(destinoInputSelector);
        if (destinoInput) destinoInput.checked = true;
      }
    }
  }

  function copiarEstadoParaBuscarComPlaca() {
    copiarEstadoEntreCampos(
      "#opcao-selecionada-pecas-select",
      "#opcao-selecionada-categoria-select",
      '#busca-peca-mobile .c-busca__select #pecas-select .smart-select__main-results .itens-lista .busca-options',
      '#busca-placa-mobile .c-busca__select #categoria-select .smart-select__main-results .itens-lista .busca-options'
    );
  }

  function copiarEstadoParaNaoSeiMinhaPlaca() {
    copiarEstadoEntreCampos(
      "#opcao-selecionada-categoria-select",
      "#opcao-selecionada-pecas-select",
      '#busca-placa-mobile .c-busca__select #categoria-select .smart-select__main-results .itens-lista .busca-options',
      '#busca-peca-mobile .c-busca__select #pecas-select .smart-select__main-results .itens-lista .busca-options'
    );
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", async (event) => {
      event.preventDefault();
      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");

      const abaInput = tab.querySelector('input[type="radio"]');
      abaInput.checked = true;
      sessionStorage.setItem("idAba", abaInput.id);

      const activeTabId = tab.querySelector("a").getAttribute("href");
      const tabContentDivs = document.querySelectorAll(".c-busca__tab-content-mobile");
      tabContentDivs.forEach((div) => div.classList.remove("is-active"));
      const selectedSection = document.querySelector(activeTabId);
      selectedSection?.classList.add("is-active");

      const inputContainer = document.querySelector('#main-menu .c-busca__input');
      inputContainer.style.display = (abaInput.id === 'inputPlaca') ? 'block' : 'none';

      if (window.innerWidth <= 1024) {
        if (abaInput.id === 'inputBuscaPeca') {
          if (window._dadosCategoriasPeca?.length) {
            await _initBuscaPeca(window._dadosCategoriasPeca);
          }

          copiarEstadoParaNaoSeiMinhaPlaca();

          setTimeout(() => {
            const liSelecionado = document.querySelector('#busca-peca-mobile li input.input-busca-options:checked')?.closest('li');
            liSelecionado?.click();
          }, 20);

          setTimeout(() => {
            const container = $('#busca-peca-mobile #pecas-select');
            const menu = container.find('.smart-select__main-results');

            if (!menu.is(':visible')) {
              menu.stop(true, true).slideDown('fast');
            }
          }, 10);
        }

        if (abaInput.id === 'inputPlaca') {
          if (window._dadosCategoriasPlaca?.length) {
            await _initBuscaPlaca(window._dadosCategoriasPlaca);
          }

          setTimeout(() => {
            copiarEstadoParaBuscarComPlaca();
            const liSelecionado = document.querySelector('#busca-placa-mobile li input.input-busca-options:checked')?.closest('li');
            liSelecionado?.click();

            setTimeout(() => {
              inputPlaca.value = inputBuscaPeca.value;
              inputPlaca.dispatchEvent(new Event("input"));
              inputPlaca.dispatchEvent(new Event("change"));
              inputPlaca.dispatchEvent(new Event("blur"));
            }, 10);
          }, 20);
          
          setTimeout(() => {
              const container = $('#busca-placa-mobile #categoria-select');
              const menu = container.find('.smart-select__main-results');

              if (!menu.is(':visible')) {
                menu.stop(true, true).slideDown('fast');
              }
            }, 5);
        }
      }
    });

    const abaInput = tab.querySelector('input[type="radio"]');
    abaInput.addEventListener("click", (e) => {
      e.stopPropagation();
      tab.click();
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    copiarEstadoParaBuscarComPlaca();
  });

  if (window.innerWidth <= 1024) {
    bindCloseOnPickCapture('#busca-peca-mobile #pecas-select .smart-select__main-results');
    bindCloseOnPickCapture('#busca-placa-mobile #categoria-select .smart-select__main-results');
  }
}

  function menuCategoriasMobile () {
    let iconeLista = document.querySelector("#tab-busca-categoria-mobile .icone-lista");
    let categoriaListaMobile = document.querySelector("#busca-categoria-mobile");

    iconeLista.addEventListener('click', (event) => {
      event.preventDefault();

      categoriaListaMobile.classList.add("is-active");
    });
  }

  /** BUSCA POR PLACA */

  const PLACA_SELECTS = [
  {
    title: "Tipo de Peça",
    id: "categoria-select",
    values: [],
    routeSelected: "",
    isAsyncSearch: false,
    asyncSearchTerm: "",
    canBeClear: false
  }
];

function _initBuscaPlaca(values) {
  PLACA_SELECTS[0].values = values;

  const selectCategoria = PLACA_SELECTS.find(s => s.id === 'categoria-select');

  View.buildList(selectCategoria.values, selectCategoria.id);

  if (window.innerWidth > 1024) {
    View._initSelect_(selectCategoria);
  } else {
    View._initSelectMobile_(selectCategoria);
  }

  restoreBuscaPlaca();

    let formBuscaPlaca =
      window.innerWidth > 1024
        ? document.querySelector("#form-busca-placa")
        : document.querySelector("#form-busca-placa-mobile");

    formBuscaPlaca.addEventListener("submit", (event) => {
      event.preventDefault();

      const [isUniversalProduct, redirectUrl] = checkIfUniversalProductSearch();

      if (isUniversalProduct) {
        const modalDeCarregamento = new ModalDeCarregamento();
        modalDeCarregamento.mostarSpinner();

        location.href = redirectUrl;
      } else {
        const placa =
          window.innerWidth > 1024
            ? document.querySelector("#placa-input").value
            : document.querySelector("#placa-input-mobile").value;
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

    // Seleciona a lupa correta conforme o dispositivo
    let iconeLupa =
      window.innerWidth > 1024
        ? document.querySelector(".icone-lupa")
        : document.querySelector(".icone-lupa-mobile");

    // Faz a lupa disparar o submit
    if (iconeLupa) {
      iconeLupa.addEventListener("click", () => {
        formBuscaPlaca.requestSubmit(); // dispara o evento 'submit'
      });
    }

    document.dispatchEvent(new Event('buscaPlacaIniciada'));
    bindCloseOnPickCapture('#busca-placa-mobile #categoria-select .smart-select__main-results');
  }

  function restoreBuscaPlaca() {
    let { pathname, search } = location;

    const searchHistory = JSON.parse(
      localStorage.getItem("smartSelectHistory")
    );
    const isHistoryValid =
      searchHistory && searchHistory.type == "#busca-placa";

    if (search && search.includes("?PS=24&map=")) {
      if (search.includes("c,c,c,")) {
        const arrayPaths = decodeURI(pathname)
          .split("/")
          .filter((x) => x);

        const param = arrayPaths.slice(0, 2).join("/");

        const select = PLACA_SELECTS.find(x => x.id === 'categoria-select');
        if (!select) {
          console.error('Categoria não encontrada em PLACA_SELECTS');
          return;
        }

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

      if (isHistoryValid) {
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

      let params = query.includes("c,c,c,")
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

  function handleBuscaPlacaSelection(event, selectId) {
    const select = PLACA_SELECTS.find((s) => s.id === selectId);
    const textoOpcaoSelecionada = document.getElementById(`opcao-selecionada-${selectId}`);

    const targetId = event.target.id;

    const optionSelected = select.values.find((x) => x.id == targetId);
    if (!optionSelected) {
      console.warn("Opção não encontrada para o ID:", targetId);
      return;
    }

    select.routeSelected = optionSelected.url
      ? optionSelected.url.replace(new URL(optionSelected.url).origin, "")
      : "/" + optionSelected.name.toLowerCase();

    if (textoOpcaoSelecionada) {
      textoOpcaoSelecionada.textContent = optionSelected.name;
    }

    const liElement = document.getElementById(targetId);
    if (liElement) {
      const inputRadio = liElement.querySelector('input[type="radio"]');
      if (inputRadio) {
        inputRadio.checked = true;
      }
    }

    $(`.c-busca__tab-content #${selectId} > div > span`).html(optionSelected.name);
    $(`.c-busca__tab-content #${selectId} > div > .${CONFIG.CSS.ARROW_DOWN}`).hide();
    $(`.c-busca__tab-content #${selectId} > div > .${CONFIG.CSS.CLOSE}`)
      .show()
      .on("click", () => {
        if (textoOpcaoSelecionada) {
          textoOpcaoSelecionada.textContent = select.title;
        }
        select.routeSelected = "";

        $(`.c-busca__tab-content #${selectId} > div > .${CONFIG.CSS.ARROW_DOWN}`).show();
        $(`.c-busca__tab-content #${selectId} > div > .${CONFIG.CSS.CLOSE}`).hide();
      });

    document.querySelectorAll(`#${selectId} .smart-select__main-results li`).forEach((el) => {
      el.classList.remove('active');
    });

    if (liElement) {
      liElement.classList.add('active');
    }
  }

  function selecionarInputPorId(listItems, id) {
    listItems.forEach((item) => {
      const radioInput = item.querySelector('input[type="radio"]');
      if (radioInput && item.id === id) {
        radioInput.checked = true;
      } else if (radioInput) {
        radioInput.checked = false;
      }
    });
  }

  async function buscaPorPlaca(placaString) {
    const select = window.innerWidth > 1024 ? PECA_SELECTS[1] : PLACA_SELECTS[0];

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
      if (window.innerWidth <= 1024)
        document.querySelector("#side-menu .loading-overlay").style.display =
          "block";

      const { montadora, modelo, anoModelo, fipe } =
        await obterDadosDoVeiculoViaOlhoNoCarro(placaSemCaracteresEspeciais);

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

        fipe ? encontrarDadosNoCadastroVtex({
          filtro: FILTROS_VTEX.FIPE,
          regex: obterRegexFipes(fipe),
        }) : [],
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

      if (select.routeSelected.length) {
        url += select.routeSelected;
        parametrosUrl += `c,c,c,`;
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
      if (window.innerWidth > 1024) {
        $(".texto-placa").text(placaSemCaracteresEspeciais);
      }
      window.sessionStorage.setItem(
        "buttonBuscarSelected",
        window.buttonBuscarSelected
      );
      window.localStorage.setItem("buscaPlaca", true);
      window.buttonBuscarSelected = true;
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
      if (window.innerWidth <= 1024)
        document.querySelector("#side-menu .loading-overlay").style.display =
          "none";
      modalDeCarregamento.ocultarSpinner();
      document.querySelector("a[href='#busca-peca']").click();
      registerGaEvent(placaSemCaracteresEspeciais, `não encontrado`);
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
      const montadoraTermos = montadora
        .split(" ")
        .filter((item) => new RegExp(/[^\W_]+/, "gi").test(item));

      const modeloSemMontadora = mapeiaModeloParaNomenclaturaVtex(
        modelo,
        montadoraTermos
      );
      const modeloSemMontadoraSanitizado = modeloSemMontadora.replace(
        /[\W]+/gi,
        ""
      );

      const patternMontadora = `(${montadoraTermos.join("|")})`;
      const patternModelo = `(${modeloSemMontadora}|${modeloSemMontadoraSanitizado})`;

      const pattern = `^${patternModelo}$|${patternMontadora} ${patternModelo}$`;

      return new RegExp(pattern, "gi");
    }

    function obterRegexAnos(anoModelo) {
      return new RegExp(anoModelo.trim(), "gi");
    }

    function obterRegexFipes(fipe) {
      const fipeFormatado = fipe.replace(/(\d+)(\d)$/, "0$1-$2");
      return new RegExp(fipeFormatado, "i");
    }

    async function encontrarDadosNoCadastroVtex({ filtro, regex }) {
      const responseVtex = await fetch(
        `${CONFIG.ORIGIN}/api/catalog_system/pub/specification/fieldValue/${filtro}`
      );

      const dadosVtex = await responseVtex.json();
      const dadosVtexFiltrados = dadosVtex.filter((item) =>
        regex.test(item.Value)
      );

      return dadosVtexFiltrados;
    }

    function VehicleNotFoundException(value) {
      this.value = value;
      this.message = " não retornou resultados.";
      this.toString = function () {
        return this.value + this.message;
      };
    }

    function registerGaEvent(placa, pathGerado) {
      ga("create", "UA-133498560-1", "autoglassonline.com", "gaBPTracker");
      ga("gaBPTracker.set", "transport", "beacon");
      ga(
        "gaBPTracker.send",
        "event",
        "Busca por placa",
        `Consultar placa (${placa})`,
        `Resultado: ${pathGerado}`
      );
    }

    async function obterDadosDoVeiculoViaOlhoNoCarro(placa) {
      const urlApi = window.location.href.includes("hml")
        ? "https://api-hml.autoglass.com.br"
        : "https://api.autoglass.com.br";

      const response = await fetch(
        `${urlApi}/integracao-b2c/api/web-app/veiculos/${placa}/placas`
      );
      const veiculo = await response.json();

      montadora = veiculo.Body.Data.Marca;
      modelo = veiculo.Body.Data.Modelo;
      anoModelo = veiculo.Body.Data.DadosBasicosDoVeiculo.AnoModelo;
      fipe = veiculo.Body.Data.DadosBasicosDoVeiculo.InformacoesFipe[0]?.FipeId;

      var infoBuscaPLaca =
        JSON.parse(localStorage.getItem("infoBuscaPLaca")) || [];
      infoBuscaPLaca = [
        {
          montadora: montadora,
          modelo: modelo,
          anoModelo: anoModelo,
          fipe: fipe,
          timestamp: new Date().toLocaleString(),
        },
      ];
      localStorage.setItem("infoBuscaPLaca", JSON.stringify(infoBuscaPLaca));

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
      case new RegExp(/^FH (12 )?\d{3}$/i).test(modelo):
        return "FH 12 Globetroter";
      case new RegExp(/^FH 16 \d{3}$/i).test(modelo):
        return "FH 16 Globetroter";
      case new RegExp(/^NH 12 \d{3}$/i).test(modelo):
        return "NH 12";
      case new RegExp(/^NH 10 \d{3}$/i).test(modelo):
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
      case new RegExp(/^[A-Z]-CLASS$/i).test(modelo):
        return "Classe " + modelo.replace(/-CLASS/gi, "");
      default:
        const modeloSemMontadoraTermos = modelo
          .replace(new RegExp(montadoraTermos.join(" "), "gi"), "")
          .trim();
        return modeloSemMontadoraTermos;
    }
  }

  function saveSearchInLocalStorage(placa, url) {
    localStorage.setItem(
      "smartSelectHistory",
      JSON.stringify({
        type: activeTab,
        params: {
          plate: placa,
          url,
        },
      })
    );
  }

  function checkIfUniversalProductSearch() {
    const select = PECA_SELECTS[1];

    if (select.routeSelected.length) {
      const selectedRoute = select.routeSelected;
      const universalProducts = [
        "/lampadas",
        "/higienizadores-e-filtros/higienizadores",
      ];

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

  document
    .getElementById("toggleButton")
    .addEventListener("click", function () {
      document.querySelectorAll(".busca-options").forEach(function (element) {
        element.style.display = "block";
        var divBotao = document.querySelector(".botao-ver-todas");
        divBotao.style.display = "none";
      });
    });

  document
    .getElementById("toggleButton2")
    .addEventListener("click", function () {
      document.querySelectorAll(".busca-options").forEach(function (element) {
        element.style.display = "block";
        var botaoVerTodasPecas = document.getElementById("toggleButton2");
        botaoVerTodasPecas.style.display = "none";
      });
    });

  document
    .getElementById("toggleButton3")
    .addEventListener("click", function () {
      document.querySelectorAll(".busca-options").forEach(function (element) {
        element.style.display = "block";
        var botaoVerTodasMontadoras = document.getElementById("toggleButton3");
        botaoVerTodasMontadoras.style.display = "none";
      });
    });

  document
    .getElementById("toggleButton4")
    .addEventListener("click", function () {
      document.querySelectorAll(".busca-options").forEach(function (element) {
        element.style.display = "block";
        var botaoVerTodosVeiculos = document.getElementById("toggleButton4");
        botaoVerTodosVeiculos.style.display = "none";
      });
    });

  document
    .getElementById("toggleButton5")
    .addEventListener("click", function () {
      document.querySelectorAll(".busca-options").forEach(function (element) {
        element.style.display = "block";
        var botaoVerTodosAnos = document.getElementById("toggleButton5");
        botaoVerTodosAnos.style.display = "none";
      });
    });

  document
    .getElementById("toggleButton6")
    .addEventListener("click", function () {
      document.querySelectorAll(".busca-options").forEach(function (element) {
        element.style.display = "block";
        var botaoVerTodasVersoesFipes =
          document.getElementById("toggleButton6");
        botaoVerTodasVersoesFipes.style.display = "none";
      });
    });

  var botaoLimparBuscaPlacaMobile = document.querySelector("#btn-busca-placa-limpar-mobile ");
  botaoLimparBuscaPlacaMobile.addEventListener("click", () => {
    resetSelectMobile();
  });

  var botaoLimparBuscaPecaMobile = document.querySelector("#btn-busca-peca-limpar-mobile");
  botaoLimparBuscaPecaMobile.addEventListener("click", () => {
    resetSelectsMobile(1);
    setTimeout(() => {
      const radioBuscaPeca = document.querySelector('#inputBuscaPeca');
      if (radioBuscaPeca) {
        radioBuscaPeca.checked = true;
      }
    }, 10);
  });

  var botaoLimparBuscaPlacaMobile = document.querySelector("#btn-busca-placa-limpar-mobile");
  if (botaoLimparBuscaPlacaMobile) {
    botaoLimparBuscaPlacaMobile.addEventListener("click", () => {
      resetBuscaPlacaMobile();
    });
  }

  function resetSelectMobile(){
    const select = PECA_SELECTS[1];
    select.routeSelected = "";
    document.querySelector(`#opcao-selecionada-${select.id}`).innerHTML = "";
    retiraCheckedOpcaosSelecionadas();
    $(`.c-busca__tab-content-mobile #categoria-select .smart-select__main-results`
    ).slideDown("fast");
  }

  function resetSelectsMobile(_index){
    sessionStorage.setItem("selectedOptionTipoPeca", null);
    sessionStorage.setItem("selectedOptionMontadora", null);
    sessionStorage.setItem("selectedOptionVeiculo", null);
    sessionStorage.setItem("selectedOptionAno", null);
    sessionStorage.setItem("selectedOptionVersao", null);
    for (let i = _index; i <= PECA_SELECTS.length - 1; i++) {
      const select = PECA_SELECTS[i];
      const nextSelect = PECA_SELECTS[i + 1];
      select.routeSelected = "";
      document.querySelector(`#opcao-selecionada-${select.id}`).innerHTML = "";
      if(nextSelect){
        $(`.c-busca__tab-content-mobile #${nextSelect.id}`).addClass(CONFIG.CSS.EMPTY);
        nextSelect.values = [];
        if(nextSelect.routeSelected)
          nextSelect.routeSelected = "";
      }
      $(`.c-busca__tab-content-mobile #${select.id} .smart-select__main-results`
      ).slideUp("fast");
      if(select.id != "pecas-select")
        $(`#${select.id}`).closest('.c-busca__select').hide();
    }
    retiraCheckedOpcaosSelecionadas();
    $(`.c-busca__tab-content-mobile #pecas-select .smart-select__main-results`
    ).slideDown("fast");
  }

  function resetBuscaPlacaMobile() {
    const select = PLACA_SELECTS[0];

    if (select) {
      select.routeSelected = "";

      const textoOpcaoSelecionada = document.querySelector(`#opcao-selecionada-${select.id}`);
      if (textoOpcaoSelecionada) {
        textoOpcaoSelecionada.textContent = select.title;
      }

      const radios = document.querySelectorAll(`#${select.id} .itens-lista li input[type="radio"]`);
      radios.forEach((radio) => {
        radio.checked = false;
      });

      const listItems = document.querySelectorAll(`#${select.id} .itens-lista li`);
      listItems.forEach((li) => {
        li.classList.remove('active');
      });

      const inputPlaca = document.querySelector("#placa-input-mobile");
      if (inputPlaca) {
        inputPlaca.value = "";
      }

      const spanSelecionado = document.getElementById('opcao-selecionada-categoria-select');
      if (spanSelecionado) {
        spanSelecionado.textContent = '';
      }

      $(`.c-busca__tab-content-mobile #${select.id} .smart-select__main-results`).slideUp("fast");
    }

    sessionStorage.removeItem("selectedOptionCategoriaPlaca");
    localStorage.removeItem("buscaPlaca");
  }

  const botaoVerTodasCategoria = document.querySelector("#toggleButton");
  botaoVerTodasCategoria.addEventListener("click", () => {
    const ulCategoriaSelect = document.querySelector(
      "#categoria-select .smart-select__main-results > ul"
    );
    if (ulCategoriaSelect) {
      ulCategoriaSelect.style.height = "auto";
    }
  });

  const botaoVerTodasPecas = document.querySelector("#toggleButton2");
  botaoVerTodasPecas.addEventListener("click", () => {
    const ulCategoriaSelect = document.querySelector(
      "#pecas-select .smart-select__main-results > ul"
    );
    ulCategoriaSelect.style.height = "auto";
  });

  const botaoVerTodasMontadoras = document.querySelector("#toggleButton3");
  botaoVerTodasMontadoras.addEventListener("click", () => {
    const ulCategoriaSelect = document.querySelector(
      "#montadora-select .smart-select__main-results > ul"
    );
    ulCategoriaSelect.style.height = "auto";
  });

  const botaoVerTodasVeiculos = document.querySelector("#toggleButton4");
  botaoVerTodasVeiculos.addEventListener("click", () => {
    const ulCategoriaSelect = document.querySelector(
      "#veiculo-select .smart-select__main-results > ul"
    );
    ulCategoriaSelect.style.height = "auto";
  });

  const botaoVerTodosAnos = document.querySelector("#toggleButton5");
  botaoVerTodosAnos.addEventListener("click", () => {
    const ulCategoriaSelect = document.querySelector(
      "#ano-select .smart-select__main-results > ul"
    );
    ulCategoriaSelect.style.height = "auto";
  });

  const botaoVerTodasVersoes = document.querySelector("#toggleButton6");
  botaoVerTodasVersoes.addEventListener("click", () => {
    const ulCategoriaSelect = document.querySelector(
      "#versao-select .smart-select__main-results > ul"
    );
    ulCategoriaSelect.style.height = "auto";
  });

  function showButtonVerTodas() {
    botaoVerTodasPecas.style.display = "block";
    botaoVerTodasMontadoras.style.display = "block";
    botaoVerTodasVeiculos.style.display = "block";
    botaoVerTodosAnos.style.display = "block";
    botaoVerTodasVersoes.style.display = "block";
  }

  function retiraCheckedOpcaosSelecionadas() {
    const checkedInputPecas = document.querySelector(window.innerWidth > 1024 ? '#pecas-select-desktop .itens-lista li input:checked' : '#pecas-select .itens-lista li input:checked');
    const checkedInputCategoria = document.querySelector('#categoria-select .itens-lista li input:checked');

    if(checkedInputPecas){
      checkedInputPecas.removeAttribute("checked");
      checkedInputPecas.checked = false;
      $(checkedInputPecas).trigger("change");
    }

    if(checkedInputCategoria){
      checkedInputCategoria.removeAttribute("checked");
      checkedInputCategoria.checked = false;
      $(checkedInputCategoria).trigger("change");
    }
  }

  function ajustaLayoutAposOpcoesSelecionadas() {
    const sideMenu = document.querySelector("#side-menu");
    sideMenu.style.height = "100%";
  }
})(jQueryNew);
