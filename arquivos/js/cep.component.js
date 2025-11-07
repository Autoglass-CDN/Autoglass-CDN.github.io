$(function(e){let t="data-render-cep",n={FINISH_LOAD:"cep-finish-load",CEP_UPDATED:"cep-updated"},o=function(){return{init:async function(){var c;let r=await i.getOrderForm();r.shippingData&&i.saveAddressOnLocalStorage(r.shippingData);let l=s(r),d;e('.cep:not(".link")').each(function(o,s){e(s).html("").addClass("ghost-loading");let c=e(s).attr(t);s.id="cep"+o,e(c).css("overflow","hidden"),e(c).css("min-height","150px"),a.renderCepInfo(s,c,l),e(window).on(n.CEP_UPDATED,async t=>{let n=t.originalEvent.detail;i.saveAddressOnLocalStorage(n.shippingData),e(s).html("").addClass("ghost-loading"),a.renderCepInfo(s,c,n.shippingData.address)}),e(window).on("orderFormUpdated.vtex",(e,t)=>{i.saveAddressOnLocalStorage(t.shippingData)})}),c=r,d={"mz-pu-on":{rendered:!1,container:".mz-content"},"mz-in-on":{rendered:!1,container:".secao-agendamento"},"mz-as-on":{rendered:!1,container:".mz-advantages__content"},"mz-sf-on":{rendered:!1,container:".mz-shipping-cep-content"}},new MutationObserver(e=>{let t=s(c);t||e.forEach(e=>{if("class"===e.attributeName){let n=e.target.classList;for(let o in d)n.contains(o)&&!d[o].rendered&&(d[o].rendered=!0,a.renderNewCep(d[o].container,t))}})}).observe(document.getElementsByTagName("body")[0],{attributes:!0}),e(window).on("orderFormUpdated.vtex",(e,t)=>{c=t}),window.dispatchEvent(new CustomEvent(n.FINISH_LOAD,{detail:r})),e("#shipping-preview-container").on("click",".srp-delivery-info div",function(e){let t="none"!=document.querySelector(".datas-disponiveis").style.display;vtexjs?.checkout?.orderForm&&vtexjs.checkout.orderForm.shippingData.address.postalCode&&!t&&o.submitEvent(e,vtexjs.checkout.orderForm.shippingData.address.postalCode)})},formatAddress:function(e){let{city:t,neighborhood:n,state:o,street:a,postalCode:i}=e,s="";return a&&(s+=a),n&&(a&&(s+=" - "),s+=n),t&&(n&&(s+=", "),s+=t),o&&(t&&(s+=" - "),s+=o),s||i},submitEvent:async function(t,o){if(t.preventDefault(),!o)return void e(this).addClass("cep-new__content-form--error");e(".cep-new__content--loading").show().css("right","-1px");try{let[a]=await i.calculateShipping(o);e(".cep-new").css("transform","translateX(105%)"),localStorage.setItem("ufDefinedByTop",0),window.dispatchEvent(new CustomEvent(n.CEP_UPDATED,{detail:a})),setTimeout(()=>e(".cep-new").remove(),1e3)}catch(s){e(".cep-new__content--loading").hide().css("right","unset"),console.error(s)}}};function s(e){let t,n=window.location.href.includes("/checkout"),o=+localStorage.getItem("ufDefinedByTop");return!n&&o?t=null:e.shippingData&&(t=e.shippingData.address),t}}(),a=function(){return{renderCepInfo:function(a,i,s){if(s){let c=o.formatAddress(s);e(a).removeClass("ghost-loading").html(`
						<div class="cep-info">
							<div class="cep-info__location">
								<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd"
										d="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
									<path fill-rule="evenodd" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
								</svg>
								<span class="cep-info__location-street">${c}</span>
							</div>
							<button id="change-cep-button" class="cep-info__location-button">Alterar</button>
						</div>
					`)}else e(a).removeClass("ghost-loading").html('\n						<div class="cep-info">\n							<div class="cep-info__location">\n								<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor"\n									xmlns="http://www.w3.org/2000/svg">\n									<path fill-rule="evenodd"\n										d="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />\n									<path fill-rule="evenodd" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />\n								</svg>\n							</div>\n							<button id="change-cep-button" class="cep-info__location-button">Informe seu cep aqui</button>\n						</div>\n					');if(+localStorage.getItem("locationChanged")){let r=e(`#${a.id}`),l=r.html();l+='<span class="cep-info__location-changed">Regi\xe3o alterada conforme novo CEP informado.</span>',r.html(l)}e(`#${a.id} .cep-info__location-button`).click(()=>{i?n(i,s):console.error(t+" n\xe3o encontrado. Id: "+a.id)})},renderNewCep:n};function n(t,n){var a;e(t).append(`
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
					${n?'<div class="cep-new__footer">						    <button id="cep-back-button" type="button" class="cep-new__footer-back-button">Voltar</button>					    </div>':""}
				</div>
			`),setTimeout(()=>e(`${t} .cep-new`).css("transform","translateX(0)"),100);let i,s=`${t} .cep-new__content-input`,c=(a=s,(i=window.innerWidth<1200)?(e(a).attr("placeholder","00000000"),e(a).attr("max-length","8")):(e(a).attr("placeholder","00000-000"),e(a).attr("max-length","9"),e(a).mask("99999-999")),i),r=c?8:9;e(`${t} .cep-new__footer-back-button`).click(n=>{e(`${t} .cep-new`).css("transform","translateX(-105%)"),setTimeout(()=>e(`${t} .cep-new`).remove(),1e3)}),e(s).focus(),e(s).click(function(){c||e(this)[0].setSelectionRange(0,0)}),e(s).keyup(t=>{if(t.preventDefault(),t.target.value.replace("_","").length===r){let n=e(s).val();o.submitEvent(t,n)}}),e(`${t} .cep-new__content-form`).on("submit",t=>{if(t.preventDefault(),e(s).val().replace("-","").length===r){let n=e(s).val();o.submitEvent(t,n)}})}}(),i={calculateShipping:async function(e){let t=await vtexjs.checkout.calculateShipping({postalCode:e,country:"BRA",addressType:"search"}),n=await vtexjs.checkout.calculateShipping({postalCode:e,country:"BRA",addressType:"residential"});return[t,n]},getOrderForm:async function(){return await vtexjs.checkout.getOrderForm()},saveAddressOnLocalStorage:function(e){localStorage.setItem("AG_AddressSelected",JSON.stringify({...e.address,logisticsInfo:e.logisticsInfo}))}};o.init()});