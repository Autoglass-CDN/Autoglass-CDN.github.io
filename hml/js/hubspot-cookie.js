!(function() {
    async function e() {
        let e = location.href;
        if (e.includes("checkout/orderPlaced")) {
            let a = $("#order-id").text().trim(),
                r = await fetch(`/api/checkout/pub/orders/${a}`, {
                    headers: new Headers({
                        "Content-Type": "application/json"
                    }),
                }).then((e) => e.json()),
                o = r.clientProfileData.email;
            o && t(o, null, a);
        }
    }
    async function t(e, t = null, a = null) {
        try {
            let r = (function e() {
                    try {
                        return $.cookie("hubspotutk");
                    } catch (t) {
                        return null;
                    }
                })(),
                o = e.trim(),
                n =
                t ||
                (function e() {
                    try {
                        let t = vtexjs.checkout.orderForm;
                        return t.orderFormId;
                    } catch (a) {
                        return null;
                    }
                })(),
                i = `https://api.autoglass.com.br/integracao-b2c/api/web-app/master-datas/clientes/${o}`,
                l = await fetch(i, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Hubspotutk: r,
                        LastOrderFormId: n,
                        LastOrderId: a,
                    }),
                });
            l.ok ?
                console.log("Dados enviados com sucesso ao MasterData.") :
                console.error(
                    "Erro ao enviar dados ao MasterData:",
                    l.status,
                    l.statusText
                );
        } catch (c) {
            console.error("Erro ao enviar dados ao MasterData:", c);
        }
    }
    $(window).on("rendered.vtexid", function e(a) {
            let r = document.querySelector("#vtexIdUI-form-classic-login #inputEmail"),
                o = document.getElementById("vtexIdUI-form-classic-login");
            o.addEventListener("submit", (e) => {
                let a = r.value;
                a && t(a);
            });
        }),
        $(window).on("checkoutRequestEnd.vtex", function e(a, r) {
            try {
                let o = vtexjs.checkout.orderForm,
                    n = "",
                    i = null;
                if (
                    (r && r.clientProfileData ?
                        ((n = r.clientProfileData.email), (i = r.orderFormId)) :
                        o.clientProfileData &&
                        o.clientProfileData.email &&
                        ((n = o.clientProfileData.email), (i = o.orderFormId)),
                        !n)
                ) {
                    (function e() {
                        let a = location.href;
                        if (a.includes("checkout/#/email")) {
                            let r = document.querySelector(
                                    "#client-profile-data form.client-pre-email"
                                ),
                                o = document.querySelector(
                                    "form.client-pre-email input#client-pre-email"
                                );
                            r.addEventListener("submit", (e) => {
                                let a = o.value;
                                a && t(a);
                            });
                        }
                    })();
                    return;
                }
                t(n, i);
            } catch (l) {
                console.warn(
                    "Falha ao obter e-mail para enviar o Hubspotutk ao MasterData!"
                );
            }
        }),
        $(window).on("load", e);
  })();