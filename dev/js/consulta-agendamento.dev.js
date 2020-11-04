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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/consulta-agendamento.dev.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/consulta-agendamento.dev.js":
/*!********************************************!*\
  !*** ./src/js/consulta-agendamento.dev.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var codCidades = {\r\n  SE: { code: \"8529\", nome: \"Sergipe\" },\r\n  TO: { code: \"9654\", nome: \"Tocantins\" },\r\n  // RO: { code: \"76803888\", nome: \"Rond\\u00f4nia\" },\r\n  // RR: { code: \"69300000\", nome: \"Roraima\" },\r\n  // AC: { code: \"69922000\", nome: \"Acre\" },\r\n  // AP: { code: \"68950000\", nome: \"Amap\\u00e1\" },\r\n  BA: { code: \"981\", nome: \"Bahia\" },\r\n  ES: { code: \"1974\", nome: \"Esp\\u00edrito Santo\" },\r\n  DF: { code: \"1730\", nome: \"Distrito Federal\" },\r\n  RS: { code: \"7778\", nome: \"Rio Grande do Sul\" },\r\n  RJ: { code: \"6808\", nome: \"Rio de Janeiro\" },\r\n  MT: { code: \"4282\", nome: \"Mato Grosso\" },\r\n  PR: { code: \"5916\", nome: \"Paran\\u00e1\" },\r\n  MS: { code: \"4079\", nome: \"Mato Grosso do Sul\" },\r\n  GO: { code: \"2015\", nome: \"Goi\\u00e1s\" },\r\n  AL: { code: \"107\", nome: \"Alagoas\" },\r\n  CE: { code: \"1320\", nome: \"Cear\\u00e1\" },\r\n  PA: { code: \"4499\", nome: \"Par\\u00e1\" },\r\n  RN: { code: \"7040\", nome: \"Rio Grande do Norte\" },\r\n  SC: { code: \"8269\", nome: \"Santa Catarina\" },\r\n  MA: { code: \"2533\", nome: \"Maranh\\u00e3o\" },\r\n  PI: { code: \"5647\", nome: \"Piau\\u00ed\" },\r\n  MG: { code: \"3631\", nome: \"Minas Gerais\" },\r\n  PB: { code: \"4823\", nome: \"Para\\u00edba\" },\r\n  AM: { code: \"240\", nome: \"Amazonas\" },\r\n  PE: { code: \"5229\", nome: \"Pernambuco\" },\r\n  SP: { code: \"9423\", nome: \"S\\u00e3o Paulo\" },\r\n};\r\n\r\n// Instale na Loja\r\n$(function () {\r\n  const hmlCodServico = \"17\";\r\n  const baseUrlApi = window.location.href.includes(\"dev\")\r\n    ? \"https://api-hml.autoglass.com.br/integracao-b2c/api/web-app/agendamentos\"\r\n    : \"https://api.autoglass.com.br/integracao-b2c/api/web-app/agendamentos\";\r\n  let estado = codCidades[$.cookie(\"mzLocationUF\")];\r\n  let codCidade = estado.code || null;\r\n\r\n  $(window).on('orderFormUpdated.vtex', (_, order) => {\r\n    if (order.shippingData.address.state) {\r\n      estado = codCidades[order.shippingData.address.state];\r\n      codCidade = estado.code || null;\r\n\r\n      $('.store').remove();\r\n\r\n      recuperarHorarios();\r\n    }\r\n  });\r\n\r\n  let tomorrow = new Date();\r\n  tomorrow.setDate(tomorrow.getDate() + 1);\r\n\r\n  $(\".secao-agendamento > .store-list > .filter > .data input\").datepicker({\r\n    dateFormat: \"dd/mm/yy\",\r\n    dayNames: [\r\n      \"Domingo\",\r\n      \"Segunda\",\r\n      \"Terça\",\r\n      \"Quarta\",\r\n      \"Quinta\",\r\n      \"Sexta\",\r\n      \"Sábado\",\r\n      \"Domingo\",\r\n    ],\r\n    dayNamesMin: [\"D\", \"S\", \"T\", \"Q\", \"Q\", \"S\", \"S\", \"D\"],\r\n    dayNamesShort: [\"Dom\", \"Seg\", \"Ter\", \"Qua\", \"Qui\", \"Sex\", \"Sáb\", \"Dom\"],\r\n    monthNames: [\r\n      \"Janeiro\",\r\n      \"Fevereiro\",\r\n      \"Março\",\r\n      \"Abril\",\r\n      \"Maio\",\r\n      \"Junho\",\r\n      \"Julho\",\r\n      \"Agosto\",\r\n      \"Setembro\",\r\n      \"Outubro\",\r\n      \"Novembro\",\r\n      \"Dezembro\",\r\n    ],\r\n    monthNamesShort: [\r\n      \"Jan\",\r\n      \"Fev\",\r\n      \"Mar\",\r\n      \"Abr\",\r\n      \"Mai\",\r\n      \"Jun\",\r\n      \"Jul\",\r\n      \"Ago\",\r\n      \"Set\",\r\n      \"Out\",\r\n      \"Nov\",\r\n      \"Dez\",\r\n    ],\r\n    minDate: tomorrow,\r\n    beforeShowDay: (data) => {\r\n      return [!data.toDateString().includes(\"Sun\")];\r\n    },\r\n    onSelect: () => {\r\n      $(\".secao-agendamento > .store-list .store\").remove();\r\n      $(\".secao-agendamento > .store-list #sem-lojas\").remove();\r\n      recuperarHorarios();\r\n    },\r\n  });\r\n  $(\".secao-agendamento > .store-list > .filter > .data input\").datepicker(\r\n    \"setDate\",\r\n    tomorrow\r\n  );\r\n\r\n  $(\"#btn-alterar-local-instalacao\").click(function () {\r\n    $(\".mz-install__close--button\").click();\r\n    $(\"#btn-alterar-open-modal\").click();\r\n  });\r\n\r\n  recuperarHorarios();\r\n\r\n  function recuperarHorarios() {\r\n    $.ajax({\r\n      method: \"GET\",\r\n      url: `${baseUrlApi}/horarios-lojas?Data=${$(\".secao-agendamento .data input\")\r\n        .datepicker(\"getDate\")\r\n        .toISOString()\r\n        .split(\"T\")[0]\r\n        }&CodigoServico=${hmlCodServico}&CodigoCidade=${codCidade}`,\r\n    })\r\n      .done(function (data) {\r\n        $(\".secao-agendamento .qtd\").text(`Lojas encontradas: ${data.Total}`);\r\n        if (data.Total === 0)\r\n          $(\".secao-agendamento > .store-list\").append(noTimeAvailable());\r\n\r\n        data.Registros.forEach(function (store, index) {\r\n          $(\".secao-agendamento > .store-list\").append(populateStore(store));\r\n          if (data.Registros.length - 1 === index) {\r\n            console.log(\"ultima iteração\");\r\n            $(\".store-info .btn-ver-horarios:not(.danger)\").click(function () {\r\n              $(this).parent().next().toggleClass(\"hidden\");\r\n            });\r\n          }\r\n        });\r\n\r\n        $('.timestamp').click(function () {\r\n          const loja = $(this).attr('data-store');\r\n          const cep = $(this).attr('data-cep');\r\n          const horario = $(this).html();\r\n          const date = $(\".secao-agendamento .data input\")\r\n            .datepicker(\"getDate\")\r\n            .toISOString()\r\n            .split(\"T\")[0];\r\n\r\n          localStorage.setItem('AG_SelectedHour', JSON.stringify({\r\n            loja,\r\n            horario,\r\n            date,\r\n            _createAt: Date.now()\r\n          }));\r\n\r\n          vtexjs.checkout.calculateShipping({\r\n            postalCode: cep,\r\n            country: 'BRA',\r\n            addressType: 'search'\r\n          }).then((order) => { forceChangeShipping(order) });\r\n\r\n          let event = new Event('AppointmentSelected.AG');\r\n\r\n          window.dispatchEvent(event);\r\n        });\r\n      })\r\n      .fail(() =>\r\n        $(\".secao-agendamento > .store-list\").append(noTimeAvailable())\r\n      );\r\n\r\n    $(\".store-info .btn-ver-horarios:not(.danger)\").click(function () {\r\n      $(this).parent().next().toggleClass(\"hidden\");\r\n    });\r\n  }\r\n\r\n  function populateStore(store) {\r\n    return `<div class=\"store\">\r\n\t\t<div class=\"store-info\">\r\n\t\t  <div class=\"aside\">\r\n\t\t\t<h5 class=\"store-name\">\r\n\t\t\t  ${store.Nome} | ${store.Bairro}\r\n\t\t\t</h5>\r\n\t\t\t<p class=\"address\">\r\n\t\t\t  ${store.Logradouro.toLowerCase()}, ${store.Bairro.toLowerCase()}, ${store.Cidade.toLowerCase()}, \r\n\t\t\t  ${store.NumeroResidencial}, ${store.UF}, ${store.Cep}\r\n\t\t\t</p>\r\n\t\t  </div>\r\n\t\t  <button class=\"btn-ver-horarios ${store.Horarios.filter((h) => h.Disponibilidade.Value !== \"Nao\").length >\r\n        0\r\n        ? \"\"\r\n        : \"danger\"\r\n      }\">${store.Horarios.filter((h) => h.Disponibilidade.Value !== \"Nao\").length > 0 ? \"Ver horários\" : \"Horários indisponíveis\"}</button>\r\n\t\t</div>\r\n\t\t<div class=\"time hidden\">\r\n\t\t  <p>Horários:</p>\r\n\t\t  <div class=\"time-list\">\r\n\t\t\t${createTimestampList(store.Horarios, store.Codigo, store.Cep).join(\"\\n\")}\r\n\t\t  </div>\r\n\t\t</div>\r\n\t  </div>`;\r\n  }\r\n\r\n  function createTimestampList(horarios, codigoStore, cep) {\r\n    return horarios.map(function (horario) {\r\n      let timestamp = new Date(horario.HoraInicial);\r\n      return horario.Disponibilidade.Value !== \"Nao\"\r\n        ? `<button data-store=\"${codigoStore}\" data-cep=\"${cep}\" class=\"timestamp\">${timestamp.toLocaleTimeString([], {\r\n          hour: \"2-digit\",\r\n          minute: \"2-digit\",\r\n        })}</button>`\r\n        : \"\";\r\n    });\r\n  }\r\n\r\n  function noTimeAvailable() {\r\n    return `<div id=\"sem-lojas\" style=\"\r\n      min-height: 100px;\r\n      display: flex;\r\n      flex-direction: column;\r\n      justify-content: space-evenly;\">\r\n      <p style=\"text-align: center;\">\r\n        Não encontramos horários de instalação disponíveis para essa data.\r\n      </p>\r\n      <small style=\"text-align: center;\">\r\n        Por favor, tente outras datas ou fale com nossos consultores no chat.\r\n      </small>\r\n    </div>`;\r\n  }\r\n\r\n  function forceChangeShipping(orderForm) {\r\n    const newSelectedAddresses = [orderForm.shippingData.availableAddresses[orderForm.shippingData.availableAddresses.length - 1]];\r\n    const slas = orderForm.shippingData.logisticsInfo[0].slas.filter(x => x.deliveryChannel === 'pickup-in-point');\r\n    const logisticsInfo = orderForm.shippingData.logisticsInfo.map(x => {\r\n      return {\r\n        addressId: newSelectedAddresses[0].addressId,\r\n        itemIndex: x.itemIndex,\r\n        selectedDeleveryChannel: 'pickup-in-point',\r\n        selectedSla: slas[0].id\r\n      }\r\n    });\r\n\r\n    fetch(`/api/checkout/pub/orderForm/${orderForm.orderFormId}/attachments/shippingData`, {\r\n      method: 'post',\r\n      body: JSON.stringify({\r\n        clearAddressIfPostalCodeNotFound: false,\r\n        expectedOrderFormSections: ['shippingData'],\r\n        selectedAddresses: newSelectedAddresses,\r\n        logisticsInfo\r\n      })\r\n    }).then(res => res.json()).then(x => {\r\n      vtexjs.checkout.sendAttachment('shippingData', {\r\n        selectedAddresses: newSelectedAddresses,\r\n        logisticsInfo\r\n      });\r\n    });\r\n  }\r\n});\r\n\r\n// Instale em Casa\r\n$(function () {\r\n  const baseUrlApi = window.location.href.includes(\"dev\")\r\n    ? \"https://api-hml.autoglass.com.br/integracao-b2c/api/web-app/\"\r\n    : \"https://api.autoglass.com.br/integracao-b2c/api/web-app/\";\r\n\r\n  let event = new Event('datepicker_carregado');\r\n\r\n  let AvailableDays;\r\n  let isLoading = false;\r\n\r\n  let minDate = new Date();\r\n  minDate.setDate(minDate.getDate() + 1);\r\n  let maxDate = new Date();\r\n  maxDate = new Date(maxDate.getFullYear(), minDate.getMonth() + 2, 0);\r\n\r\n  $('.mz-advantages__content .cep  input').mask('99999-999');\r\n\r\n  $('#mostrar-datas-datepicker').datepicker({\r\n    dateFormat: \"dd/mm/yy\",\r\n    showAnim: 'slideDown',\r\n    numberOfMonths: $(document).width() < 650 ? 1 : 2,\r\n    dayNamesMin: [\"D\", \"S\", \"T\", \"Q\", \"Q\", \"S\", \"S\"],\r\n    monthNames: [\r\n      \"Janeiro\",\r\n      \"Fevereiro\",\r\n      \"Março\",\r\n      \"Abril\",\r\n      \"Maio\",\r\n      \"Junho\",\r\n      \"Julho\",\r\n      \"Agosto\",\r\n      \"Setembro\",\r\n      \"Outubro\",\r\n      \"Novembro\",\r\n      \"Dezembro\",\r\n    ],\r\n    minDate,\r\n    maxDate,\r\n    onSelect: (selectedDay, infos) => {\r\n      localStorage.setItem('AG_SelectedDaySM', JSON.stringify({\r\n        selectedDay,\r\n        infos,\r\n        _createAt: Date.now()\r\n      }));\r\n    },\r\n    beforeShowDay: validadeAvailableDays\r\n  });\r\n\r\n  $('#input-cep-btn').click(async (e) => {\r\n    $('#aviso-servico-movel').hide();\r\n    e.preventDefault();\r\n    const cep = $('#cep-input').val();\r\n\r\n    if (!cep) {\r\n      alert('O CEP deve ser informado.');\r\n      return;\r\n    } else if (cep && !isLoading) {\r\n      isLoading = true;\r\n      $('#input-cep-btn').attr('disabled', true);\r\n      $('.datas-disponiveis').show();\r\n      $('.loading-dates').show();\r\n      $('#mostrar-datas-datepicker').css('height', '0px');\r\n\r\n      await vtexjs.checkout.calculateShipping({\r\n        postalCode: cep,\r\n        country: 'BRA',\r\n        addressType: 'search'\r\n      });\r\n\r\n      await vtexjs.checkout.calculateShipping({\r\n        postalCode: cep,\r\n        country: 'BRA',\r\n        addressType: 'residential'\r\n      });\r\n\r\n      const request = {\r\n        Cep: cep,\r\n        DataInicio: minDate.toISOString().split(\"T\")[0],\r\n        DataFim: maxDate.toISOString().split(\"T\")[0],\r\n        Carrinho: [],\r\n        TipoDocumento: 'Venda',\r\n        TipoServico: 'Instalacao',\r\n        Qt: 100\r\n      }\r\n\r\n      // skuJson only exists on Produtc Detail Page\r\n      if (window.skuJson) {\r\n        request.Carrinho.push(\r\n          {\r\n            CodigoProduto: +window.skuJson.name.match(/\\d+$/)[0],\r\n            Quantidade: 1\r\n          }\r\n        );\r\n      } else {\r\n        let order;\r\n\r\n        if (window.location.href.includes('orderPlaced')) {\r\n          // Only will work on Confirmation\r\n          order = await getOrderForm();\r\n        } else {\r\n          order = await vtexjs.checkout.getOrderForm();\r\n        }\r\n\r\n        request.Carrinho = order.items\r\n          .filter(item => item.additionalInfo.brandId !== \"2000108\")\r\n          .map(item => (\r\n            {\r\n              CodigoProduto: +item.productRefId,\r\n              Quantidade: 1\r\n            }\r\n          ));\r\n      }\r\n\r\n      try {\r\n        const response = await getAvailableDays(request);\r\n\r\n        AvailableDays = response.Registros.map(x => ({\r\n          ...x,\r\n          DataRoteiro: new Date(x.DataRoteiro)\r\n        }));\r\n\r\n        $('#mostrar-datas-datepicker').datepicker('setDate', minDate);\r\n        $('#mostrar-datas-datepicker').datepicker('refresh');\r\n\r\n        $('#mostrar-datas-datepicker').css('height', '228px');\r\n      } catch (err) {\r\n        let message;\r\n\r\n        switch (err.status) {\r\n          case 400:\r\n            message = (JSON.parse(err.responseText)).Message;\r\n            break;\r\n          default:\r\n            message = 'Não encontramos atendimento para este CEP. Mas procure a gente no chat para te ajudar!'\r\n            break;\r\n        }\r\n\r\n        $('#aviso-servico-movel')\r\n          .show()\r\n          .html(message);\r\n      } finally {\r\n        isLoading = false;\r\n        $('.loading-dates').hide();\r\n        $('#input-cep-btn').attr('disabled', false);\r\n      }\r\n    }\r\n  });\r\n\r\n  window.dispatchEvent(event);\r\n\r\n  function getAvailableDays(request) {\r\n    return new Promise((resolve, reject) => {\r\n      $.ajax({\r\n        contentType: \"application/json\",\r\n        crossDomain: true,\r\n        jsonp: false,\r\n        type: \"POST\",\r\n        url: `${baseUrlApi}agendamentos/servicos-moveis/disponibilidades`,\r\n        data: JSON.stringify(request),\r\n        success: function (data) {\r\n          resolve(data)\r\n        },\r\n        error: function (error) {\r\n          reject(error)\r\n        },\r\n      });\r\n    });\r\n  }\r\n\r\n  function getOrderForm() {\r\n    return new Promise((resolve, reject) => {\r\n      $.ajax({\r\n        jsonp: false,\r\n        url: `/api/checkout/pub/orders/${$(\"#order-id\").text().trim()}`,\r\n        contentType: \"application/json\",\r\n        type: \"GET\",\r\n        success: function (data) {\r\n          resolve(data)\r\n        },\r\n        error: function (error) {\r\n          reject(error)\r\n        },\r\n      })\r\n    });\r\n  }\r\n\r\n  function validadeAvailableDays(date) {\r\n    const isSunday = date.toDateString().includes(\"Sun\");\r\n    const isSaturday = date.toDateString().includes(\"Sat\");\r\n\r\n    if (isSunday || isSaturday) {\r\n      return [false];\r\n    }\r\n\r\n    if (AvailableDays) {\r\n      const day = AvailableDays.find(x => x.DataRoteiro.toLocaleDateString() === date.toLocaleDateString());\r\n\r\n      if (day) {\r\n        return day.Disponivel ? [true] : [false];\r\n      }\r\n    }\r\n\r\n    return [false];\r\n  }\r\n});\r\n\n\n//# sourceURL=webpack:///./src/js/consulta-agendamento.dev.js?");

/***/ })

/******/ });