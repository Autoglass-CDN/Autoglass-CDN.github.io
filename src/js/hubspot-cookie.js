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

      if(null === orderFormId) {
        orderFormId = getOrderFormId();
      }

      await fetch(`http://localhost:5010/api/master-datas/clientes/${email.trim()}`, {
        method: 'PUT',
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          hubspotutk,
          lastOrderFormId: orderFormId,
          lastOrderId: orderId,
        }),
      }).then(() => {isDataSent = true});

    } catch (e) {
      console.warn('Falha ao enviar dados ao MasterData!');
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
