document.addEventListener("DOMContentLoaded", function () {
  const mecanismosBusca = ["google.com", "bing.com", "yahoo.com", "duckduckgo.com", "baidu.com", "yandex.com"];
  const referrer = document.referrer;
  const mecanismoBuscaSelecionado = mecanismosBusca.some(engine => referrer.includes(engine));
  if (mecanismoBuscaSelecionado) {
    let url = window.location.href.split(".br")[1];
        if (window.location.href.includes("https://hml.autoglassonline.com.br") || window.location.href.includes("https://loja.autoglassonline.com.br")) {
            window.location.href = `https://autoglassonline.com.br${url}`;
        }
    }
});
const device = {
  desktop: ".desktop",
  mobile: ".mobile"
}
const numeroWhatsAppAG = "552732032535";
const linkEncurtado = 'https://bit.ly/43u3oa6';
const numeroWhatsAppFormatadoAG = "(27) 3203-2535";
const urlWhatsAppApi = "https://wa.me/";
const textoUrlGet = "?text=Olá,%20estou%20navegando%20pelo%20e-commerce,%20pode%20me%20ajudar?";

function getLastTimeWhildshieldVanePopUpWasShown() {
  return Number (localStorage.getItem('lastTimeWhildshieldVanePopUpWasShown'));
}

function calculatesTwelveHours() {
  return 12*60*60*1000;
}

function valueBetweenRange (value, min, max) {
  return value < min ? min : (value > max ? max : value);
}

function fecharAbaCategoria() {
  const divCategoria = document.getElementById('busca-categoria');
  const divBuscaPlaca = document.getElementById('busca-placa');
  const abaBuscaPlaca = document.getElementById('tab-busca-placa');
  const abaBuscaCategoria = document.getElementById('tab-busca-categoria');
  // Função auxiliar para trocar classes
  const toggleActiveClass = (element, add) => {
    if (element) {
      if (add) {
        element.classList.add('is-active');
      } else {
        element.classList.remove('is-active');
      }
    }
  };
  // Remover is-active da aba de categoria
  toggleActiveClass(divCategoria, false);
  toggleActiveClass(abaBuscaCategoria, false);
  // Adicionar is-active à aba de busca por placa
  toggleActiveClass(divBuscaPlaca, true);
  toggleActiveClass(abaBuscaPlaca, true);
}

function activateCategory(categoriaAtual, indexConteudoAtual) {
  let categoriaAnterior = document.querySelector('.painel-categorias__menu .painel-categorias__categoria.ativo');
  let conteudoAtual = document
    .querySelectorAll('.painel-categorias__categoria-conteudo .painel-categorias__categoria-itens')[indexConteudoAtual];

  if (categoriaAnterior) {
    categoriaAnterior
      .querySelector('.painel-categorias__categoria-header.ativo')
      ?.classList.remove('ativo');
    categoriaAnterior.classList.remove('ativo');
    document
      .querySelector('.painel-categorias__categoria-conteudo .painel-categorias__categoria-itens.ativo')
      ?.classList.remove('ativo');

    // event.target.style.transition = '0.8s';
    // event.target.style.opacity = 0;
  }
  categoriaAtual
    .querySelector('.painel-categorias__categoria-header')
    ?.classList.add('ativo');
  categoriaAtual?.classList.add('ativo');
  conteudoAtual?.classList.add('ativo');
  currentCategory = categoriaAtual;
}

function toggleVisibility(id) {
  let element = document.getElementById(id);
  element.style.visibility = element.style.visibility === 'hidden' ? 'visible' : 'hidden';
}

function getTranslateX(element) {
  let transform = getComputedStyle(element).getPropertyValue('transform');
  let matrix = new WebKitCSSMatrix(transform);
  return matrix.m41;
}

let currentCategory = null;

function isActiveElement(element) {
  return element instanceof jQuery ? element.hasClass('ativo') : element.classList.contains('ativo');
}

function getMenuIdName(element){
  return replaceBlankSpaces(removeSpecialChars(removeAccent($(element).text().toLowerCase())),'-');
}

