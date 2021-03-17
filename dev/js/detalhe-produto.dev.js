/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/detalhe-produto.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/detalhe-produto.js":
/*!***********************************!*\
  !*** ./src/js/detalhe-produto.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const sections = [...document.querySelectorAll(\"section\")];\r\nconst getLinkById = (id) => document.querySelector(`a[href='#${id}']`);\r\n\r\nconst inView = (section, width) => {\r\n  let top = section.offsetTop;\r\n  //offsetTop: Distance of the outer border of the current element relative to the inner border of the top of the offsetParent node.\r\n  let height = section.offsetHeight;\r\n  //offsetHeight: height of an element, including vertical padding and borders, as an integer.\r\n\r\n  while (section.offsetParent) {\r\n    //offsetParent: a reference to the element which is the closest (nearest in the containment hierarchy) positioned ancestor element.\r\n    section = section.offsetParent;\r\n    top += section.offsetTop;\r\n  }\r\n  if (width) {\r\n    //adiciona margem do topo no cálculo\r\n    top -= width > 1200 ? 250 : 130;\r\n  }\r\n\r\n  return (\r\n    top < window.pageYOffset + window.innerHeight &&\r\n    top + height > window.pageYOffset\r\n  );\r\n  //pageYOffset: the number of pixels the document is currently scrolled along the vertical axis (that is, up or down) with a value of 0.0, indicating that the top edge of the Document is currently aligned with the top edge of the window's content area.\r\n  //innerHeight: the interior height of the window in pixels, including the height of the horizontal scroll bar, if present.\r\n};\r\n\r\nwindow.onscroll = () => {\r\n  let next = false;\r\n\r\n  sections.forEach((section) => {\r\n    const a = getLinkById(section.id);\r\n\r\n    if (inView(section, window.innerWidth) && !next) {\r\n      a.classList.add(\"tab--current\");\r\n      next = true;\r\n    } else {\r\n      a && a.classList.remove(\"tab--current\");\r\n    }\r\n  });\r\n};\r\n\r\nconst toggleSectionCollapse = (section) => {\r\n  if (section.classList.contains(\"ativo\")) section.classList.remove(\"ativo\");\r\n  else section.classList.add(\"ativo\");\r\n};\r\n\r\nconst sectionCollapseInit = () => {\r\n  let headers = document.querySelectorAll(\".contents .tab-content h2\");\r\n\r\n  headers.forEach((header) => {\r\n    header.onclick = (event) => {\r\n      toggleSectionCollapse(header.closest(\".tab-content\"));\r\n    };\r\n  });\r\n};\r\n\r\nsectionCollapseInit();\r\n\r\n//Descrição da marca\r\nasync function insertBrandDescription() {\r\n  document.querySelector(\"#descricao-marca\").parentElement.style.display =\r\n    \"none\";\r\n\r\n  return fetch(\"/api/catalog_system/pub/brand/list\")\r\n    .then((response) => response.json())\r\n    .then((brandList) => {\r\n      const brandName = document\r\n        .querySelector(\".brandName\")\r\n        .classList.value.replace(\"brandName\", \"\")\r\n        .trim()\r\n        .replace(\"-\", \" \")\r\n        .split(\" \")[0];\r\n\r\n      const brand = brandList.find((brand) => brand.name.includes(brandName));\r\n\r\n      if (brand && brand.metaTagDescription !== '') {\r\n        const brandDescription = brand.metaTagDescription;\r\n\r\n        document.querySelector(\r\n          \"#descricao-marca\"\r\n        ).textContent = brandDescription;\r\n        document.querySelector(\"#descricao-marca\").parentElement.style.display =\r\n          \"block\";\r\n      }\r\n    });\r\n}\r\n\r\nasync function getProductRefIdByProductName() {\r\n  const currentProduct = await vtexjs.catalog.getCurrentProductWithVariations();\r\n\r\n  const [_, productRefId] = currentProduct.name.match(\r\n    /(\\d+)(\\s?\\-?\\s?[0-9]+)?$/\r\n  );\r\n\r\n  return productRefId;\r\n}\r\n\r\nasync function loadOptionals() {\r\n  const opcionaisContainer = $(\"#opcionais\");\r\n  const productRefId = await getProductRefIdByProductName();\r\n  const baseUrlApi =\r\n    window.location.href.includes(\"dev\") || window.location.href.includes(\"mvp\")\r\n      ? \"https://api-hml.autoglass.com.br/integracao-b2c/api/web-app\"\r\n      : \"https://api.autoglass.com.br/integracao-b2c/api/web-app\";\r\n\r\n  try {\r\n    const { Opcionais } = await $.get(\r\n      `${baseUrlApi}/produtos/${productRefId}/opcionais`\r\n    );\r\n\r\n    if (Opcionais && Opcionais.length > 0) {\r\n      opcionaisContainer.html(`\r\n              <h3>Características</h3>\r\n              <div class=\"caracteristicas__box\">\r\n                  ${Opcionais.map(\r\n                    (x) =>\r\n                      `<span class=\"caracteristicas__caracteristica\">${x}</span>`\r\n                  ).join(\"\")}\r\n              </div>\r\n          `);\r\n    }\r\n  } catch (ex) {\r\n    console.error(\"Falha ao renderizar opcionais. \\n \", ex);\r\n  }\r\n}\r\n\r\nwindow.addEventListener(\"load\", insertBrandDescription);\r\nwindow.addEventListener(\"load\", loadOptionals);\r\n// Se não tem vídeo, remove ajuste de largura\r\nif (document.querySelector(\"#gtm-video-parabrisa\").innerHTML === \"\") {\r\n  document\r\n    .querySelectorAll(\".info-box.left\")\r\n    .forEach((box) => box.classList.remove(\"left\"));\r\n}\r\n\r\nasync function loadSimilars() {\r\n  const hideMenu = (id) =>\r\n    (document.querySelector(`a[href=\"#${id}\"]`).parentElement.style.display =\r\n      \"none\");\r\n  const isLoaded = (id) => document.querySelector(`#${id}`).innerHTML != \"\";\r\n  const showComponent = (id) =>\r\n    (document.querySelector(`#${id}`).style.display = \"block\") &&\r\n    (document.querySelector(`a[href=\"#${id}\"]`).parentElement.style.display =\r\n      \"unset\");\r\n\r\n  hideMenu(\"outras-marcas\");\r\n  hideMenu(\"compre-junto\");\r\n\r\n  if (isLoaded(\"similars\")) {\r\n    showComponent(\"outras-marcas\");\r\n  }\r\n\r\n  if (isLoaded(\"sugestoes\")) {\r\n    showComponent(\"compre-junto\");\r\n  }\r\n}\r\n\r\nloadSimilars();\r\n\r\n/**\r\n *  Cria bloco de Veículos Compatíveis\r\n */\r\n$(window).on(\"ready\", async () => {\r\n  const veiculosCompatíveisContainer = $(\"#veiculos-compativeis\");\r\n  const productRefId = await getProductRefIdByProductName();\r\n  const baseUrlApi =\r\n    window.location.href.includes(\"dev\") || window.location.href.includes(\"mvp\")\r\n      ? \"https://api-hml.autoglass.com.br/integracao-b2c/api/web-app\"\r\n      : \"https://api.autoglass.com.br/integracao-b2c/api/web-app\";\r\n\r\n  try {\r\n    const veiculosCompativeis = await $.get(\r\n      `${baseUrlApi}/produtos/${productRefId}/veiculos-compativeis`\r\n    );\r\n\r\n    if (veiculosCompativeis && veiculosCompativeis.length > 0) {\r\n      veiculosCompatíveisContainer.html(`\r\n            <h2>Veículos Compatíveis</h2>\r\n            <div class=\"veiculos-compativeis__box\">\r\n                <div class=\"veiculos-compativeis__box-header\">\r\n                    <button id=\"group-prev\" data-type=\"prev\" type=\"button\">\r\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\r\n                        <path id=\"Icon_ionic-ios-arrow-dropleft-circle\" data-name=\"Icon ionic-ios-arrow-dropleft-circle\" d=\"M19.375,3.375a16,16,0,1,0,16,16A16,16,0,0,0,19.375,3.375Zm3.338,22.238a1.49,1.49,0,0,1,0,2.1,1.467,1.467,0,0,1-1.046.431,1.492,1.492,0,0,1-1.054-.438l-7.231-7.254a1.483,1.483,0,0,1,.046-2.046l7.338-7.362a1.485,1.485,0,0,1,2.1,2.1l-6.3,6.231Z\" transform=\"translate(35.375 35.375) rotate(180)\" opacity=\"0.42\"/>\r\n                    </svg>\r\n                    </button>\r\n                    ${veiculosCompativeis.map(buildHeader).join(\"\")}\r\n                    <button id=\"group-next\" data-type=\"next\" type=\"button\">\r\n                        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\r\n                            <path id=\"Icon_ionic-ios-arrow-dropleft-circle\" data-name=\"Icon ionic-ios-arrow-dropleft-circle\" d=\"M19.375,3.375a16,16,0,1,0,16,16A16,16,0,0,0,19.375,3.375Zm3.338,22.238a1.49,1.49,0,0,1,0,2.1,1.467,1.467,0,0,1-1.046.431,1.492,1.492,0,0,1-1.054-.438l-7.231-7.254a1.483,1.483,0,0,1,.046-2.046l7.338-7.362a1.485,1.485,0,0,1,2.1,2.1l-6.3,6.231Z\" transform=\"translate(35.375 35.375) rotate(180)\" opacity=\"0.42\"/>\r\n                        </svg>\r\n                    </button>\r\n                </div>\r\n                <div class=\"veiculos-compativeis__box-content\">\r\n                    ${veiculosCompativeis.map(buildContent).join(\"\")}\r\n                </div>\r\n            </div>\r\n        `);\r\n\r\n      $(\".veiculos-compativeis__header-option\").first().addClass(\"active\");\r\n      $(`.veiculos-compativeis__box-content div`).first().addClass(\"active\");\r\n\r\n      $(\".veiculos-compativeis__header-option\").click(function () {\r\n        $(\".veiculos-compativeis__header-option\").removeClass(\"active\");\r\n        $(this).addClass(\"active\");\r\n\r\n        $(`.veiculos-compativeis__box-content div`).removeClass(\"active\");\r\n        $(\r\n          `.veiculos-compativeis__box-content div[data-for=\"${$(this).attr(\r\n            \"id\"\r\n          )}\"]`\r\n        ).addClass(\"active\");\r\n      });\r\n\r\n      $(\r\n        \"#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header button\"\r\n      ).click(function () {\r\n        const type = $(this).attr(\"data-type\");\r\n        const headerContainer = $(\r\n          \"#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header\"\r\n        );\r\n\r\n        if (type === \"next\") {\r\n          headerContainer[0].scrollBy(200, 0);\r\n        } else {\r\n          headerContainer[0].scrollBy(-200, 0);\r\n        }\r\n      });\r\n\r\n      const headerContainer = $(\r\n        \"#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header\"\r\n      );\r\n      $(\"#veiculos-compativeis h2\").click(() =>\r\n        toggleSectionCollapse(veiculosCompatíveisContainer[0])\r\n      );\r\n\r\n      checkIfNeedButtons(headerContainer);\r\n\r\n      headerContainer.on(\"scroll\", function () {\r\n        checkIfNeedButtons($(this));\r\n      });\r\n      $(window).on(\"resize\", function () {\r\n        checkIfNeedButtons(headerContainer);\r\n      });\r\n    } else {\r\n      $('a[href=\"#veiculos-compativeis\"]').parent().hide();\r\n      veiculosCompatíveisContainer.hide();\r\n    }\r\n  } catch (ex) {\r\n    $('a[href=\"#veiculos-compativeis\"]').parent().hide();\r\n    console.error(\"Falha ao renderizar os veículos compativeis. \\n \", ex);\r\n  }\r\n\r\n  function buildHeader(grupo, index) {\r\n    return `\r\n          <div id=\"${\r\n            grupo.Grupo + index\r\n          }\" class=\"veiculos-compativeis__header-option\">\r\n              <span>${grupo.Grupo}</span>\r\n          </div>\r\n      `;\r\n  }\r\n\r\n  function buildContent(grupo, index) {\r\n    return `\r\n          <div data-for=\"${grupo.Grupo + index}\">\r\n              ${grupo.Veiculos.map(\r\n                (veiculo) => `\r\n                  <div class=\"veiculos-compativeis__content-compativel\">\r\n                      <p>${veiculo.Veiculo}</p>\r\n                      <div>${veiculo.Anos.map(\r\n                        (x) => \"<span>\" + x + \"</span>\"\r\n                      )}.</div>\r\n                  </div>\r\n              `\r\n              ).join(\"\")}\r\n          </div>\r\n      `;\r\n  }\r\n\r\n  function checkIfNeedButtons(header) {\r\n    const buttons = $(\r\n      \"#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header button\"\r\n    );\r\n\r\n    if (needButtons()) {\r\n      const scroll = getScrollPercentage(header[0]);\r\n\r\n      if (scroll === 0) {\r\n        buttons.last().css(\"display\", \"flex\");\r\n\r\n        buttons.first().css(\"display\", \"none\");\r\n      } else if (scroll === 100) {\r\n        buttons.first().css(\"display\", \"flex\");\r\n\r\n        buttons.last().css(\"display\", \"none\");\r\n      } else {\r\n        buttons.css(\"display\", \"flex\");\r\n      }\r\n    } else {\r\n      buttons.css(\"display\", \"none\");\r\n    }\r\n  }\r\n\r\n  function needButtons() {\r\n    return (\r\n      document.querySelector(\".veiculos-compativeis__box-header\").scrollWidth >\r\n      window.innerWidth\r\n    );\r\n  }\r\n\r\n  function getScrollPercentage(container) {\r\n    return (\r\n      (100 * container.scrollLeft) /\r\n      (container.scrollWidth - container.clientWidth)\r\n    );\r\n  }\r\n});\r\n\n\n//# sourceURL=webpack:///./src/js/detalhe-produto.js?");

/***/ })

/******/ });