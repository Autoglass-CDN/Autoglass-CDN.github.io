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

// #region Instale na Loja - NOVO
// $(function () {
//   let PICKUP_POINTS = [];

//   const CONFIG = {
//     SERVICE: {
//       COUNTRY: 'BRA',
//       SKU_ID: vtxctx.skus
//     },
//     CSS: {
//       BASE: '.mz-modal-installation',
//       MODAL_LIST: '.store-list ul'
//     }
//   }

//   const hmlCodServico = "17";
//   const baseUrlApi = //window.location.href.includes("dev")
//     //? "https://api-hml.autoglass.com.br/integracao-b2c/api/web-app/agendamentos"
//     //: 
//     "https://api.autoglass.com.br/integracao-b2c/api/web-app/agendamentos";
//   let estado = codCidades[$.cookie("mzLocationUF")];
//   let codCidade = estado.code || null;

//   if (window.location.href.includes('checkout')) {
//     $(window).on('orderFormUpdated.vtex', (_, order) => {
//       if (order.shippingData.address && order.shippingData.address.state) {
//         estado = codCidades[order.shippingData.address.state];
//         codCidade = estado.code || null;

//         $('.store').remove();

//         recuperarHorarios(orderForm.shippingData.address);
//       }
//     });
//   }

//   let tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);

//   $(".secao-agendamento > .store-list > .filter > .data input").datepicker({
//     dateFormat: "dd/mm/yy",
//     dayNames: [
//       "Domingo",
//       "Segunda",
//       "Terça",
//       "Quarta",
//       "Quinta",
//       "Sexta",
//       "Sábado",
//       "Domingo",
//     ],
//     dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S", "D"],
//     dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
//     monthNames: [
//       "Janeiro",
//       "Fevereiro",
//       "Março",
//       "Abril",
//       "Maio",
//       "Junho",
//       "Julho",
//       "Agosto",
//       "Setembro",
//       "Outubro",
//       "Novembro",
//       "Dezembro",
//     ],
//     monthNamesShort: [
//       "Jan",
//       "Fev",
//       "Mar",
//       "Abr",
//       "Mai",
//       "Jun",
//       "Jul",
//       "Ago",
//       "Set",
//       "Out",
//       "Nov",
//       "Dez",
//     ],
//     minDate: tomorrow,
//     beforeShowDay: (data) => {
//       return [!data.toDateString().includes("Sun")];
//     },
//     onSelect: () => {
//       $(".secao-agendamento > .store-list .store").remove();
//       $(".secao-agendamento > .store-list #sem-lojas").remove();
//       const address = JSON.parse(localStorage.getItem('AG_AddressSelected'));
//       if (address)
//         recuperarHorarios(address);
//     },
//   });
//   $(".secao-agendamento > .store-list > .filter > .data input").datepicker(
//     "setDate",
//     tomorrow
//   );

//   $("#btn-alterar-local-instalacao").click(function () {
//     $(".mz-install__close--button").click();
//     $("#btn-alterar-open-modal").click();
//   });

//   _init();

//   function _init() {
//     const address = JSON.parse(localStorage.getItem('AG_AddressSelected'));

//     if (address) {
//       recuperarHorarios(address);
//     } else {
//       // Evento lançado pelo componente de cep
//       $(window).on('cep-finish-load', e => {
//         const orderForm = e.originalEvent.detail;
//         recuperarHorarios(orderForm.shippingData.address);
//       });
//     }

//     // Evento lançado pelo componente de cep
//     $(window).on('cep-updated', e => {
//       const orderForm = e.originalEvent.detail;
//       console.log(orderForm.shippingData.address)
//       recuperarHorarios(orderForm.shippingData.address);
//     })
//   }

//   async function recuperarHorarios(address) {

//     try {
//       let result = await $.ajax({
//         method: "GET",
//         url: `${baseUrlApi}/horarios-lojas?Data=${$(".secao-agendamento .data input")
//           .datepicker("getDate")
//           .toISOString()
//           .split("T")[0]
//           }&CodigoServico=${hmlCodServico}&CodigoCidade=${codCidade}`,
//       });

