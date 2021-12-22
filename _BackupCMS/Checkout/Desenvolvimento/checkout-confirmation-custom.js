// dev2autoglass //

// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE.
// THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.

//<!-- Facebook Pixel Code -->
!function (f, b, e, v, n, t, s) {
  if (f.fbq) return; n = f.fbq = function () {
    n.callMethod ?
      n.callMethod.apply(n, arguments) : n.queue.push(arguments)
  };
  if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
  n.queue = []; t = b.createElement(e); t.async = !0;
  t.src = v; s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s)
}(window, document, 'script',
  'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '674711539752032');
fbq('track', 'PageView');


var ConfirmationOrderMobile = {
  init: function init() {
    ConfirmationOrderMobile.mountTableProducts();
  },
  mountTableProducts: function mountTableProducts() {
    setTimeout(function () {
      var tableCopy = $('.cconf-product-table').clone();
      $('.cconf-summary h3').after(tableCopy);
    }, 1000);
  },
};

$(document).ready(function () {
  $('#carrinho').addClass('active');
  $('#identificacao').addClass('active');
  $('#entrega').addClass('active');
  $('#pagamento').addClass('active');
  $('.carrinho-line').addClass('active');
  $('.identificacao-line').addClass('active');
  $('.entrega-line').addClass('active');
});


const CONFIG_GLOBAL = {
  STORAGE: {
    DELIVERY: 'AG_SelectedDaySM',
    PICKUP_IN_POINT: 'AG_SelectedHour',
  }
}

// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE.
// THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.

function loadScript(src, callback) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      //IE
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          resolve();
        } else {
          reject()
        }
      };
    } else {
      //Others
      script.onload = function () {
        resolve();
      };
    }

    script.src = src;
    callback && callback(script);
    document.getElementsByTagName("head")[0].appendChild(script);
  });
}

async function loadScripts(data) {
  await loadScript("/scripts/jquery.ui.core.js");
  await loadScript("/arquivos/jquery.cookie.js");
  await loadScript('/scripts/jquery.maskedinput-1.2.2.js');
  await loadScript("//io.vtex.com.br/vtex.js/2.0.0/vtex.min.js");

  $.cookie("mzLocationUF", data.shippingData.address.state);

  await loadScript("/arquivos/jquery-ui.datepicker.js");
  await loadScript("https://autoglass-cdn.github.io/src/js/consulta-agendamento.js");
  await loadScript(
    "https://static.zdassets.com/ekr/snippet.js?key=126e916b-310a-4833-a582-4c72f3d0e32c",
    script => script.id = "ze-snippet"
  );

  loadScript('https://autoglass-cdn.github.io/src/js/cookie.bot.js');
}

const Installment = {
  'pickup-in-point': (diaSelecionado) => {
    const agendamentoLojaService = AgendamentoLojaService();

    if (diaSelecionado &&
      (new Date()).toLocaleDateString() === diaSelecionado._createAt.toLocaleDateString()) {
      agendamentoLojaService.solicitarAgendamentoNovo(diaSelecionado);
      return;
    }

    $(".agendamento-instalacao").removeClass("hidden");

    $("body").on("DOMSubtreeModified", ".store-list", function () {
      $(".timestamp").on("click").unbind();
      $(".timestamp").on("click", function () {
        $(".timestamp.active").removeClass("active");
        $(".store.active").removeClass("active");
        $(this).addClass("active");
        $(this).closest(".store").addClass("active");
        $("#confirmacao-agendamento")
          .hide()
          .empty()
          .append(agendamentoLojaService.textoConfirmacao(
            $("#alterar-data-input").val(),
            $(".timestamp.active").text(),
            $(this)[0].dataset.store
          ))
          .append(agendamentoLojaService.createConfirmationButton())
          .fadeIn(500);
        $(".store:not(.active) .time").addClass("hidden");
        $("html, body").animate({
          scrollTop: $("#confirmacao-agendamento").offset().top - 200,
        }, 500);
      });
    });
  },
  'delivery': (diaSelecionado) => {
    const agendamentoCasaService = AgendamentoCasaService();

    if (diaSelecionado &&
      (new Date()).toLocaleDateString() === diaSelecionado._createAt.toLocaleDateString()) {
      agendamentoCasaService.createAppointmentNew(diaSelecionado.selectedDay);
      return;
    }
    $(".agendamento-servico-movel").removeClass("hidden");

    $('.mz-advantages__content .cep  input')
      .unmask()
      .val(Cliente.CEP);
    $("#confirmacao-servico-movel").html('');
    $('#input-cep-btn').trigger('click');

    //if (!$('#mostrar-datas-datepicker').datepicker("option", "onSelect")) {
      $('#mostrar-datas-datepicker').datepicker(
        "option",
        "onSelect",
        (date) => {
          $("#confirmacao-servico-movel").html('');

          $("#confirmacao-servico-movel")
            .append(agendamentoCasaService.textoConfirmacao(date))
            .append(agendamentoCasaService.createConfirmationButton())
            .fadeIn(500);
        }
      )
    //}

  }
}

