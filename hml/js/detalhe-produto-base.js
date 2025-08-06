const baseUrlApi =
  window.location.href.includes("dev") ||
  window.location.href.includes("mvp") ||
  window.location.href.includes("hml")
    ? "https://api-hml.autoglass.com.br/integracao-b2c/api/web-app"
    : "https://api.autoglass.com.br/integracao-b2c/api/web-app";

const sections = [...document.querySelectorAll("section.tab-content")];
const getLinkById = (id) => document.querySelector(`a[href='#${id}'].tab-link`);

//Adicona class para ga4 (templates da Vtex)
$(".product-qd-v1-buy-button .buy-button.buy-button-ref").addClass(
  "add-to-cart-ga"
);

//Datalayer SocialShare
function handleSocialClick(event, method) {
  dataLayer.push({
    event: "share",
    method: method,
    content_type: skuJson.skus[0].image,
    item_id: skuJson.skus[0].sku,
  });
}

const socialMediaElements = {
  whatsapp: ".product-qd-v1-social-share.desktop .whatsapp",
  twitter: ".product-qd-v1-social-share.desktop .twitter",
  mail: ".product-qd-v1-social-share.desktop .mail",
  facebook: ".product-qd-v1-social-share.desktop .facebook",
};

Object.entries(socialMediaElements).forEach(([socialMediaType, selector]) => {
  const element = document.querySelector(selector);
  element.addEventListener("click", (event) =>
    handleSocialClick(event, socialMediaType)
  );
});

//Datalayer ButtonWhatsApp
function ButtoWhatsappClick(event, position) {
  dataLayer.push({
    event: "whatsapp",
    position: position,
  });
}

const whatsappElements = {
  ".link-whatsapp-texto.link-whatsapp-conteudo-sem-numero": "topo",
  ".link-whatsapp-texto.gtm-whatsapp-botao-rodape": "widget",
  ".link-whatsapp-texto.botao-compre-whatsapp": "compre-whatsapp",
  ".link-whatsapp-texto.link-whatsapp": "footer",
};

Object.entries(whatsappElements).forEach(([selector, buttonType]) => {
  const element = document.querySelector(selector);
  if (element) {
    element.addEventListener("click", (event) =>
      ButtoWhatsappClick(event, buttonType)
    );
  }
});

// configura busca de veículos compatíveis
var veiculosBuscaveis = [];
const sugestoesContainer = $(
  ".veiculos-compativeis-search__search-suggestions"
);
$(".veiculos-compativeis-search").hide();

const inView = (section, width) => {
  let top = section.offsetTop;
  //offsetTop: Distance of the outer border of the current element relative to the inner border of the top of the offsetParent node.
  let height = section.offsetHeight;
  //offsetHeight: height of an element, including vertical padding and borders, as an integer.

  while (section.offsetParent) {
    //offsetParent: a reference to the element which is the closest (nearest in the containment hierarchy) positioned ancestor element.
    section = section.offsetParent;
    top += section.offsetTop;
  }
  if (width) {
    //adiciona margem do topo no cálculo
    top -= width > 1200 ? 250 : 130;
  }

  return (
    top < window.pageYOffset + window.innerHeight &&
    top + height > window.pageYOffset
  );
  //pageYOffset: the number of pixels the document is currently scrolled along the vertical axis (that is, up or down) with a value of 0.0, indicating that the top edge of the Document is currently aligned with the top edge of the window's content area.
  //innerHeight: the interior height of the window in pixels, including the height of the horizontal scroll bar, if present.
};

window.onscroll = () => {
  let next = false;

  sections.forEach((section) => {
    const a = getLinkById(section.id);

    if (inView(section, window.innerWidth) && !next) {
      a.classList.add("tab--current");
      next = true;
    } else {
      a && a.classList.remove("tab--current");
    }
  });
};

const toggleSectionCollapse = (section) => {
  if (section.classList.contains("ativo")) section.classList.remove("ativo");
  else section.classList.add("ativo");
};

