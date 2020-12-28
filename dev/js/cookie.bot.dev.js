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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/cookie.bot.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/cookie.bot.js":
/*!******************************!*\
  !*** ./src/js/cookie.bot.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function () {\n    let cookieBannerSliderPos = 0;\n\n    _init();\n\n    function _init() {\n        const beCheckoutConfirmation = location.pathname.includes('orderPlaced');\n        const cookieString = $.cookie('hasAcceptedCookies')\n        const cookie = cookieString ? JSON.parse(cookieString) : null;\n        const baseUrlApi = window.location.href.includes(\"dev\")\n            ? \"https://api-hml.autoglass.com.br/integracao-b2c/api/web-app/master-datas/cookies\"\n            : \"https://api.autoglass.com.br/integracao-b2c/api/web-app/master-datas/cookies\";\n\n        if (!beCheckoutConfirmation) {\n            if (!cookie || (!cookie.accepted)) {\n                $.cookie('hasAcceptedCookies', JSON.stringify({\n                    accepted: false,\n                    createdAt: Date.now()\n                }), { path: '/' });\n\n                renderHtml();\n                showCookieBanner();\n            }\n        } else {\n            $.ajax({\n                type: 'POST',\n                url: baseUrlApi,\n                dataType: 'json',\n                contentType: 'application/json',\n                data: JSON.stringify({\n                    \"CodigoCompra\": $('#order-id').html(),\n                    \"DataAceite\": cookie ? new Date(cookie.acceptedAt) : null\n                }),\n                success: function (res) {\n                    console.log(res);\n                }\n            });\n        }\n    }\n\n    function renderHtml() {\n        $('body').append(`\n            <div id=\"cookiebanner\">\n                <div id=\"c-left\">\n                    <p class=\"c-header\">Protegemos seus dados pessoais</p>\n                    <p class=\"c-message\">\n                        Autoglass protege seus dados pessoais e utiliza cookies para personalizar anúncios e melhorar a sua experiência no site.\n                        Ao continuar navegando, você concorda com a nossa <a href=\"/Institucional/privacidade\" target=\"_blank\">Política de Privacidade</a>\n                    </p>\n                </div>\n                <div id=\"c-right\">\n                    <a id=\"aceitar-cookie-link\" class=\"c-button\">Aceitar e fechar</a>\n                </div>\n                <div style=\"clear:both\"></div>\n            </div>\n        `);\n\n        $('#aceitar-cookie-link').click(acceptCookies)\n    }\n\n    function acceptCookies() {\n        hideCookieBanner();\n\n        const cookie = JSON.parse($.cookie('hasAcceptedCookies'));\n\n        cookie.accepted = true;\n        cookie.acceptedAt = Date.now();\n\n        $.cookie('hasAcceptedCookies', JSON.stringify(cookie), { path: '/' });\n    }\n\n    function showCookieBanner() {\n        const cookiebanner = document.getElementById(\"cookiebanner\");\n        const dialogHeight = parseInt(cookiebanner.offsetHeight);\n\n        cookiebanner.style.bottom = (cookieBannerSliderPos - dialogHeight) + \"px\";\n        cookieBannerSliderPos += 4;\n\n        if (cookieBannerSliderPos < dialogHeight) {\n            setTimeout(function () {\n                showCookieBanner();\n            }, 1);\n        } else {\n            cookieBannerSliderPos = 0;\n            cookiebanner.style.bottom = \"10px\";\n        }\n    }\n\n    function hideCookieBanner() {\n        const cookiebanner = document.getElementById(\"cookiebanner\");\n        cookiebanner.style.cssText = \"display:none !important\";\n    }\n})();\n\n//# sourceURL=webpack:///./src/js/cookie.bot.js?");

/***/ })

/******/ });