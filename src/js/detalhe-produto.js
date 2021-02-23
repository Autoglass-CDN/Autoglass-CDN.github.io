const sections = [...document.querySelectorAll("section")];
const getLinkById = (id) => document.querySelector(`a[href='#${id}']`);

const inView = (section, width) => {
  let top = section.offsetTop;
  //offsetTop: Distance of the outer border of the current element relative to the inner border of the top of the offsetParent node.
  let height = section.offsetHeight;
  //offsetHeight: height of an element, including vertical padding and borders, as an integer.

  while (section.offsetParent) {
    //offsetParent: a reference to the element which is the closest (nearest in the containment hierarchy) positioned ancestor element.
    section = section.offsetParent;
    top += section.offsetTop;
  }
  if (width) { //adiciona margem do topo no cálculo
    top -= width > 1200 ? 250 : 130;
  }

  return (
    top < window.pageYOffset + window.innerHeight &&
    top + height > window.pageYOffset
  );
  //pageYOffset: the number of pixels the document is currently scrolled along the vertical axis (that is, up or down) with a value of 0.0, indicating that the top edge of the Document is currently aligned with the top edge of the window's content area.
  //innerHeight: the interior height of the window in pixels, including the height of the horizontal scroll bar, if present.
};

window.onscroll = () => {
  let next = false;

  sections.forEach((section) => {
    const a = getLinkById(section.id);

    if (inView(section, window.innerWidth) && !next) {
      a.classList.add("tab--current");
      next = true;
    } else {
      a && a.classList.remove("tab--current");
    }
  });
};

const toggleSectionCollapse = (section) => {
  if (section.classList.contains('ativo'))
    section.classList.remove('ativo');
  else
    section.classList.add('ativo');
};

const sectionCollapseInit = () => {
  let sections = document.querySelectorAll('.contents .tab-content h2');

  sections.forEach(section => {
    section.onclick = (event) => {
      toggleSectionCollapse(section.parentElement);
    };
  })
};

sectionCollapseInit();

//Descrição da marca
async function insertBrandDescription() {
  return fetch('/api/catalog_system/pub/brand/list')
    .then(response => response.json())
    .then(brandList => {
      const brandName = document
        .querySelector('.brandName')
        .classList
        .value
        .replace('brandName', '')
        .trim()
        .replace('-', ' ')
        .split(' ')[0];

      const brandDescription = brandList
        .find(brand => brand.name.includes(brandName))?.metaTagDescription;

      document.querySelector('#descricao-marca').textContent = brandDescription;
    });
}

async function getProductRefIdByProductName() {
  const currentProduct = await vtexjs.catalog.getCurrentProductWithVariations();

  const [_, productRefId] = currentProduct.name.match(/(\d+)(\s?\-?\s?[0-9]+)?$/);

  return productRefId;
}

async function loadOptionals() {
  const opcionaisContainer = $('#opcionais');
  const productRefId = await getProductRefIdByProductName();

  try {
    const { Opcionais } = await $.get(`http://api-hml.autoglass.com.br/integracao-b2c/api/web-app/produtos/${productRefId}/opcionais`);

    if (Opcionais) {
      opcionaisContainer.html(`
              <h3>Características</h3>
              <div class="caracteristicas__box">
                  ${Opcionais.map(x => `<span class="caracteristicas__caracteristica">${x}</span>`).join('')}
              </div>
          `);
    }
  } catch (ex) {
    console.error('Falha ao renderizar opcionais. \n ', ex);
  }
}

window.addEventListener('load', insertBrandDescription);
window.addEventListener('load', loadOptionals);


