const baseUrlApi =
    window.location.href.includes("dev") || window.location.href.includes("mvp") || window.location.href.includes("hml")
      ? "https://api-hml.autoglass.com.br/integracao-b2c/api/web-app"
      : "https://api.autoglass.com.br/integracao-b2c/api/web-app";

const sections = [...document.querySelectorAll("section.tab-content")];
const getLinkById = (id) => document.querySelector(`a[href='#${id}'].tab-link`);

// configura busca de veículos compatíveis
var veiculosBuscaveis = [];
const sugestoesContainer = $('.veiculos-compativeis-search__search-suggestions');
$('.veiculos-compativeis-search').hide();

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
    if (header.textContent === 'Compre Junto' || header.textContent === 'Outras Marcas')
      setTimeout(
        () => toggleSectionCollapse(header.closest(".tab-content"))
        , 5000);
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

      if (brand && brand.metaTagDescription !== '') {
        const brandDescription = brand.metaTagDescription;
        const descricaoMarcaParagraph = document.querySelector("#descricao-marca");

        descricaoMarcaParagraph.textContent = brandDescription;
        descricaoMarcaParagraph.parentElement.parentElement.style.display = "block";
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

  try {
    const { Opcionais } = await $.get(
      `${baseUrlApi}/produtos/${productRefId}/opcionais`
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
    }
  } catch (ex) {
    console.error("Falha ao renderizar opcionais. \n ", ex);
  }
}

