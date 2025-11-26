!(function () {
  window.vtexjs && vtexjs.checkout
    ? e()
    : (console.warn("VTEXJS ainda n\xe3o carregado. Aguardando..."),
      window.addEventListener("load", e));
  function e() {
    $(window).on("orderFormUpdated.vtex", function (e, a) {
      var t = {
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
      let o = window.location.href.includes("dev")
        ? "https://api-hml.autoglass.com.br/integracao-b2c/api/web-app/agendamentos"
        : "https://api.autoglass.com.br/integracao-b2c/api/web-app/agendamentos";
      async function i(e, a, t) {
        let o = location.href.includes("orderPlaced"),
          i = location.href.includes("checkout"),
          r = t && t.length,
          d = (e) =>
            e.map((e) => ({
              quantity: e.quantity,
              seller: e.seller,
              id: e.id,
            })),
          l = [];
        try {
          if (o && r) {
            let c = await $.get(
              `/api/checkout/pub/orders/${$("#order-id").text().trim()}`
            );
            l = d(c.items);
          } else if (i && r) l = d(t);
          else {
            let p = await vtexjs.catalog.getProductWithVariations(12685),
              m = await vtexjs.catalog.getCurrentProductWithVariations();
            l = [
              { quantity: 1, seller: m.skus[0].sellerId, id: m.skus[0].sku },
              { quantity: 1, seller: p.skus[0].sellerId, id: p.skus[0].sku },
            ];
          }
          let m = (function e(a) {
              for (
                var t = a + "=", o = document.cookie.split(";"), i = 0;
                i < o.length;
                i++
              ) {
                for (var n = o[i]; " " == n.charAt(0); )
                  n = n.substring(1, n.length);
                if (0 == n.indexOf(t)) return n.substring(t.length, n.length);
              }
              return (
                console.error(
                  "N\xe3o foi poss\xedvel recuprar cookie VTEXSC'\n"
                ),
                null
              );
            })("VTEXSC").replace("sc=", ""),
            { logisticsInfo: u } = await $.ajax({
              type: "POST",
              url: `/api/checkout/pub/orderForms/simulation?sc=${m}`,
              dataType: "json",
              contentType: "application/json",
              data: JSON.stringify({ country: "BRA", items: l, postalCode: e }),
            }),
            h = u && u.length ? u[0] : a[0];
          if (h) {
            let f = h.slas.map((e) => {
              let a = e.shippingEstimate,
                t = +a.replace("bd", ""),
                o = new Date(),
                i = (function e(a, t) {
                  for (a = s(a); t; ) (a = n(a)), t--;
                  return new Date(a);
                })(o, t);
              return {
                Data: i,
                Nome: e.id,
                Tipo: e.deliveryChannel,
                DadosPickupPoint: e.pickupStoreInfo,
                Distancia: e.pickupDistance,
              };
            });
            return f;
          }
        } catch (g) {
          return (
            console.error("Falha ao calcular o tempo de entrega!", g),
            new Date()
          );
        }
      }
      function n(e) {
        return (e = s((e = d(e, 1))));
      }
      function s(e) {
        for (; r(e); ) e = d(e, 1);
        return e;
      }
      function r(e) {
        let a = e.getDay();
        return 6 == a || 0 == a;
      }
      function d(e, a) {
        return new Date(e.setDate(e.getDate() + a));
      }
      $(function () {
        let e = t[$.cookie("myuf")],
          a = null;
        if (
          (null != e && (a = e.code), window.location.href.includes("checkout"))
        ) {
          if (window.location.search.includes("og=")) {
            let n = window.location.search.split("=")[1];
            vtexjs.checkout.getOrders(n).then((e) => {
              p(e[0]);
            });
          }
          $(window).on("orderFormUpdated.vtex", async (e, a) => {
            await p(a);
          });
        }
        let s = new Date();
        s.setDate(s.getDate() + 2),
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
            minDate: s,
            beforeShowDay: (e) => [!e.toDateString().includes("Sun")],
            async onSelect() {
              let e = vtexjs.checkout.orderForm;
              u(
                await i(
                  e.shippingData.address.postalCode,
                  e.shippingData.logisticsInfo,
                  e.items
                )
              );
            },
          }),
          $(".secao-agendamento > .filter > .data input").datepicker(
            "setDate",
            s
          ),
          $("#btn-alterar-local-instalacao").click(function () {
            $(".mz-install__close--button").click(),
              $("#btn-alterar-open-modal").click();
          });
        let r = JSON.parse(localStorage.getItem("AG_AddressSelected"));
        if (r) {
          let d = window.location.href.includes("/checkout"),
            l = +localStorage.getItem("ufDefinedByTop");
          if (!d && l)
            $(".secao-agendamento > .store-list > ul").html(`
        <div>
          <p>Por favor, informe um CEP para visualizar as lojas mais pr\xf3ximas</p>
        </div>
      `);
          else {
            let c;
            "undefined" != typeof vtexjs &&
              vtexjs.checkout &&
              vtexjs.checkout.orderForm &&
              vtexjs.checkout.orderForm.items &&
              (c = vtexjs.checkout.orderForm.items),
              c
                ? i(r.postalCode, r.logisticsInfo, c).then((e) => {
                    m(e), u(e);
                  })
                : vtexjs.checkout
                    .getOrderForm()
                    .then((e) => {
                      c = e.items;
                    })
                    .then(
                      i(r.postalCode, r.logisticsInfo, c).then((e) => {
                        m(e), u(e);
                      })
                    );
          }
        } else
          $(window).on("cep-finish-load", async (e) => {
            let a = e.originalEvent.detail,
              t = await i(
                a.shippingData.address.postalCode,
                a.shippingData.logisticsInfo,
                a.items
              );
            m(t), u(t);
          });
        async function p(o) {
          if (o.shippingData.address && o.shippingData.address.state) {
            (a = (e = t[o.shippingData.address.state]).code || null),
              $(".store").remove();
            let n = await i(
              o.shippingData.address.postalCode,
              o.shippingData.logisticsInfo,
              o.items
            );
            m(n), u(n);
          }
        }
        function m(e) {
          var a;
          let t, o;
          (t =
            e && e.length
              ? ((o = (a = e)
                  .filter((e) => "pickup-in-point" === e.Tipo)
                  .map((e) => new Date(e.Data))
                  .filter((e) => !isNaN(e))),
                new Date(Math.min(...o)))
              : s),
            $(".secao-agendamento > .filter > .data input").datepicker(
              "option",
              "minDate",
              t
            ),
            $(".secao-agendamento > .filter > .data input").datepicker(
              "refresh"
            ),
            $(".secao-agendamento > .filter > .data input").datepicker(
              "setDate",
              t
            );
        }
        function u(e) {
          var t;
          function i(e) {
            let a = new Date(e);
            return `${String(a.getDate()).padStart(
              2,
              "0"
            )}/${String(a.getMonth() + 1).padStart(2, "0")}/${a.getFullYear()}`;
          }
          function n(e) {
            let [a, t, o] = e.split("/");
            return new Date(`${o}-${t}-${a}`);
          }
          let s,
            r =
              ((t = vtexjs.checkout.orderForm.items),
              (s = ""),
              t.forEach((e) => {
                s = `${s}&IdProdutos=${parseInt(e.productRefId)}`;
              }),
              s);
          $.ajax({
            method: "GET",
            url: `${o}/horarios-lojas?Data=${
              $(".secao-agendamento .data input")
                .datepicker("getDate")
                .toISOString()
                .split("T")[0]
            }&CodigoServico=17&CodigoCidade=${a}&Qt=30&Pg=1${r}`,
          })
            .done(function (a) {
              if (
                (h(),
                0 ==
                  (pickupPoints = (Array.isArray(e) ? e : [])
                    .filter((x) => "pickup-in-point" === x.Tipo)
                    .map(
                      (e) => (
                        (e.store = a.Registros.reduce((a, t) => {
                          if (
                            t.Nome.indexOf(
                              e.DadosPickupPoint.address.addressId
                            ) > -1
                          ) {
                            let o = t.Horarios.some(
                              (e) => "Sim" === e.Disponibilidade
                            );
                            o && (a = t);
                          }
                          return a;
                        }, null)),
                        e
                      )
                    )
                    .map((e) => {
                      let a = $("#alterar-data-input").val(),
                        t = n(a),
                        o = i(e.Data);
                      return (
                        (o = n(o)) > t
                          ? (e.infoDate =
                              "Agendamento dispon\xedvel a partir do dia: " +
                              i(e.Data))
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
                    var t, o, i, n, s;
                    let r = a.store,
                      d = a.DadosPickupPoint.address;
                    if (!r) return null;
                    let l, c;
                    (function e() {
                      let a = !1;
                      if (window.location.href.includes("checkout"))
                        vtexjs.checkout.orderForm.items.forEach(function (e) {
                          g(e) && (a = !0);
                        });
                      else {
                        let t = skuJson_0;
                        g(t) && (a = !0);
                      }
                      return a;
                    })() &&
                      ((l = Number((s = r).Horarios.length)),
                      ((c =
                        s.Horarios[l - 1].HoraInicial.split("T"))[1].startsWith(
                        17
                      ) ||
                        c[1].startsWith(11)) &&
                        s.Horarios.pop());
                    let p,
                      m,
                      u,
                      { horariosDisponiveisLoja: h, timeStampList: f } =
                        ((t = r.Horarios),
                        (o = `${r.Nome} | ${r.Bairro}`),
                        (i = r.Cep),
                        (n = a.DadosPickupPoint.friendlyName),
                        (p = !1),
                        (m = []),
                        t.length &&
                          (m = t.map(function (e) {
                            let a = new Date(e.HoraInicial);
                            return "Nao" !== e.Disponibilidade.Value
                              ? ((p = !0),
                                (horariosDisponiveisGeral = !0),
                                `<button data-store="${o}" data-cep="${i}" data-friendly-name="${n}" class="timestamp">
            ${a.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}</button>`)
                              : "";
                          })),
                        (u = p
                          ? ['<p>Hor\xe1rios:</p><div class="time-list">']
                              .concat(m)
                              .concat("</div>")
                          : [].concat(
                              '<p class="texto-horarios-indisponiveis"> Hor\xe1rios indispon\xedveis para esta data <p>'
                            )),
                        { horariosDisponiveisLoja: p, timeStampList: u });
                    return `
			<div id="${d.addressId}" class="${
                      h ? "" : "card-horarios-indisponiveis"
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
                  ? ($(".secao-agendamento > .store-list > ul").append(
                      t.join("\n")
                    ),
                    0 === $(".mz-install__info").length &&
                      $(".secao-agendamento").append(`
            <div class="mz-install__info">
              <div class="mz-info__list">
                <ul>
                  <li>
                    No atendimento, será realizada uma análise pelo técnico e <b>caso haja necessidade de troca de borrachas ou sensores</b>, o valor será cobrado na loja.
                  </li>
                  <li>
                    &nbsp;Dúvidas? <a href="#" onclick="zE('webWidget', 'open'); return false;"><u>Clique aqui</u></a> e fale com a gente pelo chat.
                  </li>
              </div>
            </div>
            `))
                  : $(".secao-agendamento > .store-list > ul").append(f()),
                $(".timestamp").click(function (e) {
                  window.location.href.includes("checkout") &&
                    $("body").removeClass("mz-bo-on mz-as-on mz-il-on"),
                    $(".mz-install__button--buy").click((e) =>
                      e.preventDefault()
                    );
                  let a = $(this).attr("data-store"),
                    t = a.split(" ")[2],
                    i = $(
                      ".store-list #" +
                        t +
                        " .pickup__info-address .address-location"
                    ).text(),
                    n = $(
                      ".store-list #" +
                        t +
                        " .pickup__info-address .pickup__info-city"
                    ).text(),
                    s = $(this).attr("data-cep"),
                    r = $(this).attr("data-friendly-name"),
                    d = $(this).html(),
                    l = vtexjs.checkout.orderForm.orderFormId,
                    c = $(".secao-agendamento .data input")
                      .datepicker("getDate")
                      .toISOString()
                      .split("T")[0],
                    p = $(".secao-agendamento .data input")
                      .datepicker("getDate")
                      .toLocaleDateString(),
                    m = {
                      loja: a,
                      lojaBeauty: r,
                      horario: d,
                      date: c,
                      _createAt: Date.now(),
                      enderecoLoja: i,
                      cidadeLoja: n,
                      orderFormId: l,
                      cepLoja: s,
                    };
                  localStorage.setItem("AG_SelectedHour", JSON.stringify(m)),
                    fetch(`${o}/lojas`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(m),
                    }).catch((e) =>
                      console.error("Erro ao enviar agendamento:", e)
                    ),
                    $(".pickup-install .time .time-list button").removeClass(
                      "selected"
                    ),
                    $(e.srcElement).addClass("selected"),
                    $(
                      ".modal-instale-na-loja > .secao-agendamento > .selected-msg b"
                    ).text(r + " - " + p + " - " + d),
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
                                n = a.shippingData.logisticsInfo.map((e) => ({
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
                                    logisticsInfo: n,
                                  }),
                                }
                              )
                                .then((e) => e.json())
                                .then((e) => {
                                  vtexjs.checkout.sendAttachment(
                                    "shippingData",
                                    { selectedAddresses: t, logisticsInfo: n }
                                  );
                                });
                            }
                          })(e),
                          $(".mz-install__button--buy").unbind("click"));
                      });
                });
            })
            .fail(() => {
              h(), $(".secao-agendamento > .store-list > ul").append(f());
            });
        }
        function h() {
          $(".modal-instale-na-loja .store-list .pickup-install").remove(),
            $(".modal-instale-na-loja .store-list .mz-install__info").remove(),
            $(".modal-instale-na-loja .store-list #sem-lojas").remove(),
            $(".secao-agendamento > .store-list > ul").html(""),
            $(
              ".modal-instale-na-loja > .secao-agendamento > .selected-msg b"
            ).text(""),
            $(
              ".modal-instale-na-loja > .secao-agendamento > .selected-msg"
            ).hide(),
            $(
              ".modal-instale-na-loja > .secao-agendamento > .to-select-msg"
            ).show();
        }
        function g(e) {
          return e.name.startsWith("Parabrisa");
        }
        function f() {
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
            t = await i(
              a.shippingData.address.postalCode,
              a.shippingData.logisticsInfo,
              a.items
            );
          m(t), u(t);
        }),
          u();
      }),
        $(function () {
          let e = new Event("datepicker_carregado"),
            a,
            t = !1,
            n = new Date();
          n.setDate(n.getDate() + 2);
          let s = new Date();
          async function r(e) {
            if (
              ($("#aviso-servico-movel").hide(),
              $(".preview-data").hide(),
              e && !t)
            ) {
              (t = !0),
                $(".datas-disponiveis").show(),
                $(".loading-dates").show(),
                $("#mostrar-datas-datepicker").css("height", "0px");
              let i = {
                Cep: e,
                DataInicio: n.toISOString().split("T")[0],
                DataFim: s.toISOString().split("T")[0],
                Carrinho: [],
                TipoDocumento: "Venda",
                TipoServico: "Instalacao",
                Qt: 100,
              };
              if (window.skuJson)
                i.Carrinho.push({
                  CodigoProduto: +window.skuJson.name.match(/\d+$/)[0],
                  Quantidade: 1,
                });
              else {
                let r;
                (r = window.location.href.includes("orderPlaced")
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
                  (i.Carrinho = r.items
                    .filter((e) => "2000108" !== e.additionalInfo.brandId)
                    .map((e) => ({
                      CodigoProduto: +e.productRefId,
                      Quantidade: 1,
                    })));
              }
              try {
                var d;
                let l = await ((d = i),
                new Promise((e, a) => {
                  $.ajax({
                    contentType: "application/json",
                    crossDomain: !0,
                    jsonp: !1,
                    type: "POST",
                    url: `${o}/servicos-moveis/disponibilidades`,
                    data: JSON.stringify(d),
                    success: function (a) {
                      e(a);
                    },
                    error: function (e) {
                      a(e);
                    },
                  });
                }));
                (a = l.Registros.map((e) => ({
                  ...e,
                  DataRoteiro: new Date(e.DataRoteiro),
                }))),
                  l.Registros.filter((e) => !1 === e.Disponivel).length ===
                  l.Registros.length
                    ? ($("#aviso-servico-movel").show().html(`
							Instala\xe7\xe3o em Casa indispon\xedvel para sua regi\xe3o. Tente alterar o CEP ou
							<a onclick="$zopim.livechat.window.show()"><b> clique aqui </b></a>
							e fale com a gente pelo chat.
						`),
                      $(".mz-advantages__button--buy").addClass("disabled"))
                    : ($("#mostrar-datas-datepicker").datepicker("setDate", n),
                      $("#mostrar-datas-datepicker").datepicker("refresh"),
                      $("a.ui-state-active").removeClass("ui-state-active"),
                      $("a.ui-state-hover").removeClass("ui-state-hover"),
                      $("#mostrar-datas-datepicker").css("height", "270px"),
                      $(".mz-advantages__button--buy").removeClass("disabled"));
              } catch (c) {
                let p;
                $(".mz-advantages__button--buy").addClass("disabled"),
                  (p =
                    400 === c.status
                      ? JSON.parse(c.responseText).Message
                      : "N\xe3o encontramos atendimento para este CEP. Mas procure a gente no chat para te ajudar!"),
                  $("#aviso-servico-movel").show().html(p);
              } finally {
                (t = !1), $(".loading-dates").hide();
              }
            }
          }
          (s = new Date(n.getFullYear(), n.getMonth() + 2, 0)),
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
              minDate: n,
              maxDate: s,
              onSelect(e, a) {
                localStorage.setItem(
                  "AG_SelectedDaySM",
                  JSON.stringify({
                    selectedDay: e,
                    infos: a,
                    _createAt: Date.now(),
                  })
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
                  let n = a.find(
                    (e) =>
                      e.DataRoteiro.toLocaleDateString() ===
                      t.toLocaleDateString()
                  );
                  if (n) return n.Disponivel ? [!0] : [!1];
                }
                return [!1];
              },
            }),
            $("#input-cep-btn").click(function (e) {
              r($("#cep-input").val());
            }),
            $(window).on("cep-updated", async (e) => {
              let a = e.originalEvent.detail,
                t;
              (t = (
                await i(
                  a.shippingData.address.postalCode,
                  a.shippingData.logisticsInfo,
                  a.items
                )
              ).find(
                (e) =>
                  e.Nome.trim().toLocaleLowerCase() ===
                  "Autoglass M\xf3vel".trim().toLocaleLowerCase()
              ))
                ? ((s = new Date(
                    t.Data.getFullYear(),
                    t.Data.getMonth() + 2,
                    0
                  )),
                  $("#mostrar-datas-datepicker").datepicker(
                    "option",
                    "maxDate",
                    s
                  ),
                  $("#mostrar-datas-datepicker").datepicker(
                    "option",
                    "minDate",
                    t.Data
                  ))
                : console.log("Falha ao setar data"),
                r(a.shippingData.address.postalCode);
            }),
            window.dispatchEvent(e);
        });
    });
  }
})();