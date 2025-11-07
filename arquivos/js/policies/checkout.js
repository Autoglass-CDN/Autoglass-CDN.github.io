(function () {
  if (!window.vtexjs || !vtexjs.checkout) {
    console.warn("VTEXJS ainda não carregado. Aguardando...");
    window.addEventListener("load", initWhenReady);
  } else {
    initWhenReady();
  }

  function initWhenReady() {
    $(window).on("orderFormUpdated.vtex", function (event, orderForm) {
(function () {
  const testLogs = true;
  let policies;

  $(window).on("orderFormUpdated.vtex", (_, oF) => {
    checkSelectedDeliveryChannel(oF);
    changeSalesChannel(oF);
    // adicionarItensCrossSeling(oF);
  });

  localStorage.setItem("locationChanged", 0);

  ga("create", "UA-133498560-1", "autoglassonline.com", "gaTracker");
  ga(
    "send",
    "event",
    "SalesChannel",
    "script-loaded",
    "Sc setted = " + vtexjs.checkout.orderForm.salesChannel,
    {
      nonInteraction: true,
      // 'hitCallback': function(){
      //     console.log("ga event SalesChannel script-loaded hit");
      // }
    }
  );

  const botaoFinalizaCompra = document.querySelectorAll("#payment-data-submit");
  botaoFinalizaCompra[1].addEventListener("click", () => {
    ga(
      "send",
      "event",
      "SalesChannel",
      "on-payment",
      "Sc setted = " + vtexjs.checkout.orderForm.salesChannel,
      {
        nonInteraction: true,
        // 'hitCallback': function(){
        //     console.log("ga event SalesChannel on-payment hit");
        // }
      }
    );
  });

  const btnFechaPedido = document.querySelector("#cart-to-orderform");

  function selectCreditCardAsPaymentOption() {
    $("#payment-group-creditCardPaymentGroup").click();
  }

  btnFechaPedido.onclick = function () {
    selectCreditCardAsPaymentOption();
  };

  function checkSelectedDeliveryChannel(orderForm) {
    activeDeliveryChannel = localStorage.getItem("activeDeliveryChannel");
    let logisticsInfo = orderForm.shippingData.logisticsInfo;
    const selectedAddresses = orderForm.shippingData.selectedAddresses;
    const hasPickupInPoint = logisticsInfo[0]
      ? logisticsInfo[0].slas.find(
          (sla) => sla.deliveryChannel == "pickup-in-point"
        )
      : false;

    actualSelectedDeliveryChannel = logisticsInfo[0]?.selectedDeliveryChannel;

    if (
      activeDeliveryChannel == "pickup-in-point" &&
      actualSelectedDeliveryChannel != "pickup-in-point" &&
      hasPickupInPoint
    ) {
      logisticsInfo = logisticsInfo.map((item) => {
        item.selectedDeliveryChannel = "pickup-in-point";
        item.selectedSla = hasPickupInPoint.id;
        return item;
      });

      vtexjs.checkout.sendAttachment("shippingData", {
        logisticsInfo,
        selectedAddresses,
      });

      return;
    }
  }

  async function changeSalesChannel(orderForm) {
    if (!orderForm) {
      console.error("OrderForm inválido. \n", orderForm);
      return;
    }

    const actualSalesChannel = orderForm.salesChannel;
    const shippingData = orderForm.shippingData;
    const items = orderForm.items;

    if (testLogs) logEstadoAtual(actualSalesChannel, items);

    const newSalesChannelObject = await determineNewSalesChannel(shippingData);
    if (!newSalesChannelObject) {
      console.error(
        "Houve algum problema ao determinar a nova política a ser aplicada"
      );
      return;
    }

    $("#myplace").text(newSalesChannelObject.Uf);

    const myufCurrent = readCookie("myuf");

    document.cookie = `myuf=${newSalesChannelObject.nome.substr(
      0,
      2
    )}; expires=Sun, 1 Jan 2099 00:00:00 UTC; path=/`;

    //houver cookie VTEXSC sem o ponto no início (no secure), apaga esse cookie.
    document.cookie = "VTEXSC" + `=; Max-Age=-99999999;  path=/`;
    //setar o cookie para www.domain.com e domain.com, evita entrar em loop infinito.
    document.cookie = `VTEXSC=sc=${newSalesChannelObject.salesChannel}; expires=Sun, 1 Jan 2099 00:00:00 UTC;domain=${location.host}; path=/; secure=true`;

    if (testLogs) logNewPolicy(newSalesChannelObject, shippingData);

    //teste
    // await vtexjs.checkout.simulateShipping(shippingData, orderForm.orderFormId, "BRA", newSalesChannelObject.salesChannel)
    //     .done(function(li) {
    //         console.log("\nTeste Simulação:\nDelivery Channel: " + li.logisticsInfo[0].selectedDeliveryChannel + "\nSla: " + li.logisticsInfo[0].selectedSla)
    //     });
    //teste - FIM

    if (newSalesChannelObject.salesChannel != +actualSalesChannel) {
      if (newSalesChannelObject.nome != myufCurrent) {
        localStorage.setItem("locationChanged", 1);
      }

      if (testLogs)
        console.log(
          "Política definida é diferente da atual.\n\nAplicando nova política..."
        );

      startAnimation();

      ga(
        "send",
        "event",
        "SalesChannel",
        "changed",
        "Setting Sc = " + newSalesChannelObject.salesChannel,
        {
          nonInteraction: true,
          // 'hitCallback': function(){
          //     console.log("ga event SalesChannel changed hit");
          // }
        }
      );

      await reAddCartItems(items, newSalesChannelObject);

      if (
        !!$(".vtex-pickup-points-modal-3-x-modalBackdrop.pkpmodal-backdrop")
          .length
      )
        $(".vtex-pickup-points-modal-3-x-closeButton.pkpmodal-close").click();

      finishAnimation();
    } else {
      if (testLogs) console.log("Política desterminada já é a atual");
    }
  }

  async function determineNewSalesChannel(shippingData) {
    const postalCode = shippingData.address?.postalCode;
    if (!policies) {
      policies = await loadPolicies();
    }

    // se não houver CEP definido aplica politica geral do estado definido em outras páginas no cookie 'myuf'
    if (!postalCode) {
      console.error("Cep não encontrado: ", postalCode);
      const myuf = readCookie("myuf");
      const salesChannelObject = policies.generalPolicies.find(
        (sc) => sc.nome === myuf
      );

      return salesChannelObject;
    }

    //recupera informações de logística
    let selectedSla, selectedDeliveryChannel;
    try {
      selectedDeliveryChannel =
        shippingData.logisticsInfo[0].selectedDeliveryChannel; //delivery, pickup-in-point (...)
      selectedSla = shippingData.logisticsInfo[0].selectedSla; //express, autoglass móvel, retirada (...)
    } catch (err) {
      console.error(
        `Falha ao recuperar a entrega escolhida.\n
      selectedSla: ${selectedSla}\n isDelivery: ${selectedDeliveryChannel}\n`,
        err
      );
      return null;
    }

    //se não houver DeliveryChannel definido, provavelmente o CEP digitado com sales channel atual não resultou em nenhuma opção
    if (!selectedDeliveryChannel) {
      if (testLogs) {
        console.log(
          "selectedDeliveryChannel indefinido. Definindo politica geral"
        );
      }

      const salesChannelObject = findSalesChannelByCep(
        policies.generalPolicies,
        postalCode
      );
      return salesChannelObject;
    }

    //verifica se Retire / Instale na Loja ===> CENÁRIO 2
    if (selectedDeliveryChannel == "pickup-in-point") {
      if (selectedSla) {
        const slaInfo = shippingData.logisticsInfo[0].slas.find(
          (sla) => sla.id == selectedSla
        );
        const storeId = slaInfo.pickupStoreInfo.address.addressId;
        const salesChannelObject = findSalesChannelByStore(
          policies.pickupPointsPolicies,
          storeId
        );
        if (salesChannelObject) {
          return salesChannelObject;
        } else {
          if (testLogs)
            console.log("Problema ao recuperar SC de pickup-in-point");
        }
      }
      // implementar
    }

    //se Autoglass Móvel ou Express ===> CENÁRIO 3
    if (
      selectedDeliveryChannel == "delivery" &&
      selectedSla &&
      (selectedSla.match(/autoglass.*?m[oó]vel/gi) ||
        selectedSla.match(/express/gi))
    ) {
      const salesChannelObject = findSalesChannelByCep(
        policies.specialCasePolicies,
        postalCode
      );

      if (salesChannelObject) return salesChannelObject; //se encontrou CEP nos casos especiais aplica a politica correspondente
      //se não, continua execução para aplicação da política de caso geral
    }

    //se Autoglass Rota ===> CENÁRIO 4
    if (
      selectedDeliveryChannel == "delivery" &&
      selectedSla &&
      selectedSla == "Autoglass Rota"
    ) {
      const salesChannelObject = findSalesChannelByCep(
        policies.routePolicies,
        postalCode
      );

      if (salesChannelObject) return salesChannelObject;
    }

    //se chegou aqui, não entrou em nenhum caso especial acima, então busca e retorna política de caso geral
    //CENÁRIO 5

    const salesChannelObject = findSalesChannelByCep(
      policies.generalPolicies,
      postalCode
    );
    if (salesChannelObject) {
      return salesChannelObject;
    } else {
      if (testLogs)
        console.log("CEP não encontrado no range de politicas de caso geral");
      return null;
    }
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function findSalesChannelByCep(policiesArray, cep) {
    var cleanCep = parseInt(cep.replace(/\D+/g, ""));
    var city = policiesArray?.find(
      (cd) => cleanCep >= cd.cMin && cleanCep <= cd.cMax
    );

    if (city) {
      // Se o cep estiver no range, o valor da variável cidade será a primeira cidade que fez match com a expressão usada no método `find`
      return city;
    }
  }

  function findSalesChannelByStore(policiesArray, storeId) {
    var policy = policiesArray.find((pol) => pol.Unidade == storeId);

    if (policy) {
      // Se o cep estiver no range, o valor da variável cidade será a primeira cidade que fez match com a expressão usada no método `find`
      return policy;
    }
  }

  async function reAddCartItems(items, salesChannelObject) {
    return await vtexjs.checkout.addToCart(
      items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        seller: item.seller,
      })),
      null,
      salesChannelObject.salesChannel
    );
  }

  function logEstadoAtual(actualSalesChannel, items) {
    let log = "Sales channel atual no orderForm: " + actualSalesChannel + "\n";
    log += "Produtos:\n";
    log += items
      .map(
        (item) => `${item.refId} - R$ ${(item.price / 100).toLocaleString()}`
      )
      .join("\n");
    console.log(log);
  }

  function logNewPolicy(newSalesChannelObject, shippingData) {
    selectedDeliveryChannel =
      shippingData.logisticsInfo[0]?.selectedDeliveryChannel; //delivery, pickup-in-point (...)
    selectedSla = shippingData.logisticsInfo[0]?.selectedSla; //express, autoglass móvel, retirada (...)

    let log = "Política determinada:\n\nLogística:\n";
    log += "Cep: " + shippingData.address?.postalCode;
    log +=
      "\nSc: " +
      newSalesChannelObject.salesChannel +
      " - " +
      newSalesChannelObject.Unidade;
    log += "\nEstado: " + newSalesChannelObject.Uf;
    log += "\nDelivery Channel: " + selectedDeliveryChannel;
    log += "\nSla: " + selectedSla;

    console.log(log);
  }

  function startAnimation() {
    $(".summary-template-holder").css("opacity", 0);
    $(".cart-template-holder").css("opacity", 0);
  }

  function finishAnimation() {
    $(".summary-template-holder").css("opacity", 1);
    $(".cart-template-holder").css("opacity", 1);
  }

  async function loadPolicies() {
    return fetch(
      "https://autoglass-cdn.github.io/arquivos/js/policies/policies.json"
    )
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  const changeButtonStyle = "change-button-style";
  const parentClassNameRemove = "undefined delivery-group-content";
  const changeButtonStyleText = "Veja os horários disponíveis";
  const mutationObserverShipping = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach(function (removed_node) {
        if (removed_node.className == parentClassNameRemove) {
          $("#shipping-data").removeClass(changeButtonStyle);
        }
      });
      mutation.addedNodes.forEach(function (added_node) {
        if (added_node.innerText == changeButtonStyleText) {
          $("#shipping-data").addClass(changeButtonStyle);
        } else if (added_node.id == "alterar-pickup-btn") {
          $("#shipping-data").removeClass(changeButtonStyle);
        }
      });
    });
  });

  mutationObserverShipping.observe($("#shipping-data")[0], {
    subtree: true,
    childList: true,
  });

  function onlyProceedIfAdult() {
    const profileId = "#client-profile-data";
    const checkboxId = "opt-in-adulthood";
    const goToShippingButton = $("#go-to-shipping");
    const classBlockShipping = "blocked";
    const classHighlightCheckbox = "highlight";

    const adult = Object.create({
      yes: () => {
        goToShippingButton.removeClass(classBlockShipping);
        $(`#${checkboxId}`).parent().removeClass(classHighlightCheckbox);
      },
      no: () => {
        goToShippingButton.addClass(classBlockShipping);
        $(`#${checkboxId}`).parent().addClass(classHighlightCheckbox);
      },
    });

    goToShippingButton.addClass(classBlockShipping);

    $(profileId).on("change", `#${checkboxId}`, function () {
      updateAdulthood(this.checked);
    });

    function updateAdulthood(isAdult) {
      isAdult ? adult.yes() : adult.no();
    }

    if (window.location.hash.endsWith("profile"))
      $("body").one("click", function () {
        const isCheckboxChecked = document.getElementById(checkboxId).checked;
        updateAdulthood(isCheckboxChecked);
        window.removeEventListener();
      });
  }

  window.addEventListener("popstate", function () {
    let currentPage = location.href.split("/").pop();
    if (currentPage == "profile") onlyProceedIfAdult();
  });
})();
});
  }
})();