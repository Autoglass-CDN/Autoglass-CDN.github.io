const ESTADOS = [
    { GoogleMaps: 'State of Minas Gerais', Uf: 'MG', Nome: 'Minas Gerais', Sc: 2, Cep: '33860390' },
    { GoogleMaps: 'State of Espírito Santo', Uf: 'ES', Nome: 'Espírito Santo', Sc: 3, Cep: '29168074' },
    { GoogleMaps: 'State of Alagoas', Uf: 'AL', Nome: 'Alagoas', Sc: 4, Cep: '57035470' },
    { GoogleMaps: 'State of Amapá', Uf: 'AP', Nome: 'Amapá', Sc: 21, Cep: '68950000' },
    { GoogleMaps: 'State of Amazonas', Uf: 'AM', Nome: 'Amazonas', Sc: 5, Cep: '69046170' },
    { GoogleMaps: 'State of Roraima', Uf: 'RR', Nome: 'Roraima', Sc: 5, Cep: '69300000' },
    { GoogleMaps: 'State of Bahia', Uf: 'BA', Nome: 'Bahia', Sc: 6, Cep: '40020240' },
    { GoogleMaps: 'State of Ceará', Uf: 'CE', Nome: 'Ceará', Sc: 7, Cep: '60511390' },
    { GoogleMaps: 'Federal District', Uf: 'DF', Nome: 'Distrito Federal', Sc: 8, Cep: '71065023' },
    { GoogleMaps: 'State of Goiás', Uf: 'GO', Nome: 'Goiás', Sc: 9, Cep: '74919376' },
    { GoogleMaps: 'State of Maranhão', Uf: 'MA', Nome: 'Maranhão', Sc: 10, Cep: '65085160' },
    { GoogleMaps: 'State of Mato Grosso do Sul', Uf: 'MS', Nome: 'Mato Grosso do Sul', Sc: 11, Cep: '79004610' },
    { GoogleMaps: 'State of Mato Grosso', Uf: 'MT', Nome: 'Mato Grosso', Sc: 12, Cep: '78080375' },
    { GoogleMaps: 'State of Acre', Uf: 'AC', Nome: 'Acre', Sc: 12, Cep: '69922000' },
    { GoogleMaps: 'State of Rondônia', Uf: 'RO', Nome: 'Rondônia', Sc: 12, Cep: '76803888' },
    { GoogleMaps: 'State of Pará', Uf: 'PA', Nome: 'Pará', Sc: 13, Cep: '66053270' },
    { GoogleMaps: 'State of Paraíba', Uf: 'PB', Nome: 'Paraíba', Sc: 14, Cep: '58108096' },
    { GoogleMaps: 'State of Pernambuco', Uf: 'PE', Nome: 'Pernambuco', Sc: 15, Cep: '54280145' },
    { GoogleMaps: 'State of Piauí', Uf: 'PI', Nome: 'Piauí', Sc: 18, Cep: '64001495' /* 64041400 */ },
    { GoogleMaps: 'State of Paraná', Uf: 'PR', Nome: 'Paraná', Sc: 19, Cep: '82130760' },
    { GoogleMaps: 'State of Rio de Janeiro', Uf: 'RJ', Nome: 'Rio de Janeiro', Sc: 21, Cep: '25056400' },
    { GoogleMaps: 'State of Rio Grande do Norte', Uf: 'RN', Nome: 'Rio Grande do Norte', Sc: 22, Cep: '59078130' },
    { GoogleMaps: 'State of Rio Grande do Sul', Uf: 'RS', Nome: 'Rio Grande do Sul', Sc: 23, Cep: '90030140' },
    { GoogleMaps: 'State of Santa Catarina', Uf: 'SC', Nome: 'Santa Catarina', Sc: 24, Cep: '88310573' },
    { GoogleMaps: 'State of Sergipe', Uf: 'SE', Nome: 'Sergipe', Sc: 25, Cep: '49070376' },
    { GoogleMaps: 'State of São Paulo', Uf: 'SP', Nome: 'São Paulo', Sc: 26, Cep: '08090284' },
    { GoogleMaps: 'State of Tocantins', Uf: 'TO', Nome: 'Tocantins', Sc: 39, Cep: '77066356' },
];

let executed = false;

$(document).on('ready', function () {
    if (!executed) {
        executed = true;
        initHeaderPolicy();
    }
});

setTimeout(() => {
    if (!executed) {
        executed = true;
        initHeaderPolicy();
    }
}, 4000);

