const baseUrlApi=window.location.href.includes("dev")||window.location.href.includes("mvp")||window.location.href.includes("hml")?"https://api-hml.autoglass.com.br/integracao-b2c/api/web-app":"https://api.autoglass.com.br/integracao-b2c/api/web-app",sections=[...document.querySelectorAll("section.tab-content")],getLinkById=a=>document.querySelector(`a[href='#${a}'].tab-link`);$(".product-qd-v1-buy-button .buy-button.buy-button-ref").addClass("add-to-cart-ga");var veiculosBuscaveis=[];const sugestoesContainer=$(".veiculos-compativeis-search__search-suggestions");$(".veiculos-compativeis-search").hide();const inView=(a,e)=>{let o=a.offsetTop,t=a.offsetHeight;for(;a.offsetParent;)o+=(a=a.offsetParent).offsetTop;return e&&(o-=e>1200?250:130),o<window.pageYOffset+window.innerHeight&&o+t>window.pageYOffset};window.onscroll=()=>{let a=!1;sections.forEach(e=>{let o=getLinkById(e.id);inView(e,window.innerWidth)&&!a?(o.classList.add("tab--current"),a=!0):o&&o.classList.remove("tab--current")})};const toggleSectionCollapse=a=>{a.classList.contains("ativo")?a.classList.remove("ativo"):a.classList.add("ativo")},sectionCollapseInit=()=>{document.querySelectorAll(".contents .tab-content h2").forEach(a=>{a.onclick=e=>{toggleSectionCollapse(a.closest(".tab-content"))},("Compre Junto"===a.textContent||"Outras Marcas"===a.textContent)&&setTimeout(()=>toggleSectionCollapse(a.closest(".tab-content")),5e3)})};async function insertBrandDescription(){return fetch("/api/catalog_system/pub/brand/list").then(a=>a.json()).then(a=>{let e=document.querySelector(".brandName").classList.value.replace("brandName","").trim().replace("-"," ").split(" ")[0],o=a.find(a=>a.name.includes(e));if(o&&""!==o.metaTagDescription){let t=o.metaTagDescription,i=document.querySelector("#descricao-marca");i.textContent=t,i.parentElement.parentElement.style.display="block"}})}async function getProductRefIdByProductName(){let a=await vtexjs.catalog.getCurrentProductWithVariations(),[e,o]=a.name.match(/(\d+)(\s?\-?\s?[0-9]+)?$/);return o}async function loadOptionals(){let a=$("#opcionais"),e=await getProductRefIdByProductName(),o=$(".teste-opcionais");try{let{Opcionais:t}=await $.get(`${baseUrlApi}/produtos/${e}/opcionais`);t&&t.length>0&&(a.html(`
        <h3>Caracter\xedsticas</h3>
        <div class="caracteristicas__box">
          ${t.map(a=>`<span class="caracteristicas__caracteristica">${a}</span>`).join("")}
        </div>
      `),o.html(`
            ${t.map(a=>`<h4 class="lista-opcionais">${a}</h4>`).join("")}
            <div class="container-mais-especificacoes">
              <a class="mais-especificacoes">Mais informa\xe7\xf5es</a>
            </div>
      `))}catch(i){console.error("Falha ao renderizar opcionais. \n ",i)}$(".container-mais-especificacoes .mais-especificacoes").click(function(){document.querySelector(".container-descricao #informacoes-gerais").scrollIntoView()})}async function loadSimilars(){var a,e;let o=a=>document.querySelector(`a[href="#${a}"]`).parentElement.style.display="none",t=a=>(document.querySelector(`#${a}`).style.display="block",document.querySelector(`a[href="#${a}"]`).parentElement.style.display="unset");o("outras-marcas"),o("compre-junto"),a="similars",""!=document.querySelector(`#${a}`).innerHTML&&t("outras-marcas"),e="sugestoes",""!=document.querySelector(`#${e}`).innerHTML&&t("compre-junto")}sectionCollapseInit(),window.addEventListener("load",insertBrandDescription),window.addEventListener("load",loadOptionals),loadSimilars(),$(window).on("ready",async()=>{function a(){$(".product-qd-v1-image div#image").css("min-height",$(".product-qd-v1-image #image-main").width())}window.addEventListener("resize",a),a(),g();let e=$("#veiculos-compativeis"),o=await getProductRefIdByProductName();try{let t=await $.get(`${baseUrlApi}/produtos/${o}/veiculos-compativeis`);veiculosBuscaveis=t;let i=!!t&&t.length>0;if(i>0){e.html(`
        <h2>Ve\xedculos Compat\xedveis</h2>
        <div class="veiculos-compativeis__box">
          <div class="veiculos-compativeis__box-header">
            <button id="group-prev" data-type="prev" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <path id="Icon_ionic-ios-arrow-dropleft-circle" data-name="Icon ionic-ios-arrow-dropleft-circle" d="M19.375,3.375a16,16,0,1,0,16,16A16,16,0,0,0,19.375,3.375Zm3.338,22.238a1.49,1.49,0,0,1,0,2.1,1.467,1.467,0,0,1-1.046.431,1.492,1.492,0,0,1-1.054-.438l-7.231-7.254a1.483,1.483,0,0,1,.046-2.046l7.338-7.362a1.485,1.485,0,0,1,2.1,2.1l-6.3,6.231Z" transform="translate(35.375 35.375) rotate(180)" opacity="0.42"/>
            </svg>
            </button>
            ${t.map(p).join("")}
            <button id="group-next" data-type="next" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <path id="Icon_ionic-ios-arrow-dropleft-circle" data-name="Icon ionic-ios-arrow-dropleft-circle" d="M19.375,3.375a16,16,0,1,0,16,16A16,16,0,0,0,19.375,3.375Zm3.338,22.238a1.49,1.49,0,0,1,0,2.1,1.467,1.467,0,0,1-1.046.431,1.492,1.492,0,0,1-1.054-.438l-7.231-7.254a1.483,1.483,0,0,1,.046-2.046l7.338-7.362a1.485,1.485,0,0,1,2.1,2.1l-6.3,6.231Z" transform="translate(35.375 35.375) rotate(180)" opacity="0.42"/>
              </svg>
            </button>
          </div>
          <div class="veiculos-compativeis__box-content">
              ${t.map(m).join("")}
          </div>
        </div>
      `),$(".veiculos-compativeis__header-option").first().addClass("active"),$(".veiculos-compativeis__box-content div").first().addClass("active"),$(".veiculos-compativeis__header-option").click(function(){$(".veiculos-compativeis__header-option").removeClass("active"),$(this).addClass("active"),$(".veiculos-compativeis__box-content div").removeClass("active"),$(`.veiculos-compativeis__box-content div[data-for="${$(this).attr("id")}"]`).addClass("active")}),$("#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header button").click(function(){let a=$(this).attr("data-type"),e=$("#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header");"next"===a?e[0].scrollBy(200,0):e[0].scrollBy(-200,0)});let s=$("#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header");$("#veiculos-compativeis h2").click(()=>toggleSectionCollapse(e[0])),v(s),s.on("scroll",function(){v($(this))}),$(window).on("resize",function(){v(s)}),$(".veiculos-compativeis-search").show()}else $('a[href="#veiculos-compativeis"]').parent().hide(),e.hide()}catch(c){$('a[href="#veiculos-compativeis"]').parent().hide(),console.error("Falha ao renderizar os ve\xedculos compativeis. \n ",c)}let n=Product.captureSkuSelectors(),l="/checkout/cart/add?sku="+n[0]+"&qty=1&seller=1&redirect=true&"+readCookie("VTEXSC");function r(a){if(veiculosBuscaveis&&veiculosBuscaveis.length>0&&a.length>0){let e=veiculosBuscaveis.map(e=>e.Veiculos.filter(e=>RegExp(a.split(" ").map(a=>`(?=.*${a})`).join(""),"i").test(e.Veiculo))).filter(a=>a.length>0);e.length?(sugestoesContainer.html(e.flat().slice(0,3).map(d).join("")+`<div class="veiculos-compativeis-search__link">
                            <a href="#veiculos-compativeis">Ver todos</a>
                          </div>`),document.querySelectorAll("a.veiculos-compativeis__content-compativel-link").forEach(a=>a.addEventListener("click",u))):sugestoesContainer.html(`
          <div class="veiculos-compativeis-search__disclaimer">
            Modelo de carro n\xe3o compat\xedvel :(
          </div>
          <div class="veiculos-compativeis-search__link">
            <a href="#veiculos-compativeis">Ver todos</a>
          </div>
        `)}else sugestoesContainer.empty()}function d(a,e){return`<a href="${l}"
               class="veiculos-compativeis__content-compativel-link">
              <p>${a.Veiculo}</p>
              <div>${a.Anos.map(a=>"<span>"+a+"</span>")}.</div>
            </a>`}function p(a,e){return`
          <div id="${a.Grupo+e}" class="veiculos-compativeis__header-option">
              <span>${a.Grupo}</span>
          </div>
      `}function u(a){ga("set","transport","beacon"),ga("send","event","Link SelectCar","Clique","Add ao Carrinho")}function m(a,e){return`
      <div data-for="${a.Grupo+e}">
          ${a.Veiculos.map(a=>`
              <div class="veiculos-compativeis__content-compativel">
                  <p>${a.Veiculo}</p>
                  <div>${a.Anos.map(a=>"<span>"+a+"</span>")}.</div>
              </div>
          `).join("")}
      </div>
    `}function v(a){let e=$("#veiculos-compativeis .veiculos-compativeis__box .veiculos-compativeis__box-header button");if(h()){let o=f(a[0]);0===o?(e.last().css("display","flex"),e.first().css("display","none")):100===o?(e.first().css("display","flex"),e.last().css("display","none")):e.css("display","flex")}else e.css("display","none")}function h(){return document.querySelector(".veiculos-compativeis__box-header").scrollWidth>window.innerWidth}function f(a){return 100*a.scrollLeft/(a.scrollWidth-a.clientWidth)}function g(){let a=encodeURIComponent(location.href);$(".product-qd-v1-social-share a.whatsapp").attr("href",`https://api.whatsapp.com/send?text=${a}`),$(".product-qd-v1-social-share a.twitter").attr("href",`https://twitter.com/intent/tweet?text=${a}`),$(".product-qd-v1-social-share a.mail").attr("href",`mailto:?subject=Quero%20compartilhar%20um%20produto%20da%20Autoglass&body=Veja%20este%20produto%20na%20Autoglass:%0D%0A${a}`),$(".product-qd-v1-social-share a.messenger").attr("href",`fb-messenger://share?link=${a}`),$(".product-qd-v1-social-share a.facebook").attr("href",`https://www.facebook.com/sharer.php?u=${a}`),$(".product-qd-v1-social-share a.popup-trigger").click(a=>{a.preventDefault(),$("div.product-qd-v1-social-share-options-popup").fadeToggle(400,"swing",()=>{$(".product-qd-v1-social-share a.copy").children("i.fas.fa-check").attr("class","far fa-copy")})}),$(".product-qd-v1-social-share a.copy").click(a=>{a.preventDefault(),navigator.clipboard.writeText(location.href),$(".product-qd-v1-social-share a.copy").children("i.far.fa-copy").fadeOut("fast").attr("class","fas fa-check").fadeIn("fast")}),$(".product-qd-v1-social-share a:not(.popup-trigger)").click(a=>{let e=$(a.target).closest("a").attr("class"),o=e.replace("_","").split(" ");for(let t=0;t<o.length;t++)o[t]=o[t].charAt(0).toUpperCase()+o[t].slice(1);let i=o.join(" ");ga("create","UA-133498560-1","autoglassonline.com","gaSSTracker"),ga("gaSSTracker.set","transport","beacon"),ga("gaSSTracker.send","event","Social Share",`Compartilhar ${i}`,`Bot\xe3o ${i}`)})}$(".veiculos-compativeis-search__search-box .veiculos-compativeis-search__search-input input").on("input",function(){r($(this).val())});let _=["Vidro","Parabrisa"],b=$(".product-qd-v1-sku-selection-wrapper .product-qd-v1-name").text(),C=b.split(" ")[0],y,k=["1810569","2044569","956999","698738","300755","66849","1826649","1263639","920359","956959","1188449","957209","1670049","632661","1816699","632259","393903","957019","393927","1008405"],I=$(".product-qd-v1-sku-selection-box  .product-qd-v1-ref-code").text(),S={instalacao60:"60,00*",instalacao130:"129,99*"};$(".product-qd-v1-buy-button .buy-button").attr("href","#");let w="/checkout/cart/add?sku="+n[0]+"&qty=1&seller=1&redirect=true&"+readCookie("VTEXSC");function x(){$("body").append(`
    <div id="abrirModal">
       </div>`),$("#abrirModal").append(`
      <div id="fadeModalInstalacao">
        <div id="modalCompra">
          <div class = containerTituloInstalacao>
            <div class="tituloInstalacao">
              <h1> Instala\xe7\xe3o </h1>
            </div>
          </div>
          <div class="exit-button">\xd7</div>

          <div id="containers">
            <div id="mobileBlocoUm">
              <fieldset id="beneficios" class="containersModalCompra">
                <legend>-</legend>
                <img loading="lazy" src="https://autoglass-cdn.github.io/src/img/logo-autoglass.png" alt="Autoglass" class="logo">
                <h3 class="primeiraLinha">Garantia de at\xe9 1 ano</h3>
                <h3 class="segundaLinha">Equipe Especializada</h3>
                <h3>Seguran\xe7a e comodidade</h3>
              </fieldset>

              <fieldset class="containersModalCompra" id="container-compraSemInstalacao">
                <legend>-</legend>
                <div class="inputLabelSemInstalacao">
                  <input type="radio" id="inputSemInstalacao" name="inputRadioInstalacao" value="SemInstalacao">
                  <label for="inputSemInstalacao">Sem Instala\xe7\xe3o</label>
                </div>
                <i id="primeiroblock" class="block"></i>
                <i id="segundablock"class="block"></i>
                <i class="block"></i>
              </fieldset>
            </div>

            <div id="mobileBlocoDois">
              <fieldset id="beneficios" class="containersModalCompra">
                <legend>-</legend>
                <img loading="lazy" src="https://autoglass-cdn.github.io/src/img/logo-autoglass.png" alt="Autoglass" class="logo">
                <h3 class="primeiraLinha">Garantia de at\xe9 1 ano</h3>
                <h3 class="segundaLinha">Equipe Especializada</h3>
                <h3>Seguran\xe7a e comodidade</h3>
              </fieldset>

              <fieldset class="containersModalCompra" id="container-compraComInstalacao">
                <legend>RECOMENDADO</legend>
                <div id="headerCompraComInstalacao">
                  <div class="inputLabelComInstalacao">
                      <input type="radio" id="inputComInstalacao" name="inputRadioInstalacao" value="ComInstalacao" checked>
                      <label for="inputComInstalacao">Com Instala\xe7\xe3o</label>
                  </div>
                  <span id="descricao"> Apenas em Lojas Autoglass ou em casa.</span>
                </div>
                <i id="primeirochecked" class="checked"></i>
                <i id="segundochecked" class="checked"></i>
                <i class="checked"></i>
                <h3>Por apenas <span id="precoComInstalacao">R$ <span id="valorComInstalacao">60</span></span></h3>
              </fieldset>
            </div>
          </div>
          <div class="containerInfoInsumo">
            <p id="alinhamentoInfoInsumo"></p>
            <p></p>
            <p id="infoInsumo">*Valor referente aos insumos de instala\xe7\xe3o</p>
          </div>
          <div class="containerGridBotao">
            <div class="alinhabotao"></div>
            <div class="containersModalCompra" id="containerButton">
              <a id="botaoContinuarCarrinho" href="#">Continuar</a>
            </div>
          </div>
        <div class="clearfix"></div>
      </div>
      `),k.includes(I)?(y=27696,document.getElementById("valorComInstalacao").innerHTML=S.instalacao130):_.includes(C)&&(y=10748,document.getElementById("valorComInstalacao").innerHTML=S.instalacao60);var a=w+"&sku="+y+"&qty=1&seller=1&redirect=true&"+readCookie("VTEXSC");window.screen.width<570&&($("#mobileBlocoDois #beneficiosMobile").css("display","block"),$(document).ready(function(){$("#container-compraSemInstalacao").click(function(){$(".inputLabelComInstalacao input").removeAttr("checked"),$("#inputSemInstalacao").attr("checked",!0),$(".containersModalCompra").css("color","#aeaeae"),$(".containersModalCompra#container-compraSemInstalacao").css("color","red"),$("#botaoContinuarCarrinho").attr("href",w)})}),$("#container-compraComInstalacao").click(function(){$("#inputSemInstalacao").prop("checked",!1),$("#inputComInstalacao").attr("checked",!0),$(".containersModalCompra").css("color","#aeaeae"),$(".containersModalCompra#container-compraComInstalacao").css("color","#43c452"),$("#botaoContinuarCarrinho").attr("href",a)})),$("#fadeModalInstalacao #modalCompra").addClass("filled"),$("#fadeModalInstalacao, .exit-button").click(function(a){$("#fadeModalInstalacao #modalCompra").fadeOut(300),$(this).fadeOut(),$("#fadeModalInstalacao div").remove()}),$("#fadeModalInstalacao #modalCompra").click(function(a){a.stopPropagation()}),$("#botaoContinuarCarrinho").attr("href",a),$(".containersModalCompra#container-compraComInstalacao").css("color","#43c452"),$(document).ready(function(){$('input:radio[name="inputRadioInstalacao"]').change(function(){$(".containersModalCompra").css("color","#aeaeae"),$("#inputComInstalacao").is(":checked")?($(".containersModalCompra#container-compraComInstalacao").css("color","#43c452"),$("#botaoContinuarCarrinho").attr("href",a)):$("#inputSemInstalacao").is(":checked")&&($(".containersModalCompra#container-compraSemInstalacao").css("color","red"),$("#botaoContinuarCarrinho").attr("href",w))})})}async function q(){let a=window.location.href.includes("dev")||window.location.href.includes("hml")?"https://api-hml.autoglass.com.br/integracao-b2c/":"https://api-farm-int.autoglass.com.br/integracao-b2c/",e=await $.get(`${a}api/web-app/integracoes-produtos/${await getProductRefIdByProductName()}`),o=null!==e.AnoInicio?parseInt(e.AnoInicio):null,t=null!==e.AnoFim?parseInt(e.AnoFim):null;null===o?o=t:null===t&&(t=o);let i=(await $.get(`${a}api/web-app/integracoes-seguradoras/mapeamentos-fipes?CodigoVeiculo=${e.CodigoVeiculo}&CodigoMontadora=${e.CodigoMontadora}&AnoAproximado=${Math.floor((o+t)/2)}`))[0].CodigoMapeamentoFipe,s=await $.get(`${a}api/web-app/integracoes-seguradoras/classificacoes-pecas?CodigoVeiculo=${e.CodigoVeiculo}&CodigoMontadora=${e.CodigoMontadora}&CodigoMapeamentoFipe=${i}`),c=formatarDadosMapeamento(s);c.sort(function(a,e){return e.ClassificacaoScript.length-a.ClassificacaoScript.length});let n=formatarDadosMapeamento(vtxctx.categoryName);var l=c.filter(a=>a.ClassificacaoScript.includes(n)).map(a=>[a.CodigoClassificaScript]);if(1!==l.length){var r=window.location.href.replace(/https:\/\/dev2autoglass.myvtex.com\//g,"");let d=r.replace(/-/g," "),p=tirarMasculinoFeminino(d),u=p.split(" ");for(let m=0;m<c.length;m++){let v=c[m].ClassificacaoScript.split(" "),h=!0;for(let f=0;f<v.length;f++)if(!u.includes(v[f])){h=!1;break}if(h){l=[c[m].CodigoClassificaScript];break}}}if(1!==l.length){let g=formatarDadosMapeamento(document.querySelector("#informacoes-gerais-descricao .productDescriptionShort").textContent).split(" ").filter(a=>a.length>3).slice(0,8);for(let _=0;_<c.length;_++){let b=c[_].ClassificacaoScript.split(" "),C=!0;for(let y=0;y<b.length;y++)if(!g.includes(b[y])){C=!1;break}if(C){l=[c[_].CodigoClassificaScript];break}}}let k=await $.get(`${a}api/web-app/integracoes-seguradoras/imagens-pecas?CodigoClassificaScript=${parseInt(l[0])}&CodigoMapeamentoFipe=${i}`);k&&""==k.FotografiaTraseira&&1==l.length&&null!==i&&posicionarImagemReq(k.FotografiaFrontal)}_.includes(C)?$(".product-qd-v1-buy-button .buy-button").on("click",function(){x(),$("#modalCompra #botaoContinuarCarrinho").focus()}):$(".product-qd-v1-buy-button .buy-button ").click(function(){window.location.href=w}),$(document).ready(function(){$(".botao-compre-whatsapp").click(function(){let a=`Ol\xe1, estou na p\xe1gina desse produto e gostaria de compr\xe1-lo: ${window.location.href}`;window.open(urlWhatsAppApi+numeroWhatsAppAG+"?text="+a,"_blank").focus()})})});