//       $(".secao-agendamento .qtd").text(`Lojas encontradas: ${result.Total}`);
//       if (result.Total === 0)
//         $(".secao-agendamento > .store-list").append(noTimeAvailable());

//       if (address) {
//         let shippingData = await simulateShipping(address);


//         PICKUP_POINTS = shippingData
//           .logisticsInfo[0]
//           .slas
//           .filter(x => x.deliveryChannel === 'pickup-in-point');

//         $(".secao-agendamento > .store-list").append(`<ul></ul>`);

//         PICKUP_POINTS.forEach((pickupPoint, index) => {
//           let store = result.Registros.find(store => /(PG|MG|RC|SP|NW)[\d]{2,}/g.test(store.Nome));
//           $(".secao-agendamento > .store-list ul").append(`${populateStore(store, pickupPoint)}`);
//         });
//       }


//       async function simulateShipping(address) {
//         const request = {
//           items: [{
//             id: CONFIG.SERVICE.SKU_ID,
//             quantity: 1,
//             seller: 1
//           }],
//           postalCode: address.postalCode,
//           country: CONFIG.SERVICE.COUNTRY
//         };

//         return $.ajax({
//           url: "/api/checkout/pub/orderForms/simulation",
//           type: "POST",
//           dataType: "JSON",
//           contentType: "application/json",
//           data: JSON.stringify(request)
//         });
//       }

//       $('.timestamp').click(function () {
//         $('.pickup').removeClass('selected');
//         $(this).parent('.pickup').addClass('selected');

//         saveSelectedPickupPoint($(this).parents('.pickup').attr('id'));

//         if (window.location.href.includes('checkout')) {
//           $('body').removeClass('mz-bo-on mz-as-on mz-il-on');
//         }

//         $('.mz-install__button--buy').click(e => e.preventDefault());

//         const loja = $(this).attr('data-store');
//         const cep = $(this).attr('data-cep');
//         const horario = $(this).html();
//         const date = $(".secao-agendamento .data input")
//           .datepicker("getDate")
//           .toISOString()
//           .split("T")[0];

//         localStorage.setItem('AG_SelectedHour', JSON.stringify({
//           loja,
//           horario,
//           date,
//           _createAt: Date.now()
//         }));

//         vtexjs.checkout.calculateShipping({
//           postalCode: cep,
//           country: 'BRA',
//           addressType: 'search'
//         }).then((order) => { forceChangeShipping(order); $('.mz-install__button--buy').unbind('click'); });

//         function saveSelectedPickupPoint(id) {
//           const sla = PICKUP_POINTS.find(x => x.pickupStoreInfo.address.addressId === id);

//           localStorage.setItem('AG_SeletedPickupPoint', JSON.stringify(sla));
//           sendCalculateShipping(sla.pickupStoreInfo.address.postalCode, 'search');
//         }
//         function sendCalculateShipping(cep, type) {
//           $('.mz-pickup__button--buy').click(e => e.preventDefault());

//           vtexjs.checkout.calculateShipping({
//             postalCode: cep,
//             country: 'BRA',
//             addressType: type
//           }).then(order => { forceChangeShipping(order); $('.mz-pickup__button--buy').unbind('click'); });
//         }
//       });

//     } catch (error) {
//       console.error(error);
//       $(".secao-agendamento > .store-list").append(noTimeAvailable());
//     }

//     // $.ajax({
//     //   method: "GET",
//     //   url: `${baseUrlApi}/horarios-lojas?Data=${$(".secao-agendamento .data input")
//     //     .datepicker("getDate")
//     //     .toISOString()
//     //     .split("T")[0]
//     //     }&CodigoServico=${hmlCodServico}&CodigoCidade=${codCidade}`,
//     // })
//     //   .done(async function (data) {
//     //     $(".secao-agendamento .qtd").text(`Lojas encontradas: ${data.Total}`);
//     //     if (data.Total === 0)
//     //       $(".secao-agendamento > .store-list").append(noTimeAvailable());

//     //     if (address) {
//     //       let shippingData = await simulateShipping(address);


