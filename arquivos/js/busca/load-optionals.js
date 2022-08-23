(function () {
  async function loadOptionals() {
    const allSkuInThisPage = getAllCurrentSkus();

    const baseUrlApi = "https://api.autoglass.com.br/";
    const baseUrlListaOpcionais = "integracao-b2c/api/web-app/produtos/opcionais-lista?codigosProdutos=";

    const urlToConsult = baseUrlApi + baseUrlListaOpcionais + allSkuInThisPage.join("&codigosProdutos=");

    try {
      const allOptionals = await $.get(urlToConsult);
      const onlyOneSku = allSkuInThisPage.length == 1;
      const productIsInStockTrue = $(".qd-product-is-in-stock-true");
      onlyOneSku ? productIsInStockTrue.addClass("only-one-sku") : productIsInStockTrue.removeClass("only-one-sku");
      addAllOptionals(allOptionals);
      configureOnClickEvents();
    } catch (ex) {
      console.error("Falha ao renderizar opcionais. \n ", ex);
    }
  }

  function configureObserverToLoadOptionals() {
    var target = document.querySelector('.resultItemsWrapper > div.prateleira');

    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type == 'childList' && mutation.addedNodes.length > 0)
          loadOptionals();
      });
    });
    var config = {childList: true};
    observer.observe(target, config);
  }

  function getAllCurrentSkus() {
    return $(".qd_cpUri")
          .toArray()
          .reduce((acc, current) => {
                  const url = current.value;
                  acc.push(getSkuFromUrl(url));
                  return acc;
          }, [])
          .filter(o => o != null);
  }

  function getSkuFromUrl(url) {
    const minCodeLength = 4;
    if (url.includes('-copy')) {
      url = url.split('-copy')[0];
    }
    const codigo = url.substring(url.lastIndexOf("-") + 1).replace(/\D/g, "");
    return codigo.length < minCodeLength ? null : codigo;
  }

  function contractOnClickOutsideShelves() {
    $(document).on('click.ClickOutsideShelves', (event) => {
      if (event.srcElement.closest(".prateleira") == null) {
        removeAllExpanded();
        removeDocumentClickBinding();
      }
    });
  }

  function configureOnClickEvents() {
    $(".optionals, .shelf-qd-v1-price").off('click').on("click", (e) => {
      const allChildren = e.currentTarget.closest(".prateleira").children;
      const currentElement = e.currentTarget.closest("ul");
      clearAllExpandedExceptCurrent(allChildren, currentElement);
      currentElement.classList.toggle("expanded") ?
        contractOnClickOutsideShelves() :
        removeDocumentClickBinding();
    });
  }

  function addAllOptionals(allOptionals) {
    $(".qd-product-is-in-stock-true").each((key, element) => {
      const codigo = getSkuFromUrl(element.querySelector("a").href);
      const optionalsElement = element.querySelector(".optionals");
      const allOptionalsForCurrentElement = allOptionals
        .find((o) => o.Codigo == codigo)
        ?.Opcionais.reduce((acc, current) => {
          acc.push(`<h4> ${current} </h4>`);
          return acc;
        }, []);

      if (!!allOptionalsForCurrentElement)
        optionalsElement.innerHTML = allOptionalsForCurrentElement.join('');

      element.classList.remove("more-than-two-optionals");
      if (allOptionalsForCurrentElement.length > 2) {
        element.classList.add("more-than-two-optionals");
      }

      optionalsElement.classList.remove("loading");
    });
  }

  function removeAllExpanded() {
    const allChildren = $(".prateleira:last-child")[0].children;
    clearAllExpandedExceptCurrent(allChildren);
  }

  function removeDocumentClickBinding() {
    $(document).off('click.ClickOutsideShelves');
  }

  function clearAllExpandedExceptCurrent(allChildren, currentElement) {
    for (let element of allChildren) {
      if (element != currentElement){
        element.classList.remove("expanded");
      }
    }
  }

  configureObserverToLoadOptionals();
  loadOptionals();
})()