window.addEventListener("load", insertBrandDescription);
window.addEventListener("load", loadOptionals);

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
    $('.product-qd-v1-image div#image').css('min-height', $('.product-qd-v1-image #image-main').width());
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

    const possuiVeiculosCompativeis = veiculosCompativeis? (veiculosCompativeis.length>0) : false;

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

      $('.veiculos-compativeis-search').show();

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
  const urlAddCart = "/checkout/cart/add?sku=" +
    skuList[0] +
    "&qty=1&seller=1&redirect=true&" +
    readCookie("VTEXSC");

  $('.veiculos-compativeis-search__search-box .veiculos-compativeis-search__search-input input')
    .on('input', function () {
      buscaCompativeis($(this).val())
    });

  function buscaCompativeis(texto) {
    if (veiculosBuscaveis && veiculosBuscaveis.length > 0 && texto.length > 0) {
      const veiculosBuscaveisFiltrado = veiculosBuscaveis.map((a) =>
          a.Veiculos.filter(b =>
            new RegExp(texto.split(" ")
              .map(str => `(?=.*${str})`).join(""), "i")
              .test(b.Veiculo)))
          .filter(a => a.length > 0);

      if(!!veiculosBuscaveisFiltrado.length) {
        sugestoesContainer.html(
          veiculosBuscaveisFiltrado.flat()
            .slice(0, 3)
            .map(buildContentBusca)
            .join("") + `<div class="veiculos-compativeis-search__link">
                            <a href="#veiculos-compativeis">Ver todos</a>
                          </div>`
        );

        document.querySelectorAll(
          'a.veiculos-compativeis__content-compativel-link'
        ).forEach((element) => element.addEventListener('click', sendGaClickEvent));
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
          <div id="${grupo.Grupo + index
      }" class="veiculos-compativeis__header-option">
              <span>${grupo.Grupo}</span>
          </div>
      `;
  }

  function sendGaClickEvent(event) {
    ga('set', 'transport', 'beacon');
    ga('send', 'event', 'Link SelectCar', 'Clique', 'Add ao Carrinho');
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

    $(`.product-qd-v1-social-share a.whatsapp`).attr(`href`, `https://api.whatsapp.com/send?text=${productLink}`);
    $(`.product-qd-v1-social-share a.twitter`).attr(`href`, `https://twitter.com/intent/tweet?text=${productLink}`);
    $(`.product-qd-v1-social-share a.mail`).attr(`href`, `mailto:?subject=Quero%20compartilhar%20um%20produto%20da%20Autoglass&body=Veja%20este%20produto%20na%20Autoglass:%0D%0A${productLink}`);
    $(`.product-qd-v1-social-share a.messenger`).attr(`href`, `fb-messenger://share?link=${productLink}`);
    $(`.product-qd-v1-social-share a.facebook`).attr(`href`, `https://www.facebook.com/sharer.php?u=${productLink}`);
    $('.product-qd-v1-social-share a.popup-trigger').click((e) => {
      e.preventDefault();
      $('div.product-qd-v1-social-share-options-popup').fadeToggle(400, 'swing', () => {
        $(`.product-qd-v1-social-share a.copy`).children('i.fas.fa-check').attr('class', 'far fa-copy');
      });
    });
    $(`.product-qd-v1-social-share a.copy`).click((e) => {
      e.preventDefault();
      navigator.clipboard.writeText(location.href);
      $(`.product-qd-v1-social-share a.copy`).children('i.far.fa-copy')
        .fadeOut("fast").attr('class', 'fas fa-check').fadeIn("fast");
    });
    $('.product-qd-v1-social-share a:not(.popup-trigger)').click((e) => {
      const element = $(e.target).closest('a').attr('class');
      const array = element.replace('_', '').split(' ');

      for (let index = 0; index < array.length; index++) {
        array[index] = array[index].charAt(0).toUpperCase() + array[index].slice(1);
      }

      const networkClicked = array.join(' ');

      ga('create', 'UA-133498560-1', 'autoglassonline.com', 'gaSSTracker');
      ga('gaSSTracker.set', 'transport', 'beacon');
      ga('gaSSTracker.send', 'event', 'Social Share', `Compartilhar ${networkClicked}`, `Botão ${networkClicked}`);
    });
  }

  async function enableWindshieldVanePopUp() {
    const currentProduct = await vtexjs.catalog.getCurrentProductWithVariations();
    const isWindshield = currentProduct.name.startsWith('Parabrisa') ? true : false;
    // || currentProduct.name.startsWith('Vidro Traseiro');  
    if (!isWindshield) return;  //mudar para isWindshieldOrBackglass

    $('body').append(`
      <div id="windshildVane-advertise">
      </div>
    `)

    $('a[href*="/checkout/cart/add?sku="], .mz-accesories__button a, .mz-advantages__button a, .mz-install__button a, .mz-shipping__button a, .mz-pickup__button a')
    .on('click', async function (element) {
      element.preventDefault();
    
      const windshieldVaneItems = await whildshieldVaneInCrossSellingList();

      if(!windshieldVaneItems.length){
        const newUrl = this.href;
        return document.location.href = newUrl;
      }

      createWindshieldVanePopUp(element, windshieldVaneItems);
    });

    function createWindshieldVanePopUp(element, windshieldVaneItems) {
      $('#windshildVane-advertise').append(`
        <div class="advertise">
          <div class="image"></div>
          <div class="exit-button">×</div>
          <div class="container-smallheight">
          <div class="text-popup">
            <h2>Recomendamos trocar as palhetas a cada <b>6 meses</b> ou na <b>troca de parabrisa.</b></h2>
            <h3>Deseja adicionar?</h3>
          </div>
            <div class="buy-button">
              <div id="sim-modal-palheta" class="yes"></div>
              <div id="nao-modal-palheta" class="no"></div>
            </div>
          </div>
        </div>
      `)

      appendWindshieldVaneImage(windshieldVaneItems[0]);
      const newButton = element.srcElement.cloneNode();
      appendPopUpButtons(windshieldVaneItems[0], newButton);
      $('#windshildVane-advertise .advertise').addClass('filled');

      $('#windshildVane-advertise, .exit-button').click(function(e) {
        $('#windshildVane-advertise .advertise').fadeOut(300);
        $(this).fadeOut(300);
        $('#windshildVane-advertise div').remove();
      });

      $('#windshildVane-advertise .advertise').click(function(e) {
        e.stopPropagation();
      })

      $('#windshildVane-advertise').css('display', 'flex');
    }

    async function whildshieldVaneInCrossSellingList() {
      const uriCrossSelling = window.location.origin + '/api/catalog_system/pub/products/crossselling/suggestions/' + vtxctx.skus;

      const items = await fetch(uriCrossSelling).then((response) => {
        return response.json();
      });

      const windshieldVaneItems = items.filter(isWindshildVane);
      return windshieldVaneItems;
    }

    function isWindshildVane(item) {
      return item.productName.startsWith("Palheta")
    }

    function appendWindshieldVaneImage(item) {
      const urlBase = "https://autoglass.vteximg.com.br"
        let urlImagem = item.items[0].images[0].imageTag
        .replaceAll('~',urlBase)
        .replaceAll('#width#','300')
        .replaceAll('#height#','300');

        $('#windshildVane-advertise div.image').append(urlImagem)
    }

    function appendPopUpButtons(item, button) {
      var currentDate = Date.now();

      button.innerText = 'Não, obrigado!';
      $('#windshildVane-advertise div .buy-button .no').append(button.cloneNode(true)).click(function(e){
        localStorage.setItem("lastTimeWhildshieldVanePopUpWasShown", currentDate)
      })
      button.innerText = 'Sim, adicionar!';
      const newUrl = `${button.href}&sku=${item.items[0].itemId}&qty=1&seller=1&redirect=true&sc=${jssalesChannel}`;
      button.href = newUrl;
      $('#windshildVane-advertise div .buy-button .yes').append(button.cloneNode(true)).click(function(e){
        localStorage.setItem("lastTimeWhildshieldVanePopUpWasShown", currentDate)
      })
    }
  }
  
  function shouldShowWindshieldVanePopUp() {
    if (getLastTimeWhildshieldVanePopUpWasShown() === undefined)
      return true;
    return (Date.now() - getLastTimeWhildshieldVanePopUpWasShown() > calculatesTwelveHours())
  }

  if(shouldShowWindshieldVanePopUp())
    return enableWindshieldVanePopUp();
});