//     //       PICKUP_POINTS = shippingData
//     //         .logisticsInfo[0]
//     //         .slas
//     //         .filter(x => x.deliveryChannel === 'pickup-in-point');

//     //       $(".secao-agendamento > .store-list").append(`<ul></ul>`);

//     //       PICKUP_POINTS.forEach((pickupPoint, index) => {
//     //         let store = data.Registros.find(store => /(PG|MG|RC|SP|NW)[\d]{2,}/g.test(store.Nome));
//     //         $(".secao-agendamento > .store-list ul").append(`${populateStore(store, pickupPoint)}`);
//     //       });
//     //     }


//     //     async function simulateShipping(address) {
//     //       const request = {
//     //         items: [{
//     //           id: CONFIG.SERVICE.SKU_ID,
//     //           quantity: 1,
//     //           seller: 1
//     //         }],
//     //         postalCode: address.postalCode,
//     //         country: CONFIG.SERVICE.COUNTRY
//     //       };

//     //       return $.ajax({
//     //         url: "/api/checkout/pub/orderForms/simulation",
//     //         type: "POST",
//     //         dataType: "JSON",
//     //         contentType: "application/json",
//     //         data: JSON.stringify(request)
//     //       });
//     //     }

//     //     $('.timestamp').click(function () {
//     //       $('.pickup').removeClass('selected');
//     //       $(this).parent('.pickup').addClass('selected');

//     //       saveSelectedPickupPoint($(this).attr('id'));

//     //       if (window.location.href.includes('checkout')) {
//     //         $('body').removeClass('mz-bo-on mz-as-on mz-il-on');
//     //       }

//     //       $('.mz-install__button--buy').click(e => e.preventDefault());

//     //       const loja = $(this).attr('data-store');
//     //       const cep = $(this).attr('data-cep');
//     //       const horario = $(this).html();
//     //       const date = $(".secao-agendamento .data input")
//     //         .datepicker("getDate")
//     //         .toISOString()
//     //         .split("T")[0];

//     //       localStorage.setItem('AG_SelectedHour', JSON.stringify({
//     //         loja,
//     //         horario,
//     //         date,
//     //         _createAt: Date.now()
//     //       }));

//     //       vtexjs.checkout.calculateShipping({
//     //         postalCode: cep,
//     //         country: 'BRA',
//     //         addressType: 'search'
//     //       }).then((order) => { forceChangeShipping(order); $('.mz-install__button--buy').unbind('click'); });

//     //       function saveSelectedPickupPoint(id) {
//     //         const sla = PICKUP_POINTS.find(x => x.id === id);

//     //         localStorage.setItem('AG_SeletedPickupPoint', JSON.stringify(sla));
//     //         sendCalculateShipping(sla.pickupStoreInfo.address.postalCode, 'search');
//     //       }
//     //     });
//     //   })
//     //   .fail(() =>
//     //     $(".secao-agendamento > .store-list").append(noTimeAvailable())
//     //   );

//     // $(".store-info .btn-ver-horarios:not(.danger)").click(function () {
//     //   $(this).parent().next().toggleClass("hidden");
//     // });
//   }

