const ESTADOS = [
    { GoogleMaps: 'State of Minas Gerais', Uf: 'MG', Nome: 'Minas Gerais', Sc: 2 },
    { GoogleMaps: 'State of Espírito Santo', Uf: 'ES', Nome: 'Espírito Santo', Sc: 3 },
    { GoogleMaps: 'State of Alagoas', Uf: 'AL', Nome: 'Alagoas', Sc: 4 },
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
    { GoogleMaps: 'State of São Paulo', Uf: 'SP', Nome: 'São Paulo', Sc: 29 },
    { GoogleMaps: 'State of Tocantins', Uf: 'TO', Nome: 'Tocantins', Sc: 39 },
];

function recuperarEstado(uf) {
    return ESTADOS.find(estado => estado.GoogleMaps === uf || estado.Nome === uf || estado.Uf === uf);
}

let executed = false;

$(document).on('ready', function () {
    if (!executed) {
        executed = true;
        _initHeaderPolicy();
    }
});

setTimeout(() => {
    if (!executed) {
        executed = true;
        _initHeaderPolicy();
    }
}, 3000);

async function _initHeaderPolicy() {
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
                    // redireciona para o NW04 - 29
                    createCookie('myuf', 'SP', 100);
                    window.location.href = `?sc=29`;
                }

                $('.header-qd-v1-location-modal').click();
            };

            $('.modal-backdrop.fade.in').click(closeModal);
            $('.header-qd-v1-location-modal').click(closeModal);
            $('#header-qd-v1-location-modal .modal-header button').click(closeModal);

            return;
        }
    }

    const estado = salvarUf(Uf);

    let vtexsc = readCookie('VTEXSC');
    const policyOnSite = vtexsc ? +vtexsc.replace('sc=', '') : 0;

    if (estado.Sc !== policyOnSite) {
        window.location.href = `?sc=${estado.Sc}`;
    }

    $(".use-location").click(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                configurarGoogleMaps,
                error => {
                    $("#autocomplete").focus();
                    console.error('Usuário negou a localização.', error);
                }
            );
        }
    });

    $("#autocomplete").on("click", function (e) {
        $("#intro-modal-text").fadeOut()
    });

    // Limita as sugestões do autocomplete para o Brasil
    // no modal de alteração de Estado
    var AutocompleteCircle = new google.maps.Circle({
        center: {
            lat: -10.35583364623009,
            lng: -51.26453721934701
        },
        radius: 262000 * 10,
    })

    autocomplete.setBounds(AutocompleteCircle.getBounds());
}

async function recuperarEstadoPelaIpInfo() {
    const ipInfo = await $.get('https://ipinfo.io?token=c94f35a2492f58');

    return ipInfo.region;
}

function salvarUf(uf) {
    const estado = recuperarEstado(uf);

    $("#thestate").text(`${estado.Nome}`);

    createCookie('myuf', estado.Uf, 100);

    return estado;
}

function configurarGoogleMaps(position) {
    const { geolocation, Globo } = configurarRegiaoGoogleMaps(position);

    (new google.maps.Geocoder()).geocode({
        location: geolocation,
        bounds: Globo.getBounds()
    }, (result, status) => {
        if (status === "OK") {
            redirecionarParaPolitica(result);
        } else {
            console.error('Falha ao recuperar a informações do Maps.')
        }
    })
}

function configurarRegiaoGoogleMaps(position) {
    const geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    var Globo = new google.maps.Circle({
        center: geolocation,
        radius: 1
    });

    return { geolocation, Globo };
}

function redirecionarParaPolitica(googleMapsResult) {
    let Uf;
    let vtexsc = readCookie('VTEXSC');

    if (!googleMapsResult)
        googleMapsResult = [autocomplete.getPlace()];

    googleMapsResult[0].address_components.forEach((item) => {
        if (item.types[0] == "administrative_area_level_1") {
            Uf = item.long_name
        }
    });

    const estado = salvarUf(Uf);

    const policyOnSite = vtexsc ? +vtexsc.replace('sc=', '') : 0;

    if (estado.Sc !== policyOnSite) {
        window.location.href = `?sc=${estado.Sc}`;
    }

    $('.header-qd-v1-location-modal').click();
}

function initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'), { types: ['geocode'] });

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    autocomplete.setFields(['address_component']);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autocomplete.addListener('place_changed', redirecionarParaPolitica);
}


function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}