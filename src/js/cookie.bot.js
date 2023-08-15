(function () {
    let cookieBannerSliderPos = 0;

    _init();

    function _init() {
        $('#aceitar-cookie-link').prop('disabled', true);
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
            fetch(baseUrlApi, {
                method: 'POST',
                headers: (() => {
                    let headers = new Headers();
                    headers.append("Content-Type", "application/json");
                    return headers;
                })(),
                body: {
                    "CodigoCompra": $('#order-id').html(),
                    "DataAceite": cookie ? new Date(cookie.acceptedAt) : null,
                    "MaiorIdade": cookie.accepted
                }
            }).then(res => console.log(res));
        }
    }

    function renderHtml() {
        $('body').append(`
            <div id="cookiebanner">
                <div id="c-left">
                    <p class="c-header">Protegemos seus dados pessoais</p>
                    <p class="c-message">
                    O Grupo Autoglass, em respeito à privacidade dos seus dados pessoais e buscando a melhorar sua experiência de navegação no site,
                    gostaria de obter o seu consentimento para coletar e utilizar cookies de navegação, que servirão para trazer conteúdos personalizados e mais relevantes para você.
                    Ao clicar em "Aceitar", você estará concordando com a nossa <a href="/Institucional/privacidade" target="_blank">Política de Privacidade</a>
                    </p>
                </div>
                <div id="c-right">
                  <label for="aceitar-cookies-checkbox">
                    <input type="checkbox" id="aceitar-cookies-checkbox">
                    Aceitar Cookies
                  </label>
                </div>
                <div style="clear:both"></div>
            </div>
        `);
        $('#aceitar-cookies-checkbox').on('change', handleCheckboxChange);
        $('#aceitar-cookie-link').click(acceptCookies)
    }

    function handleCheckboxChange() {
      const isChecked = $('#aceitar-cookies-checkbox').prop('checked');
      const aceitarCookieLink = $('#aceitar-cookie-link');

      if (isChecked) {
          aceitarCookieLink.prop('disabled', false);
          aceitarCookieLink.css('background-color', '#2D4F9E');
      } else {
          aceitarCookieLink.prop('disabled', true);
          aceitarCookieLink.css('background-color', '#ccc');
      }
    }

    function acceptCookies() {
      const isChecked = $('#aceitar-cookies-checkbox').prop('checked');
      if (!isChecked) {
        return;
      }

      hideCookieBanner();

      const cookie = JSON.parse($.cookie('hasAcceptedCookies'));

      cookie.accepted = true;
      cookie.acceptedAt = Date.now();

      $.cookie('hasAcceptedCookies', JSON.stringify(cookie), { path: '/' });

      $('#aceitar-cookie-link').css('background-color', '#2D4F9E');
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
