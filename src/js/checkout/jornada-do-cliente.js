const pages = [
    { subDomain: "cart", element: $(".seu-carrinho"), step: 1 },
    { subDomain: "email", element: $(".dados-pessoais"), step: 2 },
    { subDomain: "profile", element: $(".dados-pessoais"), step: 2 },
    { subDomain: "shipping", element: $(".localizacao"), step: 3 },
    { subDomain: "payment", element: $(".pagamento"), step: 4 },
];

let initialPageSubdomain = window.location.href.split("/").pop();
updateCurrentPageIcon(initialPageSubdomain);
enableCustomerJourney();

function updateCurrentPageIcon(currentPageSubdomain, previsousPageSubdomain) {
    updateFilledItems();
    const currentPageStep = getPageStepBySubdomain(currentPageSubdomain);
    const totalSteps = pages.at(-1).step;
    findPageByStep(currentPageStep).element.addClass("pagina-atual");

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

async function updateFilledItems() {
    const orderForm = await vtexjs.checkout.getOrderForm();
    if (
        !!orderForm.clientProfileData &&
        orderForm.clientProfileData.email
    ) {
        fillItem(".dados-pessoais");
        removePageStyle("shipping", "bloqueado");
    }
    let shipping = orderForm.shippingData.selectedAddresses[0];
    if (
        !!shipping &&
        shipping.postalCode &&
        shipping.number &&
        shipping.receiverName
    ) {
        fillItem(".localizacao");
        removePageStyle("payment", "bloqueado");
    }
}

async function enableCustomerJourney() {
    const orderForm = await vtexjs.checkout.getOrderForm();
    // if (!!orderForm.items.length)
    $(".container-jornada-do-cliente").attr("style", "");
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

//TODO::
// - Se não estiver preenchido, não poder pular etapa!
// - Se não tiver produto no carrinho, não mostrar a jornada do cliente.