function removeAccent(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

function removeSpecialChars(text) {
  return text.replace(/[^\w\s]/gi, '');
}

function replaceBlankSpaces(text, newChar) {
  return text.replace(/\s/g, newChar);
}

if(window.innerWidth > 500){
  void function initializeCategoryPanelMenu() {
    let lastActiveCategory = null;
    var painelCategoriasMenu = $('.painel-categorias__categoria.ativo');

    $('.painel-categorias__categoria-itens-lista-menu li a').hover(
      function(){
        if(lastActiveCategory != this){
          $(`#${getMenuIdName(lastActiveCategory)}`).removeClass('ativo');
        }
        let currentCategory = $(`#${getMenuIdName(this)}`);
        if(!isActiveElement(currentCategory)) {
          currentCategory.addClass('ativo')
        }
        lastActiveCategory = this;
      },
    )

    var observer = new MutationObserver(function(mutations) {
      if(!isActiveElement(mutations[0].target)){
        if(lastActiveCategory &&
          currentCategory.innerText != lastActiveCategory.innerText){
          $(`#${getMenuIdName(lastActiveCategory)}`).removeClass('ativo')
        }
      }
    });

    observer.observe(painelCategoriasMenu[0], {
      attributes: true,
      attributeFilter: ['class']
    });
  }();
}

async function checkLogin() {
  var accountComponent = document.querySelector(".topo .usuario.desktop");

  let response = await fetch("/no-cache/profileSystem/getProfile");
  let data = await response.json();

  try {
    if (data.IsUserDefined) {
      var emailReceived = data.Email;
      var nameUser = data.FirstName && data.FirstName.length ? data.FirstName : emailReceived.match(/([^{0-9}|.|@|-]+)/).pop();
      //var nameUser = data.FirstName.length ? data.FirstName : emailReceived.match(/([^{0-9}|.|@|-]+)/).pop();
      accountComponent.innerHTML = `<div class="user-avatar-icon"></div>
        <span>
          Olá, <b>${nameUser}</b>
          <i class="arrow-down-icon-white"></i>
        </span>
        <ul class="usuario__opcoes">
          <li><a href="/_secure/account">Dados Pessoais</a></li>
          <li><a href="/_secure/account#/orders">Meus Pedidos</a></li>
          <li><a href="/_secure/account#/cards">Cartões</a></li>
          <li><a href="/_secure/account#/addresses">Endereços</a></li>
          <li id="logout"><button onclick="document.querySelector('#saindo').style.display = 'block'">Sair</button></li>
        </ul>`;
      //<a id="logout" href="/no-cache/user/logout">Sair</a>
    } else {
      accountComponent.innerHTML = `<div class="user-avatar-icon"></div>
      <a id="login">
        <b>Entrar ou Cadastrar</b>
        <i class="arrow-down-icon-white"></i>
      </a>`;
      document.body.classList.add("not-logged-user");

    }
  } catch (e) {
    if (typeof console !== "undefined" && typeof console.info === "function")
      console.info("Ops, algo saiu errado com o login.", e.message)
  }
}

async function checkLoginMobile() {
  let response = await fetch("/no-cache/profileSystem/getProfile");
  let data = await response.json();
  if (data.IsUserDefined) {
    document.querySelector('#div-login-mobile')
    .addEventListener('click', () => {
      document.getElementById('loading-spinner').style.display = 'flex';
      setTimeout(() => {
        window.location.href = "https://autoglassonline.com.br/_secure/account#/";
      }, 500);
    });
  }
}

async function fixPlaceholderSearch() {
  var idSearchFilterP = $('.search-box input[type="text"].fulltext-search-box');
  if (!idSearchFilterP.length)
    return;
  var idSearchFilter = idSearchFilterP.attr("id").replace("ftBox", "");
  enableFullTextSearchBox("ftBox" + idSearchFilter, "ftDept" + idSearchFilter, "ftIdx" + idSearchFilter, "ftBtn" + idSearchFilter, "/SEARCHTERM?&utmi_p=_&utmi_pc=BuscaFullText&utmi_cp=SEARCHTERM", "Pesquise por peça, produto, montadora...");

  setTimeout(() => {
    $('.search-box .btn-buscar').unbind().click(e => {
      e.preventDefault();
      const input = $('.search-box input[type="text"].fulltext-search-box');

      const DEFAULT = {
        Initial: 'Pesquise por peça, produto, montadora...',
        Invalid: 'Informe o produto que deseja procurar'
      };

      const isIllegalTerm = input.val() === DEFAULT.Initial || input.val() === DEFAULT.Invalid || input.val() === '';

      if (isIllegalTerm) {
        input.val('Informe o produto que deseja procurar');

        input.unbind('focus');
        input.unbind('blur');

        input.focus(function () {
          $(this).filter(function () {
            return isIllegalTerm
          }).val('');
        });

        input.blur(function () {
          $(this).filter(function () {
            return $(this).val() === '';
          }).val(isIllegalTerm ? DEFAULT.Invalid : DEFAULT.Initial);
        });

        $(".search-box").css('border-color', '#E74C3C');
      } else {
        const id = input.attr('id').replace("ftBox", "");

        doSearch(
          "ftBox" + id,
          "ftDept" + id,
          "ftIdx" + id,
          "/SEARCHTERM?&utmi_p=_&utmi_pc=BuscaFullText&utmi_cp=SEARCHTERM",
          "Buscar"
        );
      }
    });
  }, 1000);
}

async function fixPlaceholderSearchMobile() {
  var idSearchFilterP = $('.search-box-mobile input[type="text"].fulltext-search-box');
  if (!idSearchFilterP.length)
    return;
  var idSearchFilter = idSearchFilterP.attr("id").replace("ftBox", "");
  enableFullTextSearchBox("ftBox" + idSearchFilter, "ftDept" + idSearchFilter, "ftIdx" + idSearchFilter, "ftBtn" + idSearchFilter, "/SEARCHTERM?&utmi_p=_&utmi_pc=BuscaFullText&utmi_cp=SEARCHTERM", "Pesquisar");
  setTimeout(() => {
    $('.search-box .btn-buscar').unbind().click(e => {
      e.preventDefault();
      const input = $('.search-box input[type="text"].fulltext-search-box');
      const DEFAULT = {
        Initial: 'Pesquisar',
        Invalid: 'Informe o produto que deseja procurar'
      };
      const isIllegalTerm = input.val() === DEFAULT.Initial || input.val() === DEFAULT.Invalid || input.val() === '';
      if (isIllegalTerm) {
        input.val('Informe o produto que deseja procurar');
        input.unbind('focus');
        input.unbind('blur');
        input.focus(function () {
          $(this).filter(function () {
            return isIllegalTerm
          }).val('');
        });
        input.blur(function () {
          $(this).filter(function () {
            return $(this).val() === '';
          }).val(isIllegalTerm ? DEFAULT.Invalid : DEFAULT.Initial);
        });
        $(".search-box").css('border-color', '#E74C3C');
      } else {
        const id = input.attr('id').replace("ftBox", "");
        doSearch(
          "ftBox" + id,
          "ftDept" + id,
          "ftIdx" + id,
          "/SEARCHTERM?&utmi_p=_&utmi_pc=BuscaFullText&utmi_cp=SEARCHTERM",
          "Buscar"
        );
      }
    });
  }, 1000);
}

async function loadCart(device) {
  let carrinho = document.querySelector(`${device} .menu-carrinho`);
  carrinho.addEventListener('click', (event) => {
    window.location.href = '/checkout/#/cart';
  });

  let orderForm = await vtexjs.checkout.getOrderForm();

  await updateCartItemsCount(carrinho, orderForm);
}

async function updateCartItemsCount(carrinho, orderForm) {
  if (!orderForm){
    return updateBadge (carrinho)
  }
  return updateBadge (carrinho, orderForm.items.length)
}

function updateBadge (carrinho, count) {
  let badge = carrinho.querySelector('.badge') ? carrinho.querySelector('.badge') : document.createElement('span')
  badge.classList.add('badge');
  badge.innerHTML = typeof(count) == 'number' ? count : Number.parseInt((badge.innerHTML))+1 || 1;
  if (badge.innerHTML != 0)
    carrinho.append(badge);
  setTimeout(() => carrinho.classList.add('loaded'), 500);
}

async function cartItemAddedConfirmation(eventData) {
  const { skuData } = eventData;
  const windowWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  const currentDevice = windowWidth >= 1200 ? device.desktop : device.mobile
  const confirmationBox = document.querySelector(`${currentDevice} .menu-carrinho .confirmacao`)

  const img = confirmationBox.querySelector('.item img');
  const title = confirmationBox.querySelector('.item .titulo');

  confirmationBox.style.visibility = 'visible';

  const carrinho = document.querySelector(`${currentDevice} .menu-carrinho`);
  updateCartItemsCount(carrinho, false)

  if (skuData) {
    let data = skuData
      .images
      .filter(image =>
        image
          .filter(i => i.IsMain === true).length > 0)
      .reduce((flatten, current) => flatten.concat(current))[0];

    img.src = `https://autoglass.vteximg.com.br/arquivos/ids/${data.IdArchive}-90-90/${skuData.reference}.jpg`;
    title.textContent = skuData.name;

    confirmationBox.style.opacity = '1';

    setTimeout(() => {
      confirmationBox.style.opacity = '0';
      setTimeout(() => confirmationBox.style.visibility = 'hidden', 1000);
    }, 3000);
  }
}


async function autocompleteSearch(searchTerm) {
  let response = await fetch('/buscaautocomplete?' + new URLSearchParams({
    maxRows: 12,
    productNameContains: encodeURIComponent(searchTerm),
  }));
  let { itemsReturned } = await response.json();
  return itemsReturned && itemsReturned.map(item => {
    /*
    item = {
      "items": [
        {
          "productId": "7870",
          "itemId": "6112",
          "name": "Parabrisa BMW X3 2010 a 2012 Verde Faixa Cinza Xyglass/Xyg - 1144979",
          "nameComplete": "Parabrisa BMW X3 2010 a 2012 Verde Faixa Cinza Xyglass/Xyg - 1144979",
          "imageUrl": "https://autoglass.vteximg.com.br/arquivos/ids/204769-25-25/1144979.jpg?v=637251685040770000"
        }
      ],
      "thumb": "<img src=\"https://autoglass.vteximg.com.br/arquivos/ids/173795-25-25/1144979.jpg?v=636991596932400000\" width=\"25\" height=\"25\" alt=\"1144979\" id=\"\" />",
      "thumbUrl": "https://autoglass.vteximg.com.br/arquivos/ids/204769-25-25/1144979.jpg?v=637251685040770000",
      "name": "parabrisa bmw x3 2010 a 2012 verde faixa cinza xyglass/xyg - 1144979",
      "href": "https://devautoglass.myvtex.com/parabrisa-bmw-x3-2010-a-2012-verde-faixa-cinza-xyglass-xyg---1144979/p",
      "criteria": null
    }
    */
    return {
      href: item.href,
      name: item.name,
      thumb: item.thumb
    }
  })
}

/**
 *
 * @param {HTMLInputElement} searchInput Input HTML
 */
async function autocompleteInit(searchInput) {
  searchInput.addEventListener("input", async (e) => {
    let searchTerm = e.target.value.trim();
    if (searchTerm.length < 4)
      return;
    let list = document.querySelector('#autocomplete-search');
    list.innerHTML = "<li><a>Aguarde...</a></li>";
    let searchResult = await autocompleteSearch(e.target.value);
    list.innerHTML = searchResult.map(item => `<li><a href='${item.href}'>${item.thumb}${item.name}</a></li>`).join('');
  });
}

function delayedAction(action, abortController) {
  if (abortController) {
    abortController.abort();

    abortController = null;

    //return;
  }

  abortController = {};

  const delay = setTimeout(action, 100);

  abortController.abort = () => {
    clearTimeout(delay);
  };

  return abortController;
}

//MOBILE

function openNav() {
  let backdrop = document.querySelector('.side-menu-backdrop');
  backdrop.style.display = 'unset';
  backdrop.style.opacity = '1';

  let sideMenu = document.getElementById("side-menu");
  sideMenu.style.display = 'unset';
  setTimeout(() => {
    sideMenu.style.width = "328px";
    setTimeout(() =>
      sideMenu.querySelectorAll('a').forEach(a => a.style.opacity = "1")
      , 200)
  }, 300);
  //document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  removeFunctions();
}

function closeNav() {
  let backdrop = document.querySelector('.side-menu-backdrop');
  let sideMenu = document.getElementById("side-menu");
  sideMenu.querySelectorAll('a').forEach(a => a.style.opacity = '0');
  backdrop.style.opacity = '1';
  setTimeout(() => {
    sideMenu.style.width = "0";
    backdrop.style.display = 'none';
    setTimeout(() => {
      sideMenu.style.display = "none";
    }, 200);
  }, 300);

  document.querySelector('.side-menu-backdrop').style.display = 'none';

}

function openCategorias() {
  let mainMenu = document.getElementById('main-menu');
  let categoryMenu = document.getElementById('busca-categoria-mobile');
  mainMenu.style.opacity = '0';
  setTimeout(() => {
    mainMenu.style.display = 'none';
    categoryMenu.style.display = 'unset';
    categoryMenu.style.opacity = '1';
  }, 200);
}

function closeCategorias() {
  let mainMenu = document.getElementById('main-menu');
  let categoryMenu = document.getElementById('busca-categoria-mobile');
  categoryMenu.style.opacity = '0';
  setTimeout(() => {
    categoryMenu.style.display = 'none';
    mainMenu.style.display = 'flex';
    mainMenu.style.opacity = '1';
  }, 300);
}

function toggleCategory(self) {
  console.log(self);
  return self.parentNode.classList.contains('ativo') ? self.parentNode.classList.remove('ativo') : self.parentNode.classList.add('ativo')
}

//MOBILE
(() => {

  let searchField = document.querySelector('.search-box-mobile .busca input.fulltext-search-box');

  autocompleteInitMobile(searchField);

  checkLoginMobile();

  loadCart(device.mobile);

  document.onload = function () {
    document
      .querySelector('.side-menu-backdrop')
      .addEventListener('click', (e) => closeNav());
  };

  $('.usuario__opcoes-mobile a').click(() => {
    closeNav();
  })

  $(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
    let carrinho = document.querySelector('.mobile .menu-carrinho');

    updateCartItemsCount(carrinho, orderForm);
  });
})();

