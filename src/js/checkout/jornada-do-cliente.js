(function () {
  // se o vtexjs ainda não existe, aguarda até existir
  if (!window.vtexjs || !vtexjs.checkout) {
    console.warn("VTEXJS ainda não carregado. Aguardando...");
    window.addEventListener("load", initWhenReady);
  } else {
    initWhenReady();
  }

  function initWhenReady() {
    // se o checkout ainda não disparou o evento, aguarda ele
    $(window).on("orderFormUpdated.vtex", function (event, orderForm) {
      console.log("✅ OrderForm pronto, executando código...");
const pages = [
  { path: "cart", element: $(".seu-carrinho"), step: 1 },
  { path: "email", element: $(".dados-pessoais"), step: 2 },
  { path: "profile", element: $(".dados-pessoais"), step: 2 },
  { path: "shipping", element: $(".localizacao"), step: 3 },
  { path: "payment", element: $(".pagamento"), step: 4 },
];

let initialPagePath = window.location.href.split("/").pop();
updateCurrentPageIcon(initialPagePath);
updateFilledItems(vtexjs.checkout.orderForm);
toggleCustomerJourneyVisibility(vtexjs.checkout.orderForm.items);

function updateCurrentPageIcon(currentPagePath, previsousPagePath) {
  const currentPageStep = getPageStepByPath(currentPagePath);
  const totalSteps = pages[pages.length - 1].step;
  findPageByStep(currentPageStep).element.addClass("pagina-atual");
  removePageStyle(currentPagePath, "bloqueado");

  if (
    previsousPagePath &&
    getPageStepByPath(previsousPagePath) != currentPageStep
  ) {
    removePageStyle(previsousPagePath, "pagina-atual");
  }

  removeClassAtRight(currentPageStep, totalSteps);
  addClassAtLeft(currentPageStep);
  updateProgressBar(currentPageStep, totalSteps);
}

window.addEventListener("popstate", function () {
  let currentPage = location.href.split("/").pop();
  if (currentPage != initialPagePath) {
    updateCurrentPageIcon(currentPage, initialPagePath);
    initialPagePath = currentPage;
  }
});

$(window).on("orderFormUpdated.vtex", function (_, orderForm) {
  updateFilledItems(orderForm);
});

function updateFilledItems(orderForm) {
  if (!orderForm.items.length) {
    toggleCustomerJourneyVisibility(orderForm.items);
  }
  if (!!orderForm.clientProfileData && orderForm.clientProfileData.email) {
    fillItem(".dados-pessoais");
    removePageStyle("profile", "bloqueado");
  }
  let shipping = orderForm.shippingData.selectedAddresses[0];
  if (
    !!shipping &&
    shipping.postalCode &&
    (shipping.number ||
      (orderForm.shippingData.logisticsInfo[0].selectedDeliveryChannel ==
        "pickup-in-point" &&
        !!orderForm.invoiceData)) &&
    orderForm.shippingData.logisticsInfo[0].selectedSla &&
    shipping.receiverName
  ) {
    fillItem(".localizacao");
    removePageStyle("shipping", "bloqueado");
  }
}

function toggleCustomerJourneyVisibility(orderFormItems) {
  if (!!orderFormItems.length) {
    $(".container-jornada-do-cliente").attr("style", "");
  } else {
    $(".container-jornada-do-cliente").attr(
      "style",
      "opacity: 0; pointer-events: none; transition: 0.2s;"
    );
  }
}

function removeClassAtRight(currentPageStep, totalSteps) {
  for (let step = currentPageStep + 1; step <= totalSteps; step++) {
    findPageByStep(step).element.removeClass("anterior");
  }
}

function addClassAtLeft(currentPageStep) {
  for (let step = currentPageStep - 1; step > 1; step--) {
    findPageByStep(step).element.addClass("anterior");
  }
}

function removePageStyle(pagePath, style) {
  pages.find((x) => x.path == pagePath).element.removeClass(style);
}

function findPageByStep(step) {
  return pages.find((x) => x.step == step);
}

function getPageStepByPath(pagePath) {
  return pages.find((x) => x.path == pagePath).step;
}

function fillItem(item) {
  $(item).addClass("preenchido");
}

function updateProgressBar(step, totalSteps) {
  const progressBarClass = ".jornada-do-cliente-linha-progresso-verde";
  $(progressBarClass).width(`${((step - 1) * 100) / (totalSteps - 1)}%`);
}
});
  }
})();