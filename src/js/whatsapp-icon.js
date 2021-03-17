(() => {
    let whatsappIcon = document.querySelector('#whatsapp-icon-link');
    if(document.querySelector('.product-qd-v1-fixed-bar')) {
        whatsappIcon.style.marginBottom = '55px'
    }
    
    // while(!zdFrame){
        
    // }
    const addBorderZDButton = () => {
        let iframe = document.querySelector('#launcher');
        zdFrame = document.querySelector('#launcher').contentDocument
        if(!zdFrame) {
            console.log('não peguei o iframe!')
            return;
        }
        iframe.style.marginBottom = '5px';
        console.log('peguei o iframe!')
        zdFrame.querySelector('.u-userLauncherColor').style = 'border: 4px solid #FFF !important'
        return;
    }
     
    setTimeout(addBorderZDButton, 5000)
    

})();