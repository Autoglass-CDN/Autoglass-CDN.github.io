(function () {

  let isDataSent = false;

  $(window).on('rendered.vtexid', getEmailFromLoginFormAndSendDataToMasterData);
  $(window).on('checkoutRequestEnd.vtex', getEmailFromOrderFormAndSendDataToMasterData);
  $(window).on('load', sendOrderIdToMasterData);

  async function sendOrderIdToMasterData() {
    const locationHref = location.href;

    if(locationHref.includes('checkout/orderPlaced')) {
      const orderId = $("#order-id").text().trim();

      const order = await fetch(`/api/checkout/pub/orders/${orderId}`, {
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }).then(resp => resp.json());

      const email = order.clientProfileData.email;

      email && sendDataToVtexMasterData(email, null, orderId);
    }
  }

  function getEmailFromLoginFormAndSendDataToMasterData(event) {
    if(isDataSent)
      return;

    const emailInput = document.querySelector('#vtexIdUI-form-classic-login #inputEmail');
    const loginForm = document.getElementById('vtexIdUI-form-classic-login');

    loginForm.addEventListener('submit', (e) => {
      const email = emailInput.value;

      email && sendDataToVtexMasterData(email);
    });
  }

  function getEmailFromOrderFormAndSendDataToMasterData(event, orderForm) {
    try {
      if(isDataSent)
        return;

      const vtexJsOrderForm = vtexjs.checkout.orderForm;

      let email = "";
      let orderFormId = null;

      if(orderForm && orderForm.clientProfileData) {
        email = orderForm.clientProfileData.email;
        orderFormId = orderForm.orderFormId;
      } else if(vtexJsOrderForm.clientProfileData && vtexJsOrderForm.clientProfileData.email) {
        email = vtexJsOrderForm.clientProfileData.email;
        orderFormId = vtexJsOrderForm.orderFormId;
      }

      if(!email) {
        getEmailFromPreEmailFormAndSendDataToMasterData();
        return;
      }

      sendDataToVtexMasterData(email, orderFormId);
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
        email && sendDataToVtexMasterData(email);
      });
    }
  }

  async function sendDataToVtexMasterData(email, orderFormId = null, orderId = null) {
    try {
      const hubspotutk = getHubspotutk();
      const normalizedEmail = email.trim();
      const normalizedOrderFormId = orderFormId || getOrderFormId();
  
      const apiUrl = `https://api-hml.autoglass.com.br/integracao-b2c/api/web-app/master-datas/clientes/${normalizedEmail}`;
      const requestBody = {
        Hubspotutk: hubspotutk,
        LastOrderFormId: normalizedOrderFormId,
        LastOrderId: orderId,
      };
  
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        console.log('Dados enviados com sucesso ao MasterData.');
      } else {
        console.error('Erro ao enviar dados ao MasterData:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Erro ao enviar dados ao MasterData:', error);
    }
  }

  function getOrderFormId() {
    try {
      const orderForm = vtexjs.checkout.orderForm;

      return orderForm.orderFormId;
    } catch (e) {

      return null;
    }
  }

  function getHubspotutk() {
    try {

      return $.cookie('hubspotutk');
    } catch (e) {

      return null;
    }
  }

})();
