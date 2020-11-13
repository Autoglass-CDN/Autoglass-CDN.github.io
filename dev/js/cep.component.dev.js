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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/cep.component.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/cep.component.js":
/*!*********************************!*\
  !*** ./src/js/cep.component.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Para funcionar precisa no seletor ter\n * o atributo 'data-render-cep'.\n * É o lugar aonde vai rendereziar\n * o painel de mudança de cep\n */\n$(function CepComponent() {\n\tconst CONFIG = {\n\t\tSELECTOR: '.cep:not(\".link\")',\n\t\tLOCAL_TO_RENDER_CEP: 'data-render-cep',\n\t\tEVENTS: {\n\t\t\tFINISH_LOAD: 'cep-finish-load',\n\t\t\tCEP_UPDATED: 'cep-updated'\n\t\t},\n\t\tSTORAGE: 'AG_AddressSelected'\n\t}\n\n\tconst Controller = ControllerAPI();\n\tconst View = ViewAPI();\n\tconst Service = ServiceAPI();\n\n\tController.init();\n\n\tfunction ControllerAPI() {\n\t\treturn {\n\t\t\tinit,\n\t\t\tformatAddress,\n\t\t\tsubmitEvent\n\t\t}\n\n\t\tasync function init() {\n\t\t\tconst orderForm = await Service.getOrderForm();\n\t\t\tService.saveAddressOnLocalStorage(orderForm.shippingData.address);\n\n\t\t\t$(CONFIG.SELECTOR).each(function (_, cepContainer) {\n\t\t\t\t$(cepContainer)\n\t\t\t\t\t.html('')\n\t\t\t\t\t.addClass('ghost-loading');\n\n\t\t\t\tconst modalContent = $(cepContainer).attr(CONFIG.LOCAL_TO_RENDER_CEP);\n\t\t\t\tcepContainer.id = 'cep' + _;\n\n\t\t\t\t$(modalContent).css('position', 'relative');\n\t\t\t\t$(modalContent).css('overflow-x', 'hidden');\n\t\t\t\t$(modalContent).css('min-height', '150px');\n\n\t\t\t\tView.renderCepInfo(\n\t\t\t\t\tcepContainer,\n\t\t\t\t\tmodalContent,\n\t\t\t\t\torderForm.shippingData.address\n\t\t\t\t);\n\n\t\t\t\t$(window).on(CONFIG.EVENTS.CEP_UPDATED, async (e) => {\n\t\t\t\t\tconst newOrderForm = e.originalEvent.detail;\n\t\t\t\t\tService.saveAddressOnLocalStorage(newOrderForm.shippingData.address);\n\n\t\t\t\t\t$(cepContainer)\n\t\t\t\t\t\t.html('')\n\t\t\t\t\t\t.addClass('ghost-loading');\n\n\t\t\t\t\tView.renderCepInfo(\n\t\t\t\t\t\tcepContainer,\n\t\t\t\t\t\tmodalContent,\n\t\t\t\t\t\tnewOrderForm.shippingData.address\n\t\t\t\t\t);\n\t\t\t\t});\n\t\t\t});\n\n\t\t\twindow.dispatchEvent(new CustomEvent(\n\t\t\t\tCONFIG.EVENTS.FINISH_LOAD,\n\t\t\t\t{ detail: orderForm }\n\t\t\t));\n\t\t}\n\n\t\tfunction formatAddress(address) {\n\t\t\tconst { city, neighborhood, state, street, postalCode } = address;\n\t\t\tlet addressFormatted = '';\n\n\t\t\tif (street)\n\t\t\t\taddressFormatted += street;\n\t\t\tif (neighborhood) {\n\t\t\t\tif (street)\n\t\t\t\t\taddressFormatted += ' - ';\n\t\t\t\taddressFormatted += neighborhood;\n\t\t\t}\n\t\t\tif (city) {\n\t\t\t\tif (neighborhood)\n\t\t\t\t\taddressFormatted += ', ';\n\t\t\t\taddressFormatted += city;\n\t\t\t}\n\t\t\tif (state) {\n\t\t\t\tif (city)\n\t\t\t\t\taddressFormatted += ' - ';\n\n\t\t\t\taddressFormatted += state;\n\t\t\t}\n\n\t\t\treturn addressFormatted ? addressFormatted : postalCode;\n\t\t}\n\n\t\tasync function submitEvent(e) {\n\t\t\te.preventDefault();\n\t\t\tconst cep = $('#cep-input').val();\n\n\t\t\tif (!cep) {\n\t\t\t\t$(this).addClass('cep-new__content-form--error');\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t$('.cep-new__content--loading')\n\t\t\t\t.show()\n\t\t\t\t.css('right', '0');\n\n\t\t\ttry {\n\t\t\t\tconst [cepChanged] = await Service.calculateShipping(cep);\n\n\t\t\t\t$('.cep-new')\n\t\t\t\t\t.css('transform', 'translateX(105%)');\n\n\t\t\t\twindow.dispatchEvent(new CustomEvent(\n\t\t\t\t\tCONFIG.EVENTS.CEP_UPDATED,\n\t\t\t\t\t{ detail: cepChanged }\n\t\t\t\t));\n\n\t\t\t\tsetTimeout(() => $('.cep-new').remove(), 1000);\n\t\t\t} catch (ex) {\n\t\t\t\t$('.cep-new__content--loading')\n\t\t\t\t\t.hide()\n\t\t\t\t\t.css('right', 'unset');\n\n\t\t\t\tconsole.error(ex);\n\t\t\t}\n\t\t}\n\t}\n\n\tfunction ViewAPI() {\n\t\treturn {\n\t\t\trenderCepInfo\n\t\t}\n\n\t\tfunction renderCepInfo(cepContainer, modalContent, address) {\n\t\t\tif (address) {\n\t\t\t\tconst addressFormatted = Controller.formatAddress(address);\n\n\t\t\t\t$(cepContainer)\n\t\t\t\t\t.removeClass('ghost-loading')\n\t\t\t\t\t.html(`\n            <div class=\"cep-info\">\n              <div class=\"cep-info__location\">\n                <svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-geo-alt\" fill=\"currentColor\"\n                  xmlns=\"http://www.w3.org/2000/svg\">\n                  <path fill-rule=\"evenodd\"\n                    d=\"M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z\" />\n                  <path fill-rule=\"evenodd\" d=\"M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z\" />\n                </svg>\n                <span class=\"cep-info__location-street\">${addressFormatted}</span>\n              </div>\n              <button id=\"change-cep-button\" class=\"cep-info__location-button\">Alterar</button>\n            </div>\n          `);\n\n\t\t\t\t$(`#${cepContainer.id} .cep-info__location-button`).click(() => {\n\t\t\t\t\tmodalContent\n\t\t\t\t\t\t? _renderNewCep(modalContent)\n\t\t\t\t\t\t: console.error(CONFIG.LOCAL_TO_RENDER_CEP\n\t\t\t\t\t\t\t+ ' não encontrado. Id: '\n\t\t\t\t\t\t\t+ cepContainer.id\n\t\t\t\t\t\t);\n\t\t\t\t});\n\t\t\t}\n\t\t}\n\n\t\tfunction _renderNewCep(modalContent) {\n\t\t\t$(modalContent).append(`\n        <div class=\"cep-new\">\n          <div class=\"cep-new__content\">\n            <div class=\"cep-new__content--loading\">\n              <div>\n                <svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-geo-alt\" fill=\"currentColor\"\n                  xmlns=\"http://www.w3.org/2000/svg\">\n                  <path fill-rule=\"evenodd\"\n                    d=\"M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z\" />\n                  <path fill-rule=\"evenodd\" d=\"M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z\" />\n                </svg>\n                <svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-geo-alt-fill\" fill=\"currentColor\"\n                  xmlns=\"http://www.w3.org/2000/svg\">\n                  <path fill-rule=\"evenodd\"\n                    d=\"M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z\" />\n                </svg>\n              </div>\n            </div>\n            <span class=\"cep-new__content-title\">Informe seu CEP</span>\n            <form class=\"cep-new__content-form\">\n              <input type=\"text\" autocomplete=\"off\" id=\"cep-input\" placeholder=\"00000-000\" class=\"cep-new__content-input\" />\n              <button id=\"cep-new-button\" type=\"submit\" class=\"cep-new__content-button\">\n                <svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-arrow-right-circle-fill\" fill=\"currentColor\"\n                  xmlns=\"http://www.w3.org/2000/svg\">\n                  <path fill-rule=\"evenodd\"\n                    d=\"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-11.5.5a.5.5 0 0 1 0-1h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5z\" />\n                </svg>\n              </button>\n            </form>\n          </div>\n          <div class=\"cep-new__footer\">\n            <button id=\"cep-back-button\" type=\"button\" class=\"cep-new__footer-back-button\">Voltar</button>\n          </div>\n        </div>\n      `);\n\n\t\t\tsetTimeout(() => $('.cep-new').css('transform', 'translateX(0)'), 100);\n\n\t\t\t$('#cep-input').mask('99999-999');\n\n\t\t\t$(`${modalContent} #cep-back-button`).click(e => {\n\t\t\t\t$('.cep-new')\n\t\t\t\t\t.css('transform', 'translateX(-105%)');\n\n\t\t\t\tsetTimeout(() => $('.cep-new').remove(), 1000);\n\t\t\t});\n\n\t\t\t$('.cep-new__content-form').on('submit', Controller.submitEvent);\n\t\t}\n\t}\n\n\tfunction ServiceAPI() {\n\t\treturn {\n\t\t\tcalculateShipping,\n\t\t\tgetOrderForm,\n\t\t\tsaveAddressOnLocalStorage\n\t\t}\n\n\t\tasync function calculateShipping(cep) {\n\t\t\tconst search = await vtexjs.checkout.calculateShipping({\n\t\t\t\tpostalCode: cep,\n\t\t\t\tcountry: 'BRA',\n\t\t\t\taddressType: 'search'\n\t\t\t});\n\n\t\t\tconst residential = await vtexjs.checkout.calculateShipping({\n\t\t\t\tpostalCode: cep,\n\t\t\t\tcountry: 'BRA',\n\t\t\t\taddressType: 'residential'\n\t\t\t});\n\n\t\t\treturn [search, residential];\n\t\t}\n\n\t\tasync function getOrderForm() {\n\t\t\tconst orderForm = await vtexjs.checkout.getOrderForm();\n\n\t\t\treturn orderForm;\n\t\t}\n\n\t\tfunction saveAddressOnLocalStorage(address) {\n\t\t\tlocalStorage.setItem(\n\t\t\t\tCONFIG.STORAGE,\n\t\t\t\tJSON.stringify(address)\n\t\t\t);\n\t\t}\n\t}\n});\n\n\n//# sourceURL=webpack:///./src/js/cep.component.js?");

/***/ })

/******/ });