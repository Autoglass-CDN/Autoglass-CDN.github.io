$(function(){let t="data-render-cep",e={FINISH_LOAD:"cep-finish-load",CEP_UPDATED:"cep-updated"},n=function(){return{init:async function(){let s=await a.getOrderForm();s.shippingData&&a.saveAddressOnLocalStorage(s.shippingData);let c=i(s);$('.cep:not(".link")').each(function(n,i){$(i).html("").addClass("ghost-loading");let s=$(i).attr(t);i.id="cep"+n,$(s).css("overflow","hidden"),$(s).css("min-height","150px"),o.renderCepInfo(i,s,c),$(window).on(e.CEP_UPDATED,async t=>{let e=t.originalEvent.detail;a.saveAddressOnLocalStorage(e.shippingData),$(i).html("").addClass("ghost-loading"),o.renderCepInfo(i,s,e.shippingData.address)}),$(window).on("orderFormUpdated.vtex",(t,e)=>{a.saveAddressOnLocalStorage(e.shippingData)})}),function(t){let e={"mz-pu-on":{rendered:!1,container:".mz-content"},"mz-in-on":{rendered:!1,container:".secao-agendamento"},"mz-as-on":{rendered:!1,container:".mz-advantages__content"},"mz-sf-on":{rendered:!1,container:".mz-shipping-cep-content"}},n=new MutationObserver(n=>{let a=i(t);a||n.forEach(t=>{if("class"===t.attributeName){let n=t.target.classList;for(let i in e)n.contains(i)&&!e[i].rendered&&(e[i].rendered=!0,o.renderNewCep(e[i].container,a))}})});n.observe(document.getElementsByTagName("body")[0],{attributes:!0}),$(window).on("orderFormUpdated.vtex",(e,n)=>{t=n})}(s),window.dispatchEvent(new CustomEvent(e.FINISH_LOAD,{detail:s})),$("#shipping-preview-container").on("click",".srp-delivery-info div",function(t){let e="none"!=document.querySelector(".datas-disponiveis").style.display;vtexjs?.checkout?.orderForm&&vtexjs.checkout.orderForm.shippingData.address.postalCode&&!e&&n.submitEvent(t,vtexjs.checkout.orderForm.shippingData.address.postalCode)})},formatAddress:function(t){let{city:e,neighborhood:n,state:o,street:a,postalCode:i}=t,s="";return a&&(s+=a),n&&(a&&(s+=" - "),s+=n),e&&(n&&(s+=", "),s+=e),o&&(e&&(s+=" - "),s+=o),s||i},submitEvent:async function(t,n){if(t.preventDefault(),!n)return void $(this).addClass("cep-new__content-form--error");$(".cep-new__content--loading").show().css("right","-1px");try{let[o]=await a.calculateShipping(n);$(".cep-new").css("transform","translateX(105%)"),localStorage.setItem("ufDefinedByTop",0),window.dispatchEvent(new CustomEvent(e.CEP_UPDATED,{detail:o})),setTimeout(()=>$(".cep-new").remove(),1e3)}catch(i){$(".cep-new__content--loading").hide().css("right","unset"),console.error(i)}}};function i(t){let e,n=window.location.href.includes("/checkout"),o=+localStorage.getItem("ufDefinedByTop");return!n&&o?e=null:t.shippingData&&(e=t.shippingData.address),e}}(),o=function(){return{renderCepInfo:function(o,a,i){if(i){let s=n.formatAddress(i);$(o).removeClass("ghost-loading").html(`
						<div class="cep-info">
							<div class="cep-info__location">
								<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd"
										d="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
									<path fill-rule="evenodd" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
								</svg>
								<span class="cep-info__location-street">${s}</span>
							</div>
							<button id="change-cep-button" class="cep-info__location-button">Alterar</button>
						</div>
					`)}else $(o).removeClass("ghost-loading").html('\n						<div class="cep-info">\n							<div class="cep-info__location">\n								<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor"\n									xmlns="http://www.w3.org/2000/svg">\n									<path fill-rule="evenodd"\n										d="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />\n									<path fill-rule="evenodd" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />\n								</svg>\n							</div>\n							<button id="change-cep-button" class="cep-info__location-button">Informe seu cep aqui</button>\n						</div>\n					');if(+localStorage.getItem("locationChanged")){let c=$(`#${o.id}`),r=c.html();r+='<span class="cep-info__location-changed">Regi\xe3o alterada conforme novo CEP informado.</span>',c.html(r)}$(`#${o.id} .cep-info__location-button`).click(()=>{a?e(a,i):console.error(t+" n\xe3o encontrado. Id: "+o.id)})},renderNewCep:e};function e(t,e){$(t).append(`
				<div class="cep-new">
					<div class="cep-new__content">
						<div class="cep-new__content--loading">
							<div>
								<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd"
										d="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
									<path fill-rule="evenodd" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
								</svg>
								<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt-fill" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd"
										d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
								</svg>
							</div>
						</div>
						<span class="cep-new__content-title">Informe seu CEP</span>
						<form class="cep-new__content-form">
							<input type="text" inputmode="numeric" autocomplete="off" id="cep-input" placeholder="00000-000" class="cep-new__content-input" />
							<button id="cep-new-button" type="submit" class="cep-new__content-button">
								<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right-circle-fill" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd"
										d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-11.5.5a.5.5 0 0 1 0-1h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5z" />
								</svg>
							</button>
						</form>
					</div>
					${e?'<div class="cep-new__footer">						    <button id="cep-back-button" type="button" class="cep-new__footer-back-button">Voltar</button>					    </div>':""}
				</div>
			`),setTimeout(()=>$(`${t} .cep-new`).css("transform","translateX(0)"),100);let o=`${t} .cep-new__content-input`,a=function(t){let e=window.innerWidth<1200;return e?($(t).attr("placeholder","00000000"),$(t).attr("max-length","8")):($(t).attr("placeholder","00000-000"),$(t).attr("max-length","9"),$(t).mask("99999-999")),e}(o),i=a?8:9;$(`${t} .cep-new__footer-back-button`).click(e=>{$(`${t} .cep-new`).css("transform","translateX(-105%)"),setTimeout(()=>$(`${t} .cep-new`).remove(),1e3)}),$(o).focus(),$(o).click(function(){a||$(this)[0].setSelectionRange(0,0)}),$(o).keyup(t=>{if(t.preventDefault(),t.target.value.replace("_","").length===i){let e=$(o).val();n.submitEvent(t,e)}}),$(`${t} .cep-new__content-form`).on("submit",t=>{if(t.preventDefault(),$(o).val().replace("-","").length===i){let e=$(o).val();n.submitEvent(t,e)}})}}(),a={calculateShipping:async function(t){let e=await vtexjs.checkout.calculateShipping({postalCode:t,country:"BRA",addressType:"search"}),n=await vtexjs.checkout.calculateShipping({postalCode:t,country:"BRA",addressType:"residential"});return[e,n]},getOrderForm:async function(){return await vtexjs.checkout.getOrderForm()},saveAddressOnLocalStorage:function(t){localStorage.setItem("AG_AddressSelected",JSON.stringify({...t.address,logisticsInfo:t.logisticsInfo}))}};n.init()});