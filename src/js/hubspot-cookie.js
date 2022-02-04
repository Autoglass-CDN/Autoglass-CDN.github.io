(() => {

  const loginForm = document.querySelector('#vtexIdUI-form-classic-login');

  console.log(loginForm);

  loginForm.addEventListener('submit',
    event => sendHubspotUtkToVtexMasterData(event, '.vtexIdUI-classic-login #inputEmail'),
  );

  function sendHubspotUtkToVtexMasterData(event, emailFieldSelector) {
    console.log("Aqui");

    const email = document.querySelector(emailFieldSelector).value;

    console.log(email);
  }


})();