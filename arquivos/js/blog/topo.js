function centerArrow() {
  let categoriaAtiva = document.querySelector(
    ".painel-categorias__menu .painel-categorias__categoria.ativo"
  );
  let arrow = document.querySelector(".arrow");
  let arrowPositions = arrow.getBoundingClientRect();
  let positions = categoriaAtiva.getBoundingClientRect();
  arrow.style.left =
    positions.left +
    (categoriaAtiva.offsetWidth - arrow.offsetWidth) / 2 -
    (arrowPositions.left - parseInt(getComputedStyle(arrow).left, 10)) +
    "px";
}

function activateCategory(categoriaAtual, indexConteudoAtual) {
  let categoriaAnterior = document.querySelector(
    ".painel-categorias__menu .painel-categorias__categoria.ativo"
  );
  let conteudoAtual = document.querySelectorAll(
    ".painel-categorias__categoria-conteudo .painel-categorias__categoria-itens"
  )[indexConteudoAtual];

  if (categoriaAnterior) {
    categoriaAnterior
      .querySelector(".painel-categorias__categoria-header.ativo")
      .classList.remove("ativo");
    categoriaAnterior.classList.remove("ativo");
    document
      .querySelector(
        ".painel-categorias__categoria-conteudo .painel-categorias__categoria-itens.ativo"
      )
      .classList.remove("ativo");

    // event.target.style.transition = '0.8s';
    // event.target.style.opacity = 0;
  }
  categoriaAtual
    .querySelector(".painel-categorias__categoria-header")
    .classList.add("ativo");
  categoriaAtual.classList.add("ativo");
  conteudoAtual.classList.add("ativo");
}

function slideNext() {
  let categories = document.querySelectorAll(".painel-categorias__categoria");
  let slider = document.querySelector(".painel-categorias__menu > ul");

  if (getTranslateX(slider) < 0) return;

  let fullWidth = Array.from(categories).reduce(
    (width, category) =>
      width +
      (parseInt(getComputedStyle(category).width, 10) +
        parseInt(getComputedStyle(category).marginLeft, 10) +
        parseInt(getComputedStyle(category).marginRight, 10)),
    0
  );

  let width =
    slider.clientWidth +
    parseInt(getComputedStyle(slider).marginRight, 10) +
    parseInt(getComputedStyle(slider).marginLeft, 10);

  slider.style.transform = `translateX(${width - fullWidth}px)`;

  slider.addEventListener("transitionend", (e) => centerArrow(), {
    once: true,
  });
  toggleVisibility("next-btn");
  toggleVisibility("prev-btn");
}

function toggleVisibility(id) {
  let element = document.getElementById(id);
  element.style.visibility =
    element.style.visibility === "hidden" ? "visible" : "hidden";
}

function getTranslateX(element) {
  let transform = getComputedStyle(element).getPropertyValue("transform");
  let matrix = new WebKitCSSMatrix(transform);
  return matrix.m41;
}

function slidePrev() {
  let slider = document.querySelector(".painel-categorias__menu > ul");
  slider.style.transform = `translateX(0px)`;

  slider.addEventListener("transitionend", (e) => centerArrow(), {
    once: true,
  });
  toggleVisibility("next-btn");
  toggleVisibility("prev-btn");
}

