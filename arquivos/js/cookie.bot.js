!function(e){requestIdleCallback(()=>{!function(){var a,o;let t=0;function i(){aceitarCookieLink=e("#aceitar-cookie-link");let a=JSON.parse(window.jQueryNew.cookie("hasAcceptedCookies"));document.getElementById("cookiebanner").style.cssText="display:none !important",a.accepted=!0,a.acceptedAt=Date.now(),window.jQuery.cookie("hasAcceptedCookies",JSON.stringify(a),{path:"/"})}let c,s;c=location.pathname.includes("orderPlaced"),a="https://autoglass-cdn.github.io/arquivos/js/jquery.cookie.js",o=function(){let a=window.jQuery.cookie("hasAcceptedCookies"),o=a?JSON.parse(a):null;if(c){let s;fetch("https://api-hml.autoglass.com.br/integracao-b2c/api/web-app/master-datas/cookies",{method:"POST",headers:((s=new Headers).append("Content-Type","application/json"),s),body:JSON.stringify({CodigoCompra:e("#order-id").html(),DataAceite:o?new Date(o.acceptedAt):null,MaiorIdade:o.accepted})}).then(e=>console.log(e))}else o&&o.accepted||(window.jQuery.cookie("hasAcceptedCookies",JSON.stringify({accepted:!1,createdAt:Date.now(),adulthood:!1}),{path:"/"}),setTimeout(()=>{e("body").append(`
                <div id="cookiebanner">
                    <div id="c-left">
                        <p class="c-header">Protegemos seus dados pessoais</p>
                        <p class="c-message">
                          O Grupo Autoglass, em respeito \xe0 privacidade dos seus dados pessoais e buscando a melhorar sua experi\xeancia de navega\xe7\xe3o no site,
                          gostaria de obter o seu consentimento para coletar e utilizar cookies de navega\xe7\xe3o, que servir\xe3o para trazer conte\xfados personalizados
                          e mais relevantes para voc\xea. Ao clicar em "Concordar", voc\xea estar\xe1 concordando com a nossa <a href="/Institucional/privacidade" target="_blank">Pol\xedtica de Privacidade.</a>
                        </p>
                    </div>
                    <div id="c-right">
                        <a id="aceitar-cookie-link" class="c-button c-button-disabled">Concordar e fechar</a>
                    </div>
                    <div style="clear:both"></div>
                </div>
            `),e("#aceitar-cookie-link").click(i),function e(){let a=document.getElementById("cookiebanner"),o=parseInt(a.offsetHeight);a.style.bottom=t-o+"px",(t+=4)<o?setTimeout(function(){e()},1):(t=0,a.style.bottom="10px")}()},5e3))},(s=document.createElement("script")).src=a,s.onload=o,document.head.appendChild(s)}()})}(window.jQueryNew||window.jQuery);