function removeFunctions() {
  $('.search-box').removeClass('ativo');
  $('.topo').unbind();
  $('.container.mobile').unbind();
}
async function autocompleteInitMobile(searchInput) {
  fixPlaceholderSearchMobile();
  searchInput.addEventListener("input", async (e) => {
    let searchTerm = e.target.value.trim();
    if (searchTerm.length < 4) {
      $('.search-mobile-autocomplete').hide();
      return;
    }
    let list = document.querySelector('.search-mobile-autocomplete');
    let searchResult = await autocompleteSearch(e.target.value);
    if (searchResult.length > 0) {
      list.innerHTML = searchResult.filter((_, i) => i < 3)
        .map(item => `
        <li>
          <a href='${item.href}'>${item.thumb}${item.name.replace(e.target.value, `<b>${e.target.value}</b>`)}</a>
        </li>
      `).join('');
      $('.search-mobile-autocomplete').show();
    } else {
      $('.search-mobile-autocomplete').hide();
    }
  });
}

function defineScrollTop() {
  $("html, body").animate({ top: "-=0" }, 10000000000000000000000);

  $("body").on("click", ".page-number, .previous, .next", function() {
    let larguraTela = $(window).width();
    if (larguraTela > 1200) {
      pegaLargura(350);
    } else if (larguraTela > 1100) {
      pegaLargura(250);
    } else if (larguraTela < 1100) {
      pegaLargura(550);
    }
    $(".page-number").removeClass("pgCurrent");
    $(this).addClass("pgCurrent");
  });
}

