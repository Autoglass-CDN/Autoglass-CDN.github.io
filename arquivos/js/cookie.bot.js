requestIdleCallback(()=>{!function(){let e=0;function o(){aceitarCookieLink=$("#aceitar-cookie-link");let e=JSON.parse($.cookie("hasAcceptedCookies"));(function e(){let o=document.getElementById("cookiebanner");o.style.cssText="display:none !important"})(),e.accepted=!0,e.acceptedAt=Date.now(),$.cookie("hasAcceptedCookies",JSON.stringify(e),{path:"/"})}!function a(){let t=location.pathname.includes("orderPlaced");!function e(o,a){let t=document.createElement("script");t.src=o,t.onload=a,document.head.appendChild(t)}("https://autoglass-cdn.github.io/arquivos/js/jquery.cookie.js",function(){let a=$.cookie("hasAcceptedCookies"),i=a?JSON.parse(a):null;if(t){let c;fetch("https://api-hml.autoglass.com.br/integracao-b2c/api/web-app/master-datas/cookies",{method:"POST",headers:((c=new Headers).append("Content-Type","application/json"),c),body:JSON.stringify({CodigoCompra:$("#order-id").html(),DataAceite:i?new Date(i.acceptedAt):null,MaiorIdade:i.accepted})}).then(e=>console.log(e))}else i&&i.accepted||($.cookie("hasAcceptedCookies",JSON.stringify({accepted:!1,createdAt:Date.now(),adulthood:!1}),{path:"/"}),setTimeout(()=>{(function e(){$("body").append(`
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
            `);let a=$("#aceitar-cookie-link");a.click(o)})(),function o(){let a=document.getElementById("cookiebanner"),t=parseInt(a.offsetHeight);a.style.bottom=e-t+"px",(e+=4)<t?setTimeout(function(){o()},1):(e=0,a.style.bottom="10px")}()},5e3))})}()}()});