(() => {

    let whatsappIconDesktop = document.querySelector('#whatsapp-icon-link-desktop');
    let whatsappIconMobile = document.querySelector('#whatsapp-icon-link-mobile');
    let whatsappIconRodape = document.querySelector('#whatsapp-icon-rodape');
    
    //---------------------------------------------
    let whatsappIconFlutuante = document.querySelector('#whatsapp-icon-link');
    
    if(document.querySelector('.product-qd-v1-fixed-bar')) {
        whatsappIconFlutuante.style.marginBottom = '55px'
    }
    //---------------------------------------------

    let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
    
    createGAWhatsapp(whatsappIconDesktop, 'Topo');
    createGAWhatsapp(whatsappIconMobile, 'Topo');
    createGAWhatsapp(whatsappIconFlutuante, 'Flutuante');
    createGAWhatsapp(whatsappIconRodape, 'Rodapé');

    function createGAWhatsapp (icon, device) {
        icon.addEventListener(touchEvent, (_) => {
            ga('create', 'UA-133498560-1', 'autoglassonline.com', 'gaTracker');
            ga('gaTracker.set', 'transport', 'beacon');
            ga('gaTracker.send', 'event', 'WhatsApp', 'Clique', `${device}`);
        }, {passive: true});
    }
    
    const addBorderZDButton = () => { //ZENDESK -- Remover caso deixe de usar
        let iframe = document.querySelector('#launcher');
        zdFrame = document.querySelector('#launcher').contentDocument
        
        if(!zdFrame) {
            return;
        }

        iframe.style.margin = '5px 20px';
        zdFrame.querySelector('.u-userLauncherColor').style = 'border: 4px solid #FFF !important';
    }
     
    setTimeout(addBorderZDButton, 5000);

})();