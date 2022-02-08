const pages = [
    { subDomain: "cart", element: $(".seu-carrinho"), step: 1 },
    { subDomain: "email", element: $(".dados-pessoais"), step: 2 },
    { subDomain: "profile", element: $(".dados-pessoais"), step: 2 },
    { subDomain: "shipping", element: $(".localizacao"), step: 3 },
    { subDomain: "payment", element: $(".pagamento"), step: 4 },
];

let initialPageSubdomain = window.location.href.split("/").pop();
updateCurrentPageIcon(initialPageSubdomain);
updateFilledItems(vtexjs.checkout.orderForm)
toggleCustomerJourneyVisibility(vtexjs.checkout.orderForm.items);

function updateCurrentPageIcon(currentPageSubdomain, previsousPageSubdomain) {
    const currentPageStep = getPageStepBySubdomain(currentPageSubdomain);
    const totalSteps = pages.at(-1).step;
    findPageByStep(currentPageStep).element.addClass("pagina-atual");
    removePageStyle(currentPageSubdomain, "bloqueado");

    if (
        previsousPageSubdomain &&
        getPageStepBySubdomain(previsousPageSubdomain) != currentPageStep
    ) {
        removePageStyle(previsousPageSubdomain, "pagina-atual");
    }

    removeClassAtRight(currentPageStep, totalSteps);
    addClassAtLeft(currentPageStep);
    updateProgressBar(currentPageStep, totalSteps);
}

window.addEventListener("popstate", function () {
    let currentPage = location.href.split("/").pop();
    console.log("URL CHANGED TO: " + currentPage);
    if (currentPage != initialPageSubdomain) {
        updateCurrentPageIcon(currentPage, initialPageSubdomain);
        initialPageSubdomain = currentPage;
    }
});

$(window).on("orderFormUpdated.vtex", function(_, orderForm) {
    updateFilledItems(orderForm);
})

function updateFilledItems(orderForm) {
    if (!orderForm.items.length) {
        toggleCustomerJourneyVisibility(orderForm.items)
    }
    if (
        !!orderForm.clientProfileData &&
        orderForm.clientProfileData.email
    ) {
        fillItem(".dados-pessoais");
        removePageStyle("profile", "bloqueado");
    }
    let shipping = orderForm.shippingData.selectedAddresses[0];
    if (
        !!shipping &&
        shipping.postalCode &&
        (shipping.number || (
            orderForm.shippingData.logisticsInfo[0].selectedDeliveryChannel == "pickup-in-point" &&
            !!orderForm.invoiceData)) &&
        orderForm.shippingData.logisticsInfo[0].selectedSla &&
        shipping.receiverName
    ) {
        fillItem(".localizacao");
        removePageStyle("shipping", "bloqueado");
    }
}

function toggleCustomerJourneyVisibility(orderFormItems) {
    if (!!orderFormItems.length){
        $(".container-jornada-do-cliente").attr("style", "");
    } else {
        $(".container-jornada-do-cliente").attr("style", "opacity: 0; pointer-events: none; transition: 0.2s;");
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

function removePageStyle(pageSubdomain, style) {
    pages.find((x) => x.subDomain == pageSubdomain).element.removeClass(style);
}

function findPageByStep(step) {
    return pages.find((x) => x.step == step);
}

function getPageStepBySubdomain(pageSubdomain) {
    return pages.find((x) => x.subDomain == pageSubdomain).step;
}

function fillItem(item) {
    $(item).addClass("preenchido");
}

function updateProgressBar(step, totalSteps) {
    const progressBarClass = ".jornada-do-cliente-linha-progresso-verde";
    $(progressBarClass).width(`${((step - 1) * 100) / (totalSteps - 1)}%`);
}