async function initHeaderPolicy() {
    
    let Uf = readCookie('myuf');
    let localizationModal = startLocalizationModal();

    if (!Uf) {
        try {
            
            Uf = await recuperarEstadoPelaIpInfo();
        
        } catch {
            
            Uf = 'SP';

        }

        localizationModal.open(Uf);

        return;
    }

    localizationModal.setState(Uf);
    persistSalesChannel(Uf);
    recoverModalsState();

    $(window).on("cep-updated", (event) => {
        const orderForm = event.originalEvent.detail;
        const newUf = orderForm.shippingData.address.state;
        const currentUf = readCookie('myuf');
        
        if (currentUf != newUf) {
            saveModalsState();

            localStorage.setItem('locationChanged', 1);
            persistSalesChannel(newUf);
        } else {
            localStorage.setItem('locationChanged', 0);
        } 
    });
}

function recuperarEstado(Uf) {
    return ESTADOS.find(state => state.GoogleMaps === Uf || state.Nome === Uf || state.Uf === Uf);
}

async function recuperarEstadoPelaIpInfo() {
    const ipInfo = await $.get('https://ipinfo.io?token=c94f35a2492f58');

    return ipInfo.region;
}

function persistSalesChannel(Uf) { 
    const state = recuperarEstado(Uf);
    
    let vtexsc = readCookie('VTEXSC');
    const policyOnSite = vtexsc ? +vtexsc.replace('sc=', '') : 0;
    
    if (state.Sc !== policyOnSite || !readCookie('myuf')) {
        salvarUf(state);
    } else {
        $("#thestate").text(state.Nome);
    }
}

function salvarUf(state) {  
    createCookie('myuf', state.Uf, 100);

    setVtexScOnCookies(state.Sc);

    window.location.href = `?sc=${state.Sc}`;
}

function initAutocomplete() {
    console.warn('Autocomplete desativado.');
}

function setVtexScOnCookies(salesChannel) {  

    //houver cookie VTEXSC sem o ponto no início (no secure), apaga esse cookie.
    document.cookie = 'VTEXSC'+ `=; Max-Age=-99999999;  path=/`;
    
    //setar o cookie para www.domain.com e domain.com, evita entrar em loop infinito.
    document.cookie = `VTEXSC=sc=${salesChannel}; expires=Sun, 1 Jan 2099 00:00:00 UTC;domain=www.autoglassonline.com.br; path=/; secure=true`;
    document.cookie = `VTEXSC=sc=${salesChannel}; expires=Sun, 1 Jan 2099 00:00:00 UTC;domain=autoglassonline.com.br; path=/; secure=true`;
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

function startLocalizationModal() {
    let selectedState;

    const stateNameButtons = document.querySelectorAll('.state-name-btn');
    const stateMapButtons = document.querySelectorAll('.state-map-btn');

    function openLocalizationModal(uf) {
        const state = recuperarEstado(uf);

        $('#stateSelectorModal').modal({ backdrop: 'static', keyboard: false });
        setSelectedState(state.Uf);
    }
    
    stateNameButtons.forEach(element => {
        element.addEventListener('click', event => {
            event.preventDefault();
    
            const state = event.target.getAttribute('data-state');
            setSelectedState(state);
        });
    
        element.addEventListener('mouseover', toggleHoverOnMapBtn);
        element.addEventListener('mouseout', toggleHoverOnMapBtn);
    });
    
    
    stateMapButtons.forEach(element => {
        element.addEventListener('click', event => {
            event.preventDefault();

            const state = event.target.closest('.state-map-btn').getAttribute('data-state');
            setSelectedState(state);
        });
    
        element.addEventListener('mouseover', toggleHoverOnNameBtn);
        element.addEventListener('mouseout', toggleHoverOnNameBtn);
    });
    
    
    document.getElementById('stateConfirmationBtn')
            .addEventListener('click', closeModalAndPersistSc);

    document.getElementById('mobileStateSelector')
            .addEventListener('change', (event) => {

        setSelectedState(event.target.value);
    });
    
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

        const mobileStateSelector = $("#mobileStateSelector");
        if (mobileStateSelector.val() !== state) {
            mobileStateSelector.val(state);
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

    function closeModalAndPersistSc(event) {
        $('#stateSelectorModal').modal('hide');
        persistSalesChannel(selectedState || 'SP');
    }

    return {
        setState: setSelectedState,
        open: openLocalizationModal,
    };
}

/**
 * String.prototype.replaceAll() polyfill para Safari
 * @author Chris Ferdinandi
 * @license MIT
 */
 if (!String.prototype.replaceAll) {
	String.prototype.replaceAll = function(str, newStr) {

		// If a regex pattern
		if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
			return this.replace(str, newStr);
		}

		// If a string
		return this.replace(new RegExp(str, 'g'), newStr);
	};
}