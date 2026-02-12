(function () {
  window.Cloudflare_Turnstile = window.Cloudflare_Turnstile || {};

  const SITE_KEY = "1x00000000000000000000AA";
  const widgetIdsByContainer = {};

  window.Cloudflare_Turnstile.render = function (containerSelector = "#cf-turnstile-container") {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    if (widgetIdsByContainer[containerSelector] != null) return;

    if (typeof window.turnstile === "undefined" || typeof window.turnstile.render !== "function") {
      setTimeout(window.Cloudflare_Turnstile.render(containerSelector), 150);
      return;
    }

    // Render explícito
    widgetIdsByContainer[containerSelector] = window.turnstile.render(containerSelector, {
      sitekey: SITE_KEY,
      theme: "light",

      callback: function () {
        // token gerado com sucess
      },

      "expired-callback": function () {
        // token expirou
      },

      "error-callback": function () {
        // erro ao carregar/validar
      }
    });
  };
   // Reseta o widget
  window.Cloudflare_Turnstile.reset = function (containerSelector = "#cf-turnstile-container") {
    const id = widgetIdsByContainer[containerSelector];
    if (id == null) return;
    if (typeof window.turnstile === "undefined" || typeof window.turnstile.reset !== "function") return;

    try { window.turnstile.reset(id); } catch (_) {}
  };
   // Lê o token gerado pelo Turnstile
  window.Cloudflare_Turnstile.getToken = function ({ formSelector, containerSelector } = {}) {
    // 1) tenta dentro do form (busca-fipe)
    if (formSelector) {
      const form = document.querySelector(formSelector);
      const input = form?.querySelector('input[name="cf-turnstile-response"]');
      const v = (input?.value || "").trim();
      if (v) return v;
    }

    // 2) tenta dentro do container (dev--produto > compatContent)
    if (containerSelector) {
      const container = document.querySelector(containerSelector);
      const input = container?.querySelector('input[name="cf-turnstile-response"]');
      const v = (input?.value || "").trim();
      if (v) return v;
    }

    // 3) fallback: qualquer token existente na página
    const any = document.querySelector('input[name="cf-turnstile-response"]');
    return (any?.value || "").trim();
  };

  window.Cloudflare_Turnstile.resolverUrlApi = function () {
    const isHml = window.location.href.includes("hml");
    return isHml ? "https://api-hml.autoglass.com.br" : "https://api.autoglass.com.br";
  };

  
   // Chama o POST no backend
  window.Cloudflare_Turnstile.obterVeiculo = async function ({ placa, baseUrlApi, formSelector, containerSelector, containerForRender }) {
    if (containerForRender) {
      window.Cloudflare_Turnstile.render(containerForRender);
    } else {
      window.Cloudflare_Turnstile.render("#cf-turnstile-container");
    }

    const token = window.Cloudflare_Turnstile.getToken({formSelector, containerSelector});

    const base =
      baseUrlApi || `${window.Cloudflare_Turnstile.resolverUrlApi()}/integracao-b2c/api/web-app`;

    let response;
    try {
      response = await fetch(`${base}/veiculos/placas-unicas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Placa: placa, TurnstileToken: token })
      });
    } catch (e) {
      // erro de rede / CORS / conexão
      const err = new Error("Falha ao contatar verificador Turnstile.");
      err.code = "NETWORK_ERROR";
      throw err;
    }

    if (!response.ok) {
      let payload = null;
      try { payload = await response.json(); } catch (_) {}

      const msg =
        payload?.RegraDeNegocioExcecao ||
        payload?.Mensagem ||
        payload?.mensagem ||
        (response.status === 400 || response.status === 401 || response.status === 403
          ? "Validação anti-bot ausente ou inválida."
          : response.status === 503
            ? "Falha ao contatar verificador Turnstile."
            : "Erro ao processar a solicitação.");

      const err = new Error(msg);
      err.httpStatus = response.status;
      err.payload = payload;
      throw err;
    }

    return await response.json();
  };
})();