async function checkLogin() {
  var accountComponent = document.querySelector(".topo .usuario.desktop");

  let response = await fetch("/no-cache/profileSystem/getProfile");
  let data = await response.json();

  try {
    if (data.IsUserDefined) {
      var emailReceived = data.Email;
      var nameUser =
        data.FirstName && data.FirstName.length
          ? data.FirstName
          : emailReceived.match(/([^{0-9}|.|@|-]+)/).pop();
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
      console.info("Ops, algo saiu errado com o login.", e.message);
  }
}

async function checkLoginMobile() {
  var accountComponent = document.querySelector(".side-menu .usuario");

  let response = await fetch("/no-cache/profileSystem/getProfile");
  let data = await response.json();

  try {
    if (data.IsUserDefined) {
      var emailReceived = data.Email;
      var nameUser =
        data.FirstName && data.FirstName.length
          ? data.FirstName
          : emailReceived.match(/([^{0-9}|.|@|-]+)/).pop();
      //var nameUser = data.FirstName.length ? data.FirstName : emailReceived.match(/([^{0-9}|.|@|-]+)/).pop();
      accountComponent.innerHTML = `<hr/>
      <div class="usuario-container-mobile">
        <div class="usuario-mobile">
          <i class="user-icon"></i>
          <span class="destaque">
          Olá, <b>${nameUser}</b>
          </span>
        </div>
        <div id="logout-mobile">
          <button onclick="document.querySelector('#saindo').style.display = 'block'">Sair</button>
        </div>
      </div>
      <ul class="usuario__opcoes-mobile">
        <li><a href="/_secure/account#/profile">Dados Pessoais</a></li>
        <li><a href="/_secure/account#/addresses">Endereços</a></li>
        <li><a href="/_secure/account#/cards">Cartões</a></li>
        <li><a href="/_secure/account#/orders">Meus Pedidos</a></li>
      </ul>`;
      //<a id="logout" href="/no-cache/user/logout">Sair</a>
    } else {
      accountComponent.innerHTML = `<hr/>
      <a id="login" href="#" class="destaque" style="opacity: 1;">
        <i class="user-icon"></i> 
        Cadastrar ou Entrar
      </a>`;
      document.body.classList.add("not-logged-user");
    }
    document
      .querySelector(".side-menu #login")
      .addEventListener("click", (e) => {
        closeNav();
      });
  } catch (e) {
    if (typeof console !== "undefined" && typeof console.info === "function")
      console.info("Ops, algo saiu errado com o login.", e.message);
  }
}

async function fixPlaceholderSearch() {
  var idSearchFilterP = $('.search-box input[type="text"].fulltext-search-box');
  if (!idSearchFilterP.length) return;
  var idSearchFilter = idSearchFilterP.attr("id").replace("ftBox", "");
  enableFullTextSearchBox(
    "ftBox" + idSearchFilter,
    "ftDept" + idSearchFilter,
    "ftIdx" + idSearchFilter,
    "ftBtn" + idSearchFilter,
    "/SEARCHTERM?&utmi_p=_&utmi_pc=BuscaFullText&utmi_cp=SEARCHTERM",
    "Pesquise por peça, produto, montadora..."
  );

  setTimeout(() => {
    $(".search-box .btn-buscar")
      .unbind()
      .click((e) => {
        e.preventDefault();
        const input = $('.search-box input[type="text"].fulltext-search-box');

        const DEFAULT = {
          Initial: "Pesquise por peça, produto, montadora...",
          Invalid: "Informe o produto que deseja procurar",
        };

        const isIllegalTerm =
          input.val() === DEFAULT.Initial ||
          input.val() === DEFAULT.Invalid ||
          input.val() === "";

        if (isIllegalTerm) {
          input.val("Informe o produto que deseja procurar");

          input.unbind("focus");
          input.unbind("blur");

          input.focus(function () {
            $(this)
              .filter(function () {
                return isIllegalTerm;
              })
              .val("");
          });

          input.blur(function () {
            $(this)
              .filter(function () {
                return $(this).val() === "";
              })
              .val(isIllegalTerm ? DEFAULT.Invalid : DEFAULT.Initial);
          });

          $(".search-box").css("border-color", "#E74C3C");
        } else {
          const id = input.attr("id").replace("ftBox", "");

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
  var idSearchFilterP = $(
    '.search-box-mobile input[type="text"].fulltext-search-box'
  );
  if (!idSearchFilterP.length) return;
  var idSearchFilter = idSearchFilterP.attr("id").replace("ftBox", "");
  enableFullTextSearchBox(
    "ftBox" + idSearchFilter,
    "ftDept" + idSearchFilter,
    "ftIdx" + idSearchFilter,
    "ftBtn" + idSearchFilter,
    "/SEARCHTERM?&utmi_p=_&utmi_pc=BuscaFullText&utmi_cp=SEARCHTERM",
    "Pesquise por peça, produto, montadora..."
  );

  setTimeout(() => {
    $(".search-box .btn-buscar")
      .unbind()
      .click((e) => {
        e.preventDefault();
        const input = $('.search-box input[type="text"].fulltext-search-box');

        const DEFAULT = {
          Initial: "Pesquise por peça, produto, montadora...",
          Invalid: "Informe o produto que deseja procurar",
        };

        const isIllegalTerm =
          input.val() === DEFAULT.Initial ||
          input.val() === DEFAULT.Invalid ||
          input.val() === "";

        if (isIllegalTerm) {
          input.val("Informe o produto que deseja procurar");

          input.unbind("focus");
          input.unbind("blur");

          input.focus(function () {
            $(this)
              .filter(function () {
                return isIllegalTerm;
              })
              .val("");
          });

          input.blur(function () {
            $(this)
              .filter(function () {
                return $(this).val() === "";
              })
              .val(isIllegalTerm ? DEFAULT.Invalid : DEFAULT.Initial);
          });

          $(".search-box").css("border-color", "#E74C3C");
        } else {
          const id = input.attr("id").replace("ftBox", "");

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
  let carrinho = document.querySelector(".desktop .menu-carrinho");
  carrinho.addEventListener("click", (event) => {
    window.location.href = "/checkout/#/cart";
  });

  let orderForm = await vtexjs.checkout.getOrderForm();

  await updateCartItemsCount(carrinho, orderForm);
}

async function updateCartItemsCount(carrinho, orderForm) {
  carrinho.classList.remove("loaded");
  let badge = document.querySelector(".desktop .badge");

  if (badge) badge.remove();

  if (orderForm && orderForm.items.length) {
    badge = document.createElement("span");
    badge.classList.add("badge");
    badge.innerHTML = orderForm.items.length;

    carrinho.append(badge);

    setTimeout(() => carrinho.classList.add("loaded"), 500);
  }
}

async function cartItemAddedConfirmation(eventData) {
  let { skuData } = eventData;
  let windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  let confirmationBox =
    windowWidth >= 1200
      ? document.querySelector(".desktop .menu-carrinho .confirmacao")
      : document.querySelector(".mobile .menu-carrinho .confirmacao");

  let img = confirmationBox.querySelector(".item img");
  let title = confirmationBox.querySelector(".item .titulo");

  confirmationBox.style.visibility = "visible";

  if (skuData) {
    let data = skuData.images
      .filter((image) => image.filter((i) => i.IsMain === true).length > 0)
      .reduce((flatten, current) => flatten.concat(current))[0];

    img.src = `https://autoglass.vteximg.com.br/arquivos/ids/${data.IdArchive}-90-90/${skuData.reference}.jpg`;
    title.textContent = skuData.name;

    confirmationBox.style.opacity = "1";

    setTimeout(() => {
      confirmationBox.style.opacity = "0";
      setTimeout(() => (confirmationBox.style.visibility = "hidden"), 1000);
    }, 3000);
  }
}

async function loadCartMobile() {
  let carrinho = document.querySelector(".mobile .menu-carrinho");
  carrinho.addEventListener("click", (event) => {
    window.location.href = "/checkout/#/cart";
  });

  let orderForm = await vtexjs.checkout.getOrderForm();

  await updateCartItemsCountMobile(carrinho, orderForm);
}

async function updateCartItemsCountMobile(carrinho, orderForm) {
  carrinho.classList.remove("loaded");
  let badge = document.querySelector(".mobile .badge");

  if (badge) badge.remove();

  if (orderForm && orderForm.items.length) {
    badge = document.createElement("span");
    badge.classList.add("badge");
    badge.innerHTML = orderForm.items.length;

    carrinho.append(badge);

    setTimeout(() => carrinho.classList.add("loaded"), 500);
  }
}

async function autocompleteSearch(searchTerm) {
  let response = await fetch(
    "/buscaautocomplete?" +
      new URLSearchParams({
        maxRows: 12,
        productNameContains: encodeURIComponent(searchTerm),
      })
  );
  let { itemsReturned } = await response.json();
  return (
    itemsReturned &&
    itemsReturned.map((item) => {
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
        thumb: item.thumb,
      };
    })
  );
}

/**
 *
 * @param {HTMLInputElement} searchInput Input HTML
 */
async function autocompleteInit(searchInput) {
  searchInput.addEventListener("input", async (e) => {
    let searchTerm = e.target.value.trim();
    if (searchTerm.length < 4) return;
    let list = document.querySelector("#autocomplete-search");
    list.innerHTML = "<li><a>Aguarde...</a></li>";
    let searchResult = await autocompleteSearch(e.target.value);
    list.innerHTML = searchResult
      .map(
        (item) =>
          `<li><a href='${item.href}'>${item.thumb}${item.name}</a></li>`
      )
      .join("");
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
    console.log("Action aborted by the user");

    clearTimeout(delay);
  };

  return abortController;
}

//MOBILE

function openNav() {
  let backdrop = document.querySelector(".side-menu-backdrop");
  backdrop.style.display = "unset";
  backdrop.style.opacity = "1";

  let sideMenu = document.getElementById("side-menu");
  sideMenu.style.display = "unset";
  setTimeout(() => {
    sideMenu.style.width = "270px";
    setTimeout(
      () =>
        sideMenu.querySelectorAll("a").forEach((a) => (a.style.opacity = "1")),
      200
    );
  }, 300);
  //document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  removeFunctions();
}

function closeNav() {
  let backdrop = document.querySelector(".side-menu-backdrop");
  let sideMenu = document.getElementById("side-menu");
  sideMenu.querySelectorAll("a").forEach((a) => (a.style.opacity = "0"));
  backdrop.style.opacity = "1";
  setTimeout(() => {
    sideMenu.style.width = "0";
    backdrop.style.display = "none";
    setTimeout(() => {
      sideMenu.style.display = "none";
    }, 200);
  }, 300);

  document.querySelector(".side-menu-backdrop").style.display = "none";
}

function openCategorias() {
  let mainMenu = document.getElementById("main-menu");
  let categoryMenu = document.getElementById("category-menu");

  mainMenu.style.opacity = "0";
  setTimeout(() => {
    mainMenu.style.display = "none";
    categoryMenu.style.display = "unset";
    categoryMenu.style.opacity = "1";
  }, 200);
}

function closeCategorias() {
  let mainMenu = document.getElementById("main-menu");
  let categoryMenu = document.getElementById("category-menu");

  categoryMenu.style.opacity = "0";
  setTimeout(() => {
    categoryMenu.style.display = "none";
    mainMenu.style.display = "flex";
    mainMenu.style.opacity = "1";
  }, 300);
}

function toggleCategory(self) {
  console.log(self);
  return self.parentNode.classList.contains("ativo")
    ? self.parentNode.classList.remove("ativo")
    : self.parentNode.classList.add("ativo");
}

(() => {
  let slider = document.querySelector(".painel-categorias__menu > ul");
  let prevBtn = document.getElementById("prev-btn");
  let nextBtn = document.getElementById("next-btn");

  prevBtn.addEventListener("click", slidePrev);
  nextBtn.addEventListener("click", slideNext);

  if (getTranslateX(slider) < 0) nextBtn.style.visibility = "hidden";
  else prevBtn.style.visibility = "hidden";

  let menu = document.querySelector(".menu-categorias");

  var abortPainelAction = null;

  menu.addEventListener("mouseenter", (event) => {
    abortPainelAction = delayedAction(() => {
      menu.classList.add("ativo");
      centerArrow();
    }, abortPainelAction);
  });

  menu.addEventListener("mouseleave", (event) => {
    abortPainelAction = delayedAction(() => {
      menu.classList.remove("ativo");
    }, abortPainelAction);
  });

  let painelCategorias = document.querySelector(".painel-categorias");

  painelCategorias.addEventListener("mouseleave", (event) => {
    abortPainelAction = delayedAction(() => {
      menu.classList.remove("ativo");
    }, abortPainelAction);
  });

  var abortCategoryAction = null;

  document
    .querySelectorAll(".painel-categorias__menu .painel-categorias__categoria")
    .forEach((categoria, index) => {
      categoria.addEventListener("mouseenter", (event) => {
        abortCategoryAction = delayedAction(() => {
          activateCategory(categoria, index);
          centerArrow();
        }, abortCategoryAction);
      });
    });

  let linksCategoria = document.querySelector(
    ".painel-categorias__categoria-conteudo"
  );

  linksCategoria.addEventListener("mouseenter", (event) => {
    if (abortCategoryAction) abortCategoryAction.abort();
  });

  checkLogin();
  fixPlaceholderSearch();
  loadCart();

  $(window).on("orderFormUpdated.vtex", function (evt, orderForm) {
    let carrinho = document.querySelector(".desktop .menu-carrinho");

    updateCartItemsCount(carrinho, orderForm);
  });

  $(document).ready(function () {
    if (!document.querySelector(".shelf-qd-v1-buy-button")) return;
    var batchBuyListener = new Vtex.JSEvents.Listener(
      "batchBuyListener",
      cartItemAddedConfirmation
    );
    skuEventDispatcher.addListener(skuDataReceivedEventName, batchBuyListener);
  });

  let suggestions = document.querySelector(
    ".container.desktop .search-box #autocomplete-search"
  );

  let searchField = document.querySelector(
    ".container.desktop .search-box .busca input.fulltext-search-box"
  );

  searchField.addEventListener("focus", () => {
    suggestions.style.visibility = "visible";
    suggestions.style.opacity = "1";
  });

  searchField.addEventListener("blur", () => {
    suggestions.style.opacity = "0";
    setTimeout(() => (suggestions.style.visibility = "hidden"), 1000);
  });

  searchField.addEventListener("keydown", (event) => {
    event = event || window.event;
    console.log(event.keyCode);
  });

  autocompleteInit(searchField);
})();

//MOBILE

(() => {
  $(".container.mobile .search-icon").click(() => {
    closeNav();
    $(".search-box").addClass("ativo");
    $(".search-box-mobile").addClass("search-box-mobile--opened");
    //$('.search-box-mobile .busca input.fulltext-search-box').focus();
    document
      .querySelector(".search-box-mobile .busca input.fulltext-search-box")
      .focus();
    $(".topo").click(() => removeFunctions());
    // $('.container.mobile').click(() => removeFunctions());
    $(".search-box-mobile").click((e) => {
      console.log(e.target, e.currentTarget);
      if (e.target === e.currentTarget) {
        removeFunctions();
      }
    });
  });

  let searchField = document.querySelector(
    ".search-box-mobile .busca input.fulltext-search-box"
  );

  autocompleteInitMobile(searchField);

  checkLoginMobile();

  loadCartMobile();

  document.onload = function () {
    document
      .querySelector(".side-menu-backdrop")
      .addEventListener("click", (e) => closeNav());
  };

  $(".usuario__opcoes-mobile a").click(() => {
    closeNav();
  });

  $(window).on("orderFormUpdated.vtex", function (evt, orderForm) {
    let carrinho = document.querySelector(".mobile .menu-carrinho");

    updateCartItemsCountMobile(carrinho, orderForm);
  });
})();

function removeFunctions() {
  $(".search-box").removeClass("ativo");
  $(".search-box-mobile").removeClass("search-box-mobile--opened");
  $(".topo").unbind();
  $(".container.mobile").unbind();
}
async function autocompleteInitMobile(searchInput) {
  fixPlaceholderSearchMobile();
  searchInput.addEventListener("input", async (e) => {
    let searchTerm = e.target.value.trim();
    if (searchTerm.length < 4) {
      $(".search-mobile-autocomplete").hide();
      return;
    }
    let list = document.querySelector(".search-mobile-autocomplete");
    let searchResult = await autocompleteSearch(e.target.value);
    if (searchResult.length > 0) {
      list.innerHTML = searchResult
        .filter((_, i) => i < 3)
        .map(
          (item) => `
        <li>
          <a href='${item.href}'>${item.thumb}${item.name.replace(
            e.target.value,
            `<b>${e.target.value}</b>`
          )}</a>
        </li>
      `
        )
        .join("");
      $(".search-mobile-autocomplete").show();
    } else {
      $(".search-mobile-autocomplete").hide();
    }
  });
}
