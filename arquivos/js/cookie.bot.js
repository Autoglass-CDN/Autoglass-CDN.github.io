!function(){let e=0;function o(){aceitarCookiesCheckbox=$("#aceitar-cookies-checkbox"),aceitarCookieLink=$("#aceitar-cookie-link");let e=JSON.parse($.cookie("hasAcceptedCookies"));aceitarCookiesCheckbox.prop("checked")&&(function e(){let o=document.getElementById("cookiebanner");o.style.cssText="display:none !important"}(),e.accepted=!0,e.acceptedAt=Date.now(),$.cookie("hasAcceptedCookies",JSON.stringify(e),{path:"/"}))}!function a(){let c=location.pathname.includes("orderPlaced"),t=$.cookie("hasAcceptedCookies"),i=t?JSON.parse(t):null,s=window.location.href.includes("dev")?"https://api-hml.autoglass.com.br/integracao-b2c/api/web-app/master-datas/cookies":"https://api.autoglass.com.br/integracao-b2c/api/web-app/master-datas/cookies";if(c){let d;fetch(s,{method:"POST",headers:((d=new Headers).append("Content-Type","application/json"),d),body:{CodigoCompra:$("#order-id").html(),DataAceite:i?new Date(i.acceptedAt):null,MaiorIdade:i.accepted}}).then(e=>console.log(e))}else i&&i.accepted||($.cookie("hasAcceptedCookies",JSON.stringify({accepted:!1,createdAt:Date.now(),adulthood:!1}),{path:"/"}),function e(){$("body").append(`
    <div id="cookiebanner">
        <div id="c-left">
            <p class="c-header">Protegemos seus dados pessoais</p>
            <p class="c-message">
              O Grupo Autoglass, em respeito \xe0 privacidade dos seus dados pessoais e buscando a melhorar sua experi\xeancia de navega\xe7\xe3o no site,
              gostaria de obter o seu consentimento para coletar e utilizar cookies de navega\xe7\xe3o, que servir\xe3o para trazer conte\xfados personalizados
              e mais relevantes para voc\xea. Ao clicar em "Aceitar", voc\xea estar\xe1 concordando com a nossa <a href="/Institucional/privacidade" target="_blank">Pol\xedtica de Privacidade.</a>
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
`);let a=$("#aceitar-cookies-checkbox"),c=$("#aceitar-cookie-link");a.change(function(){let e=this.checked;c.toggleClass("c-button-disabled",!e),c.css("background-color",e?"#2D4F9E":"#999"),c.css("cursor",e?"pointer":"not-allowed")}),c.click(o)}(),function o(){let a=document.getElementById("cookiebanner"),c=parseInt(a.offsetHeight);a.style.bottom=e-c+"px",(e+=4)<c?setTimeout(function(){o()},1):(e=0,a.style.bottom="10px")}())}()}();