var Cliente;

setTimeout(() => {
  let orderId = $("#order-id").text().trim();
  $.ajax({
    jsonp: false,
    url: `/api/checkout/pub/orders/${orderId}`,
    contentType: "application/json",
    type: "GET",
  }).done(function (data) {
    let temInstalacao = data.items.some(
      (item) => item.additionalInfo.brandId == "2000108"
    );

    if (temInstalacao) {
      Cliente = {
        NomeCliente: `${data.clientProfileData.firstName} ${data.clientProfileData.lastName}`,
        CPF: "",
        Email: `${data.clientProfileData.email}`,
        Telefone: `${data.clientProfileData.phone}`,
        Endereco: `${data.shippingData.address.street}, ${data.shippingData.address.number}, ${data.shippingData.address.complement}, ${data.shippingData.address.neighborhood} - ${data.shippingData.address.city} - ${data.shippingData.address.state}`,
        CEP: `${data.shippingData.address.postalCode}`,
      };

      loadScripts(data).then(() => {
        const installment_type = data.shippingData.logisticsInfo[0].selectedDeliveryChannel;
        calculateAvailableAppointmentDate(data, installment_type);

        const diaSelecionado = JSON.parse(localStorage.getItem(CONFIG_GLOBAL.STORAGE[installment_type.toUpperCase()]));

        if (diaSelecionado) {
          diaSelecionado._createAt = new Date(diaSelecionado._createAt);
        }

        Installment[installment_type](diaSelecionado);
      });
    }
  });
}, 1000);


function calculateAvailableAppointmentDate(data, installment_type) {
  const { days } = getShippingEstimate(data.shippingData);

  const estimateDate = new Date();
  estimateDate.setDate(estimateDate.getDate() + parseInt(days) + 1);

  const minDate = new Date();
  minDate.setDate(estimateDate.getDate() + (estimateDate.getDay() === 6 ? 2 : 1));

  switch (installment_type) {
    case 'pickup-in-point':
      $(".secao-agendamento > .store-list > .filter > .data input")
        .datepicker("option", "minDate", minDate);
      break;
    case 'delivery':
      $('#mostrar-datas-datepicker')
        .datepicker("option", "minDate", minDate);
      break;
    default:
      console.error('Type no finded.')
      break;
  }
}

function getShippingEstimate(shippingData) {
  const [adressSelect] = shippingData.logisticsInfo;
  const selectedSla = adressSelect.selectedSla;
  const sla = adressSelect.slas.find(x => x.id === selectedSla || x.name === selectedSla);

  const [, days, type] = sla.shippingEstimate.match(/(\d+)(\w+)/);

  return { days, type }
}

