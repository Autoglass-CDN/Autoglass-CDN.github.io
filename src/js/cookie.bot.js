(function () {
    let cookieBannerSliderPos = 0;

    _init();

    function _init() {
        const beCheckoutConfirmation = location.pathname.includes('orderPlaced');
        const cookie = $.cookie('hasAcceptedCookies');

        if (!beCheckoutConfirmation) {
            if (!cookie || (!cookie.accepted)) {
                $.cookie('hasAcceptedCookies', JSON.stringify({
                    accepted: false,
                    created_date: Date.now()
                }));

                renderHtml();
                showCookieBanner();
            }
        } else {
            $.post('POST', {
                url: 'http://172.31.48.1:5010/api/master-datas/cookies',
                body: JSON.stringify({
                    "CodigoCompra": $('#something').html(),
                    "DataAceite": cookie ? new Date(cookie.acceptedAt) : null
                })
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
                        Ao continuar navegando, você concorda com a nossa <a>Política de Privacidade</a>
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

        $.cookie('hasAcceptedCookies', JSON.stringify(cookie));
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