//   function populateStore(store, { id, shippingEstimate, pickupDistance, pickupStoreInfo }) {
//     return `
// 						<li id="${pickupStoreInfo.address.addressId}" class="pickup">
// 							<div class="pickup__info">
// 								<div class="pickup__info-distance">
// 									<svg class="pkpmodal-pickup-point-best-marker-image" width="25" height="32" viewBox="0 0 25 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.4917 22.3169L19.4918 22.3169L19.4967 22.3096C19.5843 22.1782 19.6709 22.0485 19.7564 21.9204C22.0478 18.4883 23.5645 16.2165 23.5645 12.5323C23.5645 6.16317 18.4013 1 12.0323 1C5.66317 1 0.5 6.16317 0.5 12.5323C0.5 16.5417 3.05396 20.5158 5.20313 23.2599C6.56216 24.9952 9.21424 28.1986 11.703 30.3763L12.0323 30.6644L12.3615 30.3763C14.8402 28.2075 16.7075 26.3386 19.4917 22.3169Z" fill="#2D78F6" stroke="white"></path><path d="M18.6968 9.73418L14.6509 9.14642L12.8407 5.48019C12.5239 4.83994 11.4759 4.83994 11.159 5.48019L9.3498 9.14642L5.30298 9.73418C4.53711 9.84573 4.22682 10.7906 4.78365 11.3344L7.71213 14.1878L7.02126 18.2178C6.89096 18.9808 7.69338 19.5667 8.38145 19.2058L11.9999 17.3038L15.6192 19.2068C16.3017 19.5639 17.1107 18.9874 16.9794 18.2187L16.2885 14.1888L19.217 11.3353C19.7729 10.7906 19.4626 9.84573 18.6968 9.73418Z" fill="white"></path></svg>
// 									<p>${pickupDistance.toFixed(1)} km</p>
// 								</div>
// 								<div class="pickup__info-address">
// 									<div class="address-title">
// 										<b>${pickupStoreInfo.friendlyName}</b>
// 									</div>
// 									<p class="address-location">
// 										${pickupStoreInfo.address.street} ${pickupStoreInfo.address.number},
// 										${pickupStoreInfo.address.complement}
// 									</p>
// 									<p class="pickup__info-city">${pickupStoreInfo.address.neighborhood} - ${pickupStoreInfo.address.city} - ${pickupStoreInfo.address.state}</p>
// 								</div>
// 							</div>
// 							<div class="pickup__estimate">
// 								<span>Grátis</span>
// 								<span>Pronto em até ${calculateTimeEstimate(shippingEstimate)}</span>
//               </div>
//               <div class="time">
//                 <p>Horários:</p>
//                 <div class="time-list">
//                 ${createTimestampList(store.Horarios, `${store.Nome} | ${store.Bairro}`, store.Cep).join("\n")}
//                 </div>
//               </div>
// 						</li>
//             `;
//   }

//   function calculateTimeEstimate(estimate) {
//     const days = +estimate[0];

//     return days + (days > 0 ? ' dias úteis' : ' dia útil');
//   }

//   // function populateStore(store) {
//   //   return `<div class="store">
//   // 	<div class="store-info">
//   // 	  <div class="aside">
//   // 		<h5 class="store-name">
//   // 		  ${store.Nome} | ${store.Bairro}
//   // 		</h5>
//   // 		<p class="address">
//   // 		  ${store.Logradouro.toLowerCase()}, ${store.Bairro.toLowerCase()}, ${store.Cidade.toLowerCase()}, 
//   // 		  ${store.NumeroResidencial}, ${store.UF}, ${store.Cep}
//   // 		</p>
//   // 	  </div>
//   // 	  <button class="btn-ver-horarios ${store.Horarios.filter((h) => h.Disponibilidade.Value !== "Nao").length >
//   //       0
//   //       ? ""
//   //       : "danger"
//   //     }">${store.Horarios.filter((h) => h.Disponibilidade.Value !== "Nao").length > 0 ? "Ver horários" : "Horários indisponíveis"}</button>
//   // 	</div>
//   // 	<div class="time hidden">
//   // 	  <p>Horários:</p>
//   // 	  <div class="time-list">
//   // 		${createTimestampList(store.Horarios, `${store.Nome} | ${store.Bairro}`, store.Cep).join("\n")}
//   // 	  </div>
//   // 	</div>
//   //   </div>`;
//   // }

//   function createTimestampList(horarios, store, cep) {
//     return horarios.map(function (horario) {
//       let timestamp = new Date(horario.HoraInicial);
//       return horario.Disponibilidade.Value !== "Nao"
//         ? `<button data-store="${store}" data-cep="${cep}" class="timestamp">${timestamp.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         })}</button>`
//         : "";
//     });
//   }

//   function noTimeAvailable() {
//     return `<div id="sem-lojas" style="
//       min-height: 100px;
//       display: flex;
//       flex-direction: column;
//       justify-content: space-evenly;">
//       <p style="text-align: center;">
//         Não encontramos horários de instalação disponíveis para essa data.
//       </p>
//       <small style="text-align: center;">
//         Por favor, tente outras datas ou fale com nossos consultores no chat.
//       </small>
//     </div>`;
//   }

