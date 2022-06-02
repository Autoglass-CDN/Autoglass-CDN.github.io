async function loadOptionals() {

  const allSkuInThisPage = getAllCurrentSkus();

  // let baseUrlApiListaOpcionais = "https://api-hml.autoglass.com.br/integracao-b2c/api/web-app/produtos/opcionais-lista?codigosProdutos=";
  const baseUrlApiListaOpcionais = "http://localhost:5010/integracao-b2c/api/web-app/produtos/opcionais-lista?codigosProdutos=";

  const urlToConsult = baseUrlApiListaOpcionais+allSkuInThisPage.join('&codigosProdutos=')

  try{
    const allOptionals = await $.get(urlToConsult);
    // response = response.reverse();
    addAllOptionals(allOptionals);

    configureExpandOnClick();

    contractOnClickOutsideShelves();

  }catch (ex) {
    console.error("Falha ao renderizar opcionais. \n ", ex);
  }

}

function getAllCurrentSkus() {
  return $('.qd_cpUri')
        .toArray()
        .reduce( ( acc , current ) => {
                const url = current.value;
                const CodigoReferenciaSKU =  url.slice(0,-2)
                                                .substring(url.indexOf('---')+3);
                acc.push(CodigoReferenciaSKU);
                return acc
              },
              []
        );
}

function contractOnClickOutsideShelves() {
  $(document).click((event) => {
    if (event.srcElement.closest('.prateleira') == null) {
      removeAllExpanded();
    }
  });
}

function configureExpandOnClick() {
  $('.optionals, .shelf-qd-v1-price').on('click', (e) => {
    const allChildren = e.currentTarget.closest('.prateleira').children;
    const currentElement = e.currentTarget.closest('ul');
    clearAllExpandedExceptCurrent (allChildren, currentElement)
    currentElement.classList.toggle("expanded")
  });
}

function addAllOptionals(allOptionals) {
  $('.qd-product-is-in-stock-true').each((key, element) => {
    console.log(element);
    const allOptionalsForCurrentELement = allOptionals[key].Opcionais.reduce((acc, current) => {
      acc = acc + `
      <h3>
        ${current}
      </h3>
      `
      return acc;
    }
    , [])

    if (allOptionals[key].Opcionais.length > 2) {
      element.classList.add('more-than-two-optionals')
    }
    const optionalsElment = element.querySelector('.optionals');
    optionalsElment.innerHTML = allOptionalsForCurrentELement;
    optionalsElment.classList.remove('loading')
  })
}

function removeAllExpanded() {
  const allChildren = $('.prateleira:last-child')[0].children;
  clearAllExpandedExceptCurrent (allChildren);
}

function clearAllExpandedExceptCurrent (allChildren, currentElement) {
  for (let element of allChildren) {
    if(element != currentElement)
        element.classList.remove('expanded')
    }
}

loadOptionals();
