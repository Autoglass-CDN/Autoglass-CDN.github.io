captureOutboundLink = (url) => {
    ga('create', 'UA-133498560-1', 'autoglassonline.com', 'gaTracker' );
    ga('gaTracker.send', 'event', 'Whatsapp', 'Botao', 'Rodape', url, {
      'transport': 'beacon',
      'hitCallback': function(){ 
        window.open(url, '_blank');
        }
    });
} 

(() => {
    let whatsappIcon = document.querySelector('#whatsapp-icon-link');
    if(document.querySelector('.product-qd-v1-fixed-bar')) {
        whatsappIcon.style.marginBottom = '55px'
    }

    let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
    whatsappIcon.addEventListener(touchEvent, () =>{
        captureOutboundLink('https://api.whatsapp.com/send?phone=5527998260207&amp;text=Ol%C3%A1%2C%20estou%20navegando%20pelo%20e-commerce%2C%20pode%20me%20ajudar%3F');
        return false;
    })
    
    // while(!zdFrame){
        
    // }
    const addBorderZDButton = () => {
        let iframe = document.querySelector('#launcher');
        zdFrame = document.querySelector('#launcher').contentDocument
        if(!zdFrame) {
            // console.log('não peguei o iframe!')
            return;
        }
        iframe.style.margin = '5px 20px';
        // console.log('peguei o iframe!')
        zdFrame.querySelector('.u-userLauncherColor').style = 'border: 4px solid #FFF !important'
        return;
    }
     
    setTimeout(addBorderZDButton, 5000)

    

})();