
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

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function switcharoo(mystate) {
    switch (mystate) {
        //pra produção vai ser sp

        //State of Minas Gerais
        case "Minas Gerais":
        case "State of Minas Gerais":
        case "MG":
            window.location.href = `https://loja.autoglassonline.com.br${window.location.pathname}?sc=2`;
            // alert("Você está em: Minas Gerais")
            break;
        case 'State of Espírito Santo':
        case "ES":
        case "Espírito Santo":
            window.location.href = `https://loja.autoglassonline.com.br${window.location.pathname}?sc=3`
            //  alert("Você está em: Espirito Santo")
            break;

        // deletar sp em prod
        /* case "São Paulo":
         case "State of São Paulo":
         case "SP":
             window.location.href = "https://loja.autoglassonline.com.br/?sc=3"

             break;*/

        default:

            // window.location.href = "https://cbykautoglass.myvtex.com/?sc=2"
            console.log("do nothing")


    }
}


$(document).ready(function () {

    if (!localStorage.noFirstVisit) {

        localStorage.noFirstVisit = "1";

        fetch(`https://ipinfo.io?token=c94f35a2492f58`)
            .then(response => {
                return response.json();
            })
            .then(res => {
                console.log(res);


                switch (res.region) {
                    //pra produção vai ser sp

                    //State of Minas Gerais
                    case "Minas Gerais":
                    case "State of Minas Gerais":
                    case "MG":
                        window.location.href = `https://loja.autoglassonline.com.br${window.location.pathname}?sc=2`;


                        // alert("Você está em: Minas Gerais")
                        break;
                    case 'State of Espírito Santo':
                    case "ES":
                    case "Espírito Santo":
                        // window.location.href = "https://loja.autoglassonline.com.br/?sc=3"
                        window.location.href = `https://loja.autoglassonline.com.br${window.location.pathname}?sc=3`;
                        //  alert("Você está em: Espirito Santo")
                        break;

                    // deletar sp em prod
                    /*  case "São Paulo":
                      case "State of São Paulo":
                      case "SP":
                          window.location.href = "https://loja.autoglassonline.com.br/?sc=3"
      
                          break;*/

                    default:

                        // window.location.href = "https://cbykautoglass.myvtex.com/?sc=2"
                        console.log("localização ainda nao mapeada")
                        // window.location.href = "https://www.autoglassonline.com.br/"
                        window.location.href = `https://www.autoglassonline.com.br${window.location.pathname}`

                }







            }).catch(() => {
                console.log("Erro aconteceu")
            })


    }


    if (window.location.href.includes("www.autoglassonline.com.br")) {




        let mystate = readCookie("mzLocationUF");


        switch (mystate) {

            case "MG":
                $("#btn-stillhere").text(`Estou em Minas Gerais`);
                break;
            case "ES":
                $("#btn-stillhere").text(`Estou em Espírito Santo`);
                break;

            case "SP":
                $("#btn-stillhere").text(`Estou em São Paulo`);
                break;

            case "SE":
                $("#btn-stillhere").text(`Estou em Sergipe`);
                break;

            case "TO":
                $("#btn-stillhere").text(`Estou em Tocantins`);
                break;

            case "BA":
                $("#btn-stillhere").text(`Estou em Bahia`);
                break;

            case "DF":
                $("#btn-stillhere").text(`Estou em Distrito Federal`);
                break;

            case "RS":
                $("#btn-stillhere").text(`Estou em Rio Grande do Sul`);
                break;

            case "RJ":
                $("#btn-stillhere").text(`Estou em Rio de Janeiro`);
                break;

            case "MT":
                $("#btn-stillhere").text(`Estou em Mato Grosso`);
                break;

            case "PR":
                $("#btn-stillhere").text(`Estou em Paraná`);
                break;

            case "MS":
                $("#btn-stillhere").text(`Mato Grosso do Sul`);
                break;

            case "GO":
                $("#btn-stillhere").text(`Estou em Goiás`);
                break;

            case "AL":
                $("#btn-stillhere").text(`Estou em Alagoas`);
                break;

            case "CE":
                $("#btn-stillhere").text(`Estou em Ceará`);
                break;

            case "PA":
                $("#btn-stillhere").text(`Estou em Pará`);
                break;

            case "RN":
                $("#btn-stillhere").text(`Estou em Rio Grande do Norte`);
                break;

            case "SC":
                $("#btn-stillhere").text(`Estou em Santa Catarina`);
                break;

            case "MA":
                $("#btn-stillhere").text(`Estou em Maranhão`);
                break;
            case "PI":
                $("#btn-stillhere").text(`Estou em Piauí`);
                break;

            case "PB":
                $("#btn-stillhere").text(`Estou em Paraíba`);
                break;

            case "AM":
                $("#btn-stillhere").text(`Estou em Amazonas`);
                break;

            case "PE":
                $("#btn-stillhere").text(`Estou em Pernambuco`);
                break;

            case "AP":
                $("#btn-stillhere").text(`Estou em Amapá`);
                break;

            case "AC":
                $("#btn-stillhere").text(`Estou em Acre`);
                break;

                case "RO":
                $("#btn-stillhere").text(`Estou em Rondônia`);
                break;

            default:
                console.log("estado nao definido")


        }


        if (readCookie("mzLocationUF")) {
            if (!sessionStorage.dismiss) {
                $("#header-qd-v1-location-modal-confirm").modal('show');
            }


        }


        $("#btn-stillhere").click(function () {
            console.log("redirecting")
            sessionStorage.dismiss = true;
            switcharoo(mystate)
            $("#header-qd-v1-location-modal-confirm").modal('hide');

        })


        $("#btn-nothere").click(function () {
            sessionStorage.dismiss = true;
            console.log("closing")
            $("#header-qd-v1-location-modal-confirm").modal('hide');
            $("#header-qd-v1-location-modal").modal('show')

        })

        /*switch (mystate) {
            //pra produção vai ser sp

            //State of Minas Gerais
            case "Minas Gerais":
            case "State of Minas Gerais":
            case "MG":
                window.location.href = "https://loja.autoglassonline.com.br/?sc=2";
                // alert("Você está em: Minas Gerais")
                break;
            case 'State of Espírito Santo':
            case "ES":
            case "Espírito Santo":
                window.location.href = "https://loja.autoglassonline.com.br/?sc=3"
                //  alert("Você está em: Espirito Santo")
                break;

            // deletar sp em prod
            /* case "São Paulo":
             case "State of São Paulo":
             case "SP":
                 window.location.href = "https://loja.autoglassonline.com.br/?sc=3"
 
                 break;

            default:

                // window.location.href = "https://cbykautoglass.myvtex.com/?sc=2"
                console.log("do nothing")


        }*/

    }
})




