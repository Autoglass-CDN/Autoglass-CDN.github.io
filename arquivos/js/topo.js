
function centerArrow() {
  let categoriaAtiva = document.querySelector('.painel-categorias__menu .painel-categorias__categoria.ativo');
  let arrow = document.querySelector('.arrow');
  let arrowPositions = arrow.getBoundingClientRect();
  let positions = categoriaAtiva.getBoundingClientRect();
  arrow.style.left = ((positions.left + (categoriaAtiva.offsetWidth - arrow.offsetWidth) / 2) - (arrowPositions.left - parseInt(getComputedStyle(arrow).left, 10))) + 'px';
}

function activateCategory(categoriaAtual, indexConteudoAtual) {
  let categoriaAnterior = document.querySelector('.painel-categorias__menu .painel-categorias__categoria.ativo');
  let conteudoAtual = document
    .querySelectorAll('.painel-categorias__categoria-conteudo .painel-categorias__categoria-itens')[indexConteudoAtual];

  if (categoriaAnterior) {
    categoriaAnterior
      .querySelector('.painel-categorias__categoria-header.ativo')
      .classList.remove('ativo');
    categoriaAnterior.classList.remove('ativo');
    document
      .querySelector('.painel-categorias__categoria-conteudo .painel-categorias__categoria-itens.ativo')
      .classList.remove('ativo');

    // event.target.style.transition = '0.8s';
    // event.target.style.opacity = 0;
  }
  categoriaAtual
    .querySelector('.painel-categorias__categoria-header')
    .classList.add('ativo');
  categoriaAtual.classList.add('ativo');
  conteudoAtual.classList.add('ativo');
}

function slideNext() {
  let categories = document.querySelectorAll('.painel-categorias__categoria');
  let slider = document.querySelector('.painel-categorias__menu > ul');

  if (getTranslateX(slider) < 0) return;

  let fullWidth = Array.from(categories)
    .reduce((width, category) => width + (parseInt(getComputedStyle(category).width, 10) + parseInt(getComputedStyle(category).marginLeft, 10) + parseInt(getComputedStyle(category).marginRight, 10)), 0);

  let width = slider.clientWidth
    + parseInt(getComputedStyle(slider).marginRight, 10)
    + parseInt(getComputedStyle(slider).marginLeft, 10);

  slider.style.transform = `translateX(${width - fullWidth}px)`;
  
  slider.addEventListener("transitionend", (e) => centerArrow(), { once: true });
  toggleVisibility('next-btn');
  toggleVisibility('prev-btn');
}

function toggleVisibility(id){
  let element = document.getElementById(id);
  element.style.visibility = element.style.visibility === 'hidden' ? 'visible' : 'hidden';
}

function getTranslateX(element) {
  let transform = getComputedStyle(element).getPropertyValue('transform');
  let matrix = new WebKitCSSMatrix(transform);
  return matrix.m41;
}

function slidePrev() { 
  let slider = document.querySelector('.painel-categorias__menu > ul');
  slider.style.transform = `translateX(0px)`;
  
  slider.addEventListener("transitionend", (e) => centerArrow(), { once: true });
  toggleVisibility('next-btn');
  toggleVisibility('prev-btn');
}

