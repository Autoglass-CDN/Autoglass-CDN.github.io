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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/B2C-02-filtro-busca.dev.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/B2C-02-filtro-busca.dev.js":
/*!*******************************************!*\
  !*** ./src/js/B2C-02-filtro-busca.dev.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$(function () {\r\n\t/**\r\n\t * TODO: Remover esses parametro daqui, quando a garantia da Maeztra acabar.\r\n\t * Essa função corrige a aparição do filtro na tela pesquisa.\r\n\t */\r\n\t$.QD_scrollToggle('570, 770');\r\n\r\n\t/**\r\n\t * Atributo 'data-qd-class' é o identificador do filtro.\r\n\t * Para adicionar o componente em outro filtro, é só adicionar o seu atributo neste vetor.\r\n\t */\r\n\tconst dataQdClasses = [\r\n\t\t\"veiculo\",\r\n\t\t\"ano\",\r\n\t\t\"marca\",\r\n\t\t\"compatibilidade-modelo\",\r\n\t\t\"compatibilidade-montadora\",\r\n\t\t\"posicao-da-peca\",\r\n\t\t\"cor\",\r\n\t\t\"faixa\",\r\n\t];\r\n\r\n\tdataQdClasses.forEach(function (dataQdClass) {\r\n\t\t$(`fieldset[data-qd-class=\"${dataQdClass}\"] > div`).prepend(\r\n\t\t\t`<div class=\"filtro\">\r\n\t\t  <input\r\n\t\t\tclass=\"filtro-busca\"\r\n\t\t\ttype=\"search\"\r\n\t\t\tautocomplete=\"off\"\r\n\t\t\tautocorrect=\"off\"\r\n\t\t\tautocapitalize=\"none\"\r\n\t\t\tspellcheck=\"false\"\r\n\t\t\trole=\"textbox\"\r\n\t\t\tplaceholder=\"Digite para filtrar...\" />\r\n\t\t</div>`\r\n\t\t);\r\n\r\n\t\t$(\r\n\t\t\t//aplica filtro ao digitar na caixa de texto\r\n\t\t\t`fieldset[data-qd-class=\"${dataQdClass}\"] > div > div.filtro > input.filtro-busca`\r\n\t\t).on(\"input\", function () {\r\n\t\t\tvar inputValue = this.value.toLowerCase();\r\n\r\n\t\t\t$(`fieldset[data-qd-class=\"${dataQdClass}\"] > div > label`).each(\r\n\t\t\t\tfunction (index) {\r\n\t\t\t\t\tif (!$(this).text().toLowerCase().includes(inputValue)) {\r\n\t\t\t\t\t\t$(this).hide();\r\n\t\t\t\t\t} else {\r\n\t\t\t\t\t\t$(this).show();\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t);\r\n\t\t});\r\n\t}); ''\r\n\t// Expõe as opções com filtro logo no carregamento do componente\r\n\t$(\r\n\t\t`fieldset[data-qd-class=\"veiculo\"] > h5, fieldset[data-qd-class=\"ano\"] > h5`\r\n\t).click();\r\n});\r\n\r\n/**\r\n * Função necessária para adicionar o evento de cliqui de adição no carrinho\r\n * Executar toda vez que um filtro for aplicado ou página trocada\r\n */\r\n$(document).ready(() => {\r\n\tfunction AddToMiniCart() {\r\n\t\tvar a, b, c, d;\r\n\t\ta = 27,\r\n\t\t\tc = function () {\r\n\t\t\t\tvar a, b;\r\n\t\t\t\treturn b = '<div class=\"boxPopUp2-overlay boxPopUp2-clickActive\" style=\"display: none;\"></div>',\r\n\t\t\t\t\t(a = $(\".boxPopUp2-overlay\")).length > 0 ? a : $(b)\r\n\t\t\t}\r\n\t\t\t,\r\n\t\t\td = function (b) {\r\n\t\t\t\tvar d, e, f, g, h, i;\r\n\t\t\t\treturn i = $(this).data(\"template\"),\r\n\t\t\t\t\tf = '<div class=\"boxPopUp2 vtexsm-popupContent freeContentMain popupOpened sku-selector\" style=\"position: fixed;\">\\n\t<div class=\"boxPopUp2-wrap\">\\n\t\t<div class=\"boxPopUp2-content vtexsm-popupContent freeContentPopup\" style=\"position: fixed;\">\\n\t\t\t<div class=\"skuWrap_ freeContent vtexsc-selectSku\">\\n\t\t\t\tCarregando...\\n\t\t\t</div>\\n\t\t</div>\\n\t</div>\\n</div>',\r\n\t\t\t\t\te = c(),\r\n\t\t\t\t\td = $(f),\r\n\t\t\t\t\te.appendTo($(\"body\")).fadeIn(),\r\n\t\t\t\t\td.appendTo($(\"body\")).fadeIn(),\r\n\t\t\t\t\tg = function () {\r\n\t\t\t\t\t\treturn e.fadeOut(),\r\n\t\t\t\t\t\t\td.remove(),\r\n\t\t\t\t\t\t\t$(document).off(\"click\", g)\r\n\t\t\t\t\t}\r\n\t\t\t\t\t,\r\n\t\t\t\t\th = function (b) {\r\n\t\t\t\t\t\treturn b.keyCode === a ? (g(),\r\n\t\t\t\t\t\t\t$(document).off(\"keyup\", h)) : void 0\r\n\t\t\t\t\t}\r\n\t\t\t\t\t,\r\n\t\t\t\t\te.on(\"click\", g),\r\n\t\t\t\t\t$(document).on(\"keyup\", h),\r\n\t\t\t\t\t$(window).on(\"vtex.modal.hide\", g),\r\n\t\t\t\t\t$(window).on(\"modalHide.vtex\", g),\r\n\t\t\t\t\t$.get(i).done(function (a) {\r\n\t\t\t\t\t\treturn d.find(\".skuWrap_\").html($(a.trim()))\r\n\t\t\t\t\t})\r\n\t\t\t}\r\n\t\t\t,\r\n\t\t\tb = function () {\r\n\t\t\t\treturn $(\".to-bind-modal\").each(function () {\r\n\t\t\t\t\treturn $(this).removeClass(\"to-bind-modal\").on(\"click\", d)\r\n\t\t\t\t})\r\n\t\t\t}\r\n\t\t\t,\r\n\t\t\t$(document).ready(b),\r\n\t\t\t$(document).on(\"ajaxComplete\", b)\r\n\t}\r\n\r\n\r\n\tconst resultBlock = document.querySelector('.prateleira.row.qd-xs');\r\n\r\n\tconst mutation = new MutationObserver((m) => {\r\n\t\tAddToMiniCart()\r\n\t});\r\n\r\n\tmutation.observe(resultBlock, { childList: true, subtree: true });\r\n});\r\n\n\n//# sourceURL=webpack:///./src/js/B2C-02-filtro-busca.dev.js?");

/***/ })

/******/ });