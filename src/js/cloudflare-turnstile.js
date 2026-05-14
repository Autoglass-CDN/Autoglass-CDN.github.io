(function () {
  window.Cloudflare_Turnstile = window.Cloudflare_Turnstile || {};

  const SITE_KEY = "1x00000000000000000000AA";
  const widgetIdsByContainer = {};

  window.Cloudflare_Turnstile.render = function (containerSelector = "#cf-turnstile-container") {
    // Se nenhum container especificado, determina automaticamente baseado no breakpoint
    if (containerSelector === "#cf-turnstile-container") {
      const isDesktop = window.innerWidth > 1024;
      containerSelector = isDesktop ? "#cf-turnstile-container-desktop" : "#cf-turnstile-container-mobile";
    }

    const container = document.querySelector(containerSelector);
    if (!container) return;

    if (widgetIdsByContainer[containerSelector] != null) return;

    if (typeof window.turnstile === "undefined" || typeof window.turnstile.render !== "function") {
      setTimeout(() => window.Cloudflare_Turnstile.render(containerSelector), 150);
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

    try {
      window.turnstile.reset(id);
      delete widgetIdsByContainer[containerSelector]; // Permite re-render com novo token
    } catch (_) {}
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
  window.Cloudflare_Turnstile.obterVeiculo = async function ({ placa, formSelector, containerSelector, containerForRender }) {
    const targetContainer = containerForRender || "#cf-turnstile-container";

    // Reseta para invalidar token anterior e forçar geração de novo
    window.Cloudflare_Turnstile.reset(targetContainer);
    window.Cloudflare_Turnstile.render(targetContainer);

    // Aguarda novo token ser gerado (polling com timeout de 15s)
    const token = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Timeout aguardando token Turnstile.")), 15000);
      const interval = setInterval(() => {
        const t = window.Cloudflare_Turnstile.getToken({ formSelector, containerSelector: containerSelector || targetContainer });
        if (t) {
          clearInterval(interval);
          clearTimeout(timeout);
          resolve(t);
        }
      }, 200);
    });

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