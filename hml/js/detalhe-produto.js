const baseUrlApi =
    window.location.href.includes("dev") || window.location.href.includes("mvp") || window.location.href.includes("hml")
      ? "https://api-hml.autoglass.com.br/integracao-b2c/api/web-app"
      : "https://api.autoglass.com.br/integracao-b2c/api/web-app";

const sections = [...document.querySelectorAll("section.tab-content")];
const getLinkById = (id) => document.querySelector(`a[href='#${id}'].tab-link`);

$(".product-qd-v1-buy-button .buy-button.buy-button-ref").addClass("add-to-cart-ga");

function handleSocialClick(event, method) {
  dataLayer.push({
    event: 'share',
    method: method,
    content_type: skuJson.skus[0].image,
    item_id: skuJson.skus[0].sku,
  });
}

const socialMediaElements = {
  'whatsapp': '.product-qd-v1-social-share.desktop .whatsapp',
  'twitter': '.product-qd-v1-social-share.desktop .twitter',
  'mail': '.product-qd-v1-social-share.desktop .mail',
  'facebook': '.product-qd-v1-social-share.desktop .facebook'
};

Object.entries(socialMediaElements).forEach(([socialMediaType, selector]) => {
  const element = document.querySelector(selector);
  element.addEventListener('click', (event) => handleSocialClick(event, socialMediaType));
});

function exibeNumeroVendas(){
  let sectionNumeroVendas;
  let numeroVendas = recuperarNumeroVendas();
  if(numeroVendas == null)
    return;
  numeroVendas.then(function(result){
    window.innerWidth < 900 ? sectionNumeroVendas = document.querySelector(".numero-vendas-mobile") : sectionNumeroVendas = document.querySelector(".numero-vendas");
    if(result > 10)
      sectionNumeroVendas.innerHTML = `
                                      <div class="vendas-wrapper">
                                        <i class="fa fa-shopping-bag"></i>
                                        <span class="texto-numero-vendas">${result}</span>
                                        <span class="texto-vendidos">vendidos</span>
                                      </div>
                                      `;
  });
}

function ButtoWhatsappClick(event, position) {
  dataLayer.push({
    event: 'whatsapp',
    position: position
  });
}

const whatsappElements = {
  '.link-whatsapp-texto.link-whatsapp-conteudo-sem-numero': 'topo',
  '.link-whatsapp-texto.gtm-whatsapp-botao-rodape': 'widget',
  '.link-whatsapp-texto.botao-compre-whatsapp': 'compre-whatsapp',
  '.link-whatsapp-texto.link-whatsapp': 'footer'
};

Object.entries(whatsappElements).forEach(([selector, buttonType]) => {
  const element = document.querySelector(selector);
  if (element) {
    element.addEventListener('click', (event) => ButtoWhatsappClick(event, buttonType));
  }
});


let veiculosBuscaveis = [];
const sugestoesContainer = $('.veiculos-compativeis-search__search-suggestions');
$('.veiculos-compativeis-search').hide();

const inView = (section, width) => {
  let top = section.offsetTop;
  let height = section.offsetHeight;

  while (section.offsetParent) {
    section = section.offsetParent;
    top += section.offsetTop;
  }
  if (width) {
    top -= width > 1200 ? 250 : 130;
  }

  return (
    top < window.pageYOffset + window.innerHeight &&
    top + height > window.pageYOffset
  );
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
  section.classList.toggle("ativo");
};

const sectionCollapseInit = () => {
  let headers = document.querySelectorAll(".contents .tab-content h2");

  headers.forEach((header) => {
    header.onclick = () => {
      toggleSectionCollapse(header.closest(".tab-content"));
    };
    if (header.textContent === 'Compre Junto' || header.textContent === 'Outras Marcas')
      setTimeout(() => toggleSectionCollapse(header.closest(".tab-content")), 5000);
  });
};

sectionCollapseInit();

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
  try{
    const [_, productRefId] = currentProduct.name.match(/(\d+)(\s?\-?\s?[0-9]+)?$/);
    return productRefId;
  } catch(ex){
    return 0;
  }
}

