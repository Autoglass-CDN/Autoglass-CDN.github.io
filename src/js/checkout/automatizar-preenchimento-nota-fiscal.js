(function () {
  const shippingDiv = document.querySelectorAll("#shipping-data");
  const preencherEnderecoNFButtonQuery = "button.btn.btn-link.vtex-omnishipping-1-x-btnDelivery";
  const goToPaymentButton = Object.create({
    query: "#shipping-data > div .box-step > p:last-of-type button.submit",
    enable: () => {enableDisableGoToPaymentButton(true)},
    disable: () => {enableDisableGoToPaymentButton(false)}
  });
  checkIfHasInitialButton(); // Retirar
  checkIfHasInputElement(); //  Receber / Voltou / apertou em "preencher Endereço na NF"
  createShippingObserver(); //  Observer para o elemento inteiro

  function checkIfHasInitialButton() {
    const preencherEnderecoNFButton = shippingDiv[0].querySelector(preencherEnderecoNFButtonQuery);
    if (preencherEnderecoNFButton) {
      preencherEnderecoNFButton.click();
      keepInputAlwaysFilled();
    }
  }

  function checkIfHasInputElement() {
    const input = getInputElement();
    if (input) {
      keepInputAlwaysFilled();
    }
  }

  function getInputElement() {
    return document.querySelector(
      "#shipping-data .box-step > div:last-of-type .ship-number input"
    );
  }

  function keepInputAlwaysFilled() {
    const isInputFilled = !!getInputElement().value.trim();
    if (isInputFilled) {
      goToPaymentButton.enable();
    } else {
      setNativeValue(getInputElement(), " ");
    }
    input = getInputElement();
    input.onkeydown = function (pressed) {
      const current = this.value;
      if (pressed.key == "Backspace" && current.length <= 1) {
        setNativeValue(input, "  ");
        goToPaymentButton.disable();
      } else {
      }
      input.dispatchEvent(new Event("input", { bubbles: true }));
    };

    input.onkeyup = function () {
      const current = this.value;
      if (current.trim() == "") {
        setNativeValue(input, " ");
        goToPaymentButton.disable();
      } else {
        setNativeValue(input, current.trim());
        goToPaymentButton.enable();
      }
      input.dispatchEvent(new Event("input", { bubbles: true }));
    };
  }

  function setNativeValue(element, value) {
    const valueSetter = Object.getOwnPropertyDescriptor(element, "value").set;
    const prototype = Object.getPrototypeOf(element);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype,"value").set;

    if (valueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    } else {
      valueSetter.call(element, value);
    }
    var event = new InputEvent("input", { bubbles: true });
    element.dispatchEvent(event);
  }

  function enableDisableGoToPaymentButton(option) {
    addRemoveClass($(goToPaymentButton.query), option, "go-to-payment");
    addRemoveClass($(".input.ship-number.required.text"), option, "go-to-payment");
  }

  function addRemoveClass(input, operation, classe) {
    return operation ? input.addClass(classe) : input.removeClass(classe);
  }

  function createShippingObserver() {
    const itemsObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        const initialButton =
          mutation.target.querySelectorAll(preencherEnderecoNFButtonQuery);
        const inputFather = mutation.target.querySelectorAll(
          ".box-step > div:last-of-type .ship-number"
        );
        if (initialButton.length) {
          initialButton[0].click();
        }
        if (inputFather.length) {
          keepInputAlwaysFilled();
        }
      });
    });

    shippingDiv.forEach((element) => {
      itemsObserver.observe(element, {
        subtree: true,
        childList: true,
      });
    });
  }
})();
