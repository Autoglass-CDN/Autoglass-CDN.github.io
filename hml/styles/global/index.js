class RadioTypeButton {
    static init() {
        addEventClickRadioButtons();

        function addEventClickRadioButtons() {
            const buttonsRadio = document.querySelectorAll(".button-radio input");
    
            for (const button of buttonsRadio) {
                button.addEventListener("click", clickButton);
            }
        }
    
        function clickButton(event) {
            const { target } = event;
    
            removeClassChecked(target);
            addClassChecked(target)
        }
    
        function removeClassChecked(element) {
            const { name: nameGroup } = element;
            const inputRadioChecked = document.querySelector(`.button-radio-checked input[name=${nameGroup}]`);
            
            if (inputRadioChecked) {
                const labelRadioButton = inputRadioChecked.parentNode
                labelRadioButton.classList.remove("button-radio-checked");
            }
        }
        
        function addClassChecked(element) {
            const labelRadioButton = element.parentNode
            if (labelRadioButton)
                labelRadioButton.classList.add("button-radio-checked");
        }
    }
}

(function(){
    init();

    function init(){
        RadioTypeButton.init();
    }
})();