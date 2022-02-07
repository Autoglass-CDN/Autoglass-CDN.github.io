(function () {


  //let loginButton = document.querySelector('.topo a#login');

  $(window).on('checkoutRequestEnd.vtex', (event, orderForm) => console.log("checkoutRequestEnd.vtex", orderForm));

  $(window).on('authenticatedUser.vtexid', (event, orderForm) => {
    console.log("authenticatedUser.vtexid");
    console.log(orderForm);
  });

  $(window).on('started.vtexid', (event, orderForm) => console.log("started.vtexid", orderForm));

  $(window).on('guestUser.vtexid', (event, orderForm) => console.log("guestUser.vtexid", orderForm));
  
  $(window).on("rendered.vtexid", (event) => console.log('Renderizado'));

  $(window).on('validate.vtex', (event, orderForm) => console.log("validate.vtex", orderForm));

  $(window).on('enable.vtex', (event, orderForm) => console.log("enable.vtex", orderForm));

  //console.log(loginButton);

  //loginButton.addEventListener('click', loginButtonCallback);

    /* setTimeout(() => {
      console.log('Aqui 2')
      while(true) {
        const loginForm = document.querySelector('#vtexIdUI-form-classic-login');

        if(loginForm) {
          console.log(loginForm);
          break;
        }
      }
    }, 1000); */
  

  /* const loginForm = document.querySelector('#vtexIdUI-form-classic-login');

  console.log(loginForm);

  loginForm.addEventListener('submit',
    event => sendHubspotUtkToVtexMasterData(event, '.vtexIdUI-classic-login #inputEmail'),
  ); */

  function loginButtonCallback() {
    console.log('Aqui');
  }

  function sendHubspotUtkToVtexMasterData(event, emailFieldSelector) {
    console.log("Aqui");

    const email = document.querySelector(emailFieldSelector).value;

    console.log(email);
  }
})();