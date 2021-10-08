const ESTADOS = [
    { GoogleMaps: 'State of Minas Gerais', Uf: 'MG', Nome: 'Minas Gerais', Sc: 2 },
    { GoogleMaps: 'State of Espírito Santo', Uf: 'ES', Nome: 'Espírito Santo', Sc: 3 },
    { GoogleMaps: 'State of Alagoas', Uf: 'AL', Nome: 'Alagoas', Sc: 4 },
    { GoogleMaps: 'State of Amapá', Uf: 'AP', Nome: 'Amapá', Sc: 21 },
    { GoogleMaps: 'State of Amazonas', Uf: 'AM', Nome: 'Amazonas', Sc: 5 },
    { GoogleMaps: 'State of Roraima', Uf: 'RR', Nome: 'Roraima', Sc: 5 },
    { GoogleMaps: 'State of Bahia', Uf: 'BA', Nome: 'Bahia', Sc: 6 },
    { GoogleMaps: 'State of Ceará', Uf: 'CE', Nome: 'Ceará', Sc: 7 },
    { GoogleMaps: 'Federal District', Uf: 'DF', Nome: 'Distrito Federal', Sc: 8 },
    { GoogleMaps: 'State of Goiás', Uf: 'GO', Nome: 'Goiás', Sc: 9 },
    { GoogleMaps: 'State of Maranhão', Uf: 'MA', Nome: 'Maranhão', Sc: 10 },
    { GoogleMaps: 'State of Mato Grosso do Sul', Uf: 'MS', Nome: 'Mato Grosso do Sul', Sc: 11 },
    { GoogleMaps: 'State of Mato Grosso', Uf: 'MT', Nome: 'Mato Grosso', Sc: 12 },
    { GoogleMaps: 'State of Acre', Uf: 'AC', Nome: 'Acre', Sc: 12 },
    { GoogleMaps: 'State of Rondônia', Uf: 'RO', Nome: 'Rondônia', Sc: 12 },
    { GoogleMaps: 'State of Pará', Uf: 'PA', Nome: 'Pará', Sc: 13 },
    { GoogleMaps: 'State of Paraíba', Uf: 'PB', Nome: 'Paraíba', Sc: 14 },
    { GoogleMaps: 'State of Pernambuco', Uf: 'PE', Nome: 'Pernambuco', Sc: 15 },
    { GoogleMaps: 'State of Piauí', Uf: 'PI', Nome: 'Piauí', Sc: 18 },
    { GoogleMaps: 'State of Paraná', Uf: 'PR', Nome: 'Paraná', Sc: 19 },
    { GoogleMaps: 'State of Rio de Janeiro', Uf: 'RJ', Nome: 'Rio de Janeiro', Sc: 21 },
    { GoogleMaps: 'State of Rio Grande do Norte', Uf: 'RN', Nome: 'Rio Grande do Norte', Sc: 22 },
    { GoogleMaps: 'State of Rio Grande do Sul', Uf: 'RS', Nome: 'Rio Grande do Sul', Sc: 23 },
    { GoogleMaps: 'State of Santa Catarina', Uf: 'SC', Nome: 'Santa Catarina', Sc: 24 },
    { GoogleMaps: 'State of Sergipe', Uf: 'SE', Nome: 'Sergipe', Sc: 25 },
    { GoogleMaps: 'State of São Paulo', Uf: 'SP', Nome: 'São Paulo', Sc: 26 },
    { GoogleMaps: 'State of Tocantins', Uf: 'TO', Nome: 'Tocantins', Sc: 39 },
];