function AgendamentoLojaService() {
  return {
    textoConfirmacao,
    createConfirmationButton,
    solicitarAgendamentoNovo
  }

  function textoConfirmacao(data, hora, loja) {
    return `
    <p>Você selecionou
      <span class="agendamento">
        <span id="agendamento-data">${data}</span> às
        <span id="agendamento-hora">${hora}</span> na
        <span id="agendamento-loja">${loja}</span>
      </span>.
      <br>
      <strong>Deseja confirmar o agendamento da instalação para essa data/horário?</strong>
    </p>`;
  }

  function createConfirmationButton() {
    let btn = document.createElement("button");
    btn.id = "btn-confirmar-agendamento";
    btn.innerText = "Agendar";
    $(btn).on("click", solicitarAgendamento);

    return btn;
  }

  function solicitarAgendamento() {
    let body = { ...agendamento(), Cliente };
    $(".agendamento-instalacao").addClass("hidden");
    $("#loader").removeClass("hidden");
    $("html, body").animate(
      {
        scrollTop: $("#loader").offset().top - 200,
      },
      500
    );

    return $.ajax({
      crossDomain: true,
      jsonp: false,
      url: "https://api.autoglass.com.br/integracao-b2c/api/web-app/agendamentos",
      contentType: "application/json",
      type: "POST",
      data: JSON.stringify(body),
    }).done(function () {
      $(".msg-agendamento")
        .removeClass("hidden erro")
        .addClass("info")
        .html(
          `<h3>Sua solicitação foi enviada!</h3><p>O agendamento de instalação em <strong>${$("#agendamento-loja")
            .text().trim()
          }</strong>, no dia <strong>${$("#agendamento-data")
            .text().trim()
          }</strong> às <strong>${$("#agendamento-hora")
            .text().trim()
          }</strong> foi solicitado.</p> <p><strong>Fique ligado, podemos entrar em contato para confirmar alguns dados ou solucionar eventuais problemas.</strong></p>`
        );
      $("#loader").addClass("hidden");
    }).fail(function (err) {
      $(".msg-agendamento")
        .removeClass("hidden info")
        .addClass("erro")
        .html(
          `<h3>Erro no agendamento</h3><p>${err.Message ||
          "Ocorreu um erro não identificado na solicitação de agendamento. Fique tranquilo, nossos consultores estrarão em contato por telefone para concluir o agendamento. Se preferir, tente novamente ou <strong><a href=\"javascript:$zopim.livechat.window.show();\">clique aqui</a></strong> e fale conosco pelo chat.</strong>."
          }</p>`
        );
      $(".agendamento-instalacao").removeClass("hidden");
      $("#loader").addClass("hidden");
    });
  }

  function agendamento() {
    return {
      CodigoPedidoVTEX: $("#order-id").text(),
      Unidade: $("#agendamento-loja").text().trim(),
      DataInstalacao: $("#agendamento-data").text().trim(),
      HoraInstalacao: $("#agendamento-hora").text().trim(),
    };
  }

  function solicitarAgendamentoNovo(selected) {
    const [year, month, day] = selected.date.split('-');

    let body = {
      CodigoPedidoVTEX: $("#order-id").text(),
      Unidade: selected.loja,
      DataInstalacao: `${day}/${month}/${year}`,
      HoraInstalacao: selected.horario,
      Cliente
    };

    $(".agendamento-instalacao").addClass("hidden");
    $("#loader").removeClass("hidden");
    $("html, body").animate(
      {
        scrollTop: $("#loader").offset().top - 200,
      },
      500
    );

    return $.ajax({
      crossDomain: true,
      jsonp: false,
      url: "https://api.autoglass.com.br/integracao-b2c/api/web-app/agendamentos",
      contentType: "application/json",
      type: "POST",
      data: JSON.stringify(body),
    }).done(function () {
      $(".msg-agendamento")
        .removeClass("hidden erro")
        .addClass("info")
        .html(
          `<h3>Sua solicitação foi enviada!</h3><p>O agendamento de instalação em <strong>${$("#agendamento-loja")
            .text().trim()
          }</strong>, no dia <strong>${$("#agendamento-data")
            .text().trim()
          }</strong> às <strong>${$("#agendamento-hora")
            .text().trim()
          }</strong> foi solicitado.</p> <p><strong>Fique ligado, podemos entrar em contato para confirmar alguns dados ou solucionar eventuais problemas.</strong></p>`
        );
      $("#loader").addClass("hidden");
    }).fail(function (err) {
      $(".msg-agendamento")
        .removeClass("hidden info")
        .addClass("erro")
        .html(
          `<h3>Erro no agendamento</h3><p>${err.Message ||
          "Ocorreu um erro não identificado na solicitação de agendamento. Fique tranquilo, nossos consultores estrarão em contato por telefone para concluir o agendamento. Se preferir, tente novamente ou <strong><a href=\"javascript:$zopim.livechat.window.show();\">clique aqui</a></strong> e fale conosco pelo chat.</strong>."
          }</p>`
        );
      $("#loader").addClass("hidden");
    });
  }
}

