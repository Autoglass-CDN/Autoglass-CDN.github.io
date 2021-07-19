class Utils {
    static onlyAlphabet(value) {
        const extractAlphabet = value.replace(/[^A-Z ]/gi, '');

        return extractAlphabet;
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
}

class Formulario {
    static init() {
        adicionaEventosDeClick();

        function adicionaEventosDeClick() {
            const formulario = document.querySelector('#formulario_js');
            const botaoEnviar = document.querySelector('#enviar-formulario_js');
            const botaoFechar = document.querySelector('#fechar-modal_js');
            const botaoAbrir = document.querySelector('#cta-botao_js');
            const modal = document.querySelector('#modal_js');

            botaoEnviar.addEventListener('click', (evento) => { enviarFomulario(evento, formulario); });
            formulario.addEventListener('click', pararPropagacao);
            botaoFechar.addEventListener('click', () => { fecharModal(modal); });
            modal.addEventListener('click', () => { fecharModal(modal); });
            botaoAbrir.addEventListener('click', () => { abrirModal(modal); });
        }

        async function enviarFomulario(evento, formulario) {
            const { target: botaoEnviar } = evento;
            const { nome_js: nome, email_js: email, telefone_js: telefone, } = formulario;
            const data = { nome, email, telefone };

            try {
                habilitaOuDesabilitaBotaoDeEnviar(botaoEnviar);
                validarDados(data);
                await enviarRequisicao(data);
                alert("Sua solicitação foi enviada com sucesso! Em breve entraremos em contato.");

                resetarFormulario();
            } catch (error) {
                habilitaOuDesabilitaBotaoDeEnviar(botaoEnviar);
                alert(error.message);
            }

            async function enviarRequisicao(req) {
                try {
                    const response = await fetch('https://api-int-hml.autoglass.com.br/integracao-b2c/api/web-app/leads',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: { fonte: "Landing Page - Trânsito Livre", ...req },
                        }
                    );

                    if (response.status != 200) {
                        throw new Error();
                    }
                } catch (error) {
                    throw new Error("Houve algum problema ao enviar sua solicitação. Por favor, tente novamente mais tarde.")
                }
            }

            function validarDados(data) {
                for (const key in data) {
                    if (data[key].value == "") {
                        throw new Error("Por favor, preencha todos os campos.");
                    }
                }
            }

            function resetarFormulario() {
                location.reload();
            }

            function habilitaOuDesabilitaBotaoDeEnviar(botaoEnviar) {
                const estadoAtual = botaoEnviar.disabled;

                botaoEnviar.disabled = !estadoAtual;
            }
        }

        function pararPropagacao(evento) {
            evento.stopPropagation();
        }

        function fecharModal(modal) {
            modal.style.display = "none";
        }

        function abrirModal(modal) {
            modal.style.display = "block";
            window.location.href = '#modal_js'
        }

    }
}

class ValidacaoDeInput {
    static init() {
        const groupoDeInputsFormaDeValidacao = {
            nome_js: (value) => {
                return Utils.onlyAlphabet(value);
            },
            telefone_js: (value) => {
                return Utils.maskPhone(value);
            },
        }

        adicionaEventoEscultarAlteracoes();

        function adicionaEventoEscultarAlteracoes() {
            for (const key in groupoDeInputsFormaDeValidacao) {
                const input = document.querySelector(`#${key}`);
                input.addEventListener("keyup", validandoDigitacao)
            }
        }

        function validandoDigitacao(evento) {
            const { target } = evento;
            target.value = groupoDeInputsFormaDeValidacao[target.id](target.value);
        }
    }
}

(() => {
    window.onload = () => {
        Formulario.init();
        ValidacaoDeInput.init();
    }
})();