class Utils {
    static onlyAlphabet(value) {
        const extractAlphabet = value.replace(/[^A-Z ]/gi, "");

        return extractAlphabet;
    }

    static onlyNumber(value) {
        const extractNumbers = value.replace(/[^0-9]/gi, "");

        return extractNumbers;
    }

    static maskPhone(value) {
        const removedMask = value.replace(/[^0-9]/gi, "");
        let resultado;
        if (removedMask.length === 11)
            resultado = removedMask.replace(
                /(\d{2})(\d{1})(\d{4})(\d{4})/,
                "($1) $2 $3-$4"
            );
        else
            resultado = removedMask.replace(
                /(\d{2})(\d{4})(\d{4})/,
                "($1) $2-$3"
            );
        return resultado;
    }

    static maskLicensePlate(value) {
        const removedMask = value.replace(/[^A-Z0-9]/gi, "");

        return removedMask;
    }
}

class DetalhamentoDePeçaDanificada {
    static init() {
        adicionaEventoRadioButtons();

        function adicionaEventoRadioButtons() {
            const buttonsRadioEstadoPeca = document.querySelectorAll(
                ".button-radio input[name=estado-da-peca]"
            );
            for (const button of buttonsRadioEstadoPeca) {
                button.addEventListener("click", clickButtonRadioEstadoPeca);
            }

            const buttonsRadioMedidaDano = document.querySelectorAll(
                ".mais-opcoes-da-peca input[name=dimensao-do-dano]"
            );
            for (const button of buttonsRadioMedidaDano) {
                button.addEventListener("click", clickButtonRadioMedidaDano);
            }
        }

        function clickButtonRadioEstadoPeca(evento) {
            const { target: elemento } = evento;

            if (Boolean(elemento.value == "true")) mostrar();
            else ocultar();
        }

        function mostrar() {
            const maisOpcoesDaPeca = document.querySelector(
                ".container-de-opcoes .estado-da-peca .mais-opcoes-da-peca"
            );
            maisOpcoesDaPeca.classList.remove("esconder");
        }

        function ocultar() {
            const maisOpcoesDaPeca = document.querySelector(
                ".container-de-opcoes .estado-da-peca .mais-opcoes-da-peca"
            );
            maisOpcoesDaPeca.classList.add("esconder");
        }

        function clickButtonRadioMedidaDano(evento) {
            const { target: elemento } = evento;

            if (elemento.value == "Acima de 30 cm") ocultarPinturaCompleta();
            else mostrarPituraCompleta();
        }

        function mostrarPituraCompleta() {
            const maisOpcoesDaPeca = document.querySelector(
                ".container-de-opcoes .estado-da-peca .mais-opcoes-da-peca .pintura-completa"
            );
            maisOpcoesDaPeca.classList.remove("esconder");
        }

        function ocultarPinturaCompleta() {
            const maisOpcoesDaPeca = document.querySelector(
                ".container-de-opcoes .estado-da-peca .mais-opcoes-da-peca .pintura-completa"
            );
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
        };

        addEventOnChange();

        function addEventOnChange() {
            for (const key in groupoDeInputsFormaDeValidacao) {
                const input = document.querySelector(`#${key}`);
                input.addEventListener("keyup", validandoDigitacao);
            }
        }

        function validandoDigitacao(evento) {
            const { target } = evento;
            target.value = groupoDeInputsFormaDeValidacao[target.id](
                target.value
            );
        }
    }
}