/**
 *  Cria bloco de Veículos Compatíveis
*/
$(window).on('ready', async () => {
  const veiculosCompatíveisContainer = $('#veiculos-compativeis');
  const productRefId = await getProductRefIdByProductName();

  try {
    const veiculosCompativeis = await $.get(`http://api-hml.autoglass.com.br/integracao-b2c/api/web-app/produtos/${productRefId}/veiculos-compativeis`);

    if (veiculosCompativeis && veiculosCompativeis.length > 0) {
      veiculosCompatíveisContainer.html(`
            <h2>Veículos Compatíveis</h2>
            <div class="veiculos-compativeis__box">
                <div class="veiculos-compativeis__box-header">
                    <button id="group-prev" data-type="prev" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <path id="Icon_ionic-ios-arrow-dropleft-circle" data-name="Icon ionic-ios-arrow-dropleft-circle" d="M19.375,3.375a16,16,0,1,0,16,16A16,16,0,0,0,19.375,3.375Zm3.338,22.238a1.49,1.49,0,0,1,0,2.1,1.467,1.467,0,0,1-1.046.431,1.492,1.492,0,0,1-1.054-.438l-7.231-7.254a1.483,1.483,0,0,1,.046-2.046l7.338-7.362a1.485,1.485,0,0,1,2.1,2.1l-6.3,6.231Z" transform="translate(35.375 35.375) rotate(180)" opacity="0.42"/>
                    </svg>
                    </button>
                    ${veiculosCompativeis.map(buildHeader).join('')}
                    <button id="group-next" data-type="next" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                            <path id="Icon_ionic-ios-arrow-dropleft-circle" data-name="Icon ionic-ios-arrow-dropleft-circle" d="M19.375,3.375a16,16,0,1,0,16,16A16,16,0,0,0,19.375,3.375Zm3.338,22.238a1.49,1.49,0,0,1,0,2.1,1.467,1.467,0,0,1-1.046.431,1.492,1.492,0,0,1-1.054-.438l-7.231-7.254a1.483,1.483,0,0,1,.046-2.046l7.338-7.362a1.485,1.485,0,0,1,2.1,2.1l-6.3,6.231Z" transform="translate(35.375 35.375) rotate(180)" opacity="0.42"/>
                        </svg>
                    </button>
                </div>
                <div class="veiculos-compativeis__box-content">
                    ${veiculosCompativeis.map(buildContent).join('')}
                </div>
            </div>
        `);

      $('.veiculos-compativeis__header-option').first().addClass('active');
      $(`.veiculos-compativeis__box-content div`).first().addClass('active');

      $('.veiculos-compativeis__header-option').click(function () {
        $('.veiculos-compativeis__header-option').removeClass('active');
        $(this).addClass('active');

        $(`.veiculos-compativeis__box-content div`).removeClass('active');
        $(`.veiculos-compativeis__box-content div[data-for="${$(this).attr('id')}"]`)
          .addClass('active');
      });

      $('#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header button')
        .click(function () {
          const type = $(this).attr('data-type');
          const headerContainer = $('#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header');

          if (type === 'next') {
            headerContainer[0].scrollBy(200, 0);
          } else {
            headerContainer[0].scrollBy(-200, 0);
          }
        });

      const headerContainer = $('#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header');

      checkIfNeedButtons(headerContainer);

      headerContainer.on('scroll', function () { checkIfNeedButtons($(this)) });
      $(window).on('resize', function () { checkIfNeedButtons(headerContainer) });
    }
  } catch (ex) {
    $('a[href="#veiculos-compativeis"]').parent().hide();
    console.error('Falha ao renderizar os veículos compativeis. \n ', ex);
  }

  function buildHeader(grupo, index) {
    return `
          <div id="${grupo.Grupo + index}" class="veiculos-compativeis__header-option">
              <span>${grupo.Grupo}</span>
          </div>
      `
  }

  function buildContent(grupo, index) {
    return `
          <div data-for="${grupo.Grupo + index}">
              ${grupo.Veiculos.map(veiculo => `
                  <div class="veiculos-compativeis__content-compativel">
                      <p>${veiculo.Veiculo}</p>
                      <div>${veiculo.Anos.map(x => '<span>' + x + '</span>')}.</div>
                  </div>
              `).join('')}
          </div>
      `;
  }

  function checkIfNeedButtons(header) {
    const buttons = $('#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header button');

    if (needButtons()) {
      const scroll = getScrollPercentage(header[0]);

      if (scroll === 0) {
        buttons.last()
          .css('display', 'flex');

        buttons.first()
          .css('display', 'none');

      } else if (scroll === 100) {
        buttons.first()
          .css('display', 'flex');

        buttons.last()
          .css('display', 'none');
      } else {
        buttons.css('display', 'flex');
      }
    } else {
      buttons.css('display', 'none');
    }
  }

  function needButtons() {
    return document.querySelector('.veiculos-compativeis__box-header')
      .scrollWidth > window.innerWidth;
  }

  function getScrollPercentage(container) {
    return 100 * container.scrollLeft
      / (container.scrollWidth - container.clientWidth);
  }
});
