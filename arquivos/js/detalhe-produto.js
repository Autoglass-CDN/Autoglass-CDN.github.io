const baseUrlApi=window.location.href.includes("dev")||window.location.href.includes("mvp")||window.location.href.includes("hml")?"https://api-hml.autoglass.com.br/integracao-b2c/api/web-app":"https://api.autoglass.com.br/integracao-b2c/api/web-app",sections=[...document.querySelectorAll("section.tab-content")],getLinkById=e=>document.querySelector(`a[href='#${e}'].tab-link`);function handleSocialClick(e,a){dataLayer.push({event:"share",method:a,content_type:skuJson.skus[0].image,item_id:skuJson.skus[0].sku})}$(".product-qd-v1-buy-button .buy-button.buy-button-ref").addClass("add-to-cart-ga");const socialMediaElements={whatsapp:".product-qd-v1-social-share.desktop .whatsapp",twitter:".product-qd-v1-social-share.desktop .twitter",mail:".product-qd-v1-social-share.desktop .mail",facebook:".product-qd-v1-social-share.desktop .facebook"};function ButtoWhatsappClick(e,a){dataLayer.push({event:"whatsapp",position:a})}Object.entries(socialMediaElements).forEach(([e,a])=>{document.querySelector(a).addEventListener("click",a=>handleSocialClick(a,e))});const whatsappElements={".link-whatsapp-texto.link-whatsapp-conteudo-sem-numero":"topo",".link-whatsapp-texto.gtm-whatsapp-botao-rodape":"widget",".link-whatsapp-texto.botao-compre-whatsapp":"compre-whatsapp",".link-whatsapp-texto.link-whatsapp":"footer"};Object.entries(whatsappElements).forEach(([e,a])=>{let t=document.querySelector(e);t&&t.addEventListener("click",e=>ButtoWhatsappClick(e,a))});let veiculosBuscaveis=[];const sugestoesContainer=$(".veiculos-compativeis-search__search-suggestions");$(".veiculos-compativeis-search").hide();const inView=(e,a)=>{let t=e.offsetTop,o=e.offsetHeight;for(;e.offsetParent;)t+=(e=e.offsetParent).offsetTop;return a&&(t-=a>1200?250:130),t<window.pageYOffset+window.innerHeight&&t+o>window.pageYOffset};window.onscroll=()=>{let e=!1;sections.forEach(a=>{let t=getLinkById(a.id);inView(a,window.innerWidth)&&!e?(t.classList.add("tab--current"),e=!0):t&&t.classList.remove("tab--current")})};const toggleSectionCollapse=e=>{e.classList.toggle("ativo")},sectionCollapseInit=()=>{document.querySelectorAll(".contents .tab-content h2").forEach(e=>{e.onclick=()=>{toggleSectionCollapse(e.closest(".tab-content"))},("Compre Junto"===e.textContent||"Outras Marcas"===e.textContent)&&setTimeout(()=>toggleSectionCollapse(e.closest(".tab-content")),5e3)})};async function insertBrandDescription(){return fetch("/api/catalog_system/pub/brand/list").then(e=>e.json()).then(e=>{let a=document.querySelector(".brandName").classList.value.replace("brandName","").trim().replace("-"," ").split(" ")[0],t=e.find(e=>e.name.includes(a));if(t&&""!==t.metaTagDescription){let o=t.metaTagDescription,i=document.querySelector("#descricao-marca");i.textContent=o,i.parentElement.parentElement.style.display="block"}})}async function getProductRefIdByProductName(){let[e,a]=(await vtexjs.catalog.getCurrentProductWithVariations()).name.match(/(\d+)(\s?\-?\s?[0-9]+)?$/);return a}async function loadOptionals(){let e=$("#opcionais"),a=await getProductRefIdByProductName(),t=$(".teste-opcionais");try{let{Opcionais:o}=await $.get(`${baseUrlApi}/produtos/${a}/opcionais`);o&&o.length>0&&(e.html(`
        <h3>Caracter\xedsticas</h3>
        <div class="caracteristicas__box">
         ${o.map(e=>`<span class="caracteristicas__caracteristica">${e}</span>`).join("")}
        </div>
      `),t.html(`
        ${o.map(e=>`<h4 class="lista-opcionais">${e}</h4>`).join("")}
        <div class="container-mais-especificacoes">
          <a class="mais-especificacoes">Mais informa\xe7\xf5es</a>
        </div>
      `))}catch(i){console.error("Falha ao renderizar opcionais. \n",i)}$(".container-mais-especificacoes .mais-especificacoes").click(function(){document.querySelector(".container-descricao #informacoes-gerais").scrollIntoView()})}async function loadSimilars(){var e,a;let t=e=>document.querySelector(`a[href="#${e}"]`).parentElement.style.display="none",o=e=>{document.querySelector(`#${e}`).style.display="block",document.querySelector(`a[href="#${e}"]`).parentElement.style.display="unset"};t("outras-marcas"),t("compre-junto"),e="similars",""!=document.querySelector(`#${e}`).innerHTML&&o("outras-marcas"),a="sugestoes",""!=document.querySelector(`#${a}`).innerHTML&&o("compre-junto")}async function buscaPorPlaca(e){var a;let t=(a=e).trim().replace(/[\W_]+/g,"").toUpperCase();try{window.innerWidth<700&&(document.querySelector("#side-menu .loading-overlay").style.display="block");let{montadora:o,modelo:i,anoModelo:s,fipe:c}=await l(t);return{montadora:o,modelo:i,anoModelo:s,fipe:c}}catch(n){}async function l(e){let a=await (await fetch(`${baseUrlApi}/veiculos/${e}/placas`)).json();return montadora=a.Body.Data.Marca,modelo=a.Body.Data.Modelo,anoModelo=a.Body.Data.DadosBasicosDoVeiculo.AnoModelo,fipe=a.Body.Data.DadosBasicosDoVeiculo.InformacoesFipe[0].FipeId,{montadora,modelo,anoModelo,fipe}}}async function buscarPromocoes(){try{let e=(await (await fetch(`${baseUrlApi}/promocoes?nome=pix`)).json()).find(e=>e.isActive);e?aplicarDesconto(e.percentualDiscountValue):document.querySelectorAll(".skuBestPrice").forEach(e=>{e.style.display="inline-block"})}catch(a){document.querySelectorAll(".skuBestPrice").forEach(e=>{e.style.display="inline-block"})}}function aplicarDesconto(e){let a=parseFloat(document.querySelectorAll(".skuListPrice")[1].innerHTML.trim().replace("R$","").trim().replace(".","").replace(",",".")),t=document.querySelectorAll(".skuBestPrice");t.forEach((o,i)=>{let s=o.textContent.trim();s=(s=s.replace("R$","").trim()).replace(".","").replace(",",".");let c=parseFloat(s);if(!isNaN(c)){let n=Math.round(100*(Math.round(c*(1-e/100)*1e3)/1e3))/100;if(o.textContent=n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"}),o.style.fontSize="18px",i!==t.length-1){let l=document.createElement("div");l.classList.add("pix-discount"),l.textContent="no Pix";let r=document.createElement("div");r.classList.add("percent-box"),r.textContent=`-${Math.round((a-n)/a*100)}%`,o.parentElement.appendChild(l),o.parentElement.appendChild(r)}else o.classList.add(".preco-bottom-mobile");o.style.display="inline-block",ajustarTextoValorParcelado(c)}})}function ajustarTextoValorParcelado(e){let a=document.querySelectorAll(".valor-dividido.price-installments");a.forEach(function(t,o){if(!t.classList.contains("modificada")){t.classList.add("modificada");let i=t.querySelector(".skuBestInstallmentNumber"),s=document.createElement("label");if(s.textContent=e.toLocaleString("pt-BR",{style:"currency",currency:"BRL"}),s.classList.add("skuBestInstallmentNumber"),i){i.parentNode.insertBefore(s,i);let c=document.createElement("span");c.textContent=" em ",c.classList.add("palavras-conectivas"),s.parentNode.insertBefore(c,i);let n=document.createElement("span");n.textContent=" sem juros",n.classList.add("span-sem-juros");let l=t.querySelector("strong");if(l&&l.appendChild(n),o!==a.length-1&&("none"===t.style.display||"none"===getComputedStyle(t).display)){let r=t.closest(".descricao-preco");if(r){let d=document.createElement("div");d.classList.add("valor-dividido","price-installments","modificada");let p=document.createElement("span");p.textContent="ou ",d.appendChild(p),tipoTag=0==o?"label":"span";let u=document.createElement(tipoTag);u.textContent=s.textContent,u.classList.add("skuBestInstallmentNumber"),d.appendChild(u),r.appendChild(d)}}}}})}sectionCollapseInit(),window.addEventListener("load",insertBrandDescription),window.addEventListener("load",loadOptionals),loadSimilars(),$(window).on("load",async()=>{function e(){$(".product-qd-v1-image div#image").css("min-height",$(".product-qd-v1-image #image-main").width())}window.addEventListener("resize",e),e(),v();let a=$("#veiculos-compativeis"),t=await $.get(`${baseUrlApi}/produtos/${await getProductRefIdByProductName()}/veiculos-compativeis`);veiculosBuscaveis=t;if(t&&t.length>0){a.html(`
      <h2>Ve\xedculos Compat\xedveis</h2>
      <div class="veiculos-compativeis__box">
        <div class="veiculos-compativeis__box-header">
          <button id="group-prev" data-type="prev" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" alt="\xcdcone de seta para a esquerda">
              <path id="Icon_ionic-ios-arrow-dropleft-circle" data-name="Icon ionic-ios-arrow-dropleft-circle" d="M19.375,3.375a16,16,0,1,0,16,16A16,16,0,0,0,19.375,3.375Zm3.338,22.238a1.49,1.49,0,0,1,0,2.1,1.467,1.467,0,0,1-1.046.431,1.492,1.492,0,0,1-1.054-.438l-7.231-7.254a1.483,1.483,0,0,1,.046-2.046l7.338-7.362a1.485,1.485,0,0,1,2.1,2.1l-6.3,6.231Z" transform="translate(35.375 35.375) rotate(180)" opacity="0.42"/>
            </svg>
          </button>
          ${t.map(l).join("")}
          <button id="group-next" data-type="next" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" alt="\xcdcone de seta para a direita">
              <path id="Icon_ionic-ios-arrow-dropleft-circle" data-name="Icon ionic-ios-arrow-dropleft-circle" d="M19.375,3.375a16,16,0,1,0,16,16A16,16,0,0,0,19.375,3.375Zm3.338,22.238a1.49,1.49,0,0,1,0,2.1,1.467,1.467,0,0,1-1.046.431,1.492,1.492,0,0,1-1.054-.438l-7.231-7.254a1.483,1.483,0,0,1,.046-2.046l7.338-7.362a1.485,1.485,0,0,1,2.1,2.1l-6.3,6.231Z" transform="translate(35.375 35.375) rotate(180)" opacity="0.42"/>
            </svg>
          </button>
        </div>
        <div class="veiculos-compativeis__box-content">
          ${t.map(d).join("")}
        </div>
      </div>
    `),$(".veiculos-compativeis__header-option").first().addClass("active"),$(".veiculos-compativeis__box-content div").first().addClass("active"),$(".veiculos-compativeis__header-option").click(function(){$(".veiculos-compativeis__header-option").removeClass("active"),$(this).addClass("active"),$(".veiculos-compativeis__box-content div").removeClass("active"),$(`.veiculos-compativeis__box-content div[data-for="${$(this).attr("id")}"]`).addClass("active")}),$("#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header button").click(function(){let e=$(this).attr("data-type"),a=$("#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header");"next"===e?a[0].scrollBy(200,0):a[0].scrollBy(-200,0)});let o=$("#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header");$("#veiculos-compativeis h2").click(()=>toggleSectionCollapse(a[0])),p(o),o.on("scroll",function(){p($(this))}),$(window).on("resize",function(){p(o)}),$(".veiculos-compativeis-search").show()}else $('a[href="#veiculos-compativeis"]').parent().hide(),a.hide();let i=Product.captureSkuSelectors(),s="/checkout/cart/add?sku="+i[0]+"&qty=1&seller=1&redirect=true&"+readCookie("VTEXSC");async function c(e){let a;if(e.trim().match(/^[A-Z]{3}[\-_]?[0-9][0-9A-Z][0-9]{2}$/i)){sugestoesContainer.html(`
        <div class="spinner-compatibilidade"></div>
      `);let{modelo:t,anoModelo:o}=await buscaPorPlaca(e.trim());e=t,a=parseInt(o,10),sugestoesContainer.empty()}if(veiculosBuscaveis&&veiculosBuscaveis.length>0&&e.length>0){let i=veiculosBuscaveis.map(t=>t.Veiculos.filter(t=>RegExp(e.split(" ").map(e=>`(?=.*${e})`).join(""),"i").test(t.Veiculo)&&(void 0==a||t.Anos.includes(a)))).filter(e=>e.length>0);i.length?(sugestoesContainer.html(i.flat().slice(0,3).map(n).join("")+`<div class="veiculos-compativeis-search__link">
            <a href="#veiculos-compativeis">Ver todos</a>
          </div>`),document.querySelectorAll("a.veiculos-compativeis__content-compativel-link").forEach(e=>e.addEventListener("click",r))):sugestoesContainer.html(`
          <div class="veiculos-compativeis-search__disclaimer">
           Modelo de carro n\xe3o compat\xedvel :(
          </div>
          <div class="veiculos-compativeis-search__link">
            <a href="#veiculos-compativeis">Ver todos</a>
          </div>
        `)}else sugestoesContainer.empty()}function n(e,a){return`<a href="${s}" class="veiculos-compativeis__content-compativel-link">
              <p>${e.Veiculo}</p>
              <div>${e.Anos.map(e=>"<span>"+e+"</span>").join(",&nbsp")}.</div>
            </a>`}function l(e,a){return`
         <div id="${e.Grupo+a}" class="veiculos-compativeis__header-option">
        <span>${e.Grupo}</span>
      </div>
    `}function r(){ga("set","transport","beacon"),ga("send","event","Link SelectCar","Clique","Add ao Carrinho")}function d(e,a){return`
        <div data-for="${e.Grupo+a}">
        ${e.Veiculos.map(e=>`
          <div class="veiculos-compativeis__content-compativel">
           <p>${e.Veiculo}</p>
            <div>${e.Anos.map(e=>"<span>"+e+"</span>").join(",&nbsp")}.</div>
          </div>
        `).join("")}
      </div>
    `}function p(e){let a=$("#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header button");if(u()){let t=m(e[0]);0===t?(a.last().css("display","flex"),a.first().css("display","none")):100===t?(a.first().css("display","flex"),a.last().css("display","none")):a.css("display","flex")}else a.css("display","none")}function u(){return document.querySelector(".veiculos-compativeis__box-header").scrollWidth>window.innerWidth}function m(e){return 100*e.scrollLeft/(e.scrollWidth-e.clientWidth)}function v(){let e=encodeURIComponent(location.href);$(".product-qd-v1-social-share a.whatsapp").attr("href",`https://api.whatsapp.com/send?text=${e}`),$(".product-qd-v1-social-share a.twitter").attr("href",`https://twitter.com/intent/tweet?text=${e}`),$(".product-qd-v1-social-share a.mail").attr("href",`mailto:?subject=Quero%20compartilhar%20um%20produto%20da%20Autoglass&body=Veja%20este%20produto%20na%20Autoglass:%0D%0A${e}`),$(".product-qd-v1-social-share a.messenger").attr("href",`fb-messenger://share?link=${e}`),$(".product-qd-v1-social-share a.facebook").attr("href",`https://www.facebook.com/sharer.php?u=${e}`),$(".product-qd-v1-social-share a.popup-trigger").click(e=>{e.preventDefault(),$("div.product-qd-v1-social-share-options-popup").fadeToggle(400,"swing",()=>{$(".product-qd-v1-social-share a.copy").children("i.fas.fa-check").attr("class","far fa-copy")})}),$(".product-qd-v1-social-share a.copy").click(e=>{e.preventDefault(),navigator.clipboard.writeText(location.href),$(".product-qd-v1-social-share a.copy").children("i.far.fa-copy").fadeOut("fast").attr("class","fas fa-check").fadeIn("fast")}),$(".product-qd-v1-social-share a:not(.popup-trigger)").click(e=>{let a=$(e.target).closest("a").attr("class").replace("_","").split(" ");for(let t=0;t<a.length;t++)a[t]=a[t].charAt(0).toUpperCase()+a[t].slice(1);let o=a.join(" ");ga("create","UA-133498560-1","autoglassonline.com","gaSSTracker"),ga("gaSSTracker.set","transport","beacon"),ga("gaSSTracker.send","event","Social Share",`Compartilhar ${o}`,`Bot\xe3o ${o}`)})}$(".veiculos-compativeis-search__search-box .veiculos-compativeis-search__search-input input").on("input",async function(){await c($(this).val())});let h=$("#codigo-sku-acessorio-ag").text().trim(),f=$("#preco-acessorios-ag").text().replace("R$ ","").trim();$(".product-qd-v1-buy-button .buy-button").attr("href","#");let b="/checkout/cart/add?sku="+i[0]+"&qty=1&seller=1&redirect=true&"+readCookie("VTEXSC");function _(){$("body").append(`
  <div id="abrirModal">
  </div>`),$("#abrirModal").append(`
    <div id="fadeModalInstalacao">
      <div id="modalCompra">
        <div class="containerTituloInstalacao">
          <div class="tituloInstalacao">
            <h1> Deseja incluir a instala\xe7\xe3o do produto? </h1>
            <div class="exit-button">\xd7</div>
          </div>
        </div>
        <div id="containers">
          <div id="mobileBlocoDois">
            <fieldset class="containersModalCompra" id="container-compraComInstalacao">
              <div id="headerCompraComInstalacao">
                <div class="inputLabelComInstalacao">
                  <label for="inputComInstalacao">Com Instala\xe7\xe3o</label>
                  <input type="radio" id="inputComInstalacao" name="inputRadioInstalacao" value="ComInstalacao" checked>
                </div>
                <span id="descricao"> Na loja ou em casa</span>
              </div>
              <div class="secao-itens">
                <ul class="lista-beneficios">
                  <li><span>✔</span>Garantia de at\xe9 1 ano</li>
                  <li><span>✔</span>Lojas em todo o Brasil</li>
                  <li><span>✔</span>Equipe especializada</li>
                  <li><span>✔</span>Praticidade e comodidade</li>
                </ul>
                <h3 id="titulo-preco-modal">Apenas
                  <span id="precoComInstalacao">R$
                    <span id="valorComInstalacao">-</span>
                  </span>
                </h3>
              </div>
              <div class="recomendado">
                  Recomendado
              </div>
            </fieldset>
          </div>
          <div id="mobileBlocoUm">
            <fieldset class="containersModalCompra" id="container-compraSemInstalacao">
              <div class="inputLabelSemInstalacao">
                <label for="inputSemInstalacao">Sem Instala\xe7\xe3o</label>
                <input type="radio" id="inputSemInstalacao" name="inputRadioInstalacao" value="SemInstalacao">
              </div>
              <span id="descricao-sem-instalacao">Retire ou receba</span>
              <div class="secao-itens-sem-instalacao">
                <ul class="lista-beneficios-sem-instalacao">
                  <li><span>✔</span>Garantia de at\xe9 3 meses</li>
                  <li><span>✔</span>Lojas em todo o Brasil</li>
                  <li><span>✔</span>Qualidade Autoglass</li>
                </ul>
              </div>
            </fieldset>
          </div>

        </div>
        <div class="containerInfoInsumo">
          <p id="infoInsumo">*Valor referente aos insumos de instala\xe7\xe3o</p>
        </div>
        <div class="containerGridBotao">
          <div class="containersModalCompra" >
            <a id="botaoVoltarCarrinho" href="#">Voltar</a>
          </div>
          <div class="containersModalCompra" id="containerButton">
            <a id="botaoContinuarCarrinho" href="#">Continuar</a>
          </div>
        </div>
      <div class="clearfix"></div>
    </div>
       `),h&&f&&(f<"0,01"?(document.getElementById("titulo-preco-modal").innerHTML="Gr\xe1tis!",document.getElementById("titulo-preco-modal").classList.add("promocaoGratis")):document.getElementById("valorComInstalacao").innerHTML=f);let e=b+"&sku="+h+"&qty=1&seller=1&redirect=true&"+readCookie("VTEXSC");window.screen.width<570&&($("#mobileBlocoDois #beneficiosMobile").css("display","block"),$(document).ready(function(){$("#container-compraSemInstalacao").click(function(){$(".inputLabelComInstalacao input").removeAttr("checked"),$("#inputSemInstalacao").attr("checked",!0),$(".containersModalCompra").css("color","#aeaeae"),$(".containersModalCompra#container-compraSemInstalacao").css("color","red"),$("#botaoContinuarCarrinho").attr("href",b)})}),$("#container-compraComInstalacao").click(function(){$("#inputSemInstalacao").prop("checked",!1),$("#inputComInstalacao").attr("checked",!0),$(".containersModalCompra").css("color","#aeaeae"),$(".containersModalCompra#container-compraComInstalacao").css("color","#43c452"),$("#botaoContinuarCarrinho").attr("href",e)})),$("#fadeModalInstalacao #modalCompra").addClass("filled"),$("#fadeModalInstalacao, .exit-button").click(function(){$("#fadeModalInstalacao #modalCompra").fadeOut(300),$(this).fadeOut(),$("#fadeModalInstalacao div").remove()}),$("#fadeModalInstalacao #modalCompra").click(function(e){e.stopPropagation()}),$("#fadeModalInstalacao, #botaoVoltarCarrinho").click(function(){$("#fadeModalInstalacao #modalCompra").fadeOut(300),$(this).fadeOut(),$("#fadeModalInstalacao div").remove()}),$("#botaoContinuarCarrinho").attr("href",e),$(document).ready(function(){$('input:radio[name="inputRadioInstalacao"]').change(function(){$(".containersModalCompra").css("color","#aeaeae"),$("#inputComInstalacao").is(":checked")?$("#botaoContinuarCarrinho").attr("href",e):$("#inputSemInstalacao").is(":checked")&&($(".containersModalCompra#container-compraSemInstalacao").css("color","red"),$("#botaoContinuarCarrinho").attr("href",b))})})}h&&f?$(".product-qd-v1-buy-button .buy-button").on("click",function(){_(),$("#modalCompra #botaoContinuarCarrinho").focus()}):$(".product-qd-v1-buy-button .buy-button").click(function(){window.location.href=b}),$(document).ready(function(){$(".botao-compre-whatsapp").click(function(){let e=`Ol\xe1, estou na p\xe1gina desse produto e gostaria de compr\xe1-lo: ${window.location.href}`;window.open(urlWhatsAppApi+numeroWhatsAppAG+"?text="+e,"_blank").focus()})})}),buscarPromocoes();