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

// Instale na Loja
$(function () {
  const hmlCodServico = "17";
  const baseUrlApi = window.location.href.includes("dev")
    ? "http://localhost:55408/integracao-b2c/api/web-app/agendamento"
    : "https://api.autoglass.com.br/integracao-b2c/api/web-app/agendamento";
  const estado = codCidades[$.cookie("mzLocationUF")];
  const codCidade = estado.code || null;

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
            console.log("ultima iteração");
            $(".store-info .btn-ver-horarios:not(.danger)").click(function () {
              $(this).parent().next().toggleClass("hidden");
            });
          }
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
			${createTimestampList(store.Horarios).join("\n")}
		  </div>
		</div>
	  </div>`;
  }

  function createTimestampList(horarios) {
    return horarios.map(function (horario) {
      let timestamp = new Date(horario.HoraInicial);
      return horario.Disponibilidade.Value !== "Nao"
        ? `<button class="timestamp">${timestamp.toLocaleTimeString([], {
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
});

// Instale em Casa
$(function () {
  const baseUrlApi = window.location.href.includes("dev")
    ? "http://localhost:55408/integracao-b2c/api/web-app/"
    : "https://api.autoglass.com.br/integracao-b2c/api/web-app/";

  let event = new Event('datepicker_carregado');

  let AvailableDays;
  let isLoading = false;

  let minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  let maxDate = new Date();
  maxDate = new Date(maxDate.getFullYear(), minDate.getMonth() + 2, 0);

  console.log(maxDate)

  $('.mz-advantages__content .cep  input').mask('99999-999');

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
    beforeShowDay: validadeAvailableDays
  });

  $('#input-cep-btn').click(async (e) => {
    $('#aviso-servico-movel').hide();
    e.preventDefault();
    const cep = $('#cep-input').val();

    if (!cep) {
      alert('O CEP deve ser informado.');
      return;
    } else if (cep && !isLoading) {
      isLoading = true;
      $('#input-cep-btn').attr('disabled', true);
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
        // Only will work on Checkout
        const order = await getOrderForm();

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

        $('#mostrar-datas-datepicker').datepicker('setDate', minDate);
        $('#mostrar-datas-datepicker').datepicker('refresh');

        $('#mostrar-datas-datepicker').css('height', '228px');
      } catch (err) {
        $('#aviso-servico-movel')
          .show()
          .html('Não conseguimos consultar a sua região, tente novamente.');

        console.log(err);
      } finally {
        isLoading = false;
        $('.loading-dates').hide();
        $('#input-cep-btn').attr('disabled', false);
      }
    }
  });

  window.dispatchEvent(event);

  function getAvailableDays(request) {
    return new Promise((resolve, reject) => {
      $.ajax({
        contentType: "application/json",
        crossDomain: true,
        jsonp: false,
        type: "POST",
        url: `${baseUrlApi}agendamento/servico-movel/disponibilidades`,
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
        if (day.Feriado || !day.TemRota || day.SituacaoRota.Value === 'Fechada')
          return [false];

        if (day.SituacaoRota.Value === 'Aberta')
          return [true];
      }
    }

    return [false];
  }
});
