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

eval("/**\r\n * Para funcionar precisa no seletor ter\r\n * o atributo 'data-render-cep'.\r\n * É o lugar aonde vai rendereziar\r\n * o painel de mudança de cep\r\n */\r\n$(function CepComponent() {\r\n\tconst CONFIG = {\r\n\t\tSELECTOR: '.cep:not(\".link\")',\r\n\t\tLOCAL_TO_RENDER_CEP: 'data-render-cep',\r\n\t\tEVENTS: {\r\n\t\t\tFINISH_LOAD: 'cep-finish-load',\r\n\t\t\tCEP_UPDATED: 'cep-updated'\r\n\t\t},\r\n\t\tSTORAGE: 'AG_AddressSelected'\r\n\t}\r\n\r\n\tconst Controller = ControllerAPI();\r\n\tconst View = ViewAPI();\r\n\tconst Service = ServiceAPI();\r\n\r\n\tController.init();\r\n\r\n\tfunction ControllerAPI() {\r\n\t\treturn {\r\n\t\t\tinit,\r\n\t\t\tformatAddress,\r\n\t\t\tsubmitEvent\r\n\t\t}\r\n\r\n\t\tasync function init() {\r\n\t\t\tconst orderForm = await Service.getOrderForm();\r\n\t\t\tService.saveAddressOnLocalStorage(orderForm.shippingData.address);\r\n\r\n\t\t\t$(CONFIG.SELECTOR).each(function (_, cepContainer) {\r\n\t\t\t\t$(cepContainer)\r\n\t\t\t\t\t.html('')\r\n\t\t\t\t\t.addClass('ghost-loading');\r\n\r\n\t\t\t\tconst modalContent = $(cepContainer).attr(CONFIG.LOCAL_TO_RENDER_CEP);\r\n\t\t\t\tcepContainer.id = 'cep' + _;\r\n\r\n\t\t\t\t$(modalContent).css('position', 'relative');\r\n\t\t\t\t$(modalContent).css('overflow-x', 'hidden');\r\n\t\t\t\t$(modalContent).css('min-height', '150px');\r\n\r\n\t\t\t\tView.renderCepInfo(\r\n\t\t\t\t\tcepContainer,\r\n\t\t\t\t\tmodalContent,\r\n\t\t\t\t\torderForm.shippingData.address\r\n\t\t\t\t);\r\n\r\n\t\t\t\t$(window).on(CONFIG.EVENTS.CEP_UPDATED, async (e) => {\r\n\t\t\t\t\tconst newOrderForm = e.originalEvent.detail;\r\n\t\t\t\t\tService.saveAddressOnLocalStorage(newOrderForm.shippingData.address);\r\n\r\n\t\t\t\t\t$(cepContainer)\r\n\t\t\t\t\t\t.html('')\r\n\t\t\t\t\t\t.addClass('ghost-loading');\r\n\r\n\t\t\t\t\tView.renderCepInfo(\r\n\t\t\t\t\t\tcepContainer,\r\n\t\t\t\t\t\tmodalContent,\r\n\t\t\t\t\t\tnewOrderForm.shippingData.address\r\n\t\t\t\t\t);\r\n\t\t\t\t});\r\n\t\t\t});\r\n\r\n\t\t\twindow.dispatchEvent(new CustomEvent(\r\n\t\t\t\tCONFIG.EVENTS.FINISH_LOAD,\r\n\t\t\t\t{ detail: orderForm }\r\n\t\t\t));\r\n\t\t}\r\n\r\n\t\tfunction formatAddress(address) {\r\n\t\t\tconst { city, neighborhood, state, street, postalCode } = address;\r\n\t\t\tlet addressFormatted = '';\r\n\r\n\t\t\tif (street)\r\n\t\t\t\taddressFormatted += street;\r\n\t\t\tif (neighborhood) {\r\n\t\t\t\tif (street)\r\n\t\t\t\t\taddressFormatted += ' - ';\r\n\t\t\t\taddressFormatted += neighborhood;\r\n\t\t\t}\r\n\t\t\tif (city) {\r\n\t\t\t\tif (neighborhood)\r\n\t\t\t\t\taddressFormatted += ', ';\r\n\t\t\t\taddressFormatted += city;\r\n\t\t\t}\r\n\t\t\tif (state) {\r\n\t\t\t\tif (city)\r\n\t\t\t\t\taddressFormatted += ' - ';\r\n\r\n\t\t\t\taddressFormatted += state;\r\n\t\t\t}\r\n\r\n\t\t\treturn addressFormatted ? addressFormatted : postalCode;\r\n\t\t}\r\n\r\n\t\tasync function submitEvent(e) {\r\n\t\t\te.preventDefault();\r\n\t\t\tconst cep = $('#cep-input').val();\r\n\r\n\t\t\tif (!cep) {\r\n\t\t\t\t$(this).addClass('cep-new__content-form--error');\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\r\n\t\t\t$('.cep-new__content--loading')\r\n\t\t\t\t.show()\r\n\t\t\t\t.css('right', '0');\r\n\r\n\t\t\ttry {\r\n\t\t\t\tconst [cepChanged] = await Service.calculateShipping(cep);\r\n\r\n\t\t\t\t$('.cep-new')\r\n\t\t\t\t\t.css('transform', 'translateX(105%)');\r\n\r\n\t\t\t\twindow.dispatchEvent(new CustomEvent(\r\n\t\t\t\t\tCONFIG.EVENTS.CEP_UPDATED,\r\n\t\t\t\t\t{ detail: cepChanged }\r\n\t\t\t\t));\r\n\r\n\t\t\t\tsetTimeout(() => $('.cep-new').remove(), 1000);\r\n\t\t\t} catch (ex) {\r\n\t\t\t\t$('.cep-new__content--loading')\r\n\t\t\t\t\t.hide()\r\n\t\t\t\t\t.css('right', 'unset');\r\n\r\n\t\t\t\tconsole.error(ex);\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\tfunction ViewAPI() {\r\n\t\treturn {\r\n\t\t\trenderCepInfo\r\n\t\t}\r\n\r\n\t\tfunction renderCepInfo(cepContainer, modalContent, address) {\r\n\t\t\tif (address) {\r\n\t\t\t\tconst addressFormatted = Controller.formatAddress(address);\r\n\r\n\t\t\t\t$(cepContainer)\r\n\t\t\t\t\t.removeClass('ghost-loading')\r\n\t\t\t\t\t.html(`\r\n            <div class=\"cep-info\">\r\n              <div class=\"cep-info__location\">\r\n                <svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-geo-alt\" fill=\"currentColor\"\r\n                  xmlns=\"http://www.w3.org/2000/svg\">\r\n                  <path fill-rule=\"evenodd\"\r\n                    d=\"M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z\" />\r\n                  <path fill-rule=\"evenodd\" d=\"M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z\" />\r\n                </svg>\r\n                <span class=\"cep-info__location-street\">${addressFormatted}</span>\r\n              </div>\r\n              <button id=\"change-cep-button\" class=\"cep-info__location-button\">Alterar</button>\r\n            </div>\r\n          `);\r\n\r\n\t\t\t\t$(`#${cepContainer.id} .cep-info__location-button`).click(() => {\r\n\t\t\t\t\tmodalContent\r\n\t\t\t\t\t\t? _renderNewCep(modalContent)\r\n\t\t\t\t\t\t: console.error(CONFIG.LOCAL_TO_RENDER_CEP\r\n\t\t\t\t\t\t\t+ ' não encontrado. Id: '\r\n\t\t\t\t\t\t\t+ cepContainer.id\r\n\t\t\t\t\t\t);\r\n\t\t\t\t});\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\tfunction _renderNewCep(modalContent) {\r\n\t\t\t$(modalContent).append(`\r\n        <div class=\"cep-new\">\r\n          <div class=\"cep-new__content\">\r\n            <div class=\"cep-new__content--loading\">\r\n              <div>\r\n                <svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-geo-alt\" fill=\"currentColor\"\r\n                  xmlns=\"http://www.w3.org/2000/svg\">\r\n                  <path fill-rule=\"evenodd\"\r\n                    d=\"M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z\" />\r\n                  <path fill-rule=\"evenodd\" d=\"M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z\" />\r\n                </svg>\r\n                <svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-geo-alt-fill\" fill=\"currentColor\"\r\n                  xmlns=\"http://www.w3.org/2000/svg\">\r\n                  <path fill-rule=\"evenodd\"\r\n                    d=\"M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z\" />\r\n                </svg>\r\n              </div>\r\n            </div>\r\n            <span class=\"cep-new__content-title\">Informe seu CEP</span>\r\n            <form class=\"cep-new__content-form\">\r\n              <input type=\"text\" autocomplete=\"off\" id=\"cep-input\" placeholder=\"00000-000\" class=\"cep-new__content-input\" />\r\n              <button id=\"cep-new-button\" type=\"submit\" class=\"cep-new__content-button\">\r\n                <svg width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" class=\"bi bi-arrow-right-circle-fill\" fill=\"currentColor\"\r\n                  xmlns=\"http://www.w3.org/2000/svg\">\r\n                  <path fill-rule=\"evenodd\"\r\n                    d=\"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-11.5.5a.5.5 0 0 1 0-1h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5z\" />\r\n                </svg>\r\n              </button>\r\n            </form>\r\n          </div>\r\n          <div class=\"cep-new__footer\">\r\n            <button id=\"cep-back-button\" type=\"button\" class=\"cep-new__footer-back-button\">Voltar</button>\r\n          </div>\r\n        </div>\r\n      `);\r\n\r\n\t\t\tsetTimeout(() => $('.cep-new').css('transform', 'translateX(0)'), 100);\r\n\r\n\t\t\t$('#cep-input').mask('99999-999');\r\n\r\n\t\t\t$('#cep-back-button').click(e => {\r\n\t\t\t\t$('.cep-new')\r\n\t\t\t\t\t.css('transform', 'translateX(-105%)');\r\n\r\n\t\t\t\tsetTimeout(() => $('.cep-new').remove(), 1000);\r\n\t\t\t});\r\n\r\n\t\t\t$('.cep-new__content-form').on('submit', Controller.submitEvent);\r\n\t\t}\r\n\t}\r\n\r\n\tfunction ServiceAPI() {\r\n\t\treturn {\r\n\t\t\tcalculateShipping,\r\n\t\t\tgetOrderForm,\r\n\t\t\tsaveAddressOnLocalStorage\r\n\t\t}\r\n\r\n\t\tasync function calculateShipping(cep) {\r\n\t\t\tconst search = await vtexjs.checkout.calculateShipping({\r\n\t\t\t\tpostalCode: cep,\r\n\t\t\t\tcountry: 'BRA',\r\n\t\t\t\taddressType: 'search'\r\n\t\t\t});\r\n\r\n\t\t\tconst residential = await vtexjs.checkout.calculateShipping({\r\n\t\t\t\tpostalCode: cep,\r\n\t\t\t\tcountry: 'BRA',\r\n\t\t\t\taddressType: 'residential'\r\n\t\t\t});\r\n\r\n\t\t\treturn [search, residential];\r\n\t\t}\r\n\r\n\t\tasync function getOrderForm() {\r\n\t\t\tconst orderForm = await vtexjs.checkout.getOrderForm();\r\n\r\n\t\t\treturn orderForm;\r\n\t\t}\r\n\r\n\t\tfunction saveAddressOnLocalStorage(address) {\r\n\t\t\tlocalStorage.setItem(\r\n\t\t\t\tCONFIG.STORAGE,\r\n\t\t\t\tJSON.stringify(address)\r\n\t\t\t);\r\n\t\t}\r\n\t}\r\n});\r\n\n\n//# sourceURL=webpack:///./src/js/cep.component.js?");

/***/ })

/******/ });