class Select2 {
    static init() {
        selecaoDaPeca();

        function selecaoDaPeca() {
            $(document).ready(function () {
                $(".selecao-de-pecas").select2({
                    placeholder: "Escolha o(s) item(s)",
                    allowClear: true,
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
            const button = document.querySelector(
                ".form-servico__content-submit .button.btn-confirm"
            );
            button.addEventListener("click", (event) => {
                event.preventDefault();

                let orcamento = {};
                try {
                    orcamento = buildOrcamento();
                } catch (err) {
                    alert("Por favor, preencha todos os campos");
                    return;
                }

                const response = sendOrcamento(url, orcamento)
                    .then((res) => res)
                    .then((res) => {
                        if (res.status == "200") {
                            alert(
                                "Sua solicitação foi enviada com sucesso! Em breve enviaremos o orçamento para o e-mail informado."
                            );
                            location.reload();
                        } else {
                            alert(
                                "Houve algum problema ao enviar sua solicitação. Pro favor, tente novamente mais tarde."
                            );
                        }
                    })
                    .catch((err) => {
                        // alert(
                        //     "Não foi possível enviar a sua solicitação. Pro favor, tente novamente mais tarde."
                        // );
                        alert("Mensagem de Erro: " + err.message);
                    });
            });
        }

        function buildOrcamento() {
            // obtendo elementos
            const servicoElm = document.querySelector("#nome-servico");
            const nomeElm = document.querySelector("#nome");
            const cidadeElm = document.querySelector("#cidade");
            const estadoElm = document.querySelector("#estados");
            const celularElm = document.querySelector("#celular");
            const emailElm = document.querySelector("#email");
            const placaDoVeiculoElm = document.querySelector("#placa");

            let pecasDoVeiculoElm = document.querySelectorAll(
                ".select2-selection__choice"
            );
            pecasDoVeiculoElm = Array.from(pecasDoVeiculoElm);

            const corDaPinturaElm = document.querySelector(
                'input[name="tipo-da-cor"]:checked'
            );
            const pecaDanificadaElm = document.querySelector(
                'input[name="estado-da-peca"]:checked'
            );
            const tipoDeDanoElm = document.querySelector(
                'input[name="tipo-de-dano"]:checked'
            );
            const medidaDoDanoElm = document.querySelector(
                'input[name="dimensao-do-dano"]:checked'
            );
            const pinturaCompletaElm = document.querySelector(
                'input[name="pintura-completa"]:checked'
            );

            // obtendo valores
            let Servico = "";
            let Nome = "";
            let Cidade = "";
            let Estado = "";
            let Celular = "";
            let Email = "";
            let PlacaDoVeiculo = "";
            let PecasDoVeiculo = [];
            let CorDaPintura = "";
            let PecaDanificada = null;
            let TipoDeDano = "";
            let MedidaDoDano = "";
            let PinturaCompletaDaPeca = null;
            let DataHora = "";

            try {
                Servico = validaString(servicoElm.textContent);
                Nome = validaString(nomeElm.value);
                Cidade = validaString(cidadeElm.value);
                Estado = validaString(estadoElm.value);
                Celular = validaString(celularElm.value);
                Email = validaString(emailElm.value);
                PlacaDoVeiculo = validaString(placaDoVeiculoElm.value);
                PecasDoVeiculo = validaArray(
                    pecasDoVeiculoElm.map((peca) => peca.title)
                );
                CorDaPintura = validaString(
                    corDaPinturaElm ? corDaPinturaElm.value : ""
                );
                PecaDanificada = validaBoolean(
                    pecaDanificadaElm ? pecaDanificadaElm.value == "true" : null
                );

                if (PecaDanificada) {
                    TipoDeDano = validaString(
                        tipoDeDanoElm ? tipoDeDanoElm.value : ""
                    );
                    MedidaDoDano = validaString(
                        medidaDoDanoElm ? medidaDoDanoElm.value : ""
                    );

                    if (MedidaDoDano == "Acima de 30 cm") {
                        PinturaCompletaDaPeca = true;
                    } else {
                        PinturaCompletaDaPeca = validaBoolean(
                            pinturaCompletaElm
                                ? pinturaCompletaElm.value == "Sim"
                                : null
                        );
                    }
                } else {
                    //para não invalidar no back-end quando PecaDanificada é false
                    PinturaCompletaDaPeca = false;
                }
                DataHora = new Date();
                DataHora = new Date(
                    DataHora.valueOf() - DataHora.getTimezoneOffset() * 60000
                );
            } catch (err) {
                throw new Error("Pelo menos um campo está vazio");
            }

            const orcamento = {
                Servico,
                Solicitante: {
                    Nome,
                    Cidade,
                    Estado,
                    Celular,
                    Email,
                },
                PlacaDoVeiculo,
                PecasDoVeiculo,
                CorDaPintura,
                PecaDanificada,
                TipoDeDano,
                MedidaDoDano,
                PinturaCompletaDaPeca,
                DataHora,
            };

            return JSON.stringify(orcamento);
        }

        function validaString(str) {
            if (str == "") {
                throw new Error("Campo vazio");
            } else {
                return str;
            }
        }

        function validaArray(array) {
            if (array.length == 0) {
                throw new Error("Array vazio");
            } else {
                return array;
            }
        }

        function validaBoolean(bool) {
            if (bool == null) {
                throw new Error("Indefinido");
            } else {
                return bool;
            }
        }

        function sendOrcamento(url, req) {
            return fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: req,
            });
        }
    }
}

class AnchorButton {
    static init() {
        adicionaEventoScroll();

        function adicionaEventoScroll() {
            const formElm = document.querySelector("#form-orcamento");
            const anchorElm = document.querySelector("#anchor-form");

            handleWindowScroll(formElm, anchorElm);
            addEventAnchorButtonClick(formElm, anchorElm);
        }

        function handleWindowScroll(formElm, anchorElm) {
            window.onscroll = () => {
                const currentScrollTop = document.documentElement.scrollTop;
                const formOffsetTop = formElm.offsetTop;
                const formHeight = formElm.offsetHeight;

                if (
                    formOffsetTop + formHeight / 2 < currentScrollTop ||
                    formOffsetTop > currentScrollTop + formHeight
                ) {
                    anchorElm.style.display = "block";
                } else {
                    anchorElm.style.display = "none";
                }
            };
        }

        function addEventAnchorButtonClick(formElm, anchorElm) {
            const formOffsetTop = formElm.offsetTop;

            anchorElm.addEventListener("click", () =>
                window.scrollTo(0, formOffsetTop - 200)
            );
        }
    }
}

class Formulario {
    static init() {
        adicionaEventosDeClick();

        function adicionaEventosDeClick() {
            const formulario = document.querySelector("#formulario_js");
            const botaoFechar = document.querySelector("#fechar-modal_js");
            const botoesAbrir = document.querySelectorAll(".abrir-modal_js");
            const modal = document.querySelector("#form-orcamento");

            formulario.addEventListener("click", pararPropagacao);
            botaoFechar.addEventListener("click", () => {
                fecharModal(modal);
            });
            modal.addEventListener("click", () => {
                fecharModal(modal);
            });
            botoesAbrir.forEach((botao) =>
                botao.addEventListener("click", () => {
                    abrirModal(modal);
                })
            );
        }

        function fecharModal(modal) {
            modal.style.display = "none";
        }

        function abrirModal(modal) {
            modal.style.display = "block";
            window.location.href = "#form-orcamento";
        }

        function pararPropagacao(evento) {
            evento.stopPropagation();
        }
    }
}

(function () {
    window.onload = () => {
        DetalhamentoDePeçaDanificada.init();
        ValidacaoDeInput.init();
        Select2.init();
        FormSubmit.init();
        Formulario.init();
    };
})();