async function loadOptionals() {
  const opcionaisContainer = $("#opcionais");
  const productRefId = await getProductRefIdByProductName();
  const testeOpcionais = $(".teste-opcionais");

  try {
    const { Opcionais } = await $.get(`${baseUrlApi}/produtos/${productRefId}/opcionais`);

    if (Opcionais && Opcionais.length > 0) {
      opcionaisContainer.html(`
        <h3>Características</h3>
        <div class="caracteristicas__box">
          ${Opcionais.map((x) => `<span class="caracteristicas__caracteristica">${x}</span>`).join("")}
        </div>
      `);
      testeOpcionais.html(`
        ${Opcionais.map((x) => `<h4 class="lista-opcionais">${x}</h4>`).join("")}
        <div class="container-mais-especificacoes">
          <a class="mais-especificacoes">Mais informações</a>
        </div>
      `)
    }
  } catch (ex) {
    console.error("Falha ao renderizar opcionais. \n", ex);
  }

  $('.container-mais-especificacoes .mais-especificacoes').click(function() {
    document.querySelector('.container-descricao #informacoes-gerais').scrollIntoView();
  });
}

window.addEventListener("load", insertBrandDescription);
window.addEventListener("load", loadOptionals);

async function loadSimilars() {
  const hideMenu = (id) => (document.querySelector(`a[href="#${id}"]`).parentElement.style.display = "none");
  const isLoaded = (id) => document.querySelector(`#${id}`).innerHTML != "";
  const showComponent = (id) => {
    document.querySelector(`#${id}`).style.display = "block";
    document.querySelector(`a[href="#${id}"]`).parentElement.style.display = "unset";
  };

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

$(window).on("load", async () => {
  window.addEventListener("resize", adjustProductThumbHeight);

  function adjustProductThumbHeight() {
    $('.product-qd-v1-image div#image').css('min-height', $('.product-qd-v1-image #image-main').width());
  }

  adjustProductThumbHeight();

  initializeSocialShareLinks();

  const veiculosCompatíveisContainer = $("#veiculos-compativeis");
  const productRefId = await getProductRefIdByProductName();

  let veiculosCompativeis;

  try{
    veiculosCompativeis = await $.get(`${baseUrlApi}/produtos/${productRefId}/veiculos-compativeis`);
  } catch(ex){
    veiculosCompativeis = [];
  }

  veiculosBuscaveis = veiculosCompativeis;

  const possuiVeiculosCompativeis = veiculosCompativeis ? veiculosCompativeis.length > 0 : false;

  if (possuiVeiculosCompativeis) {
    veiculosCompatíveisContainer.html(`
      <h2>Veículos Compatíveis</h2>
      <div class="veiculos-compativeis__box">
        <div class="veiculos-compativeis__box-header">
          <button id="group-prev" data-type="prev" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" alt="Ícone de seta para a esquerda">
              <path id="Icon_ionic-ios-arrow-dropleft-circle" data-name="Icon ionic-ios-arrow-dropleft-circle" d="M19.375,3.375a16,16,0,1,0,16,16A16,16,0,0,0,19.375,3.375Zm3.338,22.238a1.49,1.49,0,0,1,0,2.1,1.467,1.467,0,0,1-1.046.431,1.492,1.492,0,0,1-1.054-.438l-7.231-7.254a1.483,1.483,0,0,1,.046-2.046l7.338-7.362a1.485,1.485,0,0,1,2.1,2.1l-6.3,6.231Z" transform="translate(35.375 35.375) rotate(180)" opacity="0.42"/>
            </svg>
          </button>
          ${veiculosCompativeis.map(buildHeader).join("")}
          <button id="group-next" data-type="next" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" alt="Ícone de seta para a direita">
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
      $(`.veiculos-compativeis__box-content div[data-for="${$(this).attr("id")}"]`).addClass("active");
    });

    $("#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header button").click(function () {
      const type = $(this).attr("data-type");
      const headerContainer = $("#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header");

      if (type === "next") {
        headerContainer[0].scrollBy(200, 0);
      } else {
        headerContainer[0].scrollBy(-200, 0);
      }
    });

    const headerContainer = $("#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header");
    $("#veiculos-compativeis h2").click(() => toggleSectionCollapse(veiculosCompatíveisContainer[0]));

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

  let skuList = Product.captureSkuSelectors();
  const urlAddCart = "/checkout/cart/add?sku=" +
    skuList[0] +
    "&qty=1&seller=1&redirect=true&" +
    readCookie("VTEXSC");

  $('.veiculos-compativeis-search__search-box .veiculos-compativeis-search__search-input input').on('input', async function () {
    await buscaCompativeis($(this).val());
  });

  async function buscaCompativeis(texto) {
    const regexPlaca = /^[A-Z]{3}[\-_]?[0-9][0-9A-Z][0-9]{2}$/i;
    let ano = undefined;
    if(texto.trim().match(regexPlaca)) {

      sugestoesContainer.html(`
        <div class="spinner-compatibilidade"></div>
      `);
      const {
        modelo,
        anoModelo
      } = await buscaPorPlaca(texto.trim())

      texto = modelo;
      ano = parseInt(anoModelo, 10);;
      sugestoesContainer.empty();
    }

    if (veiculosBuscaveis && veiculosBuscaveis.length > 0 && texto.length > 0) {
      const veiculosBuscaveisFiltrado = veiculosBuscaveis.map((a) =>
        a.Veiculos.filter(b =>
          new RegExp(texto.split(" ").map(str => `(?=.*${str})`).join(""), "i").test(b.Veiculo) &&
          (ano == undefined || b.Anos.includes(ano)))
      ).filter(a => a.length > 0);

      if (veiculosBuscaveisFiltrado.length) {
        sugestoesContainer.html(
          veiculosBuscaveisFiltrado.flat().slice(0, 3).map(buildContentBusca).join("") +
          `<div class="veiculos-compativeis-search__link">
            <a href="#veiculos-compativeis">Ver todos</a>
          </div>`
        );

        document.querySelectorAll('a.veiculos-compativeis__content-compativel-link').forEach((element) => element.addEventListener('click', sendGaClickEvent));
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
    return `<a href="${urlAddCart}" class="veiculos-compativeis__content-compativel-link">
              <p>${veiculo.Veiculo}</p>
              <div>${veiculo.Anos.map((x) => "<span>" + x + "</span>").join(",&nbsp")}.</div>
            </a>`;
  }

  function buildHeader(grupo, index) {
    return `
      <div id="${grupo.Grupo + index}" class="veiculos-compativeis__header-option">
        <span>${grupo.Grupo}</span>
      </div>
    `;
  }

  function sendGaClickEvent() {
    ga('set', 'transport', 'beacon');
    ga('send', 'event', 'Link SelectCar', 'Clique', 'Add ao Carrinho');
  }

  function buildContent(grupo, index) {
    return `
      <div data-for="${grupo.Grupo + index}">
        ${grupo.Veiculos.map((veiculo) => `
          <div class="veiculos-compativeis__content-compativel">
            <p>${veiculo.Veiculo}</p>
            <div>${veiculo.Anos.map((x) => "<span>" + x + "</span>").join(",&nbsp")}.</div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function checkIfNeedButtons(header) {
    const buttons = $("#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header button");

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
    return document.querySelector(".veiculos-compativeis__box-header").scrollWidth > window.innerWidth;
  }

  function getScrollPercentage(container) {
    return (100 * container.scrollLeft) / (container.scrollWidth - container.clientWidth);
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
      $(`.product-qd-v1-social-share a.copy`).children('i.far.fa-copy').fadeOut("fast").attr('class', 'fas fa-check').fadeIn("fast");
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

  // const produtosInsumoInstalacao = ['Vidro', 'Parabrisa'];
  // const nomeProduto = dataLayer[0].pageTitle;
  // const categoriaProduto = nomeProduto.split(' ')[0];

  let codigoSKU = null;
  let precoAcessorio = null;
  const acessorios = document.querySelectorAll('.info-acessorios-ag');
  acessorios.forEach(acessorio => {
    const nome = acessorio.querySelector('#nome-produto-acessorio-ag')?.textContent?.toUpperCase();

    if (nome?.includes('INSUMO')) {
      codigoSKU = acessorio.querySelector('#codigo-sku-acessorio-ag')?.textContent?.trim();
      precoAcessorio = acessorio.querySelector('#preco-acessorios-ag')?.textContent?.replace('R$', '')?.trim();
    }
  });

  $(".product-qd-v1-buy-button .buy-button").attr("href", "#");
  const urlSemInstalacao = "/checkout/cart/add?sku=" + skuList[0] + "&qty=1&seller=1&redirect=true&" + readCookie("VTEXSC");

  let urlComInstalacao = urlSemInstalacao + "&sku=" + codigoSKU + "&qty=1&seller=1&redirect=true&" + readCookie("VTEXSC");
  if(!precoAcessorio || !codigoSKU){
    $(".card-instalacao").hide();
  }

  $(".product-qd-v1-buy-button .buy-button").click(function () {
    if(precoAcessorio && codigoSKU)
      window.location.href = urlComInstalacao;
    else
      window.location.href = urlSemInstalacao;
  }),

  $(document).ready(function(){
    $('.botao-compre-whatsapp').click(function() {
      const mensagem = `Olá, estou na página desse produto e gostaria de comprá-lo: ${window.location.href}`;
      window.open(urlWhatsAppApi + numeroWhatsAppAG + '?text=' + mensagem, '_blank').focus();
    });
  });
});

async function buscaPorPlaca(placaString) {
  let placaSemCaracteresEspeciais = sanitizePlate(placaString);

  try {
    if(window.innerWidth < 700)
      document.querySelector("#side-menu .loading-overlay").style.display = "block";

    const {
      montadora,
      modelo,
      anoModelo,
      fipe,
    } = await obterDadosDoVeiculoViaOlhoNoCarro(placaSemCaracteresEspeciais);
    return {montadora, modelo, anoModelo, fipe};
  } catch (error) { }

  function sanitizePlate(plate) {
    return plate.trim().replace(/[\W_]+/g, "").toUpperCase();
  }

  async function obterDadosDoVeiculoViaOlhoNoCarro(placa) {

    const response = await fetch(`${baseUrlApi}/veiculos/${placa}/placas`);
    const veiculo = await response.json();

    montadora = veiculo.Body.Data.Marca;
    modelo = veiculo.Body.Data.Modelo;
    anoModelo = veiculo.Body.Data.DadosBasicosDoVeiculo.AnoModelo;
    fipe = veiculo.Body.Data.DadosBasicosDoVeiculo.InformacoesFipe[0].FipeId;

    return { montadora, modelo, anoModelo, fipe };
  }
}

async function recuperarNumeroVendas(){
  let codigoProduto = await getProductRefIdByProductName();
  let numeroVendas = await $.get(`${baseUrlApi}/vendas/vendas/${parseInt(codigoProduto)}`);
  return numeroVendas;
}

document.addEventListener("DOMContentLoaded", function() {
  exibeNumeroVendas();
});

buscarPromocoes();
async function buscarPromocoes() {
  try {
    const response = await fetch(`${baseUrlApi}/promocoes?nome=pix`);
    const data = await response.json();

    const pixPromotionActive = data.find(promotion => promotion.isActive);

    if (pixPromotionActive) {
      aplicarDesconto(pixPromotionActive.percentualDiscountValue);
    } else {
      const precos = document.querySelectorAll('.skuBestPrice');

      precos.forEach(preco => {
        preco.style.display = 'inline-block';
      })
    }
  } catch(ex) {
    const precos = document.querySelectorAll('.skuBestPrice');

    precos.forEach(preco => {
      preco.style.display = 'inline-block';
    })
  }
}

function aplicarDesconto(percentualDesconto) {
  const precoBaseSelector = document.querySelectorAll('.skuListPrice')[1];
  let precoBaseOriginal = precoBaseSelector.innerHTML.trim().replace('R$', '').trim().replace('.', '').replace(',', '.');
  let precoBaseNumerico = parseFloat(precoBaseOriginal);

  const precos = document.querySelectorAll('.skuBestPrice');

  precos.forEach((precoElemento, index)=> {
    let precoOriginal = precoElemento.textContent.trim();
    precoOriginal = precoOriginal.replace('R$', '').trim();
    precoOriginal = precoOriginal.replace('.', '').replace(',', '.');

    let precoNumerico = parseFloat(precoOriginal);

    if (!isNaN(precoNumerico)) {
      const precoComDesconto = Math.round((precoNumerico * (1 - (percentualDesconto / 100.00))) * 1000) / 1000;
      const precoComDescontoFinal = Math.round(precoComDesconto * 100) / 100;
      precoElemento.textContent = precoComDescontoFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      precoElemento.style.fontSize = '18px';

      if (index !== precos.length - 1) {
        const divPix = document.createElement('div');
        divPix.classList.add('pix-discount');
        divPix.textContent = 'no Pix';

        const porcentagemDesconto = ((precoBaseNumerico - precoComDescontoFinal) / precoBaseNumerico) * 100;
        const divPercent = document.createElement('div');
        divPercent.classList.add('percent-box');
        divPercent.textContent = `-${Math.round(porcentagemDesconto)}%`;

        precoElemento.parentElement.appendChild(divPix);
        precoElemento.parentElement.appendChild(divPercent);
      } else {
        precoElemento.classList.add('.preco-bottom-mobile')
      }

      precoElemento.style.display = 'inline-block';

      ajustarTextoValorParcelado(precoNumerico);
    }
  });
}

function ajustarTextoValorParcelado(precoNumerico) {
  let divs = document.querySelectorAll('.valor-dividido.price-installments');


  divs.forEach(function(div, index) {
    if (!div.classList.contains('modificada')) {

      div.classList.add('modificada');

      let labelNumero = div.querySelector('.skuBestInstallmentNumber');

      let novaLabel = document.createElement('label');
      novaLabel.textContent = precoNumerico.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });;  // O texto que você deseja adicionar
      novaLabel.classList.add('skuBestInstallmentNumber');

      if (labelNumero) {
        labelNumero.parentNode.insertBefore(novaLabel, labelNumero);



        let spanConectiva = document.createElement('span');
        spanConectiva.textContent = ' em ';
        spanConectiva.classList.add('palavras-conectivas');
        novaLabel.parentNode.insertBefore(spanConectiva, labelNumero);

        let novoSpan = document.createElement('span');
        novoSpan.textContent = ' sem juros';
        novoSpan.classList.add('span-sem-juros')

        let strongTag = div.querySelector('strong');

        if (strongTag) {
          strongTag.appendChild(novoSpan);
        }

        if (index !== divs.length - 1) {
          if (div.style.display === 'none' || getComputedStyle(div).display === 'none') {
            let descricaoPrecoDiv = div.closest('.descricao-preco');

            if (descricaoPrecoDiv) {
              let containerDiv = document.createElement('div');
              containerDiv.classList.add('valor-dividido', 'price-installments', 'modificada');

              let spanConectivaOu = document.createElement('span');
              spanConectivaOu.textContent = 'ou ';
              containerDiv.appendChild(spanConectivaOu);

              tipoTag = index == 0 ? 'label' : 'span';

              let strongTagNova = document.createElement(tipoTag);
              strongTagNova.textContent = novaLabel.textContent;
              strongTagNova.classList.add('skuBestInstallmentNumber');
              containerDiv.appendChild(strongTagNova);

              descricaoPrecoDiv.appendChild(containerDiv);
            }
          }
        }
      }
    }
  });
}