const sectionCollapseInit = () => {
  let headers = document.querySelectorAll(".contents .tab-content h2");

  headers.forEach((header) => {
    header.onclick = (event) => {
      toggleSectionCollapse(header.closest(".tab-content"));
    };
    if (
      header.textContent === "Compre Junto" ||
      header.textContent === "Outras Marcas"
    )
      setTimeout(
        () => toggleSectionCollapse(header.closest(".tab-content")),
        5000
      );
  });
};

sectionCollapseInit();

//Descrição da marca
async function insertBrandDescription() {
  return fetch("/api/catalog_system/pub/brand/list")
    .then((response) => response.json())
    .then((brandList) => {
      const brandName = document
        .querySelector(".brandName")
        .classList.value.replace("brandName", "")
        .trim()
        .replace("-", " ")
        .split(" ")[0];

      const brand = brandList.find((brand) => brand.name.includes(brandName));

      if (brand && brand.metaTagDescription !== "") {
        const brandDescription = brand.metaTagDescription;
        const descricaoMarcaParagraph =
          document.querySelector("#descricao-marca");

        descricaoMarcaParagraph.textContent = brandDescription;
        descricaoMarcaParagraph.parentElement.parentElement.style.display =
          "block";
      }
    });
}

async function getProductRefIdByProductName() {
  const currentProduct = await vtexjs.catalog.getCurrentProductWithVariations();

  const [_, productRefId] = currentProduct.name.match(
    /(\d+)(\s?\-?\s?[0-9]+)?$/
  );

  return productRefId;
}

async function loadOptionals() {
  const opcionaisContainer = $("#opcionais");
  const productRefId = await getProductRefIdByProductName();
  const testeOpcionais = $(".teste-opcionais");

  try {
    const { Opcionais } = await $.get(
      `${baseUrlApi}/produtos/${productRefId}/opcionais-vtex`
    );

    if (Opcionais && Opcionais.length > 0) {
      opcionaisContainer.html(`
        <h3>Características</h3>
        <div class="caracteristicas__box">
          ${Opcionais.map(
            (x) => `<span class="caracteristicas__caracteristica">${x}</span>`
          ).join("")}
        </div>
      `);
      testeOpcionais.html(`
            ${Opcionais.map(
              (x) => `<h4 class="lista-opcionais">${x}</h4>`
            ).join("")}
            <div class="container-mais-especificacoes">
              <a class="mais-especificacoes">Mais informações</a>
            </div>
      `);
    }
  } catch (ex) {
    console.error("Falha ao renderizar opcionais. \n ", ex);
  }

  $(".container-mais-especificacoes .mais-especificacoes").click(function () {
    document
      .querySelector(".container-descricao #informacoes-gerais")
      .scrollIntoView();
  });
}

window.addEventListener("load", insertBrandDescription);
window.addEventListener("load", loadOptionals);

document.addEventListener('DOMContentLoaded', function() {

  if (window.innerWidth <= 1024) {
    function limitarLista() {
      const testeOpcionais = document.querySelector('.teste-opcionais');
      const listaOpcionais = testeOpcionais.querySelectorAll('.lista-opcionais');

      if (listaOpcionais.length === 0) {
        testeOpcionais.style.setProperty('display', 'none', 'important');
      } else {
        testeOpcionais.style.setProperty('display', 'block', 'important');

        if (listaOpcionais.length > 4) {
          for (let i = 4; i < listaOpcionais.length; i++) {
            listaOpcionais[i].style.display = 'none';
          }
        } else {
          for (let i = 0; i < listaOpcionais.length; i++) {
            listaOpcionais[i].style.display = 'block';
          }
        }
      }
    }

    function iniciarObservacao() {
      const testeOpcionais = document.querySelector('.teste-opcionais');

      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === 'childList') {
            const listaOpcionais = testeOpcionais.querySelectorAll('.lista-opcionais');
            if (listaOpcionais.length === 0) {
              testeOpcionais.style.setProperty('display', 'none', 'important');
            } else {
              limitarLista();
            }
          }
        });
      });

      observer.observe(testeOpcionais, { childList: true, subtree: true });
    }

    function verificarListaInicial() {
      const testeOpcionais = document.querySelector('.teste-opcionais');
      const listaOpcionais = testeOpcionais.querySelectorAll('.lista-opcionais');

      if (listaOpcionais.length === 0) {
        testeOpcionais.style.setProperty('display', 'none', 'important');
      } else {
        limitarLista();
      }
    }

    verificarListaInicial();

    iniciarObservacao();
  }
});

