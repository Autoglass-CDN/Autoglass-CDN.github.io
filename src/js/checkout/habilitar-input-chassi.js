function HabilitarChassi() {
    function itemStartWith(item){
        const items = vtexjs.checkout.orderForm.items
        return items.some(x => x.name.startsWith(item));
    }
    
    const temInsumoInstalacao = itemStartWith('Insumos para instalação');
    const temParabrisa = itemStartWith('Parabrisa');
    const temVigia = itemStartWith('Vidro Traseiro');
    const temVidroPorta = itemStartWith('Vidro Porta');
    const temVidroJanela = itemStartWith('Vidro Janela');
    
    if(temInsumoInstalacao){
        if(temParabrisa || temVigia || temVidroPorta || temVidroJanela){
            $('.vtex-omnishipping-1-x-addressForm').append(` <div id="inform-chassi"></div> `)        
            $('#inform-chassi').append(` <label for="chassi">Chassi (Opcional)</label> `)
            $('#inform-chassi').append(` <input type="text" maxlength="8" id="input-chassi"
            placeholder="8 últimos números" 
            pattern="[A-Za-z0-9]{8}">`)
        }
    }
     $('#inform-chassi').on('keyup',(e) => {
        console.log(e);
        let inputChassi = document.getElementById("input-chassi");
        $('#inform-chassi').removeClass('valido');
        $('#inform-chassi').removeClass('invalido');
        const newClass = testarSeChassiValido(inputChassi.value) ? 'valido' : 'invalido';
        $('#inform-chassi').addClass(newClass);
        if (inputChassi.value == "") $('#inform-chassi').removeClass('invalido');
        updateValorChassi();
        updateValorChassiInvalido()
     })
}

function testarSeChassiValido (chassi) {
    let tamanhoInputChassi = chassi.length;
    var regex = /^[a-zA-Z0-9]+[0-9]{6}$/;
    return tamanhoInputChassi == 8 && regex.test(chassi) ? true : false;
}

function ConfigureObserver() {
    var target = document.querySelector('#shipping-data');
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            isChassiDisabled = $('#inform-chassi').length == 0;
            if (mutation.type == 'childList' && mutation.addedNodes.length > 0 && isChassiDisabled)
                HabilitarChassi();
            console.log(mutation);
        });
    });
    var config = {childList: true, subtree:true};
    observer.observe(target, config);
}

function updateValorChassi() {
    localStorage.setItem("valorChassi", $('#inform-chassi.valido input')[0]? $('#inform-chassi.valido input')[0].value : '')
}

function updateValorChassiInvalido() {
    localStorage.setItem("valorChassiInvalido", $('#inform-chassi:not(.valido) input')[0]? $('#inform-chassi:not(.valido) input')[0].value : '')
}

HabilitarChassi();
ConfigureObserver();

    
        
        
    
    
    