function AgendamentoCasaService() {
  return {
    textoConfirmacao,
    createConfirmationButton,
    createAppointmentNew
  };

  function crateAppointment() {
    let body = { ...appointment(), Cliente };
    $(".agendamento-servico-movel").addClass("hidden");
    $("#loader").removeClass("hidden");
    $("html, body").animate(
      {
        scrollTop: $("#loader").offset().top - 200,
      },
      500
    );

    return $.ajax({
      crossDomain: true,
      jsonp: false,
      url: "https://api.autoglass.com.br/integracao-b2c/api/web-app/agendamentos/servicos-moveis",
      contentType: "application/json",
      type: "POST",
      data: JSON.stringify(body),
    }).done(function () {
      $(".msg-agendamento")
        .removeClass("hidden erro")
        .addClass("info")
        .html(
          `<h3>Sua solicitação foi enviada!</h3>
          <p>O agendamento de instalação, no dia <strong>
            ${$("#agendamento-data").text().trim()}
          </strong>, foi solicitado.
          </p>
          <p><strong>Fique ligado, podemos entrar em contato para confirmar alguns dados ou solucionar eventuais problemas.</strong></p>`
        );
      $("#loader").addClass("hidden");
    }).fail(function (err) {
      $(".msg-agendamento")
        .removeClass("hidden info")
        .addClass("erro")
        .html(
          `<h3>Erro no agendamento</h3><p>${err.Message ||
          "Ocorreu um erro não identificado na solicitação de agendamento. Fique tranquilo, nossos consultores estrarão em contato por telefone para concluir o agendamento. Se preferir, tente novamente ou <strong><a href=\"javascript:$zopim.livechat.window.show();\">clique aqui</a></strong> e fale conosco pelo chat.</strong>."
          }</p>`
        );
      $(".agendamento-servico-movel").removeClass("hidden");
      $("#loader").addClass("hidden");
    });
  }

  function textoConfirmacao(data) {
    return `
    <p>Você selecionou
      <span class="agendamento">
        <span id="agendamento-data">${data}</span>
      </span>.
      <br>
      <strong>Deseja confirmar o agendamento da instalação para esse dia?</strong>
    </p>`;
  }

  function createConfirmationButton() {
    let btn = document.createElement("button");
    btn.id = "btn-confirmar-agendamento";
    btn.innerText = "Agendar";
    $(btn).on("click", crateAppointment);

    return btn;
  }

  function appointment() {
    return {
      CodigoPedidoVTEX: $("#order-id").text(),
      DataInstalacao: $("#agendamento-data").text().trim(),
    };
  }

  function createAppointmentNew(diaSelecionado) {
    let body = {
      CodigoPedidoVTEX: $("#order-id").text(),
      DataInstalacao: diaSelecionado,
      Cliente
    };

    $(".agendamento-servico-movel").addClass("hidden");
    $("#loader").removeClass("hidden");
    $("html, body").animate(
      {
        scrollTop: $("#loader").offset().top - 200,
      },
      500
    );

    return $.ajax({
      crossDomain: true,
      jsonp: false,
      url: "https://api.autoglass.com.br/integracao-b2c/api/web-app/agendamentos/servicos-moveis",
      contentType: "application/json",
      type: "POST",
      data: JSON.stringify(body),
    }).done(function () {
      $(".msg-agendamento")
        .removeClass("hidden erro")
        .addClass("info")
        .html(
          `<h3>Sua solicitação foi enviada!</h3>
          <p>O agendamento de instalação, no dia <strong>
            ${diaSelecionado}
          </strong>, foi solicitado.
          </p>
          <p><strong>Fique ligado, podemos entrar em contato para confirmar alguns dados ou solucionar eventuais problemas.</strong></p>`
        );
      $("#loader").addClass("hidden");
    }).fail(function (err) {
      $(".msg-agendamento")
        .removeClass("hidden info")
        .addClass("erro")
        .html(
          `<h3>Erro no agendamento</h3><p>${err.Message ||
          "Ocorreu um erro não identificado na solicitação de agendamento. Fique tranquilo, nossos consultores estrarão em contato por telefone para concluir o agendamento. Se preferir, tente novamente ou <strong><a href=\"javascript:$zopim.livechat.window.show();\">clique aqui</a></strong> e fale conosco pelo chat.</strong>."
          }</p>`
        );
      $("#loader").addClass("hidden");
    });
  }
}


