(function($) {
requestIdleCallback(() => {
    (function () {
        let cookieBannerSliderPos = 0;
    
        _init();
    
        function loadScript(url, callback) {
          const script = document.createElement('script');
          script.src = url;
          script.onload = callback;
          document.head.appendChild(script);
      }
      
      function _init() {
          const beCheckoutConfirmation = location.pathname.includes('orderPlaced');
      
          loadScript('https://autoglass-cdn.github.io/src/js/jquery.cookie.js', function () {
              const cookieString = window.jQuery.cookie('hasAcceptedCookies');
              const cookie = cookieString ? JSON.parse(cookieString) : null;
              const baseUrlApi = "https://api-hml.autoglass.com.br/integracao-b2c/api/web-app/master-datas/cookies";
      
              if (!beCheckoutConfirmation) {
                  if (!cookie || (!cookie.accepted)) {
                      window.jQuery.cookie('hasAcceptedCookies', JSON.stringify({
                          accepted: false,
                          createdAt: Date.now(),
                          adulthood: false
                      }), { path: '/' });
      
                      setTimeout(() => {
                        renderHtml();
                        showCookieBanner();
                    }, 5000);
                  }
              } else {
                  fetch(baseUrlApi, {
                      method: 'POST',
                      headers: (() => {
                          let headers = new Headers();
                          headers.append("Content-Type", "application/json");
                          return headers;
                      })(),
                      body: JSON.stringify({
                          "CodigoCompra": $('#order-id').html(),
                          "DataAceite": cookie ? new Date(cookie.acceptedAt) : null,
                          "MaiorIdade": cookie.accepted
                      })
                  }).then(res => console.log(res));
              }
          });
      }
    
        function renderHtml() {
            $('body').append(`
                <div id="cookiebanner">
                    <div id="c-left">
                        <p class="c-header">Protegemos seus dados pessoais</p>
                        <p class="c-message">
                          O Grupo Autoglass, em respeito à privacidade dos seus dados pessoais e buscando a melhorar sua experiência de navegação no site,
                          gostaria de obter o seu consentimento para coletar e utilizar cookies de navegação, que servirão para trazer conteúdos personalizados
                          e mais relevantes para você. Ao clicar em "Concordar", você estará concordando com a nossa <a href="/Institucional/privacidade" target="_blank">Política de Privacidade.</a>
                        </p>
                    </div>
                    <div id="c-right">
                        <a id="aceitar-cookie-link" class="c-button c-button-disabled">Concordar e fechar</a>
                    </div>
                    <div style="clear:both"></div>
                </div>
            `);
    
            const aceitarCookieLink = $('#aceitar-cookie-link');
    
            aceitarCookieLink.click(acceptCookies);
        }
    
        function acceptCookies() {
          aceitarCookieLink = $('#aceitar-cookie-link');
          const cookie = JSON.parse(window.jQuery.cookie('hasAcceptedCookies'));
          hideCookieBanner();
          cookie.accepted = true;
          cookie.acceptedAt = Date.now();
          window.jQuery.cookie('hasAcceptedCookies', JSON.stringify(cookie), { path: '/' });
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
});
})(window.jQueryNew || window.jQuery);