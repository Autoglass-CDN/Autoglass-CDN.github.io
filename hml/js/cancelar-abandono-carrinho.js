(function($) {
  const parametros = new URLSearchParams(window.location.search);
  const email = parametros.get("e");
  const baseUrlApi = window.location.href.includes("dev")
    ? "https://api-hml.autoglass.com.br"
    : "https://api.autoglass.com.br";

  if (!emailValido(email)) {
    $(".spinner").css({ display: "none" });
    $(".mensagem").html(`
        <p style="text-align:center;">Requisição inválida, por favor, tente novamente mais tarde!</p>
      `);
    return;
  }

  sendDataToVtexMasterData(email.trim());

  async function sendDataToVtexMasterData(endereco) {
    try {
      await fetch(
        `${baseUrlApi}/integracao-b2c/api/web-app/master-datas/abandonos-carrinhos/${endereco}`,
        {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            isAbandonedCartOptOut: true,
          }),
        }
      ).then(() => {
        $(".spinner").css({ display: "none" });
        $(".mensagem").html(`
              <p>Seu pedido é uma ordem!</p>
              <p>
                Respeitamos seu desejo e a partir de agora não enviaremos mais este tipo de mensagem para você.
              </p>
              <p>
                Agradecemos sua visita e esperamos que volte.
              </p>
            `);
      });
    } catch (e) {
      $(".spinner").css({ display: "none" });
      console.warn("Falha ao enviar dados ao MasterData! " + e);
      $(".mensagem").html(`
            <p>
              Ocorreu um erro ao tentar enviar a solicitação, por favor, tente novamente mais tarde.
            </p>
            <p>
              Agradecemos sua compreensão.
            </p>
          `);
    }
  }

  function emailValido(endereco) {
    if (endereco == null) return false;

    const usuario = endereco.substring(0, endereco.indexOf("@"));
    const dominio = endereco.substring(
      endereco.indexOf("@") + 1,
      endereco.length
    );

    return usuario.length >= 1 &&
      dominio.length >= 3 &&
      usuario.search("@") == -1 &&
      dominio.search("@") == -1 &&
      usuario.search(" ") == -1 &&
      dominio.search(" ") == -1 &&
      dominio.search(".") != -1 &&
      dominio.indexOf(".") >= 1 &&
      dominio.lastIndexOf(".") < dominio.length - 1
      ? true
      : false;
  }
})(jQueryNew);