async function checkLogin() {
  var accountComponent = document.querySelector(".topo .usuario");

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

async function loadCart() {
  let carrinho = document.querySelector('.menu-carrinho');
  carrinho.addEventListener('click', (event) => {
    window.location.href = '/checkout/#/cart';
  });

  let orderForm = await vtexjs.checkout.getOrderForm();

  await updateCartItemsCount(carrinho, orderForm);
}

async function updateCartItemsCount(carrinho, orderForm) {
  carrinho.classList.remove('loaded');
  let badge = document.querySelector('.badge');

  if (badge)
    badge.remove();

  
  if (orderForm && orderForm.items.length) {
    badge = document.createElement('span');
    badge.classList.add('badge');
    badge.innerHTML = orderForm.items.length;
    
    carrinho.append(badge);
   
    setTimeout(()=>carrinho.classList.add('loaded'),500);
  }
}

async function cartItemAddedConfirmation(eventData) {
  let { skuData } = eventData;
  let confirmationBox = document.querySelector('.menu-carrinho .confirmacao');

  let img = confirmationBox.querySelector('.item img');
  let title = confirmationBox.querySelector('.item .titulo');

  confirmationBox.style.visibility = 'visible';

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
    productNameContains: searchTerm,
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
async function autocompleteInit(searchInput){
  searchInput.addEventListener("input", async (e) => {
    let searchTerm = e.target.value.trim();
    if(searchTerm.length < 4)
      return;
    let list = document.querySelector('#autocomplete-search');
    list.innerHTML = "<li><a>Aguarde...</a></li>";
    let searchResult = await autocompleteSearch(e.target.value);
    list.innerHTML = searchResult.map(item=>`<li><a href='${item.href}'>${item.thumb}${item.name}</a></li>`).join('');
  });
}

function delayedAction(action, abortController) {
  if (abortController) {
    abortController.abort();

    abortController = null;

    //return;
  }

  abortController = new AbortController();

  const delay = setTimeout(action, 500);

  abortController.signal.addEventListener('abort', () => {
    console.log('Action aborted by the user');

    clearTimeout(delay);
  });
}


(() => {
  let slider = document.querySelector('.painel-categorias__menu > ul');
  let prevBtn = document.getElementById('prev-btn');
  let nextBtn = document.getElementById('next-btn');

  prevBtn.addEventListener('click', slidePrev);
  nextBtn.addEventListener('click', slideNext);

  if (getTranslateX(slider) < 0) nextBtn.style.visibility = 'hidden';
  else prevBtn.style.visibility = 'hidden';

  let menu = document
    .querySelector('.menu-categorias');

  var abortPainelAction = new AbortController();

  menu
    .addEventListener('mouseenter', (event) => {
      delayedAction(() => {
        menu.classList.add('ativo');
        centerArrow();
      }, abortPainelAction);
    });

  menu
     .addEventListener('mouseleave', (event) => {
       delayedAction(() => {
         menu.classList.remove('ativo');
       }, abortPainelAction);
     });

  let painelCategorias = document.querySelector('.painel-categorias');

  painelCategorias.addEventListener('mouseleave', (event) => {
    delayedAction(() => {
      menu.classList.remove('ativo');
    }, abortPainelAction);
  });

  var abortCategoryAction = AbortController();

  document
    .querySelectorAll('.painel-categorias__menu .painel-categorias__categoria')
    .forEach((categoria, index) => {
      categoria.addEventListener('mouseenter', (event) => {
        delayedAction(() => {
          activateCategory(categoria, index);
          centerArrow();
        }, abortCategoryAction);
      })
    });

  let linksCategoria = document.querySelector('.painel-categorias__categoria-conteudo');

  linksCategoria.addEventListener('mouseover', (event) => abortCategoryAction.abort());

  checkLogin();
  fixPlaceholderSearch();
  loadCart();

  $(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
    let carrinho = document.querySelector('.menu-carrinho');

    updateCartItemsCount(carrinho, orderForm);
  });

  $(document).ready(function () {
    if (!document.querySelector('.shelf-qd-v1-buy-button'))
      return;
    var batchBuyListener = new Vtex.JSEvents.Listener('batchBuyListener', cartItemAddedConfirmation);
    skuEventDispatcher.addListener(skuDataReceivedEventName, batchBuyListener);
  });

  let suggestions = document.querySelector('.container .search-box #autocomplete-search');

  let searchField = document.querySelector('.container .search-box .busca input.fulltext-search-box');

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
    console.log(event.keyCode)
  });

  autocompleteInit(searchField);
}
)();