const CEP_STATES = {
    SE: {
        cep: "49070376"
    },
    TO: {
        cep: "77066356"
    },
    RO: {
        cep: "76803888"
    },
    RR: {
        cep: "69300000"
    },
    AC: {
        cep: "69922000"
    },
    AP: {
        cep: "68950000"
    },
    BA: {
        cep: "40020240"
    },
    ES: {
        cep: "29168074"
    },
    DF: {
        cep: "71065023"
    },
    RS: {
        cep: "90030140"
    },
    RJ: {
        cep: "25056400"
    },
    MT: {
        cep: "78080375"
    },
    PR: {
        cep: "82130760"
    },
    MS: {
        cep: "79004610"
    },
    GO: {
        cep: "74919376"
    },
    AL: {
        cep: "57035470"
    },
    CE: {
        cep: "60511390"
    },
    PA: {
        cep: "66053270"
    },
    RN: {
        cep: "59078130"
    },
    SC: {
        cep: "88310573"
    },
    MA: {
        cep: "65085160"
    },
    PI: {
        // cep: "64041400"
        cep: "64001495"
    },
    MG: {
        cep: "33860390"
    },
    PB: {
        cep: "58108096"
    },
    AM: {
        cep: "69046170"
    },
    PE: {
        cep: "54280145"
    },
    SP: {
        cep: "08090284"
    }
};

function recuperarEstado(uf) {
    return ESTADOS.find(estado => estado.GoogleMaps === uf || estado.Nome === uf || estado.Uf === uf);
}

$(document).on('ready', function () {
    
    initHeaderPolicy();

    (() => {

        let selectedState;
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const stateNameButtons = document.querySelectorAll('.state-name-btn');
        const stateMapButtons = document.querySelectorAll('.state-map-btn');
      
        stateNameButtons.forEach(element => {
            element.addEventListener('click', event => {
                event.preventDefault();
      
                const state = event.target.getAttribute('data-state');
                setSelectedState(state);
            });
      
            element.addEventListener('mouseover', toggleHoverOnMapBtn);
            element.addEventListener('mouseout', toggleHoverOnMapBtn);
        });
      
      
        if(!isMobile) {
            stateMapButtons.forEach(element => {
                element.addEventListener('click', event => {
                    event.preventDefault();
        
                    const state = event.target.closest('.state-map-btn').getAttribute('data-state');
                    setSelectedState(state);
                });
            
                element.addEventListener('mouseover', toggleHoverOnNameBtn);
                element.addEventListener('mouseout', toggleHoverOnNameBtn);
            });
        }
      
        document.getElementById('stateConfirmationBtn')
                .addEventListener('click', preventModalDismissing);
      
        document.getElementById('localizationModalCloseBtn')
                .addEventListener('click', preventModalDismissing);
      
        function toggleHoverOnNameBtn(event) {
            const state = event.target.closest('.state-map-btn').getAttribute('data-state');
            const element = document.getElementById(state + 'nameBtn');
          
            toggleHoverOnElement(element);
        }
      
        function toggleHoverOnElement(element) {
            const currentClasses = element.getAttribute('class');
          
            element.setAttribute(
                'class',
                currentClasses.includes('hover')
                    ? currentClasses.replace(' hover', '')
                    : currentClasses + ' hover'
            );
        }
      
        function toggleHoverOnMapBtn(event) {
            const state = event.target.getAttribute('data-state');
            const element = document.getElementById(state + 'mapBtn');
          
            toggleHoverOnElement(element);
        }
      
        function setSelectedState(state) {
            if(selectedState && state !== selectedState) {
                const previousSelectedMapBtn = document.getElementById(selectedState + 'mapBtn');
                previousSelectedMapBtn.setAttribute(
                    'class',
                    previousSelectedMapBtn.getAttribute('class')
                                          .replaceAll(' selected', '')
                );
      
                const previousSelectedNameBtn = document.getElementById(selectedState + 'nameBtn');
                previousSelectedNameBtn.setAttribute(
                    'class',
                    previousSelectedNameBtn.getAttribute('class')
                                           .replaceAll(' selected', '')
                );
            }
      
            const selectedMapBtn = document.getElementById(state + 'mapBtn');
            selectedMapBtn.setAttribute('class', selectedMapBtn.getAttribute('class') + ' selected');
      
            const selectedNameBtn = document.getElementById(state + 'nameBtn');
            selectedNameBtn.setAttribute('class', selectedNameBtn.getAttribute('class') + ' selected');
      
            selectedState = state;
            enableConfirmationBtn();
        }
      
        function enableConfirmationBtn() {
            document.getElementById('stateConfirmationBtn').removeAttribute('disabled');
        }
      
        function preventModalDismissing(event) {
            event.stopImmediatePropagation();
            
            const message = selectedState
                ? 'Confirme a sua região clicando no botão de confirmação.'
                : 'É preciso selecionar um estado primeiro.'
      
            window.alert(message);
        }
      
    })();
});

