(function () {

  let hubspotutkSent = false;

  $(window).on('rendered.vtexid', getEmailFromLoginFormAndSendDataToMasterData);
  $(window).on('checkoutRequestEnd.vtex', getEmailFromOrderFormAndSendDataToMasterData);

  function getEmailFromLoginFormAndSendDataToMasterData(event) {
    if(hubspotutkSent)
      return;

    const emailInput = document.querySelector('#vtexIdUI-form-classic-login #inputEmail');
    const loginForm = document.getElementById('vtexIdUI-form-classic-login');

    loginForm.addEventListener('submit', (e) => {
      const email = emailInput.value;

      email && sendHubspotUtkToVtexMasterData(email);
    });
  }

  function getEmailFromOrderFormAndSendDataToMasterData(event, orderForm) {
    try {
      if(hubspotutkSent)
        return;

      const vetexJsOrderForm = vtexjs.checkout.orderForm;
      
      let email = "";

      if(orderForm && orderForm.clientProfileData)
        email = orderForm.clientProfileData.email;
      else if(vetexJsOrderForm.clientProfileData && vetexJsOrderForm.clientProfileData.email)
        email = vetexJsOrderForm.clientProfileData.email;

      if(!email) {
        getEmailFromPreEmailFormAndSendDataToMasterData();
        return;
      }

      sendHubspotUtkToVtexMasterData(email);
    } catch (e) {
      console.warn('Falha ao obter e-mail para enviar o Hubspotutk ao MasterData!');
    }
  }

  function getEmailFromPreEmailFormAndSendDataToMasterData() {
    const locationHref = location.href;

    if(locationHref.includes('checkout/#/email')) {
      const preEmailForm = document.querySelector('#client-profile-data form.client-pre-email');
      const preEmailInput = document.querySelector('form.client-pre-email input#client-pre-email');
  
      preEmailForm.addEventListener('submit', (e) => {
        const email = preEmailInput.value;  
        email && sendHubspotUtkToVtexMasterData(email);
      });
    }
  }

  async function sendHubspotUtkToVtexMasterData(email) {
    try {
      const hubspotutk = $.cookie('hubspotutk');
      
      if(hubspotutk) {
        await fetch(`https://api.autoglass.com.br/api/master-datas/clientes/${email.trim()}`, {
          method: 'PUT',
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            hubspotutk,
          }),
        });

        hubspotutkSent = true;
      }
    } catch (e) {
      console.warn('Falha ao enviar Hubspotutk ao MasterData!');
    }
  }
  
})();