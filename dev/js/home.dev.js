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

eval("//#region Banners\n(function () {\n\tlet position = 0;\n\tconst btnPrev = $('.banners-section .banners button[data-type=\"prev\"]');\n\tconst btnNext = $('.banners-section .banners button[data-type=\"next\"]');\n\tconst containers = $('.banners-section .banners-content');\n\tlet bannerContainer = window.innerWidth > 1200 ? $(containers[0]) : $(containers[1]);\n\tlet bannerImages = bannerContainer.children();\n\n\tbuildBars();\n\tcalculateMarginOfBtns();\n\n\twindow.addEventListener('resize', e => {\n\t\tbannerContainer = window.innerWidth > 1200 ? $(containers[0]) : $(containers[1]);\n\t\tbannerImages = bannerContainer.children();\n\n\t\t$('.banners-bars').html('');\n\t\tbuildBars();\n\t\tcalculateMarginOfBtns();\n\t});\n\n\t$('.banners-section .banners-content a').attr('tabindex', '-1');\n\n\tconst interval = setInterval(() => {\n\t\tbannerContainer[0].scrollBy(window.innerWidth, 0);\n\n\t\tif ((bannerImages.length - 1) === position) {\n\t\t\tbannerContainer[0].scrollBy(-bannerContainer[0].scrollWidth, 0);\n\t\t\tposition = 0;\n\t\t} else {\n\t\t\tposition++;\n\t\t}\n\n\t\tchangeBarActive(position);\n\t}, 10000)\n\n\tbtnPrev.click(() => {\n\t\tbannerContainer[0].scrollBy(-window.innerWidth, 0);\n\t\tif (getScrollPercentage() === 0) {\n\t\t\tbannerContainer[0].scrollBy(bannerContainer[0].scrollWidth, 0);\n\t\t\tposition = (bannerImages.length - 1);\n\t\t} else {\n\t\t\tif (position >= 0)\n\t\t\t\tposition--;\n\t\t}\n\n\t\tchangeBarActive(position);\n\t\tclearInterval(interval);\n\t});\n\n\tbtnNext.click(() => {\n\t\tbannerContainer[0].scrollBy(window.innerWidth, 0);\n\n\t\tif (getScrollPercentage() >= 95) {\n\t\t\tbannerContainer[0].scrollBy(-bannerContainer[0].scrollWidth, 0);\n\t\t\tposition = 0;\n\t\t} else {\n\t\t\tif (position < bannerImages.length)\n\t\t\t\tposition++;\n\t\t}\n\n\t\tchangeBarActive(position);\n\t\tclearInterval(interval);\n\t});\n\n\tfunction buildBars() {\n\t\tbannerImages.each((index, element) => {\n\t\t\t$('.banners-bars').append(`<li id=\"${index}\"></li>`);\n\t\t});\n\n\t\t$('.banners-bars li').click((e) => {\n\t\t\tbannerContainer.scrollLeft(e.target.id * $(window).width());\n\t\t\tchangeBarActive(e.target.id);\n\t\t\tclearInterval(interval);\n\t\t});\n\n\t\t$('.banners-bars li').first().addClass('active');\n\t}\n\n\tfunction changeBarActive(index) {\n\t\tif (index > -1 && index < bannerImages.length) {\n\t\t\t$('.banners-bars li').removeClass('active');\n\n\t\t\t$($('.banners-bars li')[index]).addClass('active');\n\t\t}\n\t}\n\n\tfunction getScrollPercentage() {\n\t\treturn 100 * bannerContainer[0].scrollLeft\n\t\t\t/ (bannerContainer[0].scrollWidth - bannerContainer[0].clientWidth);\n\t}\n\n\tfunction calculateMarginOfBtns() {\n\t\tconst distance = (window.innerWidth - $('.smart-select__main')[0].offsetWidth) / 2;\n\n\t\tbtnPrev.css('left', distance);\n\t\tbtnNext.css('right', distance);\n\t}\n})();\n//#endregion Banners\n\n//#region Benefits\n(function () {\n\tconst benefitsContainer = $('.benefits-section .container');\n\tconst benefits = $('.benefits-section .container .benefit');\n\n\tconst interval = setInterval(() => {\n\t\tconst scrollPercentage = calculateScrollPercentage();\n\t\tif (scrollPercentage >= 99) {\n\t\t\tbenefitsContainer[0].scrollBy(-benefitsContainer[0].scrollWidth, 0);\n\t\t} else {\n\t\t\tbenefitsContainer[0].scrollBy(150, 0);\n\t\t}\n\t}, 5000)\n\n\tbenefitsContainer.on('wheel', event => {\n\t\tevent.preventDefault();\n\t\tconst { deltaY, target } = event.originalEvent;\n\n\t\tif (deltaY > 0) {\n\t\t\ttarget.scrollBy(150, 0)\n\t\t} else {\n\t\t\ttarget.scrollBy(-150, 0)\n\t\t}\n\n\t\tclearInterval(interval);\n\t});\n\n\tbenefitsContainer.scroll(() => {\n\t\tconst percentItem = 100 / benefits.length;\n\t\tconst scrollPercentage = calculateScrollPercentage();\n\n\t\tbenefits.each((index, element) => {\n\t\t\tconst up = percentItem * (index + 1);\n\t\t\tconst down = percentItem * index;\n\n\t\t\t$(element).removeClass('focus');\n\n\t\t\tif (scrollPercentage >= down && scrollPercentage <= up) {\n\t\t\t\t$(element).addClass('focus');\n\t\t\t}\n\t\t});\n\n\t\tclearInterval(interval);\n\t});\n\n\tfunction calculateScrollPercentage() {\n\t\treturn 100 * benefitsContainer[0].scrollLeft\n\t\t\t/ (benefitsContainer[0].scrollWidth - benefitsContainer[0].clientWidth);\n\t}\n})();\n//#endregion Benefits\n\n//#region Retings\n(function () {\n\tlet position = 1;\n\tconst btnPrev = $('.ratings-section .ratings__slider button[data-type=\"prev\"]');\n\tconst btnNext = $('.ratings-section .ratings__slider button[data-type=\"next\"]');\n\tconst ratingContainer = $('.ratings-section .ratings__slider-content');\n\tconst ratingBoxs = ratingContainer.children();\n\n\tconst CONFIG = {\n\t\tCSS: {\n\t\t\tHIGHLIGHT: 'highlight',\n\t\t},\n\t\tWINDOW: {\n\t\t\tBREAK_POINT: 1050\n\t\t}\n\t}\n\n\tconst interval = setInterval(() => {\n\t\tif (position === (ratingBoxs.length - 1)) {\n\t\t\tposition = 0;\n\t\t} else {\n\t\t\tposition++;\n\t\t}\n\n\t\tchangeHighlight(position);\n\t\tchangeBarActive(position);\n\t}, 10000)\n\n\t//Reset\n\tbuildBars();\n\tshowOnlyRatingAroundHighlight();\n\n\tbtnPrev.click(() => {\n\t\tif (position === 0) {\n\t\t\tposition = (ratingBoxs.length - 1);\n\t\t} else {\n\t\t\tposition--;\n\t\t}\n\n\t\tclearInterval(interval);\n\t\tchangeHighlight(position);\n\t\tchangeBarActive(position);\n\t});\n\n\tbtnNext.click(() => {\n\t\tif (position === (ratingBoxs.length - 1)) {\n\t\t\tposition = 0;\n\t\t} else {\n\t\t\tposition++;\n\t\t}\n\n\t\tclearInterval(interval);\n\t\tchangeHighlight(position);\n\t\tchangeBarActive(position);\n\t});\n\n\tratingBoxs.click(e => {\n\t\tconst i = ratingBoxs.index(e.currentTarget);\n\t\tposition = i;\n\n\t\tclearInterval(interval);\n\t\tchangeHighlight(position);\n\t\tchangeBarActive(position);\n\t});\n\n\tfunction showOnlyRatingAroundHighlight() {\n\t\tlet next = position + 1;\n\t\tlet prev = position - 1;\n\n\t\tif (position === 0) {\n\t\t\tprev = 0;\n\t\t\tnext = 2;\n\t\t}\n\n\t\tif (position === (ratingBoxs.length - 1)) {\n\t\t\tprev = position - 2;\n\t\t\tnext = (ratingBoxs.length - 1);\n\t\t}\n\n\t\tratingBoxs.each((index, element) => {\n\t\t\t$(element).hide();\n\n\t\t\tif (!(index < prev || index > next)) {\n\t\t\t\t$(element).css(\"display\", \"flex\").fadeIn('slow');\n\t\t\t}\n\t\t});\n\t}\n\n\tfunction changeHighlight(index) {\n\t\tratingBoxs.removeClass(CONFIG.CSS.HIGHLIGHT);\n\n\t\t$(ratingBoxs[index]).addClass(CONFIG.CSS.HIGHLIGHT);\n\n\t\tshowOnlyRatingAroundHighlight();\n\t}\n\n\tfunction buildBars() {\n\t\tratingBoxs.each((index, element) => {\n\t\t\t$('.ratings-section .rating-bars').append(`<li id=\"${index}\"></li>`);\n\t\t});\n\n\t\t$('.ratings-section .rating-bars li').click((e) => {\n\t\t\tposition = +e.target.id;\n\t\t\tchangeHighlight(position);\n\t\t\tchangeBarActive(position);\n\t\t});\n\n\t\t$('.ratings-section .rating-bars li')\n\t\t\t.filter((i) => i === position)\n\t\t\t.addClass('active');\n\t}\n\n\tfunction changeBarActive(index) {\n\t\tif (index > -1 && index < ratingBoxs.length) {\n\t\t\t$('.ratings-section .rating-bars li').removeClass('active');\n\n\t\t\t$($('.ratings-section .rating-bars li')[index]).addClass('active');\n\t\t}\n\t}\n})();\n//#endregion Retings\n\n\n//# sourceURL=webpack:///./src/js/home.dev.js?");

/***/ })

/******/ });