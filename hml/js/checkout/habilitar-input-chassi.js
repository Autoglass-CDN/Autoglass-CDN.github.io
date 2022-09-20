const velocidadeTransicao = 'fast';

function HabilitarChassi() {
  function itemStartWith(item) {
    const items = vtexjs.checkout.orderForm.items
    return items.some(x => x.name.startsWith(item));
  }

  const temInsumoInstalacao = itemStartWith('Insumos para instalação');
  const temParabrisa = itemStartWith('Parabrisa');
  const temVigia = itemStartWith('Vidro Traseiro');
  const temVidroPorta = itemStartWith('Vidro Porta');
  const temVidroJanela = itemStartWith('Vidro Janela');

  if(temInsumoInstalacao) {
    if(temParabrisa || temVigia || temVidroPorta || temVidroJanela) {
      $('.vtex-omnishipping-1-x-addressForm').append(` <div id="inform-chassi"></div> `);
      $('#inform-chassi').append(` <label for="input-chassi">Chassi (Opcional)</label> `);
      $('#inform-chassi').append(` <input type="text" maxlength="8" id="input-chassi"
      placeholder="8 últimos dígitos" pattern="[A-Za-z0-9]{8}">`);
      $('#inform-chassi').append(` <div class="container-orientacao-chassi"> <a id="onde-encontrar-chassi";
      >onde encontrar?</a> </div> `);
    }
  }

  $('#inform-chassi').on('keyup',(e) => {
    let inputChassi = document.getElementById("input-chassi");
    $('#inform-chassi').removeClass('valido');
    $('#inform-chassi').removeClass('invalido');
    const newClass = testarSeChassiValido(inputChassi.value) ? 'valido' : 'invalido';
    $('#inform-chassi').addClass(newClass);
    if (inputChassi.value == "") $('#inform-chassi').removeClass('invalido');
    updateValorChassi();
    updateValorChassiInvalido();
  });
}

function testarSeChassiValido (chassi) {
  let tamanhoInputChassi = chassi.length;
  var regex = /^[a-zA-Z0-9]+[0-9]{6}$/;
  return (tamanhoInputChassi == 8 && regex.test(chassi));
}

function ConfigureObserver() {
  var target = document.querySelector('#shipping-data');
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      isChassiDisabled = $('#inform-chassi').length == 0;
      if (mutation.type == 'childList' && mutation.addedNodes.length > 0 && isChassiDisabled)
        HabilitarChassi();
    });
  });
  var config = {childList: true, subtree:true};
  observer.observe(target, config);
}

function updateValorChassi() {
  localStorage.setItem("valorChassi", $('#inform-chassi.valido input')[0]? $('#inform-chassi.valido input')[0].value : '');
}

function updateValorChassiInvalido() {
  localStorage.setItem("valorChassiInvalido", $('#inform-chassi:not(.valido) input')[0]? $('#inform-chassi:not(.valido) input')[0].value : '');
}

$("body").on('mouseover', ".container-orientacao-chassi", function(){
  showOrientacaoChassi();
});

$("body").on('mouseleave', ".container-orientacao-chassi", function(){
  $(".container-image-orientacao-chassi").fadeOut(velocidadeTransicao);
});

function showOrientacaoChassi() {
  let containerImgVisible = $('.container-image-orientacao-chassi:visible');
  let containerImgHidden = $('.container-image-orientacao-chassi:hidden');
  if(containerImgVisible.length === 0 && containerImgHidden.length === 0){
    $(".container-orientacao-chassi").append("<div class='container-image-orientacao-chassi'> <div class='ponta'></div> <img id='image-orientacao-chassi' src='https://autoglass-cdn.github.io/hml/img/checkout/orientacao-chassi.png'></div>")
    $(".container-image-orientacao-chassi").fadeIn(velocidadeTransicao);
  }
  else if(containerImgHidden.length === 1) {
    $(".container-image-orientacao-chassi").fadeIn(velocidadeTransicao);
  }
}

HabilitarChassi();
ConfigureObserver();