async function loadSimilars() {
  const hideMenu = (id) =>
    (document.querySelector(`a[href="#${id}"]`).parentElement.style.display =
      "none");
  const isLoaded = (id) => document.querySelector(`#${id}`).innerHTML != "";
  const showComponent = (id) =>
    (document.querySelector(`#${id}`).style.display = "block") &&
    (document.querySelector(`a[href="#${id}"]`).parentElement.style.display =
      "unset");

  hideMenu("outras-marcas");
  hideMenu("compre-junto");

  if (isLoaded("similars")) {
    showComponent("outras-marcas");
  }

  if (isLoaded("sugestoes")) {
    showComponent("compre-junto");
  }
}

loadSimilars();

$(window).on("ready", async () => {
  /*
   * Corrige problema com variação da altura na thumb de produto
   */
  window.addEventListener("resize", adjustProductThumbHeight);

  function adjustProductThumbHeight() {
    $(".product-qd-v1-image div#image").css(
      "min-height",
      $(".product-qd-v1-image #image-main").width()
    );
  }

  adjustProductThumbHeight();

  initializeSocialShareLinks();

  /**
   * Cria bloco de Veículos Compatíveis
   */
  const veiculosCompatíveisContainer = $("#veiculos-compativeis");
  const productRefId = await getProductRefIdByProductName();

  try {
    const veiculosCompativeis = await $.get(
      `${baseUrlApi}/produtos/${productRefId}/veiculos-compativeis`
    );

    veiculosBuscaveis = veiculosCompativeis;

    const possuiVeiculosCompativeis = veiculosCompativeis
      ? veiculosCompativeis.length > 0
      : false;

    if (possuiVeiculosCompativeis > 0) {
      veiculosCompatíveisContainer.html(`
        <h2>Veículos Compatíveis</h2>
        <div class="veiculos-compativeis__box">
          <div class="veiculos-compativeis__box-header">
            <button id="group-prev" data-type="prev" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <path id="Icon_ionic-ios-arrow-dropleft-circle" data-name="Icon ionic-ios-arrow-dropleft-circle" d="M19.375,3.375a16,16,0,1,0,16,16A16,16,0,0,0,19.375,3.375Zm3.338,22.238a1.49,1.49,0,0,1,0,2.1,1.467,1.467,0,0,1-1.046.431,1.492,1.492,0,0,1-1.054-.438l-7.231-7.254a1.483,1.483,0,0,1,.046-2.046l7.338-7.362a1.485,1.485,0,0,1,2.1,2.1l-6.3,6.231Z" transform="translate(35.375 35.375) rotate(180)" opacity="0.42"/>
            </svg>
            </button>
            ${veiculosCompativeis.map(buildHeader).join("")}
            <button id="group-next" data-type="next" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <path id="Icon_ionic-ios-arrow-dropleft-circle" data-name="Icon ionic-ios-arrow-dropleft-circle" d="M19.375,3.375a16,16,0,1,0,16,16A16,16,0,0,0,19.375,3.375Zm3.338,22.238a1.49,1.49,0,0,1,0,2.1,1.467,1.467,0,0,1-1.046.431,1.492,1.492,0,0,1-1.054-.438l-7.231-7.254a1.483,1.483,0,0,1,.046-2.046l7.338-7.362a1.485,1.485,0,0,1,2.1,2.1l-6.3,6.231Z" transform="translate(35.375 35.375) rotate(180)" opacity="0.42"/>
              </svg>
            </button>
          </div>
          <div class="veiculos-compativeis__box-content">
              ${veiculosCompativeis.map(buildContent).join("")}
          </div>
        </div>
      `);

      $(".veiculos-compativeis__header-option").first().addClass("active");
      $(`.veiculos-compativeis__box-content div`).first().addClass("active");

      $(".veiculos-compativeis__header-option").click(function () {
        $(".veiculos-compativeis__header-option").removeClass("active");
        $(this).addClass("active");

        $(`.veiculos-compativeis__box-content div`).removeClass("active");
        $(
          `.veiculos-compativeis__box-content div[data-for="${$(this).attr(
            "id"
          )}"]`
        ).addClass("active");
      });

      $(
        "#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header button"
      ).click(function () {
        const type = $(this).attr("data-type");
        const headerContainer = $(
          "#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header"
        );

        if (type === "next") {
          headerContainer[0].scrollBy(200, 0);
        } else {
          headerContainer[0].scrollBy(-200, 0);
        }
      });

      const headerContainer = $(
        "#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header"
      );
      $("#veiculos-compativeis h2").click(() =>
        toggleSectionCollapse(veiculosCompatíveisContainer[0])
      );

      checkIfNeedButtons(headerContainer);

      headerContainer.on("scroll", function () {
        checkIfNeedButtons($(this));
      });
      $(window).on("resize", function () {
        checkIfNeedButtons(headerContainer);
      });

      $(".veiculos-compativeis-search").show();
    } else {
      $('a[href="#veiculos-compativeis"]').parent().hide();
      veiculosCompatíveisContainer.hide();
    }
  } catch (ex) {
    $('a[href="#veiculos-compativeis"]').parent().hide();
    console.error("Falha ao renderizar os veículos compativeis. \n ", ex);
  }

  //Busca de Veículos Compatíveis
  let skuList = Product.captureSkuSelectors();
  const urlAddCart =
    "/checkout/cart/add?sku=" +
    skuList[0] +
    "&qty=1&seller=1&redirect=true&" +
    readCookie("VTEXSC");

  $(
    ".veiculos-compativeis-search__search-box .veiculos-compativeis-search__search-input input"
  ).on("input", function () {
    buscaCompativeis($(this).val());
  });

  function buscaCompativeis(texto) {
    if (veiculosBuscaveis && veiculosBuscaveis.length > 0 && texto.length > 0) {
      const veiculosBuscaveisFiltrado = veiculosBuscaveis
        .map((a) =>
          a.Veiculos.filter((b) =>
            new RegExp(
              texto
                .split(" ")
                .map((str) => `(?=.*${str})`)
                .join(""),
              "i"
            ).test(b.Veiculo)
          )
        )
        .filter((a) => a.length > 0);

      if (!!veiculosBuscaveisFiltrado.length) {
        sugestoesContainer.html(
          veiculosBuscaveisFiltrado
            .flat()
            .slice(0, 3)
            .map(buildContentBusca)
            .join("") +
            `<div class="veiculos-compativeis-search__link">
                            <a href="#veiculos-compativeis">Ver todos</a>
                          </div>`
        );

        document
          .querySelectorAll("a.veiculos-compativeis__content-compativel-link")
          .forEach((element) =>
            element.addEventListener("click", sendGaClickEvent)
          );
      } else {
        sugestoesContainer.html(`
          <div class="veiculos-compativeis-search__disclaimer">
            Modelo de carro não compatível :(
          </div>
          <div class="veiculos-compativeis-search__link">
            <a href="#veiculos-compativeis">Ver todos</a>
          </div>
        `);
      }
    } else {
      sugestoesContainer.empty();
    }
  }

  function buildContentBusca(veiculo, index) {
    return `<a href="${urlAddCart}"
               class="veiculos-compativeis__content-compativel-link">
              <p>${veiculo.Veiculo}</p>
              <div>${veiculo.Anos.map((x) => "<span>" + x + "</span>")}.</div>
            </a>`;
  }

  function buildHeader(grupo, index) {
    return `
          <div id="${
            grupo.Grupo + index
          }" class="veiculos-compativeis__header-option">
              <span>${grupo.Grupo}</span>
          </div>
      `;
  }

  function sendGaClickEvent(event) {
    ga("set", "transport", "beacon");
    ga("send", "event", "Link SelectCar", "Clique", "Add ao Carrinho");
  }

  function buildContent(grupo, index) {
    return `
      <div data-for="${grupo.Grupo + index}">
          ${grupo.Veiculos.map(
            (veiculo) => `
              <div class="veiculos-compativeis__content-compativel">
                  <p>${veiculo.Veiculo}</p>
                  <div>${veiculo.Anos.map(
                    (x) => "<span>" + x + "</span>"
                  )}.</div>
              </div>
          `
          ).join("")}
      </div>
    `;
  }

  function checkIfNeedButtons(header) {
    const buttons = $(
      "#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header button"
    );

    if (needButtons()) {
      const scroll = getScrollPercentage(header[0]);

      if (scroll === 0) {
        buttons.last().css("display", "flex");

        buttons.first().css("display", "none");
      } else if (scroll === 100) {
        buttons.first().css("display", "flex");

        buttons.last().css("display", "none");
      } else {
        buttons.css("display", "flex");
      }
    } else {
      buttons.css("display", "none");
    }
  }

  function needButtons() {
    return (
      document.querySelector(".veiculos-compativeis__box-header").scrollWidth >
      window.innerWidth
    );
  }

  function getScrollPercentage(container) {
    return (
      (100 * container.scrollLeft) /
      (container.scrollWidth - container.clientWidth)
    );
  }

  function initializeSocialShareLinks() {
    const productLink = encodeURIComponent(location.href);

    $(`.product-qd-v1-social-share a.whatsapp`).attr(
      `href`,
      `https://api.whatsapp.com/send?text=${productLink}`
    );
    $(`.product-qd-v1-social-share a.twitter`).attr(
      `href`,
      `https://twitter.com/intent/tweet?text=${productLink}`
    );
    $(`.product-qd-v1-social-share a.mail`).attr(
      `href`,
      `mailto:?subject=Quero%20compartilhar%20um%20produto%20da%20Autoglass&body=Veja%20este%20produto%20na%20Autoglass:%0D%0A${productLink}`
    );
    $(`.product-qd-v1-social-share a.messenger`).attr(
      `href`,
      `fb-messenger://share?link=${productLink}`
    );
    $(`.product-qd-v1-social-share a.facebook`).attr(
      `href`,
      `https://www.facebook.com/sharer.php?u=${productLink}`
    );
    $(".product-qd-v1-social-share a.popup-trigger").click((e) => {
      e.preventDefault();
      $("div.product-qd-v1-social-share-options-popup").fadeToggle(
        400,
        "swing",
        () => {
          $(`.product-qd-v1-social-share a.copy`)
            .children("i.fas.fa-check")
            .attr("class", "far fa-copy");
        }
      );
    });
    $(`.product-qd-v1-social-share a.copy`).click((e) => {
      e.preventDefault();
      navigator.clipboard.writeText(location.href);
      $(`.product-qd-v1-social-share a.copy`)
        .children("i.far.fa-copy")
        .fadeOut("fast")
        .attr("class", "fas fa-check")
        .fadeIn("fast");
    });
    $(".product-qd-v1-social-share a:not(.popup-trigger)").click((e) => {
      const element = $(e.target).closest("a").attr("class");
      const array = element.replace("_", "").split(" ");

      for (let index = 0; index < array.length; index++) {
        array[index] =
          array[index].charAt(0).toUpperCase() + array[index].slice(1);
      }

      const networkClicked = array.join(" ");

      ga("create", "UA-133498560-1", "autoglassonline.com", "gaSSTracker");
      ga("gaSSTracker.set", "transport", "beacon");
      ga(
        "gaSSTracker.send",
        "event",
        "Social Share",
        `Compartilhar ${networkClicked}`,
        `Botão ${networkClicked}`
      );
    });
  }

  const produtosInsumoInstalacao = ["Vidro", "Parabrisa"];
  const nomeProduto = $(
    ".product-qd-v1-sku-selection-wrapper .product-qd-v1-name"
  ).text();
  const categoriaProduto = nomeProduto.split(" ")[0];
  let skuInstalacao;
  const produtosInstalacaoInsumos = [];
  const skuProduto = $(
    ".product-qd-v1-sku-selection-box  .product-qd-v1-ref-code"
  ).text();
  const precos = {
    instalacao60: "60,00*",
    instalacao130: "129,99*",
  };

  $(".product-qd-v1-buy-button .buy-button").attr("href", "#");
  const urlSemInstalacao =
    "/checkout/cart/add?sku=" +
    skuList[0] +
    "&qty=1&seller=1&redirect=true&" +
    readCookie("VTEXSC");
  if (produtosInsumoInstalacao.includes(categoriaProduto)) {
    $(".product-qd-v1-buy-button .buy-button").on("click", function () {
      modalCompraComOuSemInstalacao();
      $("#modalCompra #botaoContinuarCarrinho").focus();
    });
  } else {
    $(".product-qd-v1-buy-button .buy-button ").click(function () {
      window.location.href = urlSemInstalacao;
    });
  }

  function modalCompraComOuSemInstalacao() {
    $("body").append(`
    <div id="abrirModal">
       </div>`);

    $("#abrirModal").append(`
      <div id="fadeModalInstalacao">
        <div id="modalCompra">
          <div class = containerTituloInstalacao>
            <div class="tituloInstalacao">
              <h1> Instalação </h1>
            </div>
          </div>
          <div class="exit-button">×</div>

          <div id="containers">
            <div id="mobileBlocoUm">
              <fieldset id="beneficios" class="containersModalCompra">
                <legend>-</legend>
                <img loading="lazy" src="https://autoglass-cdn.github.io/hml/img/logo-autoglass.png" alt="Logo da Autoglass" class="logo">
                <h3 class="primeiraLinha">Garantia de até 1 ano</h3>
                <h3 class="segundaLinha">Equipe Especializada</h3>
                <h3>Segurança e comodidade</h3>
              </fieldset>

              <fieldset class="containersModalCompra" id="container-compraSemInstalacao">
                <legend>-</legend>
                <div class="inputLabelSemInstalacao">
                  <input type="radio" id="inputSemInstalacao" name="inputRadioInstalacao" value="SemInstalacao">
                  <label for="inputSemInstalacao">Sem Instalação</label>
                </div>
                <i id="primeiroblock" class="block"></i>
                <i id="segundablock"class="block"></i>
                <i class="block"></i>
              </fieldset>
            </div>

            <div id="mobileBlocoDois">
              <fieldset id="beneficios" class="containersModalCompra">
                <legend>-</legend>
                <img loading="lazy" src="https://autoglass-cdn.github.io/hml/img/logo-autoglass.png" alt="Logo da Autoglass" class="logo">
                <h3 class="primeiraLinha">Garantia de até 1 ano</h3>
                <h3 class="segundaLinha">Equipe Especializada</h3>
                <h3>Segurança e comodidade</h3>
              </fieldset>

              <fieldset class="containersModalCompra" id="container-compraComInstalacao">
                <legend>RECOMENDADO</legend>
                <div id="headerCompraComInstalacao">
                  <div class="inputLabelComInstalacao">
                      <input type="radio" id="inputComInstalacao" name="inputRadioInstalacao" value="ComInstalacao" checked>
                      <label for="inputComInstalacao">Com Instalação</label>
                  </div>
                  <span id="descricao"> Apenas em Lojas Autoglass ou em casa.</span>
                </div>
                <i id="primeirochecked" class="checked"></i>
                <i id="segundochecked" class="checked"></i>
                <i class="checked"></i>
                <h3>Por apenas <span id="precoComInstalacao">R$ <span id="valorComInstalacao">60</span></span></h3>
              </fieldset>
            </div>
          </div>
          <div class="containerInfoInsumo">
            <p id="alinhamentoInfoInsumo"></p>
            <p></p>
            <p id="infoInsumo">*Valor referente aos insumos de instalação</p>
          </div>
          <div class="containerGridBotao">
            <div class="alinhabotao"></div>
            <div class="containersModalCompra" id="containerButton">
              <a id="botaoContinuarCarrinho" href="#">Continuar</a>
            </div>
          </div>
        <div class="clearfix"></div>
      </div>
      `);

    if (produtosInstalacaoInsumos.includes(skuProduto)) {
      skuInstalacao = 27696;
      document.getElementById("valorComInstalacao").innerHTML =
        precos.instalacao130;
    } else if (produtosInsumoInstalacao.includes(categoriaProduto)) {
      skuInstalacao = 10748;
      document.getElementById("valorComInstalacao").innerHTML =
        precos.instalacao60;
    }

    var urlComInstalacao =
      urlSemInstalacao +
      "&sku=" +
      skuInstalacao +
      "&qty=1&seller=1&redirect=true&" +
      readCookie("VTEXSC");

    if (window.screen.width < 570) {
      $("#mobileBlocoDois #beneficiosMobile").css("display", "block");
      $(document).ready(function () {
        $("#container-compraSemInstalacao").click(function () {
          $(".inputLabelComInstalacao input").removeAttr("checked");
          $("#inputSemInstalacao").attr("checked", true);
          $(".containersModalCompra").css("color", "#aeaeae");
          $(".containersModalCompra#container-compraSemInstalacao").css(
            "color",
            "red"
          );
          $("#botaoContinuarCarrinho").attr("href", urlSemInstalacao);
        });
      });
      $("#container-compraComInstalacao").click(function () {
        $("#inputSemInstalacao").prop("checked", false);
        $("#inputComInstalacao").attr("checked", true);
        $(".containersModalCompra").css("color", "#aeaeae");
        $(".containersModalCompra#container-compraComInstalacao").css(
          "color",
          "#43c452"
        );
        $("#botaoContinuarCarrinho").attr("href", urlComInstalacao);
      });
    }

    $("#fadeModalInstalacao #modalCompra").addClass("filled");
    $("#fadeModalInstalacao, .exit-button").click(function (e) {
      $("#fadeModalInstalacao #modalCompra").fadeOut(300);
      $(this).fadeOut();
      $("#fadeModalInstalacao div").remove();
    });
    $("#fadeModalInstalacao #modalCompra").click(function (e) {
      e.stopPropagation();
    });

    $("#botaoContinuarCarrinho").attr("href", urlComInstalacao);
    $(".containersModalCompra#container-compraComInstalacao").css(
      "color",
      "#43c452"
    );

    $(document).ready(function () {
      $('input:radio[name="inputRadioInstalacao"]').change(function () {
        $(".containersModalCompra").css("color", "#aeaeae");
        if ($("#inputComInstalacao").is(":checked")) {
          $(".containersModalCompra#container-compraComInstalacao").css(
            "color",
            "#43c452"
          );
          $("#botaoContinuarCarrinho").attr("href", urlComInstalacao);
        } else if ($("#inputSemInstalacao").is(":checked")) {
          $(".containersModalCompra#container-compraSemInstalacao").css(
            "color",
            "red"
          );
          $("#botaoContinuarCarrinho").attr("href", urlSemInstalacao);
        }
      });
    });
  }

  $(document).ready(function () {
    $(".botao-compre-whatsapp").click(function () {
      const mensagem = `Olá, estou na página desse produto e gostaria de comprá-lo: ${window.location.href}`;
      window
        .open(urlWhatsAppApi + numeroWhatsAppAG + "?text=" + mensagem, "_blank")
        .focus();
    });
  });

  async function buscarPecaProduto() {
    let baseUrlApi =
      window.location.href.includes("dev") ||
      window.location.href.includes("hml")
        ? "https://api-hml.autoglass.com.br/integracao-b2c/"
        : "https://api-farm-int.autoglass.com.br/integracao-b2c/";

    let codigoProduto = await getProductRefIdByProductName();
    let produto = await $.get(
      `${baseUrlApi}api/web-app/integracoes-produtos/${codigoProduto}`
    );

    let anoInicio =
      produto.AnoInicio !== null ? parseInt(produto.AnoInicio) : null;
    let anoFim = produto.AnoFim !== null ? parseInt(produto.AnoFim) : null;
    anoInicio === null
      ? (anoInicio = anoFim)
      : anoFim === null
      ? (anoFim = anoInicio)
      : "";
    let anoAproximado = Math.floor((anoInicio + anoFim) / 2);

    let mapeamentoFipe = await $.get(
      `${baseUrlApi}api/web-app/integracoes-seguradoras/mapeamentos-fipes?CodigoVeiculo=${produto.CodigoVeiculo}&CodigoMontadora=${produto.CodigoMontadora}&AnoAproximado=${anoAproximado}`
    );
    let codigoMapeamentoFipe = mapeamentoFipe[0].CodigoMapeamentoFipe;

    let classificaScript = await $.get(
      `${baseUrlApi}api/web-app/integracoes-seguradoras/classificacoes-pecas?CodigoVeiculo=${produto.CodigoVeiculo}&CodigoMontadora=${produto.CodigoMontadora}&CodigoMapeamentoFipe=${codigoMapeamentoFipe}`
    );

    let classificaScriptFormatado = formatarDadosMapeamento(classificaScript);

    classificaScriptFormatado.sort(function (a, b) {
      return b.ClassificacaoScript.length - a.ClassificacaoScript.length;
    });

    let categoryVtex = formatarDadosMapeamento(vtxctx.categoryName);
    var codigoClassificaScript = classificaScriptFormatado
      .filter((item) => item.ClassificacaoScript.includes(categoryVtex))
      .map((item) => [item.CodigoClassificaScript]);

    if (codigoClassificaScript.length !== 1) {
      var url = window.location.href;
      var novaUrl = url.replace(/https:\/\/dev2autoglass.myvtex.com\//g, "");
      const urlSemHifen = novaUrl.replace(/-/g, " ");
      const urlFormatada = tirarMasculinoFeminino(urlSemHifen);
      const arrayUrlFormatada = urlFormatada.split(" ");

      for (let i = 0; i < classificaScriptFormatado.length; i++) {
        let words = classificaScriptFormatado[i].ClassificacaoScript.split(" ");
        let match = true;
        for (let j = 0; j < words.length; j++) {
          if (!arrayUrlFormatada.includes(words[j])) {
            match = false;
            break;
          }
        }
        if (match) {
          codigoClassificaScript = [
            classificaScriptFormatado[i].CodigoClassificaScript,
          ];
          break;
        }
      }
    }

    if (codigoClassificaScript.length !== 1) {
      let descricaoProduto = formatarDadosMapeamento(
        document.querySelector(
          "#informacoes-gerais-descricao .productDescriptionShort"
        ).textContent
      );
      let arrayDescricaoProduto = descricaoProduto
        .split(" ")
        .filter((word) => word.length > 3)
        .slice(0, 8);

      for (let i = 0; i < classificaScriptFormatado.length; i++) {
        let words = classificaScriptFormatado[i].ClassificacaoScript.split(" ");
        let match = true;
        for (let j = 0; j < words.length; j++) {
          if (!arrayDescricaoProduto.includes(words[j])) {
            match = false;
            break;
          }
        }
        if (match) {
          codigoClassificaScript = [
            classificaScriptFormatado[i].CodigoClassificaScript,
          ];
          break;
        }
      }
    }

    let codigoClassificaScriptFormatado = parseInt(codigoClassificaScript[0]);

    let imagemPeca = await $.get(
      `${baseUrlApi}api/web-app/integracoes-seguradoras/imagens-pecas?CodigoClassificaScript=${codigoClassificaScriptFormatado}&CodigoMapeamentoFipe=${codigoMapeamentoFipe}`
    );

    if (imagemPeca && imagemPeca.FotografiaTraseira == "") {
      if (codigoClassificaScript.length == 1 && codigoMapeamentoFipe !== null) {
        posicionarImagemReq(imagemPeca.FotografiaFrontal);
      }
    }
  }
});