//   function forceChangeShipping(orderForm) {
//     const newSelectedAddresses = [orderForm.shippingData.availableAddresses[orderForm.shippingData.availableAddresses.length - 1]];
//     const logistic = orderForm.shippingData.logisticsInfo[0];

//     if (logistic) {
//       const slas = logistic.slas.filter(x => x.deliveryChannel === 'pickup-in-point');
//       const logisticsInfo = orderForm.shippingData.logisticsInfo.map(x => {
//         return {
//           addressId: newSelectedAddresses[0].addressId,
//           itemIndex: x.itemIndex,
//           selectedDeleveryChannel: 'pickup-in-point',
//           selectedSla: slas[0].id
//         }
//       });

//       fetch(`/api/checkout/pub/orderForm/${orderForm.orderFormId}/attachments/shippingData`, {
//         method: 'post',
//         body: JSON.stringify({
//           clearAddressIfPostalCodeNotFound: false,
//           expectedOrderFormSections: ['shippingData'],
//           selectedAddresses: newSelectedAddresses,
//           logisticsInfo
//         })
//       }).then(res => res.json()).then(x => {
//         vtexjs.checkout.sendAttachment('shippingData', {
//           selectedAddresses: newSelectedAddresses,
//           logisticsInfo
//         });
//       });
//     }
//   }
// });
// #endregion Instale na Loja - NOVO

