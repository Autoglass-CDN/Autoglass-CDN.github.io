(function () {
    let cookieBannerSliderPos = 0;

    _init();

    function _init() {
        const beCheckoutConfirmation = location.pathname.includes('orderPlaced');
        const cookieString = $.cookie('hasAcceptedCookies')
        const cookie = cookieString ? JSON.parse(cookieString) : null;
        const baseUrlApi = window.location.href.includes("dev")
            ? "https://api-hml.autoglass.com.br/integracao-b2c/api/web-app/master-datas/cookies"
            : "https://api.autoglass.com.br/integracao-b2c/api/web-app/master-datas/cookies";

        if (!beCheckoutConfirmation) {
            if (!cookie || (!cookie.accepted)) {
                $.cookie('hasAcceptedCookies', JSON.stringify({
                    accepted: false,
                    createdAt: Date.now(),
                    adulthood: false
                }), { path: '/' });

                renderHtml();
                showCookieBanner();
            }
        } else {
            $.ajax({
                type: 'POST',
                url: baseUrlApi,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    "CodigoCompra": $('#order-id').html(),
                    "DataAceite": cookie ? new Date(cookie.acceptedAt) : null,
                    "MaiorIdade": cookie.adulthood
                }),
                success: function (res) {
                    console.log(res);
                }
            });
        }
    }

    function renderHtml() {
        $('body').append(`
            <div id="cookiebanner">
                <div id="c-left">
                    <p class="c-header">Protegemos seus dados pessoais</p>
                    <p class="c-message">
                        Autoglass protege seus dados pessoais e utiliza cookies para personalizar anúncios e melhorar a sua experiência no site.
                        Ao continuar navegando, você concorda com a nossa <a href="/Institucional/privacidade" target="_blank">Política de Privacidade</a>
                    </p>
                </div>
                <div id="c-right">
                    <a id="aceitar-cookie-link" class="c-button">Aceitar e fechar</a>
                </div>
                <div style="clear:both"></div>
            </div>
        `);

        $('#aceitar-cookie-link').click(acceptCookies)
    }

    function acceptCookies() {
        hideCookieBanner();

        const cookie = JSON.parse($.cookie('hasAcceptedCookies'));

        cookie.accepted = true;
        cookie.acceptedAt = Date.now();

        $.cookie('hasAcceptedCookies', JSON.stringify(cookie), { path: '/' });
    }

    function showCookieBanner() {
        const cookiebanner = document.getElementById("cookiebanner");
        const dialogHeight = parseInt(cookiebanner.offsetHeight);

        cookiebanner.style.bottom = (cookieBannerSliderPos - dialogHeight) + "px";
        cookieBannerSliderPos += 4;

        if (cookieBannerSliderPos < dialogHeight) {
            setTimeout(function () {
                showCookieBanner();
            }, 1);
        } else {
            cookieBannerSliderPos = 0;
            cookiebanner.style.bottom = "10px";
        }
    }

    function hideCookieBanner() {
        const cookiebanner = document.getElementById("cookiebanner");
        cookiebanner.style.cssText = "display:none !important";
    }
})();