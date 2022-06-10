contador = 0;
async function loadOptionals() {
  console.log('ENTROU PARA CARREGAR: '+ ++contador);
  const allSkuInThisPage = getAllCurrentSkus();

  // const baseUrlApi = "https://api-hml.autoglass.com.br/";
  const baseUrlApi = "https://api.autoglass.com.br/"; // OBS: está em prd apenas para realização do teste. Após isso, trocar para o link de hml.
  const baseUrlListaOpcionais = "integracao-b2c/api/web-app/produtos/opcionais-lista?codigosProdutos=";

  const urlToConsult = baseUrlApi + baseUrlListaOpcionais + allSkuInThisPage.join("&codigosProdutos=");

  
  try {
    const allOptionals = await $.get(urlToConsult);
    addAllOptionals(allOptionals);

    configureExpandOnClick();
    
    contractOnClickOutsideShelves();
  } catch (ex) {
    console.error("Falha ao renderizar opcionais. \n ", ex);
  }
}

function getAllCurrentSkus() {
  return $(".qd_cpUri")
        .toArray()
        .reduce((acc, current) => {
                const url = current.value;
                const CodigoReferenciaSKU = getSkuFromUrl(url);
                acc.push(CodigoReferenciaSKU);
                return acc;
        }, [])
        .filter(o => o != null);
}

function getSkuFromUrl(url) {
  const minCodeLength = 4;
  const codigo = url.slice(0, -2).substring(url.indexOf("---") + 3).replace(/\D/g, "")
  return codigo.length < minCodeLength ? null : codigo;
}

function contractOnClickOutsideShelves() {
  $(document).click((event) => {
    if (event.srcElement.closest(".prateleira") == null) {
      removeAllExpanded();
    }
  });
}

function configureExpandOnClick() {
  $(".optionals, .shelf-qd-v1-price").unbind('click').on("click", (e) => {
    const allChildren = e.currentTarget.closest(".prateleira").children;
    const currentElement = e.currentTarget.closest("ul");
    clearAllExpandedExceptCurrent(allChildren, currentElement);
    currentElement.classList.toggle("expanded");
  });
}

function addAllOptionals(allOptionals) {
  $(".qd-product-is-in-stock-true").each((key, element) => {
    const codigo = getSkuFromUrl(element.querySelector("a").href);
    const allOptionalsForCurrentELement = allOptionals
      .find((o) => o.Codigo == codigo)
      ?.Opcionais.reduce((acc, current) => {
        acc = acc + `
          <h3> ${current} </h3>
        `
        return acc;
      }, []);

    if (allOptionals[key]?.Opcionais.length > 2) {
      element.classList.add("more-than-two-optionals");
    }
    const optionalsElment = element.querySelector(".optionals");
    optionalsElment.innerHTML = allOptionalsForCurrentELement || "";
    optionalsElment.classList.remove("loading");
  });
}

function removeAllExpanded() {
  const allChildren = $(".prateleira:last-child")[0].children;
  clearAllExpandedExceptCurrent(allChildren);
}

function clearAllExpandedExceptCurrent(allChildren, currentElement) {
  for (let element of allChildren) {
    if (element != currentElement){
      element.classList.remove("expanded");
    }
  }
}

const functionExecutedAfterLoadItems = window.bindQuickView = function () {
  loadOptionals();
}

loadOptionals();
