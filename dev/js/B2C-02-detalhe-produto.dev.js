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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/B2C-02-detalhe-produto.dev.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/B2C-02-detalhe-produto.dev.js":
/*!**********************************************!*\
  !*** ./src/js/B2C-02-detalhe-produto.dev.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$(function () {//\r\n\tlet acessorio = document.querySelector(\".mz-accesories__button--buy\");\r\n\r\n\tif (acessorio) {\r\n\t\t$(\".product-qd-v1-standard .buy-button\").addClass(\"secondary\");\r\n\t}\r\n\r\n\tlet skuList = Product.captureSkuSelectors();\r\n\tvar urlCart =\r\n\t\t\"/checkout/cart/add?sku=\" +\r\n\t\tskuList[0] +\r\n\t\t\"&qty=1&seller=1&redirect=true&sc=1\";\r\n\t$(\".mz-pickup__button--buy\").attr(\"href\", urlCart);\r\n\t$(\".mz-pickup__button--buy\").removeClass(\"lock-button\"); //lock-button\r\n\r\n\t$(\".link.lojas\").click(function (e) {\r\n\t\te.preventDefault();\r\n\t\t$(document.body).addClass(\"mz-pu-on\");\r\n\t\t$(document.body).addClass(\"mz-bo-on\");\r\n\t});\r\n\t$(\".mz-pickup__close--button,.mz-modal-overlay\").click(function () {\r\n\t\t$(document.body).removeClass(\"mz-in-on mz-as-on mz-bo-on mz-pu-on\");\r\n\t});\r\n\r\n\tga('create', 'UA-133498560-1', 'autoglassonline.com');\r\n\tif ($(\".product-qd-v1-price\").is(\":empty\")) {\r\n\t\t/*\r\n\t\t  Se o produto está indisponível, oculta boxes de preço e entrega\r\n\t\t*/\r\n\t\t$(\r\n\t\t\t\".product-qd-v1-standard.row .header, .product-qd-v1-sku-selection, .product-qd-v1-price, .product-qd-v1-shipping\"\r\n\t\t).hide();\r\n\r\n\t\t//Exibe o botão para o cliente conversar com o vendedor pelo Chat\r\n\t\t$('.product-unavailable')\r\n\t\t\t.on('click', (e) => {\r\n\t\t\t\te.preventDefault();\r\n\r\n\t\t\t\tconst today = new Date();\r\n\t\t\t\tconst hour = today.getHours();\r\n\t\t\t\tconst day = today.getDay();\r\n\r\n\t\t\t\tif ((day === 0 || day === 6) //É Domingo ou Sábado?\r\n\t\t\t\t\t|| (hour < 8 || hour >= 18) //Esta fora do horario de trabalho?\r\n\t\t\t\t) {\r\n\t\t\t\t\tzE('webWidget', 'chat:addTags', 'fora-expediente');\r\n\t\t\t\t\tzE('webWidget', 'chat:send', `Olá, nosso horário de atendimento é de Seg-Sex de 08-18h, no momento estamos sem consultor disponível. Por favor, informe seu Nome e Celular que entraremos em contato o mais breve possível. Produto para consulta: ${window.location.href}`);\r\n\t\t\t\t} else {\r\n\t\t\t\t\tzE('webWidget', 'chat:send', `Olá, tenho interesse neste produto, mas está indisponível no site: ${window.location.href}`);\r\n\t\t\t\t}\r\n\r\n\t\t\t\tzE('webWidget', 'open');\r\n\t\t\t});\r\n\r\n\t\t$('.talk-to-seller').show();\r\n\r\n\t\tif (!$(\"#similars\").is(\":empty\")) {\r\n\t\t\t$(\".other-brands\").show();\r\n\t\t\t$(\".product-unavailable\").addClass(\"buy-button other-brands secondary\");\r\n\t\t}\r\n\r\n\t\tga(\"send\", \"event\", \"estoque\", \"detalhe-produto\", \"indisponivel\");\r\n\t} else {\r\n\t\tga(\"send\", \"event\", \"estoque\", \"detalhe-produto\", \"disponivel\");\r\n\t}\r\n\r\n\tsetTimeout(function () {\r\n\t\t$(\"#txtCep\").after('<span class=\"ttp\"></span>');\r\n\r\n\t\t$(\".link.cep\").click(function (e) {\r\n\t\t\te.preventDefault();\r\n\t\t\tlet pixelsToScroll = $(window).width() > 900 ? 300 : 170;\r\n\r\n\t\t\t$(\"html, body\")\r\n\t\t\t\t.stop()\r\n\t\t\t\t.animate(\r\n\t\t\t\t\t{\r\n\t\t\t\t\t\tscrollTop: $(\"#txtCep\").offset().top - pixelsToScroll,\r\n\t\t\t\t\t},\r\n\t\t\t\t\t900,\r\n\t\t\t\t\t\"swing\"\r\n\t\t\t\t);\r\n\r\n\t\t\t$(\"#txtCep\").focus();\r\n\t\t});\r\n\t}, 500);\r\n\r\n\t$('#similars h2').after(`<p style=\"\r\n\t\ttext-align: center;\r\n\t\tmargin-top: -25px;\r\n\t\tmargin-bottom: 10px;\r\n\t\tfont-size: 21px;\r\n    font-weight: 600;\r\n\t\">Confira opções de <strong>${\r\n\t\tvtxctx.categoryName.toLowerCase()\r\n\t\t}</strong> para este mesmo veículo ${$('.value-field.Compatibilidade-Modelo').length ? `(<strong>${\r\n\t\t\t$('.value-field.Compatibilidade-Modelo').html()\r\n\t\t\t}</strong>)` : $('.value-field.Veiculo').length ? `(<strong>${\r\n\t\t\t\t$('.value-field.Veiculo').html()\r\n\t\t\t\t}</strong>)` : ``}</p>`);\r\n\r\n\t$(window).load(() => {\r\n\t\tconst shippingsDiv = document.querySelector('.freight-values');\r\n\t\tconst observerShippingsDiv = new MutationObserver(() => {\r\n\t\t\tconst textCepInput = document.querySelector('#txtCep');\r\n\r\n\t\t\tconst gaFreight = [];\r\n\r\n\t\t\tconst freights = [...shippingsDiv.querySelectorAll('td')]\r\n\t\t\t\t.filter(x => !(x.innerText.includes('Frete Grátis') || x.innerText == \"\" || x.innerText.startsWith('R$')))\r\n\t\t\t\t.map(x => x.innerText);\r\n\r\n\t\t\tfreights.forEach(x => {\r\n\t\t\t\tconst freight = x.split(',')[0];\r\n\r\n\t\t\t\tif (freight.startsWith('Frete Retirada') && !gaFreight.includes('Retirada em Loja'))\r\n\t\t\t\t\tgaFreight.push('Retirada em Loja');\r\n\r\n\t\t\t\tif (freight.startsWith('Frete Autoglass Express'))\r\n\t\t\t\t\tgaFreight.push('Autoglass Express');\r\n\r\n\t\t\t\tif (freight.startsWith('Frete PAC'))\r\n\t\t\t\t\tgaFreight.push('PAC');\r\n\r\n\t\t\t\tif (freight.startsWith('Frete Sedex'))\r\n\t\t\t\t\tgaFreight.push('Sedex');\r\n\r\n\t\t\t\tif (freight.startsWith('Frete Transportadora'))\r\n\t\t\t\t\tgaFreight.push('Transportadora');\r\n\r\n\t\t\t\tif (freight.startsWith('Frete Normal'))\r\n\t\t\t\t\tgaFreight.push('Normal');\r\n\t\t\t});\r\n\r\n\t\t\tgaFreight.length > 0\r\n\t\t\t\t? ga('send', 'event', 'busca-ceps', 'encontrado', textCepInput.value + ',' + gaFreight.join(','))\r\n\t\t\t\t: ga('send', 'event', 'busca-ceps', 'nao-encontrado', textCepInput.value);\r\n\r\n\t\t});\r\n\t\tobserverShippingsDiv.observe(shippingsDiv, { attributes: true, childList: true, subtree: true });\r\n\t});\r\n});\r\n\r\nfunction consulteFrete() {\r\n\tlet txtCep = document.getElementById(\"txtCep\");\r\n\ttxtCep.scrollIntoView({ behavior: \"smooth\", block: \"center\" });\r\n\ttxtCep.focus();\r\n\tconsole.log(txtCep);\r\n}\n\n//# sourceURL=webpack:///./src/js/B2C-02-detalhe-produto.dev.js?");

/***/ })

/******/ });