async function initHeaderPolicy() {
    
    let Uf = readCookie('myuf');

    if (!Uf) {
        try {
            Uf = await recuperarEstadoPelaIpInfo();
        } catch {
            // Abrir modal de Localização
            $('#btn-alterar-open-modal').click();

            const closeModal = () => {
                let Uf = readCookie('myuf');

                if (!Uf) {
                    // Caso não tenha Selecionado nada,
                    // redireciona para SP
                          
                    persistSalesChannel('SP');
                }

                $('.header-qd-v1-location-modal').click();
            };

            $('.modal-backdrop.fade.in').click(closeModal);
            $('.header-qd-v1-location-modal').click(closeModal);
            $('#header-qd-v1-location-modal .modal-header button').click(closeModal);

            return;
        }
    }

    persistSalesChannel(Uf);
    recoverModalsState();

    $(window).on("cep-updated", (event) => {
        const orderForm = event.originalEvent.detail;
        const newUf = orderForm.shippingData.address.state;
        const currentUf = readCookie('myuf');
        
        if (currentUf != newUf){

            saveModalsState();
            localStorage.setItem('locationChanged', 1);
            persistSalesChannel(newUf);
        }
        else{
            localStorage.setItem('locationChanged', 0);
        } 
    });
}

async function recuperarEstadoPelaIpInfo() {
    const ipInfo = await $.get('https://ipinfo.io?token=c94f35a2492f58');

    return ipInfo.region;
}

function persistSalesChannel(Uf) { 
    const estado = recuperarEstado(Uf);
    
    let vtexsc = readCookie('VTEXSC');
    const policyOnSite = vtexsc ? +vtexsc.replace('sc=', '') : 0;
    
    if (estado.Sc !== policyOnSite || !readCookie('myuf')) {
        salvarUf(estado);
    } else {
        $("#thestate").text(`${estado.Nome}`);
    }
}

function salvarUf(estado) {  
    createCookie('myuf', estado.Uf, 100);

    vtexjs.checkout.calculateShipping({
        postalCode: CEP_STATES[estado.Uf].cep,
        country: "BRA",
        addressType: "search",
    }).then(
        (orderForm) => {
            localStorage.setItem(
                "AG_AddressSelected",
                JSON.stringify({
                    ...orderForm.shippingData.address,
                    logisticsInfo: orderForm.shippingData.logisticsInfo,
                })
            )
        }
    );

    setVtexScOnCookies(estado.Sc);

    window.location.href = `?sc=${estado.Sc}`;
}

function initAutocomplete() {
    console.warn('Autocomplete desativado.');
}

function setVtexScOnCookies(salesChannel) {  
    document.cookie = 'VTEXSC'+ `=; Max-Age=-99999999;  path=/`;
    
    document.cookie = `VTEXSC=sc=${salesChannel}; expires=Sun, \
        1 Jan 2099 00:00:00 UTC;domain=${location.host}; path=/; secure=true`;
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    
    document.cookie = name + "=" + value + expires + `; path=/`;
}


function readCookie(name) {
    var ca = document.cookie.split(';');
    
    for (var i = 0; i < ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);

        if (c.indexOf(`${name}=`) == 0)
            return c.substring(`${name}=`.length, c.length);
    }

    return null;
}

function saveModalsState() {
    let regex = /mz-\w{2}-on/g;
    let classes = $('body').attr('class');
    let modalState = [];
    let resp;

    while(true) {
        resp = regex.exec(classes);
        
        if(resp) {
            modalState.push(resp);
        } else {
            break;
        }
    }

    localStorage.setItem('modalState', modalState.join());
}

function recoverModalsState() {
    let string = localStorage.getItem('modalState');

    if (string) {
        const classes = string.split(',')
        classes.forEach(_class => $('body').addClass(_class));   
        localStorage.removeItem('modalState');
    }
}