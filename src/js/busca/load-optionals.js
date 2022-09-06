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

  function removerDuplicados() {
    try {
      let getAllProductInThisPage = getAllProducts();
      let array = groupBy(getAllProductInThisPage, x => x.titulo);
      array.forEach((itens) => {
        if (itens.length >= 2) {
          let caracteristicas = groupBy(itens, x => x.opcionais);
          caracteristicas.forEach((elements) => {
            if (elements.length >= 2) {
              let opcionais = elements.filter(x => x.sku != buscarItemMenorValor(elements).sku);
              opcionais.forEach((opcional) => {
                $(opcional.objeto).hide();
              });
            }
          })
        }
      })

      function groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
          const key = keyGetter(item);
          const collection = map.get(key);
          if (!collection) {
            map.set(key, [item]);
          } else {
            collection.push(item);
          }
        });
        return map;
      }

      function buscarItemMenorValor(arr) {
        var len = arr.length, min = Infinity, resultado = {};
        while (len--) {
          if (Number(arr[len].precos.replace(/[^0-9.-]+/g, "").replace(",", ".")) < min) {
            min = Number(arr[len].precos.replace(/[^0-9.-]+/g, "").replace(",", "."));
            resultado = arr[len];
          }
        }
        return resultado;
      }
    }
    catch (ex) {
      console.error("Erro ao remover duplicados.", ex)
    }
  }

  function configureObserverToLoadOptionals() {
    var target = document.querySelector('.resultItemsWrapper > div.prateleira');

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type == 'childList' && mutation.addedNodes.length > 0)
          loadOptionals();
      });
    });
    var config = {childList: true };
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

  function getAllProducts() {
    try {
      return $(".qd_cpUri")
        .toArray()
        .reduce((acc, current) => {
          const url = current.value;
          const titulo = document.querySelector(`.produto-prateleira.p${getSkuFromUrl(url)} .shelf-qd-v1-name`).textContent;
          acc.push({
            sku: getSkuFromUrl(url),
            titulo: titulo.replace("\n                        ", "").split(" - ")[0],
            precos: document.querySelector(`.produto-prateleira.p${getSkuFromUrl(url)} .shelf-qd-v1-price-best-price`).textContent,
            opcionais: document.querySelector(`.produto-prateleira.p${getSkuFromUrl(url)} .optionals`).textContent,
            objeto: document.querySelector(`.produto-prateleira.p${getSkuFromUrl(url)} .shelf-qd-v1-price-best-price`).closest("ul")
          });
          return acc;
        }, [])
        .filter(o => o != null)
    }
    catch (ex) {
        console.error("Falha ao pegar produtos. \n ", ex);
    }
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
    try {
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
      removerDuplicados();
    }
    catch (ex) {
      console.error("Erro ao adicionar opcionais", ex)
    }
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
      if (element != currentElement) {
        element.classList.remove("expanded");
      }
    }
  }

  configureObserverToLoadOptionals();
  loadOptionals();

})()
