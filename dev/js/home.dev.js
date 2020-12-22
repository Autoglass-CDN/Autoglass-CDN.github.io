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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/home.dev.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/home.dev.js":
/*!****************************!*\
  !*** ./src/js/home.dev.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//#region Banners\r\n(function () {\r\n\tlet position = 0;\r\n\tconst btnPrev = $('.banners-section .banners button[data-type=\"prev\"]');\r\n\tconst btnNext = $('.banners-section .banners button[data-type=\"next\"]');\r\n\tconst containers = $('.banners-section .banners-content');\r\n\tlet bannerContainer = window.innerWidth > 1200 ? $(containers[0]) : $(containers[1]);\r\n\tlet bannerImages = bannerContainer.children();\r\n\r\n\tbuildBars();\r\n\tcalculateMarginOfBtns();\r\n\r\n\twindow.addEventListener('resize', e => {\r\n\t\tbannerContainer = window.innerWidth > 1200 ? $(containers[0]) : $(containers[1]);\r\n\t\tbannerImages = bannerContainer.children();\r\n\r\n\t\t$('.banners-bars').html('');\r\n\t\tbuildBars();\r\n\t\tcalculateMarginOfBtns();\r\n\t});\r\n\r\n\t$('.banners-section .banners-content a').attr('tabindex', '-1');\r\n\r\n\tconst interval = setInterval(() => {\r\n\t\tbannerContainer[0].scrollBy(150, 0);\r\n\r\n\t\tif ((bannerImages.length - 1) === position) {\r\n\t\t\tbannerContainer[0].scrollBy(-bannerContainer[0].scrollWidth, 0);\r\n\t\t\tposition = 0;\r\n\t\t} else {\r\n\t\t\tposition++;\r\n\t\t}\r\n\r\n\t\tchangeBarActive(position);\r\n\t}, 10000)\r\n\r\n\tbtnPrev.click(() => {\r\n\t\tbannerContainer[0].scrollBy(-150, 0);\r\n\t\tif (getScrollPercentage() === 0) {\r\n\t\t\tbannerContainer[0].scrollBy(bannerContainer[0].scrollWidth, 0);\r\n\t\t\tposition = (bannerImages.length - 1);\r\n\t\t} else {\r\n\t\t\tif (position >= 0)\r\n\t\t\t\tposition--;\r\n\t\t}\r\n\r\n\t\tchangeBarActive(position);\r\n\t\tclearInterval(interval);\r\n\t});\r\n\r\n\tbtnNext.click(() => {\r\n\t\tbannerContainer[0].scrollBy(150, 0);\r\n\r\n\t\tif (getScrollPercentage() >= 95) {\r\n\t\t\tbannerContainer[0].scrollBy(-bannerContainer[0].scrollWidth, 0);\r\n\t\t\tposition = 0;\r\n\t\t} else {\r\n\t\t\tif (position < bannerImages.length)\r\n\t\t\t\tposition++;\r\n\t\t}\r\n\r\n\t\tchangeBarActive(position);\r\n\t\tclearInterval(interval);\r\n\t});\r\n\r\n\tfunction buildBars() {\r\n\t\tbannerImages.each((index, element) => {\r\n\t\t\t$('.banners-bars').append(`<li id=\"${index}\"></li>`);\r\n\t\t});\r\n\r\n\t\t$('.banners-bars li').click((e) => {\r\n\t\t\tbannerContainer.scrollLeft(e.target.id * $(window).width());\r\n\t\t\tchangeBarActive(e.target.id);\r\n\t\t\tclearInterval(interval);\r\n\t\t});\r\n\r\n\t\t$('.banners-bars li').first().addClass('active');\r\n\t}\r\n\r\n\tfunction changeBarActive(index) {\r\n\t\tif (index > -1 && index < bannerImages.length) {\r\n\t\t\t$('.banners-bars li').removeClass('active');\r\n\r\n\t\t\t$($('.banners-bars li')[index]).addClass('active');\r\n\t\t}\r\n\t}\r\n\r\n\tfunction getScrollPercentage() {\r\n\t\treturn 100 * bannerContainer[0].scrollLeft\r\n\t\t\t/ (bannerContainer[0].scrollWidth - bannerContainer[0].clientWidth);\r\n\t}\r\n\r\n\tfunction calculateMarginOfBtns() {\r\n\t\tconst distance = (window.innerWidth - $('.smart-select__main')[0].offsetWidth) / 2;\r\n\r\n\t\tbtnPrev.css('left', distance);\r\n\t\tbtnNext.css('right', distance);\r\n\t}\r\n})();\r\n//#endregion Banners\r\n\r\n//#region Benefits\r\n(function () {\r\n\tconst benefitsContainer = $('.benefits-section .container');\r\n\tconst benefits = $('.benefits-section .container .benefit');\r\n\r\n\tconst interval = setInterval(() => {\r\n\t\tconst scrollPercentage = calculateScrollPercentage();\r\n\t\tif (scrollPercentage >= 99) {\r\n\t\t\tbenefitsContainer[0].scrollBy(-benefitsContainer[0].scrollWidth, 0);\r\n\t\t} else {\r\n\t\t\tbenefitsContainer[0].scrollBy(150, 0);\r\n\t\t}\r\n\t}, 5000)\r\n\r\n\tbenefitsContainer.on('wheel', event => {\r\n\t\tevent.preventDefault();\r\n\t\tconst { deltaY, target } = event.originalEvent;\r\n\r\n\t\tif (deltaY > 0) {\r\n\t\t\ttarget.scrollBy(150, 0)\r\n\t\t} else {\r\n\t\t\ttarget.scrollBy(-150, 0)\r\n\t\t}\r\n\r\n\t\tclearInterval(interval);\r\n\t});\r\n\r\n\tbenefitsContainer.scroll(() => {\r\n\t\tconst percentItem = 100 / benefits.length;\r\n\t\tconst scrollPercentage = calculateScrollPercentage();\r\n\r\n\t\tbenefits.each((index, element) => {\r\n\t\t\tconst up = percentItem * (index + 1);\r\n\t\t\tconst down = percentItem * index;\r\n\r\n\t\t\t$(element).removeClass('focus');\r\n\r\n\t\t\tif (scrollPercentage >= down && scrollPercentage <= up) {\r\n\t\t\t\t$(element).addClass('focus');\r\n\t\t\t}\r\n\t\t});\r\n\r\n\t\tclearInterval(interval);\r\n\t});\r\n\r\n\tfunction calculateScrollPercentage() {\r\n\t\treturn 100 * benefitsContainer[0].scrollLeft\r\n\t\t\t/ (benefitsContainer[0].scrollWidth - benefitsContainer[0].clientWidth);\r\n\t}\r\n})();\r\n//#endregion Benefits\r\n\r\n//#region Retings\r\n(function () {\r\n\tlet position = 1;\r\n\tconst btnPrev = $('.ratings-section .ratings__slider button[data-type=\"prev\"]');\r\n\tconst btnNext = $('.ratings-section .ratings__slider button[data-type=\"next\"]');\r\n\tconst ratingContainer = $('.ratings-section .ratings__slider-content');\r\n\tconst ratingBoxs = ratingContainer.children();\r\n\r\n\tconst CONFIG = {\r\n\t\tCSS: {\r\n\t\t\tHIGHLIGHT: 'highlight',\r\n\t\t},\r\n\t\tWINDOW: {\r\n\t\t\tBREAK_POINT: 1050\r\n\t\t}\r\n\t}\r\n\r\n\tconst interval = setInterval(() => {\r\n\t\tif (position === (ratingBoxs.length - 1)) {\r\n\t\t\tposition = 0;\r\n\t\t} else {\r\n\t\t\tposition++;\r\n\t\t}\r\n\r\n\t\tchangeHighlight(position);\r\n\t\tchangeBarActive(position);\r\n\t}, 10000)\r\n\r\n\t//Reset\r\n\tbuildBars();\r\n\tshowOnlyRatingAroundHighlight();\r\n\r\n\tbtnPrev.click(() => {\r\n\t\tif (position === 0) {\r\n\t\t\tposition = (ratingBoxs.length - 1);\r\n\t\t} else {\r\n\t\t\tposition--;\r\n\t\t}\r\n\r\n\t\tclearInterval(interval);\r\n\t\tchangeHighlight(position);\r\n\t\tchangeBarActive(position);\r\n\t});\r\n\r\n\tbtnNext.click(() => {\r\n\t\tif (position === (ratingBoxs.length - 1)) {\r\n\t\t\tposition = 0;\r\n\t\t} else {\r\n\t\t\tposition++;\r\n\t\t}\r\n\r\n\t\tclearInterval(interval);\r\n\t\tchangeHighlight(position);\r\n\t\tchangeBarActive(position);\r\n\t});\r\n\r\n\tratingBoxs.click(e => {\r\n\t\tconst i = ratingBoxs.index(e.currentTarget);\r\n\t\tposition = i;\r\n\r\n\t\tclearInterval(interval);\r\n\t\tchangeHighlight(position);\r\n\t\tchangeBarActive(position);\r\n\t});\r\n\r\n\tfunction showOnlyRatingAroundHighlight() {\r\n\t\tlet next = position + 1;\r\n\t\tlet prev = position - 1;\r\n\r\n\t\tif (position === 0) {\r\n\t\t\tprev = 0;\r\n\t\t\tnext = 2;\r\n\t\t}\r\n\r\n\t\tif (position === (ratingBoxs.length - 1)) {\r\n\t\t\tprev = position - 2;\r\n\t\t\tnext = (ratingBoxs.length - 1);\r\n\t\t}\r\n\r\n\t\tratingBoxs.each((index, element) => {\r\n\t\t\t$(element).hide();\r\n\r\n\t\t\tif (!(index < prev || index > next)) {\r\n\t\t\t\t$(element).css(\"display\", \"flex\").fadeIn('slow');\r\n\t\t\t}\r\n\t\t});\r\n\t}\r\n\r\n\tfunction changeHighlight(index) {\r\n\t\tratingBoxs.removeClass(CONFIG.CSS.HIGHLIGHT);\r\n\r\n\t\t$(ratingBoxs[index]).addClass(CONFIG.CSS.HIGHLIGHT);\r\n\r\n\t\tshowOnlyRatingAroundHighlight();\r\n\t}\r\n\r\n\tfunction buildBars() {\r\n\t\tratingBoxs.each((index, element) => {\r\n\t\t\t$('.ratings-section .rating-bars').append(`<li id=\"${index}\"></li>`);\r\n\t\t});\r\n\r\n\t\t$('.ratings-section .rating-bars li').click((e) => {\r\n\t\t\tposition = +e.target.id;\r\n\t\t\tchangeHighlight(position);\r\n\t\t\tchangeBarActive(position);\r\n\t\t});\r\n\r\n\t\t$('.ratings-section .rating-bars li')\r\n\t\t\t.filter((i) => i === position)\r\n\t\t\t.addClass('active');\r\n\t}\r\n\r\n\tfunction changeBarActive(index) {\r\n\t\tif (index > -1 && index < ratingBoxs.length) {\r\n\t\t\t$('.ratings-section .rating-bars li').removeClass('active');\r\n\r\n\t\t\t$($('.ratings-section .rating-bars li')[index]).addClass('active');\r\n\t\t}\r\n\t}\r\n})();\r\n//#endregion Retings\r\n\n\n//# sourceURL=webpack:///./src/js/home.dev.js?");

/***/ })

/******/ });