// Instale na Loja
$(function () {
  const hmlCodServico = "17";
  const baseUrlApi = window.location.href.includes("dev")
    ? "https://api-hml.autoglass.com.br/integracao-b2c/api/web-app/agendamentos"
    : "https://api.autoglass.com.br/integracao-b2c/api/web-app/agendamentos";
  let estado = codCidades[$.cookie("myuf")];
  let codCidade = estado.code || null;

  if (window.location.href.includes('checkout')) {
    $(window).on('orderFormUpdated.vtex', async (_, order) => {
      if (order.shippingData.address && order.shippingData.address.state) {
        estado = codCidades[order.shippingData.address.state];
        codCidade = estado.code || null;

        $('.store').remove();

        await estimateDate(order.shippingData.logisticsInfo, order.items);
        recuperarHorarios();
      }
    });
  }

  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  $(".secao-agendamento > .store-list > .filter > .data input").datepicker({
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
    onSelect: () => {
      $(".secao-agendamento > .store-list .store").remove();
      $(".secao-agendamento > .store-list #sem-lojas").remove();
      recuperarHorarios();
    },
  });

  $(".secao-agendamento > .store-list > .filter > .data input").datepicker(
    "setDate",
    tomorrow
  );

  $("#btn-alterar-local-instalacao").click(function () {
    $(".mz-install__close--button").click();
    $("#btn-alterar-open-modal").click();
  });

  const address = JSON.parse(localStorage.getItem('AG_AddressSelected'));

  if (address) {
    estimateDate(address.logisticsInfo).then(recuperarHorarios);
  } else {
    // Evento lançado pelo componente de cep
    $(window).on('cep-finsh-load', async e => {
      const orderForm = e.originalEvent.detail;
      await estimateDate(orderForm.shippingData.logisticsInfo, orderForm.items);
      recuperarHorarios();
    });
  }

  // Evento lançado pelo componente de cep
  $(window).on('cep-updated', async e => {
    const orderForm = e.originalEvent.detail;
    await estimateDate(orderForm.shippingData.logisticsInfo, orderForm.items);
    recuperarHorarios();
  });

  async function estimateDate(logisticsInfo, items) {
    let itemsSimulation = [];

    if (items && items.length) {
      itemsSimulation = items.map(x => ({
        quantity: x.quantity,
        seller: x.seller,
        id: x.id
      }));
    } else {
      const currentProduct = await vtexjs.catalog.getCurrentProductWithVariations();
      // 12685 -> Produto de Instalação
      const installmentProduct = await vtexjs.catalog.getProductWithVariations(12685);

      itemsSimulation = [
        {
          quantity: 1,
          seller: currentProduct.skus[0].sellerId,
          id: currentProduct.skus[0].sku
        },
        {
          quantity: 1,
          seller: installmentProduct.skus[0].sellerId,
          id: installmentProduct.skus[0].sku
        }
      ]
    }

    const res = await $.ajax({
      type: 'POST',
      url: '/api/checkout/pub/orderForms/simulation',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        country: 'BRA',
        items: itemsSimulation,
        postalCode: address.postalCode
      })
    });

    let logistic = res.logisticsInfo && res.logisticsInfo.length ? res.logisticsInfo[0] : logisticsInfo[0];

    if (logistic) {
      let sla = logistic.slas[0];

      if (sla) {
        let estimate = sla.shippingEstimate;
        let numberOfDays = +estimate.replace('bd', '');

        let date = new Date();

        tomorrow.setDate(date.getDate() + numberOfDays);

        $(".secao-agendamento > .store-list > .filter > .data input")
          .datepicker('option', 'minDate', tomorrow);

        $(".secao-agendamento > .store-list > .filter > .data input")
          .datepicker('refresh');

        $(".secao-agendamento > .store-list > .filter > .data input").datepicker(
          "setDate",
          tomorrow
        );
      }
    }
  }

  recuperarHorarios();

  function recuperarHorarios() {
    $.ajax({
      method: "GET",
      url: `${baseUrlApi}/horarios-lojas?Data=${$(".secao-agendamento .data input")
        .datepicker("getDate")
        .toISOString()
        .split("T")[0]
        }&CodigoServico=${hmlCodServico}&CodigoCidade=${codCidade}`,
    })
      .done(function (data) {
        $(".secao-agendamento .qtd").text(`Lojas encontradas: ${data.Total}`);
        if (data.Total === 0)
          $(".secao-agendamento > .store-list").append(noTimeAvailable());

        data.Registros.forEach(function (store, index) {
          $(".secao-agendamento > .store-list").append(populateStore(store));
          if (data.Registros.length - 1 === index) {
            $(".store-info .btn-ver-horarios:not(.danger)").click(function () {
              $(this).parent().next().toggleClass("hidden");
            });
          }
        });

        $('.timestamp').click(function () {
          if (window.location.href.includes('checkout')) {
            $('body').removeClass('mz-bo-on mz-as-on mz-il-on');
          }

          $('.mz-install__button--buy').click(e => e.preventDefault());

          const loja = $(this).attr('data-store');
          const cep = $(this).attr('data-cep');
          const horario = $(this).html();
          const date = $(".secao-agendamento .data input")
            .datepicker("getDate")
            .toISOString()
            .split("T")[0];

          localStorage.setItem('AG_SelectedHour', JSON.stringify({
            loja,
            horario,
            date,
            _createAt: Date.now()
          }));

          vtexjs.checkout.calculateShipping({
            postalCode: cep,
            country: 'BRA',
            addressType: 'search'
          }).then((order) => { forceChangeShipping(order); $('.mz-install__button--buy').unbind('click'); });
        });
      })
      .fail(() =>
        $(".secao-agendamento > .store-list").append(noTimeAvailable())
      );

    $(".store-info .btn-ver-horarios:not(.danger)").click(function () {
      $(this).parent().next().toggleClass("hidden");
    });
  }

  function populateStore(store) {
    return `<div class="store">
		<div class="store-info">
		  <div class="aside">
			<h5 class="store-name">
			  ${store.Nome} | ${store.Bairro}
			</h5>
			<p class="address">
			  ${store.Logradouro.toLowerCase()}, ${store.Bairro.toLowerCase()}, ${store.Cidade.toLowerCase()}, 
			  ${store.NumeroResidencial}, ${store.UF}, ${store.Cep}
			</p>
		  </div>
		  <button class="btn-ver-horarios ${store.Horarios.filter((h) => h.Disponibilidade.Value !== "Nao").length >
        0
        ? ""
        : "danger"
      }">${store.Horarios.filter((h) => h.Disponibilidade.Value !== "Nao").length > 0 ? "Ver horários" : "Horários indisponíveis"}</button>
		</div>
		<div class="time hidden">
		  <p>Horários:</p>
		  <div class="time-list">
			${createTimestampList(store.Horarios, `${store.Nome} | ${store.Bairro}`, store.Cep).join("\n")}
		  </div>
		</div>
	  </div>`;
  }

  function createTimestampList(horarios, store, cep) {
    return horarios.map(function (horario) {
      let timestamp = new Date(horario.HoraInicial);
      return horario.Disponibilidade.Value !== "Nao"
        ? `<button data-store="${store}" data-cep="${cep}" class="timestamp">${timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}</button>`
        : "";
    });
  }

  function noTimeAvailable() {
    return `<div id="sem-lojas" style="
      min-height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;">
      <p style="text-align: center;">
        Não encontramos horários de instalação disponíveis para essa data.
      </p>
      <small style="text-align: center;">
        Por favor, tente outras datas ou fale com nossos consultores no chat.
      </small>
    </div>`;
  }

  function forceChangeShipping(orderForm) {
    const newSelectedAddresses = [orderForm.shippingData.availableAddresses[orderForm.shippingData.availableAddresses.length - 1]];
    const logistic = orderForm.shippingData.logisticsInfo[0];

    if (logistic) {
      const slas = logistic.slas.filter(x => x.deliveryChannel === 'pickup-in-point');
      const logisticsInfo = orderForm.shippingData.logisticsInfo.map(x => {
        return {
          addressId: newSelectedAddresses[0].addressId,
          itemIndex: x.itemIndex,
          selectedDeleveryChannel: 'pickup-in-point',
          selectedSla: slas[0].id
        }
      });

      fetch(`/api/checkout/pub/orderForm/${orderForm.orderFormId}/attachments/shippingData`, {
        method: 'post',
        body: JSON.stringify({
          clearAddressIfPostalCodeNotFound: false,
          expectedOrderFormSections: ['shippingData'],
          selectedAddresses: newSelectedAddresses,
          logisticsInfo
        })
      }).then(res => res.json()).then(x => {
        vtexjs.checkout.sendAttachment('shippingData', {
          selectedAddresses: newSelectedAddresses,
          logisticsInfo
        });
      });
    }
  }
});