/*
function loadScript(src, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    //IE
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    //Others
    script.onload = function () {
      callback();
    };
  }

  script.src = src;
  document.getElementsByTagName("head")[0].appendChild(script);
}

var dadosCompra, Cliente;

setTimeout(() => {
  $.ajax({
    jsonp: false,
    url: `/api/checkout/pub/orders/${$("#order-id").text().trim()}`,
    contentType: "application/json",
    type: "GET",
  }).done(function (data) {
    dados = data;
    let temInstalacao = data.items.some(
      (item) => item.additionalInfo.brandId == "2000108"
    );

    if (temInstalacao) {
      Cliente = {
        NomeCliente: `${data.clientProfileData.firstName} ${data.clientProfileData.lastName}`,
        CPF: "",
        Email: `${data.clientProfileData.email}`,
        Telefone: `${data.clientProfileData.phone}`,
        Endereco: `${data.shippingData.address.street}, ${data.shippingData.address.number}, ${data.shippingData.address.complement}, ${data.shippingData.address.neighborhood} - ${data.shippingData.address.city} - ${data.shippingData.address.state}`,
        CEP: `${data.shippingData.address.postalCode}`,
      };

      loadScript("/scripts/jquery.ui.core.js", () =>
        loadScript("/arquivos/jquery.cookie.js", () => {
          $.cookie("mzLocationUF", data.shippingData.address.state);
          loadScript("/arquivos/jquery-ui.datepicker.js", () =>
            loadScript("/arquivos/consulta-agendamento.dev.js", () => {
              calculateAvailableAppointmentDate(data);

              $(".agendamento-instalacao").removeClass("hidden");

              $("body").on("DOMSubtreeModified", ".store-list", function () {
                $(".timestamp").on("click").unbind();
                $(".timestamp").on("click", function () {
                  $(".timestamp.active").removeClass("active");
                  $(".store.active").removeClass("active");
                  $(this).addClass("active");
                  $(this).closest(".store").addClass("active");
                  $("#confirmacao-agendamento")
                    .hide()
                    .empty()
                    .append(
                      textoConfirmacao(
                        $("#alterar-data-input").val(),
                        $(".timestamp.active").text(),
                        $(this).closest(".store").find(".store-name").text()
                      )
                    )
                    .append(createConfirmationButton())
                    .fadeIn(500);

                  $(".store:not(.active) .time").addClass("hidden");
                  $("html, body").animate(
                    {
                      scrollTop:
                        $("#confirmacao-agendamento").offset().top - 200,
                    },
                    500
                  );
                });
              });
            })
          );
        })
      );
    }
  });

let script = document.createElement("script");
  script.type = "text/javascript";

  script.src = "https://static.zdassets.com/ekr/snippet.js?key=126e916b-310a-4833-a582-4c72f3d0e32c";
  script.id = "ze-snippet";
  document.getElementsByTagName("head")[0].appendChild(script);

}, 1000);

function textoConfirmacao(data, hora, loja) {
  return `<p>Você selecionou <span class="agendamento"><span id="agendamento-data">${data}</span> às <span id="agendamento-hora">${hora}</span> na <span id="agendamento-loja">${loja}</span></span>.
      <br>
      <strong>Deseja confirmar o agendamento da instalação para essa data/horário?</strong>
    </p>`;
}

function createConfirmationButton() {
  let btn = document.createElement("button");
  btn.id = "btn-confirmar-agendamento";
  btn.innerText = "Agendar";
  $(btn).on("click", solicitarAgendamento);

  return btn;
}

function solicitarAgendamento() {
  let body = { ...agendamento(), Cliente };
  $(".agendamento-instalacao").addClass("hidden");
  $("#loader").removeClass("hidden");
  $("html, body").animate(
    {
      scrollTop: $("#loader").offset().top - 200,
    },
    500
  );

  return $.ajax({
    crossDomain: true,
    jsonp: false,
    url: "https://api.autoglass.com.br/integracao-b2c/api/web-app/agendamento",
    contentType: "application/json",
    type: "POST",
    data: JSON.stringify(body),
  })
    .done(function (data) {
      $(".msg-agendamento")
        .removeClass("hidden erro")
        .addClass("info")
        .html(
          `<h3>Sua solicitação foi enviada!</h3><p>O agendamento de instalação em <strong>${$(
            "#agendamento-loja"
          )
            .text()
            .trim()}</strong>, no dia <strong>${$("#agendamento-data")
            .text()
            .trim()}</strong> às <strong>${$("#agendamento-hora")
            .text()
            .trim()}</strong> foi solicitado.</p> <p><strong>Fique ligado, podemos entrar em contato para confirmar alguns dados ou solucionar eventuais problemas.</strong></p>`
        );
      $("#loader").addClass("hidden");
    })
    .fail(function (err) {
      $(".msg-agendamento")
        .removeClass("hidden info")
        .addClass("erro")
        .html(
          `<h3>Erro no agendamento</h3><p>${
            err.Message ||
            "Ocorreu um erro não identificado na solicitação de agendamento. Fique tranquilo, nossos consultores estrarão em contato por telefone para concluir o agendamento. Se preferir, tente novamente ou <strong><a href=\"javascript:$zopim.livechat.window.show();\">clique aqui</a></strong> e fale conosco pelo chat.</strong>."
          }</p>`
        );
      $(".agendamento-instalacao").removeClass("hidden");
      $("#loader").addClass("hidden");
    });
}

function agendamento() {
  return {
    CodigoPedidoVTEX: $("#order-id").text(),
    Unidade: $("#agendamento-loja").text().trim(),
    DataInstalacao: $("#agendamento-data").text().trim(),
    HoraInstalacao: $("#agendamento-hora").text().trim(),
  };
}


function calculateAvailableAppointmentDate(data) {
  const { days } = getShippingEstimate(data.shippingData);

  const estimateDate = new Date();
  estimateDate.setDate(estimateDate.getDate() + parseInt(days) + 1);

  const minDate = new Date();
  minDate.setDate(estimateDate.getDate() + (estimateDate.getDay() === 6 ? 2 : 1));

  $(".secao-agendamento > .store-list > .filter > .data input").datepicker("option", "minDate", minDate);
}

function getShippingEstimate(shippingData) {
  const [adressSelect] = shippingData.logisticsInfo;
  const selectedSla = adressSelect.selectedSla;
  const sla = adressSelect.slas.find(x => x.id === selectedSla || x.name === selectedSla);

  const [, days, type] = sla.shippingEstimate.match(/(\d+)(\w+)/);

  return { days, type }
}
*/