var codCidades = {
  SE: { code: "8529", nome: "Sergipe" },
  TO: { code: "9654", nome: "Tocantins" },
  BA: { code: "981", nome: "Bahia" },
  ES: { code: "1974", nome: "Esp\xedrito Santo" },
  DF: { code: "1730", nome: "Distrito Federal" },
  RS: { code: "7778", nome: "Rio Grande do Sul" },
  RJ: { code: "6808", nome: "Rio de Janeiro" },
  MT: { code: "4282", nome: "Mato Grosso" },
  PR: { code: "5916", nome: "Paran\xe1" },
  MS: { code: "4079", nome: "Mato Grosso do Sul" },
  GO: { code: "2015", nome: "Goi\xe1s" },
  AL: { code: "107", nome: "Alagoas" },
  CE: { code: "1320", nome: "Cear\xe1" },
  PA: { code: "4499", nome: "Par\xe1" },
  RN: { code: "7040", nome: "Rio Grande do Norte" },
  SC: { code: "8269", nome: "Santa Catarina" },
  MA: { code: "2533", nome: "Maranh\xe3o" },
  PI: { code: "5647", nome: "Piau\xed" },
  MG: { code: "3631", nome: "Minas Gerais" },
  PB: { code: "4823", nome: "Para\xedba" },
  AM: { code: "240", nome: "Amazonas" },
  PE: { code: "5229", nome: "Pernambuco" },
  SP: { code: "9423", nome: "S\xe3o Paulo" },
};
const baseUrlApiAgenda = window.location.href.includes("dev")
  ? "https://api-hml.autoglass.com.br/integracao-b2c/api/web-app/agendamentos"
  : "https://api.autoglass.com.br/integracao-b2c/api/web-app/agendamentos";
