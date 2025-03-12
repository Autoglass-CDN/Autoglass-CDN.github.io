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
      
          loadScript('https://autoglass-cdn.github.io/hml/js/jquery.cookie.js', function () {
              const cookieString = $.cookie('hasAcceptedCookies');
              const cookie = cookieString ? JSON.parse(cookieString) : null;
              const baseUrlApi = "https://api-hml.autoglass.com.br/integracao-b2c/api/web-app/master-datas/cookies";
      
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
                          e mais relevantes para você. Ao clicar em "Aceitar", você estará concordando com a nossa <a href="/Institucional/privacidade" target="_blank">Política de Privacidade.</a>
                        </p>
                    </div>
                    <div id="c-right">
                      <div class="aceitar-cookies-container">
                        <input type="checkbox" id="aceitar-cookies-checkbox" />
                        <label for="aceitar-cookies-checkbox" id="aceitar-cookies-label">Aceitar Cookies</label>
                      </div>
                        <a id="aceitar-cookie-link" class="c-button c-button-disabled">Concordar</a>
                    </div>
                    <div style="clear:both"></div>
                </div>
            `);
    
            const aceitarCookiesCheckbox = $('#aceitar-cookies-checkbox');
            const aceitarCookieLink = $('#aceitar-cookie-link');
    
            aceitarCookiesCheckbox.change(function () {
              let isChecked = this.checked;
              aceitarCookieLink.toggleClass('c-button-disabled', !isChecked);
              aceitarCookieLink.css('background-color', isChecked ? '#000000' : '#999');
              aceitarCookieLink.css('cursor', isChecked ? 'pointer' : 'not-allowed');
            });
    
            aceitarCookieLink.click(acceptCookies);
        }
    
        function acceptCookies() {
          aceitarCookiesCheckbox = $('#aceitar-cookies-checkbox');
          aceitarCookieLink = $('#aceitar-cookie-link');
          const cookie = JSON.parse($.cookie('hasAcceptedCookies'));
    
          if (aceitarCookiesCheckbox.prop('checked')) {
              hideCookieBanner();
              cookie.accepted = true;
              cookie.acceptedAt = Date.now();
              $.cookie('hasAcceptedCookies', JSON.stringify(cookie), { path: '/' });
          } else {
              return;
          }
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
    