// Instale em Casa
$(function () {
  const baseUrlApi = window.location.href.includes("dev")
    ? "https://api-hml.autoglass.com.br/integracao-b2c/api/web-app/"
    : "https://api.autoglass.com.br/integracao-b2c/api/web-app/";

  let event = new Event('datepicker_carregado');

  let AvailableDays;
  let isLoading = false;

  let minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  let maxDate = new Date();
  maxDate = new Date(minDate.getFullYear(), minDate.getMonth() + 2, 0);

  $('.mz-advantages__content .cep  input').mask('99999-999').val('');

  $('#mostrar-datas-datepicker').datepicker({
    dateFormat: "dd/mm/yy",
    showAnim: 'slideDown',
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
      localStorage.setItem('AG_SelectedDaySM', JSON.stringify({
        selectedDay,
        infos,
        _createAt: Date.now()
      }));

      $('.preview-data').fadeOut(500, () => {
        $('.preview-data b').html(selectedDay);
        $('.preview-data').fadeIn(500);
      });

      $.get('/').then();
    },
    beforeShowDay: validadeAvailableDays
  });

  $('#input-cep-btn').click(Carregar);

  const address = JSON.parse(localStorage.getItem('AG_AddressSelected'));

  if (address) {
    Carregar(address.postalCode);
  } else {
    // Evento lançado pelo componente de cep
    $(window).on('cep-finish-load', e => {
      const orderForm = e.originalEvent.detail;
      estimateDate(orderForm.shippingData.logisticsInfo);
      Carregar(orderForm.shippingData.address.postalCode);
    });
  }

  // Evento lançado pelo componente de cep
  $(window).on('cep-updated', e => {
    const orderForm = e.originalEvent.detail;
    estimateDate(orderForm.shippingData.logisticsInfo);
    Carregar(orderForm.shippingData.address.postalCode);
  });

  function estimateDate(logisticsInfo) {
    let logistic = logisticsInfo[0];

    if (logistic) {
      let sla = logistic.slas.find(x => x.id.toLocaleLowerCase() === 'Autoglass Móvel'.toLocaleLowerCase());

      if (sla) {
        let estimate = sla.shippingEstimate;
        let numberOfDays = +estimate.replace('bd', '');

        let date = new Date();

        minDate.setDate(date.getDate() + numberOfDays);
        maxDate = new Date(minDate.getFullYear(), minDate.getMonth() + 2, 0);

        $('#mostrar-datas-datepicker').datepicker('option', 'maxDate', maxDate);
        $('#mostrar-datas-datepicker').datepicker('option', 'minDate', minDate);
      }
    }
  }

  async function Carregar(cep) {
    $('#aviso-servico-movel').hide();
    $('.preview-data').hide();

    if (cep && !isLoading) {
      isLoading = true;
      $('.datas-disponiveis').show();
      $('.loading-dates').show();
      $('#mostrar-datas-datepicker').css('height', '0px');

      const request = {
        Cep: cep,
        DataInicio: minDate.toISOString().split("T")[0],
        DataFim: maxDate.toISOString().split("T")[0],
        Carrinho: [],
        TipoDocumento: 'Venda',
        TipoServico: 'Instalacao',
        Qt: 100
      }

      // skuJson only exists on Produtc Detail Page
      if (window.skuJson) {
        request.Carrinho.push(
          {
            CodigoProduto: +window.skuJson.name.match(/\d+$/)[0],
            Quantidade: 1
          }
        );
      } else {
        let order;

        if (window.location.href.includes('orderPlaced')) {
          // Only will work on Confirmation
          order = await getOrderForm();
        } else {
          order = await vtexjs.checkout.getOrderForm();
        }

        request.Carrinho = order.items
          .filter(item => item.additionalInfo.brandId !== "2000108")
          .map(item => (
            {
              CodigoProduto: +item.productRefId,
              Quantidade: 1
            }
          ));
      }

      try {
        const response = await getAvailableDays(request);

        AvailableDays = response.Registros.map(x => ({
          ...x,
          DataRoteiro: new Date(x.DataRoteiro)
        }));

        if (response.Registros.filter(x => x.Disponivel === false).length === response.Registros.length) {
          $('#aviso-servico-movel')
            .show()
            .html(`
              Instalação em Casa indisponível para sua região. Tente alterar o CEP ou
              <a onclick="$zopim.livechat.window.show()"> clique aqui</a>
              e fale com a gente pelo chat.
            `);
        } else {
          $('#mostrar-datas-datepicker').datepicker('setDate', minDate);
          $('#mostrar-datas-datepicker').datepicker('refresh');
          $('a.ui-state-active').removeClass('ui-state-active');
          $('a.ui-state-hover').removeClass('ui-state-hover');

          $('#mostrar-datas-datepicker').css('height', '270px');
        }
      } catch (err) {
        let message;

        switch (err.status) {
          case 400:
            message = (JSON.parse(err.responseText)).Message;
            break;
          default:
            message = 'Não encontramos atendimento para este CEP. Mas procure a gente no chat para te ajudar!'
            break;
        }

        $('#aviso-servico-movel')
          .show()
          .html(message);
      } finally {
        isLoading = false;
        $('.loading-dates').hide();
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
        url: `${baseUrlApi}agendamentos/servicos-moveis/disponibilidades`,
        data: JSON.stringify(request),
        success: function (data) {
          resolve(data)
        },
        error: function (error) {
          reject(error)
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
          resolve(data)
        },
        error: function (error) {
          reject(error)
        },
      })
    });
  }

  function validadeAvailableDays(date) {
    const isSunday = date.toDateString().includes("Sun");
    const isSaturday = date.toDateString().includes("Sat");

    if (isSunday || isSaturday) {
      return [false];
    }

    if (AvailableDays) {
      const day = AvailableDays.find(x => x.DataRoteiro.toLocaleDateString() === date.toLocaleDateString());

      if (day) {
        return day.Disponivel ? [true] : [false];
      }
    }

    return [false];
  }
});