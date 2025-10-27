(function($) {

  let whatsappIconDesktop = document.querySelector('#whatsapp-icon-link-desktop');
  let whatsappIconFlutuante = document.querySelector('#whatsapp-icon-link');

  const textoConteudoComNumero = "Whatsapp: " + numeroWhatsAppFormatadoAG;

  $('.link-whatsapp').attr('href', urlWhatsAppApi + numeroWhatsAppAG);
  $('.link-whatsapp-texto').attr('href', urlWhatsAppApi + numeroWhatsAppAG + textoUrlGet);
  $('.link-whatsapp-conteudo').text(textoConteudoComNumero);

  if(document.querySelector('.product-qd-v1-fixed-bar')&& whatsappIconFlutuante) {
      whatsappIconFlutuante.style.marginBottom = '63px'
  }

  let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

  if (whatsappIconDesktop) {
    createGAWhatsapp(whatsappIconDesktop, 'Topo Desktop');
  }

  if (whatsappIconFlutuante) {
    createGAWhatsapp(whatsappIconFlutuante, 'Flutuante');
  }

  function createGAWhatsapp (icon, device) {
      icon.addEventListener(touchEvent, (_) => {
          ga('create', 'UA-133498560-1', 'autoglassonline.com', 'gaTracker');
          ga('gaTracker.set', 'transport', 'beacon');
          ga('gaTracker.send', 'event', 'WhatsApp', 'Clique', `${device}`);
      }, {passive: true});
  }
})(jQueryNew);
