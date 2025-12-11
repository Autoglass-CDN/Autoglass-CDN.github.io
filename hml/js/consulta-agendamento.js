(function () {
  if (!window.vtexjs || !vtexjs.checkout) {
    console.warn("VTEXJS ainda não carregado. Aguardando...");
    window.addEventListener("load", initWhenReady);
  } else {
    initWhenReady();
  }

  function initWhenReady() {
    $(window).on("orderFormUpdated.vtex", function (event, orderForm) {
var codCidades = {
  SE: { code: "8529", nome: "Sergipe" },
  TO: { code: "9654", nome: "Tocantins" },
  // RO: { code: "76803888", nome: "Rond\u00f4nia" },
  // RR: { code: "69300000", nome: "Roraima" },
  // AC: { code: "69922000", nome: "Acre" },
  // AP: { code: "68950000", nome: "Amap\u00e1" },
  BA: { code: "981", nome: "Bahia" },
  ES: { code: "1974", nome: "Esp\u00edrito Santo" },
  DF: { code: "1730", nome: "Distrito Federal" },
  RS: { code: "7778", nome: "Rio Grande do Sul" },
  RJ: { code: "6808", nome: "Rio de Janeiro" },
  MT: { code: "4282", nome: "Mato Grosso" },
  PR: { code: "5916", nome: "Paran\u00e1" },
  MS: { code: "4079", nome: "Mato Grosso do Sul" },
  GO: { code: "2015", nome: "Goi\u00e1s" },
  AL: { code: "107", nome: "Alagoas" },
  CE: { code: "1320", nome: "Cear\u00e1" },
  PA: { code: "4499", nome: "Par\u00e1" },
  RN: { code: "7040", nome: "Rio Grande do Norte" },
  SC: { code: "8269", nome: "Santa Catarina" },
  MA: { code: "2533", nome: "Maranh\u00e3o" },
  PI: { code: "5647", nome: "Piau\u00ed" },
  MG: { code: "3631", nome: "Minas Gerais" },
  PB: { code: "4823", nome: "Para\u00edba" },
  AM: { code: "240", nome: "Amazonas" },
  PE: { code: "5229", nome: "Pernambuco" },
  SP: { code: "9423", nome: "S\u00e3o Paulo" },
};

// const baseUrlApiAgenda = window.location.href.includes("dev")
//     ? "https://api-hml.autoglass.com.br/integracao-b2c/api/web-app/agendamentos"
//     : "https://api.autoglass.com.br/integracao-b2c/api/web-app/agendamentos";
// PARA TESTE LOCAL:
const baseUrlApiAgenda = "http://localhost:5010/integracao-b2c/api/web-app/agendamentos";

// Instale na Loja
$(function () {
  const hmlCodServico = "17";
  let estado = codCidades[$.cookie("myuf")];

  let codCidade = null;
  if(estado != null){
    codCidade = estado.code;
  }

  if (window.location.href.includes("checkout")) {
    if (window.location.search.includes('og=')) {
      let orderId = window.location.search.split('=')[1];

      vtexjs.checkout.getOrders(orderId).then((orders) => {
        loadAvailableStores(orders[0]);
      });
    }

    $(window).on("orderFormUpdated.vtex", async (_, order) => {
      await loadAvailableStores(order);
    });
  }

  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);

  $(".secao-agendamento > .filter > .data input").datepicker({
    dateFormat: "dd/mm/yy",
    dayNames: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
      "Domingo",
    ],
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S", "D"],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    minDate: tomorrow,
    beforeShowDay: (data) => {
      return [!data.toDateString().includes("Sun")];
    },
    onSelect: async () => {
      const orderForm = vtexjs.checkout.orderForm;
      const datas = await getDeliveriesEstimates(
        orderForm.shippingData.address.postalCode,
        orderForm.shippingData.logisticsInfo,
        orderForm.items
      );
      recuperarHorarios(datas);
    },
  });

  $(".secao-agendamento > .filter > .data input").datepicker(
    "setDate",
    tomorrow
  );

  $("#btn-alterar-local-instalacao").click(function () {
    $(".mz-install__close--button").click();
    $("#btn-alterar-open-modal").click();
  });

  const address = JSON.parse(localStorage.getItem("AG_AddressSelected"));

  if (address) {
    let isCheckout = window.location.href.includes("/checkout");
    let ufDefinedByTop = +localStorage.getItem("ufDefinedByTop");

    if (!isCheckout && ufDefinedByTop) {
      $(".secao-agendamento > .store-list > ul").html(`
        <div>
          <p>Por favor, informe um CEP para visualizar as lojas mais próximas</p>
        </div>
      `);
    } else {
      let items;

      if (
        typeof vtexjs !== "undefined" &&
        vtexjs.checkout &&
        vtexjs.checkout.orderForm &&
        vtexjs.checkout.orderForm.items
      ) {
        items = vtexjs.checkout.orderForm.items;
      }

      if(items) {
        getDeliveriesEstimates(address.postalCode, address.logisticsInfo, items).then(
          (datas) => {
            setMinDateDatepicker(datas);
            recuperarHorarios(datas);
          }
        );
      }
      else {
        vtexjs.checkout.getOrderForm().then(orderForm => {
          items = orderForm.items;
          }).then(
            getDeliveriesEstimates(address.postalCode, address.logisticsInfo, items).then(
              (datas) => {
                setMinDateDatepicker(datas);
                recuperarHorarios(datas);
              }
            )
          );
      }
    }
  } else {
    // Evento lançado pelo componente de cep
    $(window).on("cep-finish-load", async (e) => {
      const orderForm = e.originalEvent.detail;
      const datas = await getDeliveriesEstimates(
        orderForm.shippingData.address.postalCode,
        orderForm.shippingData.logisticsInfo,
        orderForm.items
      );
      setMinDateDatepicker(datas);
      recuperarHorarios(datas);
    });
  }

  // Evento lançado pelo componente de cep
  $(window).on("cep-updated", async (e) => {
    const orderForm = e.originalEvent.detail;
    const datas = await getDeliveriesEstimates(
      orderForm.shippingData.address.postalCode,
      orderForm.shippingData.logisticsInfo,
      orderForm.items
    );
    setMinDateDatepicker(datas);
    recuperarHorarios(datas);
  });

  async function loadAvailableStores(order) {
    if (order.shippingData.address && order.shippingData.address.state) {
      estado = codCidades[order.shippingData.address.state];
      codCidade = estado.code || null;

      $(".store").remove();

      const datas = await getDeliveriesEstimates(
        order.shippingData.address.postalCode,
        order.shippingData.logisticsInfo,
        order.items
      );
      setMinDateDatepicker(datas);
      recuperarHorarios(datas);
    }
  }

  recuperarHorarios();

  function retornaMenorDataPickUpPoint(slas){
    let pickupInPointDates = slas
    .filter((sla) => sla.Tipo === "pickup-in-point")
    .map((item) => new Date(item.Data))
    .filter((date) => !isNaN(date));

    let minimalDate = new Date(Math.min(...pickupInPointDates));

    return minimalDate;
  }

  function setMinDateDatepicker(datas) {
    let minDate;

    minDate = datas && datas.length ? retornaMenorDataPickUpPoint(datas) : tomorrow;

    $(".secao-agendamento > .filter > .data input").datepicker(
      "option",
      "minDate",
      minDate
    );

    $(".secao-agendamento > .filter > .data input").datepicker("refresh");

    $(".secao-agendamento > .filter > .data input").datepicker(
      "setDate",
      minDate
    );
  }
 function listaProdutosCarrinhos(itemsVtex){
   let itensCarrinho = "" ;
    itemsVtex.forEach(item => {
      itensCarrinho = `${itensCarrinho}&IdProdutos=${(parseInt(item.productRefId))}`;
    });
    return itensCarrinho;
  }

  function recuperarHorarios(slas) {

    function formatarData(dataAmericana) {
      const data = new Date(dataAmericana);
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      return `${dia}/${mes}/${ano}`;
    }

    function converterParaData(dateStr) {
      const [dia, mes, ano] = dateStr.split('/');
      return new Date(`${ano}-${mes}-${dia}`);
    }

    let itensCarrinho = listaProdutosCarrinhos(vtexjs.checkout.orderForm.items);

    $.ajax({
      method: "GET",
      url: `${baseUrlApiAgenda}/horarios-lojas?Data=${$(".secao-agendamento .data input")
          .datepicker("getDate")
          .toISOString()
          .split("T")[0]
        }&CodigoServico=${hmlCodServico}&CodigoCidade=${codCidade}&Qt=30&Pg=1${itensCarrinho}`,
    })
      .done(function (data) {
        limpaModalInstaleLoja();

        pickupPoints = slas
          .filter((sla) => sla.Tipo === "pickup-in-point")
          .map((pickupPoint) => {
            pickupPoint.store = data.Registros.reduce((finalStore, store) => {
              if (
                store.Nome.indexOf(
                  pickupPoint.DadosPickupPoint.address.addressId
                ) > -1
              ){
                const hasAvailableTime = store.Horarios.some(
                  (horario) => horario.Disponibilidade === "Sim"
                  );
      
                if (hasAvailableTime) {
                  
                  finalStore = store;
                }
              }
              return finalStore;
            }, null);
            return pickupPoint;
          })
          .map((pickupPoint) => {
            let dataInput = $("#alterar-data-input").val();
            let dataInputDate = converterParaData(dataInput);
            let dataSlaDate = formatarData(pickupPoint.Data);
            dataSlaDate = converterParaData(dataSlaDate);

            if (dataSlaDate > dataInputDate) {
              pickupPoint.infoDate = "Agendamento disponível a partir do dia: " + formatarData(pickupPoint.Data);
            }else {
              pickupPoint.infoDate = "";
            }
            return pickupPoint;
          });

        if (pickupPoints.length == 0) {
          $(".secao-agendamento > .store-list > ul").append(noStoreAvailable());
          return;
        }

        $(".secao-agendamento .qtd").text(
          `Lojas próximas: ${pickupPoints.length}`
        );

        let storeList = [];
        horariosDisponiveisGeral = false;

        pickupPoints.forEach(function (pickupPoint) {
          const store = populateStore(pickupPoint);
          storeList = store ? storeList.concat(store) : storeList;
        });

        if (!horariosDisponiveisGeral) {
          $(".secao-agendamento > .store-list > ul").append(noTimeAvailable());
        } else {
          $(".secao-agendamento > .store-list > ul").append(
            storeList.join("\n")
          );

        if ($('.mz-install__info').length === 0){
          $(".secao-agendamento").append(
            `
            <div class="mz-install__info">
              <div class="mz-info__list">
                <ul>
                  <li>
                    No atendimento, será realizada uma análise pelo técnico e <b>caso haja necessidade de troca de borrachas ou sensores</b>, o valor será cobrado na loja.
                  </li>
                  <li>
                    &nbsp;Dúvidas? <a href="#" onclick="zE('webWidget', 'open'); return false;"><u>Clique aqui</u></a> e fale com a gente pelo chat.
                  </li>
                </ul>
              </div>
            </div>
            `
          );
        }
      }

        $(".timestamp").click(function (e) {
          if (window.location.href.includes("checkout")) {
            $("body").removeClass("mz-bo-on mz-as-on mz-il-on");
          }

          $(".mz-install__button--buy").click((e) => e.preventDefault());

          const loja = $(this).attr("data-store");
          const codigoLoja = (loja.split(' '))[2];
          const enderecoLoja = $('.store-list #' + codigoLoja + ' .pickup__info-address .address-location').text();
          const cidadeLoja = $('.store-list #' + codigoLoja + ' .pickup__info-address .pickup__info-city').text();
          const cep = $(this).attr("data-cep");
          const lojaBeauty = $(this).attr("data-friendly-name");
          const horario = $(this).html();
          const orderFormId = vtexjs.checkout.orderForm.orderFormId;
          const date = $(".secao-agendamento .data input")
            .datepicker("getDate")
            .toISOString()
            .split("T")[0];
          const date_formated = $(".secao-agendamento .data input")
            .datepicker("getDate")
            .toLocaleDateString();
          // .split("T")[0];

          const agendamentoData = {
            loja: loja,
            lojaBeauty: lojaBeauty,
            horario: horario,
            date: date,
            cepLoja: cep,
            orderFormId: orderFormId,
            _createAt: Date.now(),
            enderecoLoja: enderecoLoja,
            cidadeLoja: cidadeLoja
          };
          
          localStorage.setItem("AG_SelectedHour", JSON.stringify(agendamentoData));
          
          fetch(`${baseUrlApiAgenda}/lojas`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(agendamentoData)
          })
          .catch(error => console.error("Erro ao enviar agendamento:", error));

          $(".pickup-install .time .time-list button").removeClass("selected");
          $(e.srcElement).addClass("selected");

          $(
            ".modal-instale-na-loja > .secao-agendamento > .selected-msg b"
          ).text(lojaBeauty + " - " + date_formated + " - " + horario);
          $(
            ".modal-instale-na-loja > .secao-agendamento > .to-select-msg"
          ).hide();
          $(
            ".modal-instale-na-loja > .secao-agendamento > .selected-msg"
          ).show();
          vtexjs.checkout
            .calculateShipping({
              postalCode: cep,
              country: "BRA",
              addressType: "search",
            })
            .then((order) => {
              if ((Date.now() - getLastTimeWhildshieldVanePopUpWasShown()) < calculatesTwelveHours()){
                forceChangeShipping(order);
                $(".mz-install__button--buy").unbind("click");
              }
            });
        });
      })
      .fail(() =>
        {
          limpaModalInstaleLoja();
          $(".secao-agendamento > .store-list > ul").append(noTimeAvailable());
        }
      );

      function getLastTimeWhildshieldVanePopUpWasShown() {
        return Number (localStorage.getItem('lastTimeWhildshieldVanePopUpWasShown'));
      }

      function calculatesTwelveHours() {
        return 12*60*60*1000;
      }

    // $(".store-info .btn-ver-horarios:not(.danger)").click(function () {
    // 	$(this).parent().next().toggleClass("hidden");
    // });
  }

  function limpaModalInstaleLoja() {
    $(".modal-instale-na-loja .store-list .pickup-install").remove();
    $(".modal-instale-na-loja .store-list .mz-install__info").remove();
    $(".modal-instale-na-loja .store-list #sem-lojas").remove();
    $(".secao-agendamento > .store-list > ul").html("");

    $(".modal-instale-na-loja > .secao-agendamento > .selected-msg b").text("");
    $(".modal-instale-na-loja > .secao-agendamento > .selected-msg").hide();
    $(".modal-instale-na-loja > .secao-agendamento > .to-select-msg").show();
  }

  function contemParabrisa() {
    let temParabrisa = false;
    if (window.location.href.includes("checkout")) {
      let itensCarrinho = vtexjs.checkout.orderForm.items;
      itensCarrinho.forEach(function(item) {
        if (ehParabrisa(item)) temParabrisa = true;
      });
    } else {
      const produtoDetalhes = skuJson_0;
      if (ehParabrisa(produtoDetalhes)) temParabrisa = true;
    }
    return temParabrisa;
  }

  function ehParabrisa(product) {
    return product.name.startsWith("Parabrisa");
  }

  function populateStore(pickupPoint) {
    const store = pickupPoint.store;
    const dadosEndereco = pickupPoint.DadosPickupPoint.address;

    if (!store) return null;

    if(contemParabrisa()) {
      removeUltimoHorario(store)
    }

    function removeUltimoHorario(store) {
      const horarioLimiteTarde = 17;
      const horarioLimiteManha = 11;
      const quantidadeDeHorarios = Number(store.Horarios.length);
      const ultimoHorario = store.Horarios[quantidadeDeHorarios - 1].HoraInicial.split("T");
      if(ultimoHorario[1].startsWith(horarioLimiteTarde) || ultimoHorario[1].startsWith(horarioLimiteManha))
        store.Horarios.pop();
    }

    let { horariosDisponiveisLoja, timeStampList } = createTimestampList(
      store.Horarios,
      `${store.Nome} | ${store.Bairro}`,
      store.Cep,
      pickupPoint.DadosPickupPoint.friendlyName
    );


    return `
			<div id="${dadosEndereco.addressId
      }" class="${horariosDisponiveisLoja ? "" : "card-horarios-indisponiveis"} pickup pickup-install">
      ${pickupPoint.infoDate ? `<div class="pickup-install-availability"><p class="availability-text">${pickupPoint.infoDate}</p></div>` : ''}
				<div class="pickup__info">
					<div class="pickup__info-distance">
						<svg class="pkpmodal-pickup-point-best-marker-image" width="25" height="32" viewBox="0 0 25 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M19.4917 22.3169L19.4918 22.3169L19.4967 22.3096C19.5843 22.1782 19.6709 22.0485 19.7564 21.9204C22.0478 18.4883 23.5645 16.2165 23.5645 12.5323C23.5645 6.16317 18.4013 1 12.0323 1C5.66317 1 0.5 6.16317 0.5 12.5323C0.5 16.5417 3.05396 20.5158 5.20313 23.2599C6.56216 24.9952 9.21424 28.1986 11.703 30.3763L12.0323 30.6644L12.3615 30.3763C14.8402 28.2075 16.7075 26.3386 19.4917 22.3169Z" fill="#2D78F6" stroke="white"></path>
							<path d="M18.6968 9.73418L14.6509 9.14642L12.8407 5.48019C12.5239 4.83994 11.4759 4.83994 11.159 5.48019L9.3498 9.14642L5.30298 9.73418C4.53711 9.84573 4.22682 10.7906 4.78365 11.3344L7.71213 14.1878L7.02126 18.2178C6.89096 18.9808 7.69338 19.5667 8.38145 19.2058L11.9999 17.3038L15.6192 19.2068C16.3017 19.5639 17.1107 18.9874 16.9794 18.2187L16.2885 14.1888L19.217 11.3353C19.7729 10.7906 19.4626 9.84573 18.6968 9.73418Z" fill="white"></path>
						</svg>
						<p>${pickupPoint.Distancia.toFixed(1)} km</p>
					</div>
					<div class="pickup__info-address">
						<div class="address-title">
							<b>${pickupPoint.DadosPickupPoint.friendlyName}</b>
						</div>
						<p class="address-location">
							${dadosEndereco.street} ${dadosEndereco.number},

						</p>
						<p class="pickup__info-city">${dadosEndereco.neighborhood
            } - ${dadosEndereco.city} - ${dadosEndereco.state}</p>
					</div>
				</div>
				${!pickupPoint.infoDate ? `
          <div class="time">
            ${store ? timeStampList.join("\n") : '<p class="texto-horarios-indisponiveis"> Horários indisponíveis para esta data <p>'}
          </div>
        ` : ''}
			</div>
      `;

  }

  function createTimestampList(horarios, store, cep, friendlyName) {
    let horariosDisponiveisLoja = false;
    let horariosArray = [];
    if (horarios.length) {
      horariosArray = horarios.map(function (horario) {
        let timestamp = new Date(horario.HoraInicial);
        if (horario.Disponibilidade.Value !== "Nao") {
          horariosDisponiveisLoja = true;
          horariosDisponiveisGeral = true;
          return `<button data-store="${store}" data-cep="${cep}" data-friendly-name="${friendlyName}" class="timestamp">
            ${timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}</button>`;
        } else {
          return "";
        }
      });
    }

    let timeStampList = horariosDisponiveisLoja
      ? ['<p>Horários:</p><div class="time-list">']
        .concat(horariosArray)
        .concat("</div>")
      : [].concat(
        '<p class="texto-horarios-indisponiveis"> Horários indisponíveis para esta data <p>'
      );
    return { horariosDisponiveisLoja, timeStampList };
  }

  function noTimeAvailable() {
    return `<div id="sem-lojas" style="
			min-height: 100px;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;">
			<p style="text-align: center;">
        Não encontramos loja para esta data, por favor selecione outra data.
			</p>
			<h4 style="text-align: center; font-weight: normal;">
        Qualquer dúvida,
          <span style="font-weight: bold;">
            <a onclick="$zopim.livechat.window.show()"> clique aqui </a>
          </span>
        e fale com a gente pelo chat.
			</h4>
		</div>`;
  }

  function noStoreAvailable() {
    return `<div id="sem-lojas-proximas" style="
			min-height: 50px;
			<h4 style="text-align: center;">
        Não encontramos lojas próximas à região informada.
			</h4>
		</div>`;
  }

  function forceChangeShipping(orderForm) {
    const newSelectedAddresses = [
      orderForm.shippingData.availableAddresses[
      orderForm.shippingData.availableAddresses.length - 1
      ],
    ];
    const logistic = orderForm.shippingData.logisticsInfo[0];

    if (logistic) {
      const slas = logistic.slas.filter(
        (x) => x.deliveryChannel === "pickup-in-point"
      );
      const logisticsInfo = orderForm.shippingData.logisticsInfo.map((x) => {
        return {
          addressId: newSelectedAddresses[0].addressId,
          itemIndex: x.itemIndex,
          selectedDeliveryChannel: "pickup-in-point",
          selectedSla: slas[0].id,
        };
      });

      fetch(
        `/api/checkout/pub/orderForm/${orderForm.orderFormId}/attachments/shippingData`,
        {
          method: "post",
          body: JSON.stringify({
            clearAddressIfPostalCodeNotFound: false,
            expectedOrderFormSections: ["shippingData"],
            selectedAddresses: newSelectedAddresses,
            logisticsInfo,
          }),
        }
      )
        .then((res) => res.json())
        .then((x) => {
          vtexjs.checkout.sendAttachment("shippingData", {
            selectedAddresses: newSelectedAddresses,
            logisticsInfo,
          });
        });
    }
  }
});

// Instale em Casa
$(function () {
  let event = new Event("datepicker_carregado");
  let AvailableDays;
  let isLoading = false;
  let minDate = new Date();
  minDate.setDate(minDate.getDate() + 2);
  let maxDate = new Date();
  maxDate = new Date(minDate.getFullYear(), minDate.getMonth() + 2, 0);

  $(".mz-advantages__content .cep  input").mask("99999-999").val("");

  $("#mostrar-datas-datepicker").datepicker({
    dateFormat: "dd/mm/yy",
    showAnim: "slideDown",
    numberOfMonths: $(document).width() < 650 ? 1 : 2,
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    minDate,
    maxDate,
    onSelect: (selectedDay, infos) => {
      localStorage.setItem(
        "AG_SelectedDaySM",
        JSON.stringify({
          selectedDay,
          infos,
          _createAt: Date.now(),
        })
      );

      $(".preview-data").first().fadeOut(500, () => {
        $(".preview-data b").first().html(selectedDay);
        $(".preview-data").fadeIn(500);
      });

      $.get("/").then();
    },
    beforeShowDay: validadeAvailableDays,
  });

  $("#input-cep-btn").click(function (ev) {
    Carregar($("#cep-input").val());
  });

  // Evento lançado pelo componente de cep
  $(window).on("cep-updated", async (e) => {
    const orderForm = e.originalEvent.detail;
    const dates = await getDeliveriesEstimates(
      orderForm.shippingData.address.postalCode,
      orderForm.shippingData.logisticsInfo,
      orderForm.items
    );
    setDateDatepicker(dates);
    Carregar(orderForm.shippingData.address.postalCode);
  });

  function setDateDatepicker(datas) {
    const minDate = datas.find(
      (x) =>
        x.Nome.trim().toLocaleLowerCase() ===
        "Autoglass Móvel".trim().toLocaleLowerCase()
    );

    if(minDate) {
      maxDate = new Date(
        minDate.Data.getFullYear(),
        minDate.Data.getMonth() + 2,
        0
      );

      $("#mostrar-datas-datepicker").datepicker("option", "maxDate", maxDate);
      $("#mostrar-datas-datepicker").datepicker(
        "option",
        "minDate",
        minDate.Data
      );
    } else {
      console.log("Falha ao setar data");
    }
  }

  async function Carregar(cep) {
    $("#aviso-servico-movel").hide();
    $(".preview-data").hide();

    if (cep && !isLoading) {
      isLoading = true;
      $(".datas-disponiveis").show();
      $(".loading-dates").show();
      $("#mostrar-datas-datepicker").css("height", "0px");

      const request = {
        Cep: cep,
        DataInicio: minDate.toISOString().split("T")[0],
        DataFim: maxDate.toISOString().split("T")[0],
        Carrinho: [],
        TipoDocumento: "Venda",
        TipoServico: "Instalacao",
        Qt: 100,
      };

      // skuJson only exists on Produtc Detail Page
      if (window.skuJson) {
        request.Carrinho.push({
          CodigoProduto: +window.skuJson.name.match(/\d+$/)[0],
          Quantidade: 1,
        });
      } else {
        let order;

        if (window.location.href.includes("orderPlaced")) {
          // Only will work on Confirmation
          order = await getOrderForm();
        } else {
          order = await vtexjs.checkout.getOrderForm();
        }

        request.Carrinho = order.items
          .filter((item) => item.additionalInfo.brandId !== "2000108")
          .map((item) => ({
            CodigoProduto: +item.productRefId,
            Quantidade: 1,
          }));
      }

      try {
        const response = await getAvailableDays(request);

        AvailableDays = response.Registros.map((x) => ({
          ...x,
          DataRoteiro: new Date(x.DataRoteiro),
        }));

        if (
          response.Registros.filter((x) => x.Disponivel === false).length ===
          response.Registros.length
        ) {
          $("#aviso-servico-movel").show().html(`
							Instalação em Casa indisponível para sua região. Tente alterar o CEP ou
							<a onclick="$zopim.livechat.window.show()"><b> clique aqui </b></a>
							e fale com a gente pelo chat.
						`);
          $(".mz-advantages__button--buy").addClass('disabled');
        } else {
          $("#mostrar-datas-datepicker").datepicker("setDate", minDate);
          $("#mostrar-datas-datepicker").datepicker("refresh");
          $("a.ui-state-active").removeClass("ui-state-active");
          $("a.ui-state-hover").removeClass("ui-state-hover");
          $("#mostrar-datas-datepicker").css("height", "270px");
          $(".mz-advantages__button--buy").removeClass('disabled');
        }
      } catch (err) {
        let message;
        $(".mz-advantages__button--buy").addClass('disabled');

        switch (err.status) {
          case 400:
            message = JSON.parse(err.responseText).Message;
            break;
          default:
            message =
              "Não encontramos atendimento para este CEP. Mas procure a gente no chat para te ajudar!";
            break;
        }

        $("#aviso-servico-movel").show().html(message);
      } finally {
        isLoading = false;
        $(".loading-dates").hide();
      }
    }
  }

  window.dispatchEvent(event);

  function getAvailableDays(request) {
    return new Promise((resolve, reject) => {
      $.ajax({
        contentType: "application/json",
        crossDomain: true,
        jsonp: false,
        type: "POST",
        url: `${baseUrlApiAgenda}/servicos-moveis/disponibilidades`,
        data: JSON.stringify(request),
        success: function (data) {
          resolve(data);
        },
        error: function (error) {
          reject(error);
        },
      });
    });
  }

  function getOrderForm() {
    return new Promise((resolve, reject) => {
      $.ajax({
        jsonp: false,
        url: `/api/checkout/pub/orders/${$("#order-id").text().trim()}`,
        contentType: "application/json",
        type: "GET",
        success: function (data) {
          resolve(data);
        },
        error: function (error) {
          reject(error);
        },
      });
    });
  }

  function validadeAvailableDays(date) {
    const isSunday = date.toDateString().includes("Sun");
    const isSaturday = date.toDateString().includes("Sat");

    if (isSunday || isSaturday) {
      return [false];
    }

    if (AvailableDays) {
      const day = AvailableDays.find(
        (x) => x.DataRoteiro.toLocaleDateString() === date.toLocaleDateString()
      );

      if (day) {
        return day.Disponivel ? [true] : [false];
      }
    }

    return [false];
  }
});

async function getDeliveriesEstimates(postalCode, logistics, items) {
  const isConfirmationPage = location.href.includes("orderPlaced");
  const isCheckoutPage = location.href.includes("checkout");
  const hasCartItems = items && items.length;

  const buildSimulationItems = (items) =>
    items.map((i) => ({
      quantity: i.quantity,
      seller: i.seller,
      id: i.id,
    }));

  let simulationItems = [];

  try {
    if (isConfirmationPage && hasCartItems) {
      const orderForm = await $.get(
        `/api/checkout/pub/orders/${$("#order-id").text().trim()}`
      );
      simulationItems = buildSimulationItems(orderForm.items);
    } else if (isCheckoutPage && hasCartItems) {
      simulationItems = buildSimulationItems(items);
    } else {
      // 12685 -> Produto de Instalação
      const installmentProduct = await vtexjs.catalog.getProductWithVariations(
        12685
      );
      const currentProduct =
        await vtexjs.catalog.getCurrentProductWithVariations();

      simulationItems = [
        {
          quantity: 1,
          seller: currentProduct.skus[0].sellerId,
          id: currentProduct.skus[0].sku,
        },
        {
          quantity: 1,
          seller: installmentProduct.skus[0].sellerId,
          id: installmentProduct.skus[0].sku,
        },
      ];
    }

    let vtexsc = readCookie("VTEXSC").replace("sc=", "");

    const { logisticsInfo } = await $.ajax({
      type: "POST",
      url: `/api/checkout/pub/orderForms/simulation?sc=${vtexsc}`,
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({
        country: "BRA",
        items: simulationItems,
        postalCode,
      }),
    });

    const logistic =
      logisticsInfo && logisticsInfo.length ? logisticsInfo[0] : logistics[0];

    if (logistic) {
      const slas = logistic.slas.map((sla) => {
        const estimate = sla.shippingEstimate;
        const numberOfDays = +estimate.replace("bd", "");

        const today = new Date();

        const shippingEstimate = addBusinessDays(today,numberOfDays);

        return {
          Data: shippingEstimate,
          Nome: sla.id,
          Tipo: sla.deliveryChannel,
          DadosPickupPoint: sla.pickupStoreInfo,
          Distancia: sla.pickupDistance,
        };
      });

      return slas;
    }
  } catch (ex) {
    console.error("Falha ao calcular o tempo de entrega!", ex);
    return new Date();
  }
}

function addBusinessDays (date, addDays) {
  date = skipWeekends(date);
  while (!!addDays){
    date = getNextBusinessDay(date);
    addDays--;
  }
  return new Date(date);
}

function getNextBusinessDay(date) {
  date = addDay(date, 1);
  date = skipWeekends(date);
  return date;
}

function skipWeekends(date){
  while(isWeekend(date)) {
    date = addDay(date, 1);
  }
  return date;
}

function isWeekend(date) {
  const currentDay = date.getDay();
  return currentDay == 6 || currentDay == 0;
}

function addDay (date, days) {
  return new Date(date.setDate(date.getDate()+days));
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }

  console.error("Não foi possível recuprar cookie VTEXSC'\n");
  return null;
}
});
  }
})();