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
            const buttonsRadioEstadoPeca = document.querySelectorAll(".button-radio input[name=estado-da-peca]");
            for (const button of buttonsRadioEstadoPeca) {
                button.addEventListener("click", clickButtonRadioEstadoPeca);
            }

            const buttonsRadioMedidaDano = document.querySelectorAll(".mais-opcoes-da-peca input[name=dimensao-do-dano]");
            for (const button of buttonsRadioMedidaDano) {
                button.addEventListener("click", clickButtonRadioMedidaDano);
            }
        }
    
        function clickButtonRadioEstadoPeca(evento) {
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


        function clickButtonRadioMedidaDano(evento) {
            const { target: elemento } = evento;
    
            if(elemento.value=="Acima de 30 cm")
                ocultarPinturaCompleta();
            else
                mostrarPituraCompleta();
        }

        function mostrarPituraCompleta() {
            const maisOpcoesDaPeca = document.querySelector(".container-de-opcoes .estado-da-peca .mais-opcoes-da-peca .pintura-completa");
            maisOpcoesDaPeca.classList.remove("esconder");
        }

        function ocultarPinturaCompleta() {
            const maisOpcoesDaPeca = document.querySelector(".container-de-opcoes .estado-da-peca .mais-opcoes-da-peca .pintura-completa");
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

class FormSubmit {
    // Analisar implementação.
    static init() {

        adicionaEventoSubmit();

        function adicionaEventoSubmit() {
            const button = document.querySelector(".form-servico__content-submit .button.btn-confirm");
            button.addEventListener('click', event => {
                event.preventDefault();
                const orcamento = buildOrcamento();

                const response = sendOrcamento(url, orcamento);
                
                console.log(response)
            });

        }

        function buildOrcamento() {
            // obtendo elementos
            const servicoElm = document.querySelector('#nome-servico');
            const nomeElm = document.querySelector('#nome');
            const cidadeElm = document.querySelector('#cidade');
            const estadoElm = document.querySelector('#estados');
            const celularElm = document.querySelector('#celular');
            const emailElm = document.querySelector('#email');
            const placaDoVeiculoElm = document.querySelector('#placa');
            
            let pecasDoVeiculoElm = document.querySelectorAll('.select2-selection__choice');
            pecasDoVeiculoElm = Array.from(pecasDoVeiculoElm);
            
            const corDaPinturaElm = document.querySelector('input[name="tipo-da-cor"]:checked')
            const pecaDanificadaElm = document.querySelector('input[name="estado-da-peca"]:checked')
            const tipoDeDanoElm = document.querySelector('input[name="tipo-de-dano"]:checked')
            const medidaDoDanoElm = document.querySelector('input[name="dimensao-do-dano"]:checked')
            const pinturaCompletaElm = document.querySelector('input[name="pintura-completa"]:checked')


            // obtendo valores
            const Servico = servicoElm.textContent;
            const Nome = nomeElm.value;
            const Cidade = cidadeElm.value;
            const Estado = estadoElm.value;
            const Celular = celularElm.value;
            const Email = emailElm.value;
            const PlacaDoVeiculo = placaDoVeiculoElm.value;
            const PecasDoVeiculo = pecasDoVeiculoElm.map(peca => peca.title);
            const CorDaPintura = corDaPinturaElm ? corDaPinturaElm.value : "";
            const PecaDanificada = pecaDanificadaElm ? pecaDanificadaElm.value == "true" : "";
            const TipoDeDano = tipoDeDanoElm ? tipoDeDanoElm.value : "";
            const MedidaDoDano = medidaDoDanoElm ? medidaDoDanoElm.value : "";
            const PinturaCompletaDaPeca = pinturaCompletaElm ? pinturaCompletaElm.value == "Sim" : "";
            const DataHora = new Date();
            

            const orcamento = {
                Servico,
                "Solicitante": {
                  Nome,
                  Cidade,
                  Estado,
                  Celular,
                  Email
                },
                PlacaDoVeiculo,
                PecasDoVeiculo,
                CorDaPintura,
                PecaDanificada,
                TipoDeDano,
                MedidaDoDano,
                PinturaCompletaDaPeca,
                DataHora
            };

            return JSON.stringify(orcamento);
        }

        async function sendOrcamento(url, request){
            return response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: request
            })
        }
    }
}

(function(){ 
    DetalhamentoDePeçaDanificada.init();
    ValidacaoDeInput.init();
    Select2.init();
    FormSubmit.init();
})();