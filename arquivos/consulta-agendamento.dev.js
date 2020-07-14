var codCidades = {
  SE: { code: "8529", nome: "Sergipe" },
  // TO: { cod: "77066356", nome: "Tocantins" },
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

$(function () {
  const hmlCodServico = "17";
  const baseUrlApi = window.location.href.includes("dev")
    ? "https://api-hml.autoglass.com.br/integracao-b2c/api/web-app/agendamento"
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
      url: `${baseUrlApi}/horarios-lojas?Data=${
        $(".secao-agendamento .data input")
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
		  <button class="btn-ver-horarios ${
        store.Horarios.filter((h) => h.Disponibilidade.Value !== "Nao").length >
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
    return `<div style="
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