function pegaLargura(largura) {
  $("html,body").scrollTop(largura);
}

defineScrollTop();

const inputBusca = document.querySelector('.busca .fulltext-search-box');
const botaoBusca = document.querySelector('.search-box .search-icon');

botaoBusca.addEventListener('click', function() {
  const valorBusca = inputBusca.value;
  dataLayer.push({
    'event': 'search',
    'search_term': valorBusca
  });
});

inputBusca.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    const valorBusca = inputBusca.value;
    dataLayer.push({
      'event': 'search',
      'search_term': valorBusca,
    });
  }
});

(() => {
  let abortCategoryAction = null;
  let linksCategoria = document.querySelector('.painel-categorias__categoria-conteudo');
  linksCategoria.addEventListener('mouseenter', (event) => {
    if (abortCategoryAction)
    abortCategoryAction.abort();
  });
  checkLogin();
  fixPlaceholderSearch();
  loadCart(device.desktop);
  $(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
    let carrinho = document.querySelector('.desktop .menu-carrinho');
    updateCartItemsCount(carrinho, orderForm);
  });
  $(document).ready(function () {
    if (!document.querySelector('.shelf-qd-v1-buy-button'))
    return;
    var batchBuyListener = new Vtex.JSEvents.Listener('batchBuyListener',
    debounce((event) => cartItemAddedConfirmation(event))
    );
    skuEventDispatcher.addListener(skuDataReceivedEventName, batchBuyListener);
  });
  function debounce(func, timeout = 200){
    let timer;
    return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
  let suggestions = document.querySelector('.container.desktop .search-box #autocomplete-search');
  let searchField = document.querySelector('.container.desktop .search-box .busca input.fulltext-search-box');
  searchField.addEventListener('focus', () => {
    suggestions.style.visibility = 'visible';
    suggestions.style.opacity = '1';
  });
  searchField.addEventListener('blur', () => {
    suggestions.style.opacity = '0';
    setTimeout(() => suggestions.style.visibility = 'hidden', 1000);
  });
  searchField.addEventListener('keydown', (event) => {
    event = event || window.event;
  });
  autocompleteInit(searchField);
  }
)();
