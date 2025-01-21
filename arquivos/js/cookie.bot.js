!function(){var e,o;let a=0;function c(){aceitarCookiesCheckbox=$("#aceitar-cookies-checkbox"),aceitarCookieLink=$("#aceitar-cookie-link");let e=JSON.parse($.cookie("hasAcceptedCookies"));aceitarCookiesCheckbox.prop("checked")&&(document.getElementById("cookiebanner").style.cssText="display:none !important",e.accepted=!0,e.acceptedAt=Date.now(),$.cookie("hasAcceptedCookies",JSON.stringify(e),{path:"/"}))}let t,i;t=location.pathname.includes("orderPlaced"),e="https://autoglass-cdn.github.io/arquivos/js/jquery.cookie.js",o=function(){let e=$.cookie("hasAcceptedCookies"),o=e?JSON.parse(e):null;if(t){let i;fetch("https://api.autoglass.com.br/integracao-b2c/api/web-app/master-datas/cookies",{method:"POST",headers:((i=new Headers).append("Content-Type","application/json"),i),body:JSON.stringify({CodigoCompra:$("#order-id").html(),DataAceite:o?new Date(o.acceptedAt):null,MaiorIdade:o.accepted})}).then(e=>console.log(e))}else{let s,d;o&&o.accepted||($.cookie("hasAcceptedCookies",JSON.stringify({accepted:!1,createdAt:Date.now(),adulthood:!1}),{path:"/"}),$("body").append(`
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
`),s=$("#aceitar-cookies-checkbox"),d=$("#aceitar-cookie-link"),s.change(function(){let e=this.checked;d.toggleClass("c-button-disabled",!e),d.css("background-color",e?"#000000":"#999"),d.css("cursor",e?"pointer":"not-allowed")}),d.click(c),function e(){let o=document.getElementById("cookiebanner"),c=parseInt(o.offsetHeight);o.style.bottom=a-c+"px",(a+=4)<c?setTimeout(function(){e()},1):(a=0,o.style.bottom="10px")}())}},(i=document.createElement("script")).src=e,i.onload=o,document.head.appendChild(i)}();