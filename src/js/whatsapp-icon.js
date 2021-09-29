(() => {

    let whatsappIcon = document.querySelector('#whatsapp-icon-link');
    
    if(document.querySelector('.product-qd-v1-fixed-bar')) {
        whatsappIcon.style.marginBottom = '55px'
    }

    let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
    
    whatsappIcon.addEventListener(touchEvent, (ev) => {
        
        ga('create', 'UA-133498560-1', 'autoglassonline.com', 'gaTracker');
        ga('gaTracker.set', 'transport', 'beacon');
        ga('gaTracker.send', 'event', 'WhatsApp', 'Clique', 'Rodapé +55 27 99826-0207');

    });
    
    const addBorderZDButton = () => {
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