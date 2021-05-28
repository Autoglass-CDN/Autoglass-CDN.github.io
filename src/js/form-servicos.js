class Utils {
    static onlyAlphabet(value) {
        const extractAlphabet = value.replace(/[^A-Z ]/gi, '');
      
        return extractAlphabet;
      }
      
      static onlyNumber(value) {
        const extractNumbers = value.replace(/[^0-9]/gi, '');
      
        return extractNumbers;
      }
      
      static maskPhone(value) {
        const removedMask = value.replace(/[^0-9]/gi, '');
        let resultado;
        if (removedMask.length === 11)
          resultado = removedMask.replace(
            /(\d{2})(\d{1})(\d{4})(\d{4})/,
            '($1) $2 $3-$4'
          );
        else resultado = removedMask.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        return resultado;
      }
      
      static maskLicensePlate(value) {
        const removedMask = value.replace(/[^A-Z0-9]/gi, '');
      
        return removedMask;
      }    
}

class DetalhamentoDePeçaDanificada {
    static init() {
        adicionaEventoRadioButtons();

        function adicionaEventoRadioButtons() {
            const buttonsRadio = document.querySelectorAll(".button-radio input[name=estado-da-peca]");
            
            for (const button of buttonsRadio) {
                button.addEventListener("click", clickButtonRadio);
            }
        }
    
        function clickButtonRadio(evento) {
            const { target: elemento } = evento;
    
            if(Boolean(elemento.value=="true"))
                mostrar();
            else
                ocultar();
        }
    
        function mostrar() {
            const maisOpcoesDaPeca = document.querySelector(".container-de-opcoes .estado-da-peca .mais-opcoes-da-peca");
            maisOpcoesDaPeca.classList.remove("esconder");
        }
    
        function ocultar() {
            const maisOpcoesDaPeca = document.querySelector(".container-de-opcoes .estado-da-peca .mais-opcoes-da-peca");
            maisOpcoesDaPeca.classList.add("esconder");
        }
    }
}

class ValidacaoDeInput {
    static init() {
        const groupoDeInputsFormaDeValidacao = {
            placa: (value) => {
                return Utils.maskLicensePlate(value);
            },
            nome: (value) => {
                return Utils.onlyAlphabet(value);
            },
            cidade: (value) => {
                return Utils.onlyAlphabet(value);
            },
            celular: (value) => {
                return Utils.maskPhone(value);
            },
        }

        addEventOnChange();
    
        function addEventOnChange(){
            for (const key in groupoDeInputsFormaDeValidacao) {
                const input = document.querySelector(`#${key}`);
                input.addEventListener("keyup",validandoDigitacao)
            }
        }


        function validandoDigitacao(evento) {
            const { target } = evento;
            target.value = groupoDeInputsFormaDeValidacao[target.id](target.value);
        }
    }
}

class Select2 {
    static init() {
        selecaoDaPeca();

        function selecaoDaPeca() {
            $(document).ready(function() {
                $('.selecao-de-pecas').select2({
                    placeholder: 'Escolha o(s) item(s)',
                    allowClear: true
                });
            });
        }
    }
}

class FomSubmit {
    // Analisar implementação.
}

(function(){ 
    DetalhamentoDePeçaDanificada.init();
    ValidacaoDeInput.init();
    Select2.init();
})();