async function getDeliveriesEstimates(e, a, t) {
  let o = location.href.includes("orderPlaced"),
    i = location.href.includes("checkout"),
    s = t && t.length,
    n = (e) =>
      e.map((e) => ({ quantity: e.quantity, seller: e.seller, id: e.id })),
    r = [];
  try {
    if (o && s) {
      let d = await $.get(
        `/api/checkout/pub/orders/${$("#order-id").text().trim()}`
      );
      r = n(d.items);
    } else if (i && s) r = n(t);
    else {
      let l = await vtexjs.catalog.getProductWithVariations(12685),
        c = await vtexjs.catalog.getCurrentProductWithVariations();
      r = [
        { quantity: 1, seller: c.skus[0].sellerId, id: c.skus[0].sku },
        { quantity: 1, seller: l.skus[0].sellerId, id: l.skus[0].sku },
      ];
    }
    let { logisticsInfo: p } = await $.ajax({
        type: "POST",
        url: `/api/checkout/pub/orderForms/simulation?sc=${readCookie(
          "VTEXSC"
        ).replace("sc=", "")}`,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ country: "BRA", items: r, postalCode: e }),
      }),
      m = p && p.length ? p[0] : a[0];
    if (m)
      return m.slas.map((e) => {
        let a = +e.shippingEstimate.replace("bd", ""),
          t = new Date();
        return {
          Data: addBusinessDays(t, a),
          Nome: e.id,
          Tipo: e.deliveryChannel,
          DadosPickupPoint: e.pickupStoreInfo,
          Distancia: e.pickupDistance,
        };
      });
  } catch (u) {
    return (
      console.error("Falha ao calcular o tempo de entrega!", u), new Date()
    );
  }
}
function addBusinessDays(e, a) {
  for (e = skipWeekends(e); a; ) (e = getNextBusinessDay(e)), a--;
  return new Date(e);
}
function getNextBusinessDay(e) {
  return (e = skipWeekends((e = addDay(e, 1))));
}
function skipWeekends(e) {
  for (; isWeekend(e); ) e = addDay(e, 1);
  return e;
}
function isWeekend(e) {
  let a = e.getDay();
  return 6 == a || 0 == a;
}
function addDay(e, a) {
  return new Date(e.setDate(e.getDate() + a));
}
function readCookie(e) {
  for (
    var a = e + "=", t = document.cookie.split(";"), o = 0;
    o < t.length;
    o++
  ) {
    for (var i = t[o]; " " == i.charAt(0); ) i = i.substring(1, i.length);
    if (0 == i.indexOf(a)) return i.substring(a.length, i.length);
  }
  return (
    console.error("N\xe3o foi poss\xedvel recuprar cookie VTEXSC'\n"), null
  );
}
$(function () {
  let e = codCidades[$.cookie("myuf")],
    a = null;
  if ((null != e && (a = e.code), window.location.href.includes("checkout"))) {
    if (window.location.search.includes("og=")) {
      let t = window.location.search.split("=")[1];
      vtexjs.checkout.getOrders(t).then((e) => {
        d(e[0]);
      });
    }
    $(window).on("orderFormUpdated.vtex", async (e, a) => {
      await d(a);
    });
  }
  let o = new Date();
  o.setDate(o.getDate() + 2),
    $(".secao-agendamento > .filter > .data input").datepicker({
      dateFormat: "dd/mm/yy",
      dayNames: [
        "Domingo",
        "Segunda",
        "Ter\xe7a",
        "Quarta",
        "Quinta",
        "Sexta",
        "S\xe1bado",
        "Domingo",
      ],
      dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S", "D"],
      dayNamesShort: [
        "Dom",
        "Seg",
        "Ter",
        "Qua",
        "Qui",
        "Sex",
        "S\xe1b",
        "Dom",
      ],
      monthNames: [
        "Janeiro",
        "Fevereiro",
        "Mar\xe7o",
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
      minDate: o,
      beforeShowDay: (e) => [!e.toDateString().includes("Sun")],
      async onSelect() {
        let e = vtexjs.checkout.orderForm;
        c(
          await getDeliveriesEstimates(
            e.shippingData.address.postalCode,
            e.shippingData.logisticsInfo,
            e.items
          )
        );
      },
    }),
    $(".secao-agendamento > .filter > .data input").datepicker("setDate", o),
    $("#btn-alterar-local-instalacao").click(function () {
      $(".mz-install__close--button").click(),
        $("#btn-alterar-open-modal").click();
    });
  let i = JSON.parse(localStorage.getItem("AG_AddressSelected"));
  if (i) {
    let s = window.location.href.includes("/checkout"),
      n = +localStorage.getItem("ufDefinedByTop");
    if (!s && n)
      $(".secao-agendamento > .store-list > ul").html(`
        <div>
          <p>Por favor, informe um CEP para visualizar as lojas mais pr\xf3ximas</p>
        </div>
      `);
    else {
      let r;
      "undefined" != typeof vtexjs &&
        vtexjs.checkout &&
        vtexjs.checkout.orderForm &&
        vtexjs.checkout.orderForm.items &&
        (r = vtexjs.checkout.orderForm.items),
        r
          ? getDeliveriesEstimates(i.postalCode, i.logisticsInfo, r).then(
              (e) => {
                l(e), c(e);
              }
            )
          : vtexjs.checkout
              .getOrderForm()
              .then((e) => {
                r = e.items;
              })
              .then(
                getDeliveriesEstimates(i.postalCode, i.logisticsInfo, r).then(
                  (e) => {
                    l(e), c(e);
                  }
                )
              );
    }
  } else
    $(window).on("cep-finish-load", async (e) => {
      let a = e.originalEvent.detail,
        t = await getDeliveriesEstimates(
          a.shippingData.address.postalCode,
          a.shippingData.logisticsInfo,
          a.items
        );
      l(t), c(t);
    });
  async function d(t) {
    if (t.shippingData.address && t.shippingData.address.state) {
      (a = (e = codCidades[t.shippingData.address.state]).code || null),
        $(".store").remove();
      let o = await getDeliveriesEstimates(
        t.shippingData.address.postalCode,
        t.shippingData.logisticsInfo,
        t.items
      );
      l(o), c(o);
    }
  }
  function l(e) {
    var a;
    let t, i;
    (t =
      e && e.length
        ? ((i = (a = e)
            .filter((e) => "pickup-in-point" === e.Tipo)
            .map((e) => new Date(e.Data))
            .filter((e) => !isNaN(e))),
          new Date(Math.min(...i)))
        : o),
      $(".secao-agendamento > .filter > .data input").datepicker(
        "option",
        "minDate",
        t
      ),
      $(".secao-agendamento > .filter > .data input").datepicker("refresh"),
      $(".secao-agendamento > .filter > .data input").datepicker("setDate", t);
  }
  function c(e) {
    var t;
    function o(e) {
      let a = new Date(e),
        t = String(a.getDate()).padStart(2, "0"),
        o;
      return `${t}/${String(a.getMonth() + 1).padStart(2, "0")}/${a.getFullYear()}`;
    }
    function i(e) {
      let [a, t, o] = e.split("/");
      return new Date(`${o}-${t}-${a}`);
    }
    let s,
      n =
        ((t = vtexjs.checkout.orderForm.items),
        (s = ""),
        t.forEach((e) => {
          s = `${s}&IdProdutos=${parseInt(e.productRefId)}`;
        }),
        s);
    $.ajax({
      method: "GET",
      url: `${baseUrlApiAgenda}/horarios-lojas?Data=${
        $(".secao-agendamento .data input")
          .datepicker("getDate")
          .toISOString()
          .split("T")[0]
      }&CodigoServico=17&CodigoCidade=${a}&Qt=30&Pg=1${n}`,
    })
      .done(function (a) {
        if (
          (p(),
          0 ==
            (pickupPoints = e
              .filter((e) => "pickup-in-point" === e.Tipo)
              .map(
                (e) => (
                  (e.store = a.Registros.reduce(
                    (a, t) => (
                      t.Nome.indexOf(e.DadosPickupPoint.address.addressId) >
                        -1 &&
                        t.Horarios.some((e) => "Sim" === e.Disponibilidade) &&
                        (a = t),
                      a
                    ),
                    null
                  )),
                  e
                )
              )
              .map((e) => {
                let a = $("#alterar-data-input").val(),
                  t = i(a),
                  s = o(e.Data);
                return (
                  (s = i(s)) > t
                    ? (e.infoDate =
                        "Agendamento dispon\xedvel a partir do dia: " +
                        o(e.Data))
                    : (e.infoDate = ""),
                  e
                );
              })).length)
        ) {
          $(".secao-agendamento > .store-list > ul")
            .append(`<div id="sem-lojas-proximas" style="
			min-height: 50px;
			<h4 style="text-align: center;">
        N\xe3o encontramos lojas pr\xf3ximas \xe0 regi\xe3o informada.
			</h4>
		</div>`);
          return;
        }
        $(".secao-agendamento .qtd").text(
          `Lojas pr\xf3ximas: ${pickupPoints.length}`
        );
        let t = [];
        (horariosDisponiveisGeral = !1),
          pickupPoints.forEach(function (e) {
            let a = (function e(a) {
              var t, o, i, s, n;
              let r = a.store,
                d = a.DadosPickupPoint.address;
              if (!r) return null;
              let l, c;
              (function e() {
                let a = !1;
                if (window.location.href.includes("checkout"))
                  vtexjs.checkout.orderForm.items.forEach(function (e) {
                    m(e) && (a = !0);
                  });
                else {
                  let t = skuJson_0;
                  m(t) && (a = !0);
                }
                return a;
              })() &&
                ((l = Number((n = r).Horarios.length)),
                ((c = n.Horarios[l - 1].HoraInicial.split("T"))[1].startsWith(
                  17
                ) ||
                  c[1].startsWith(11)) &&
                  n.Horarios.pop());
              let p,
                u,
                h,
                { horariosDisponiveisLoja: g, timeStampList: f } =
                  ((t = r.Horarios),
                  (o = `${r.Nome} | ${r.Bairro}`),
                  (i = r.Cep),
                  (s = a.DadosPickupPoint.friendlyName),
                  (p = !1),
                  (u = []),
                  t.length &&
                    (u = t.map(function (e) {
                      let a = new Date(e.HoraInicial);
                      return "Nao" !== e.Disponibilidade.Value
                        ? ((p = !0),
                          (horariosDisponiveisGeral = !0),
                          `<button data-store="${o}" data-cep="${i}" data-friendly-name="${s}" class="timestamp">
            ${a.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}</button>`)
                        : "";
                    })),
                  (h = p
                    ? ['<p>Hor\xe1rios:</p><div class="time-list">']
                        .concat(u)
                        .concat("</div>")
                    : [].concat(
                        '<p class="texto-horarios-indisponiveis"> Hor\xe1rios indispon\xedveis para esta data <p>'
                      )),
                  { horariosDisponiveisLoja: p, timeStampList: h });
              return `
			<div id="${d.addressId}" class="${
                g ? "" : "card-horarios-indisponiveis"
              } pickup pickup-install">
      ${
        a.infoDate
          ? `<div class="pickup-install-availability"><p class="availability-text">${a.infoDate}</p></div>`
          : ""
      }
				<div class="pickup__info">
					<div class="pickup__info-distance">
						<svg class="pkpmodal-pickup-point-best-marker-image" width="25" height="32" viewBox="0 0 25 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M19.4917 22.3169L19.4918 22.3169L19.4967 22.3096C19.5843 22.1782 19.6709 22.0485 19.7564 21.9204C22.0478 18.4883 23.5645 16.2165 23.5645 12.5323C23.5645 6.16317 18.4013 1 12.0323 1C5.66317 1 0.5 6.16317 0.5 12.5323C0.5 16.5417 3.05396 20.5158 5.20313 23.2599C6.56216 24.9952 9.21424 28.1986 11.703 30.3763L12.0323 30.6644L12.3615 30.3763C14.8402 28.2075 16.7075 26.3386 19.4917 22.3169Z" fill="#2D78F6" stroke="white"></path>
							<path d="M18.6968 9.73418L14.6509 9.14642L12.8407 5.48019C12.5239 4.83994 11.4759 4.83994 11.159 5.48019L9.3498 9.14642L5.30298 9.73418C4.53711 9.84573 4.22682 10.7906 4.78365 11.3344L7.71213 14.1878L7.02126 18.2178C6.89096 18.9808 7.69338 19.5667 8.38145 19.2058L11.9999 17.3038L15.6192 19.2068C16.3017 19.5639 17.1107 18.9874 16.9794 18.2187L16.2885 14.1888L19.217 11.3353C19.7729 10.7906 19.4626 9.84573 18.6968 9.73418Z" fill="white"></path>
						</svg>
						<p>${a.Distancia.toFixed(1)} km</p>
					</div>
					<div class="pickup__info-address">
						<div class="address-title">
							<b>${a.DadosPickupPoint.friendlyName}</b>
						</div>
						<p class="address-location">
							${d.street} ${d.number},

						</p>
						<p class="pickup__info-city">${d.neighborhood} - ${d.city} - ${d.state}</p>
					</div>
				</div>
				${
          a.infoDate
            ? ""
            : `
          <div class="time">
            ${
              r
                ? f.join("\n")
                : '<p class="texto-horarios-indisponiveis"> Hor\xe1rios indispon\xedveis para esta data <p>'
            }
          </div>
        `
        }
			</div>
      `;
            })(e);
            t = a ? t.concat(a) : t;
          }),
          horariosDisponiveisGeral
            ? ($(".secao-agendamento > .store-list > ul").append(t.join("\n")),
              0 === $(".mz-install__info").length &&
                $(".secao-agendamento").append(`
            <div class="mz-install__info">
              <div class="mz-info__list">
                <ul>
                  <li>
                    Ap\xf3s aprova\xe7\xe3o do pagamento, nossos analistas entrar\xe3o
                    em contato com voc\xea para confirmar o hor\xe1rio de agendamento.
                  </li>
                  <li>
                    Ser\xe1 realizada uma an\xe1lise pelo t\xe9cnico e caso
                    haja necessidade de troca de borrachas ou sensores,
                    o valor ser\xe1 cobrado na loja.
                  </li>
              </div>
            </div>
            `))
            : $(".secao-agendamento > .store-list > ul").append(u()),
          $(".timestamp").click(function (e) {
            window.location.href.includes("checkout") &&
              $("body").removeClass("mz-bo-on mz-as-on mz-il-on"),
              $(".mz-install__button--buy").click((e) => e.preventDefault());
            let a = $(this).attr("data-store"),
              t = a.split(" ")[2],
              o = $(
                ".store-list #" + t + " .pickup__info-address .address-location"
              ).text(),
              i = $(
                ".store-list #" +
                  t +
                  " .pickup__info-address .pickup__info-city"
              ).text(),
              s = $(this).attr("data-cep"),
              n = $(this).attr("data-friendly-name"),
              r = $(this).html(),
              d = vtexjs.checkout.orderForm.orderFormId,
              l = $(".secao-agendamento .data input")
                .datepicker("getDate")
                .toISOString()
                .split("T")[0],
              c = $(".secao-agendamento .data input")
                .datepicker("getDate")
                .toLocaleDateString(),
              p = {
                loja: a,
                lojaBeauty: n,
                horario: r,
                date: l,
                _createAt: Date.now(),
                enderecoLoja: o,
                cidadeLoja: i,
                orderFormId: d,
                cepLoja: s,
              };
            localStorage.setItem("AG_SelectedHour", JSON.stringify(p)),
              fetch(`${baseUrlApiAgenda}/lojas`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(p),
              }).catch((e) => console.error("Erro ao enviar agendamento:", e)),
              $(".pickup-install .time .time-list button").removeClass(
                "selected"
              ),
              $(e.srcElement).addClass("selected"),
              $(
                ".modal-instale-na-loja > .secao-agendamento > .selected-msg b"
              ).text(n + " - " + c + " - " + r),
              $(
                ".modal-instale-na-loja > .secao-agendamento > .to-select-msg"
              ).hide(),
              $(
                ".modal-instale-na-loja > .secao-agendamento > .selected-msg"
              ).show(),
              vtexjs.checkout
                .calculateShipping({
                  postalCode: s,
                  country: "BRA",
                  addressType: "search",
                })
                .then((e) => {
                  Date.now() -
                    Number(
                      localStorage.getItem(
                        "lastTimeWhildshieldVanePopUpWasShown"
                      )
                    ) <
                    432e5 &&
                    ((function e(a) {
                      let t = [
                          a.shippingData.availableAddresses[
                            a.shippingData.availableAddresses.length - 1
                          ],
                        ],
                        o = a.shippingData.logisticsInfo[0];
                      if (o) {
                        let i = o.slas.filter(
                            (e) => "pickup-in-point" === e.deliveryChannel
                          ),
                          s = a.shippingData.logisticsInfo.map((e) => ({
                            addressId: t[0].addressId,
                            itemIndex: e.itemIndex,
                            selectedDeliveryChannel: "pickup-in-point",
                            selectedSla: i[0].id,
                          }));
                        fetch(
                          `/api/checkout/pub/orderForm/${a.orderFormId}/attachments/shippingData`,
                          {
                            method: "post",
                            body: JSON.stringify({
                              clearAddressIfPostalCodeNotFound: !1,
                              expectedOrderFormSections: ["shippingData"],
                              selectedAddresses: t,
                              logisticsInfo: s,
                            }),
                          }
                        )
                          .then((e) => e.json())
                          .then((e) => {
                            vtexjs.checkout.sendAttachment("shippingData", {
                              selectedAddresses: t,
                              logisticsInfo: s,
                            });
                          });
                      }
                    })(e),
                    $(".mz-install__button--buy").unbind("click"));
                });
          });
      })
      .fail(() => {
        p(), $(".secao-agendamento > .store-list > ul").append(u());
      });
  }
  function p() {
    $(".modal-instale-na-loja .store-list .pickup-install").remove(),
      $(".modal-instale-na-loja .store-list .mz-install__info").remove(),
      $(".modal-instale-na-loja .store-list #sem-lojas").remove(),
      $(".secao-agendamento > .store-list > ul").html(""),
      $(".modal-instale-na-loja > .secao-agendamento > .selected-msg b").text(
        ""
      ),
      $(".modal-instale-na-loja > .secao-agendamento > .selected-msg").hide(),
      $(".modal-instale-na-loja > .secao-agendamento > .to-select-msg").show();
  }
  function m(e) {
    return e.name.startsWith("Parabrisa");
  }
  function u() {
    return `<div id="sem-lojas" style="
			min-height: 100px;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;">
			<p style="text-align: center;">
        N\xe3o encontramos loja para esta data, por favor selecione outra data.
			</p>
			<h4 style="text-align: center; font-weight: normal;">
        Qualquer d\xfavida,
          <span style="font-weight: bold;">
            <a onclick="$zopim.livechat.window.show()"> clique aqui </a>
          </span>
        e fale com a gente pelo chat.
			</h4>
		</div>`;
  }
  $(window).on("cep-updated", async (e) => {
    let a = e.originalEvent.detail,
      t = await getDeliveriesEstimates(
        a.shippingData.address.postalCode,
        a.shippingData.logisticsInfo,
        a.items
      );
    l(t), c(t);
  }),
    c();
}),
  $(function () {
    let e = new Event("datepicker_carregado"),
      a,
      t = !1,
      o = new Date();
    o.setDate(o.getDate() + 2);
    let i = new Date();
    async function s(e) {
      if (
        ($("#aviso-servico-movel").hide(), $(".preview-data").hide(), e && !t)
      ) {
        (t = !0),
          $(".datas-disponiveis").show(),
          $(".loading-dates").show(),
          $("#mostrar-datas-datepicker").css("height", "0px");
        let s = {
          Cep: e,
          DataInicio: o.toISOString().split("T")[0],
          DataFim: i.toISOString().split("T")[0],
          Carrinho: [],
          TipoDocumento: "Venda",
          TipoServico: "Instalacao",
          Qt: 100,
        };
        if (window.skuJson)
          s.Carrinho.push({
            CodigoProduto: +window.skuJson.name.match(/\d+$/)[0],
            Quantidade: 1,
          });
        else {
          let n;
          (n = window.location.href.includes("orderPlaced")
            ? await new Promise((e, a) => {
                $.ajax({
                  jsonp: !1,
                  url: `/api/checkout/pub/orders/${$("#order-id")
                    .text()
                    .trim()}`,
                  contentType: "application/json",
                  type: "GET",
                  success: function (a) {
                    e(a);
                  },
                  error: function (e) {
                    a(e);
                  },
                });
              })
            : await vtexjs.checkout.getOrderForm()),
            (s.Carrinho = n.items
              .filter((e) => "2000108" !== e.additionalInfo.brandId)
              .map((e) => ({ CodigoProduto: +e.productRefId, Quantidade: 1 })));
        }
        try {
          var r;
          let d = await ((r = s),
          new Promise((e, a) => {
            $.ajax({
              contentType: "application/json",
              crossDomain: !0,
              jsonp: !1,
              type: "POST",
              url: `${baseUrlApiAgenda}/servicos-moveis/disponibilidades`,
              data: JSON.stringify(r),
              success: function (a) {
                e(a);
              },
              error: function (e) {
                a(e);
              },
            });
          }));
          (a = d.Registros.map((e) => ({
            ...e,
            DataRoteiro: new Date(e.DataRoteiro),
          }))),
            d.Registros.filter((e) => !1 === e.Disponivel).length ===
            d.Registros.length
              ? ($("#aviso-servico-movel").show().html(`
							Instala\xe7\xe3o em Casa indispon\xedvel para sua regi\xe3o. Tente alterar o CEP ou
							<a onclick="$zopim.livechat.window.show()"><b> clique aqui </b></a>
							e fale com a gente pelo chat.
						`),
                $(".mz-advantages__button--buy").addClass("disabled"))
              : ($("#mostrar-datas-datepicker").datepicker("setDate", o),
                $("#mostrar-datas-datepicker").datepicker("refresh"),
                $("a.ui-state-active").removeClass("ui-state-active"),
                $("a.ui-state-hover").removeClass("ui-state-hover"),
                $("#mostrar-datas-datepicker").css("height", "270px"),
                $(".mz-advantages__button--buy").removeClass("disabled"));
        } catch (l) {
          let c;
          $(".mz-advantages__button--buy").addClass("disabled"),
            (c =
              400 === l.status
                ? JSON.parse(l.responseText).Message
                : "N\xe3o encontramos atendimento para este CEP. Mas procure a gente no chat para te ajudar!"),
            $("#aviso-servico-movel").show().html(c);
        } finally {
          (t = !1), $(".loading-dates").hide();
        }
      }
    }
    (i = new Date(o.getFullYear(), o.getMonth() + 2, 0)),
      $(".mz-advantages__content .cep  input").mask("99999-999").val(""),
      $("#mostrar-datas-datepicker").datepicker({
        dateFormat: "dd/mm/yy",
        showAnim: "slideDown",
        numberOfMonths: 650 > $(document).width() ? 1 : 2,
        dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
        monthNames: [
          "Janeiro",
          "Fevereiro",
          "Mar\xe7o",
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
        minDate: o,
        maxDate: i,
        onSelect(e, a) {
          localStorage.setItem(
            "AG_SelectedDaySM",
            JSON.stringify({ selectedDay: e, infos: a, _createAt: Date.now() })
          ),
            $(".preview-data")
              .first()
              .fadeOut(500, () => {
                $(".preview-data b").first().html(e),
                  $(".preview-data").fadeIn(500);
              }),
            $.get("/").then();
        },
        beforeShowDay: function e(t) {
          let o = t.toDateString().includes("Sun"),
            i = t.toDateString().includes("Sat");
          if (o || i) return [!1];
          if (a) {
            let s = a.find(
              (e) =>
                e.DataRoteiro.toLocaleDateString() === t.toLocaleDateString()
            );
            if (s) return s.Disponivel ? [!0] : [!1];
          }
          return [!1];
        },
      }),
      $("#input-cep-btn").click(function (e) {
        s($("#cep-input").val());
      }),
      $(window).on("cep-updated", async (e) => {
        var a;
        let t = e.originalEvent.detail,
          o;
        (o = (
          await getDeliveriesEstimates(
            t.shippingData.address.postalCode,
            t.shippingData.logisticsInfo,
            t.items
          )
        ).find(
          (e) =>
            e.Nome.trim().toLocaleLowerCase() ===
            "Autoglass M\xf3vel".trim().toLocaleLowerCase()
        ))
          ? ((i = new Date(o.Data.getFullYear(), o.Data.getMonth() + 2, 0)),
            $("#mostrar-datas-datepicker").datepicker("option", "maxDate", i),
            $("#mostrar-datas-datepicker").datepicker(
              "option",
              "minDate",
              o.Data
            ))
          : console.log("Falha ao setar data"),
          s(t.shippingData.address.postalCode);
      }),
      window.dispatchEvent(e);
  });
