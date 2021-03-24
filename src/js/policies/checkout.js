const testLogs = true;

//{nome:'ES',cMin:00000000,cMax:99999999,Uf:'Espírito Santo',salesChannel:0,imSpecial:false},
// Cuidado com a ordem do array, influência na política que será escolhida

const States = [
    { nome: 'ES', Unidade: 'PG06', cMin: 29000000, cMax: 29999999, Uf: 'Espírito Santo', salesChannel: 3 },
    { nome: 'MG', Unidade: 'MG38', cMin: 30000000, cMax: 39999999, Uf: 'Minas Gerais', salesChannel: 2 },
    { nome: 'AC', Unidade: 'MG08', cMin: 69900000, cMax: 69999999, Uf: 'Acre', salesChannel: 12 },
    { nome: 'AL', Unidade: 'MG24', cMin: 57000000, cMax: 57999999, Uf: 'Alagoas', salesChannel: 4 },
    { nome: 'AM', Unidade: 'MG50', cMin: 69000000, cMax: 69299999, Uf: 'Amazonas', salesChannel: 5 },
    { nome: 'AM', Unidade: 'MG50', cMin: 69400000, cMax: 69899999, Uf: 'Amazonas', salesChannel: 5 },
    { nome: 'AP', Unidade: 'MG05', cMin: 68900000, cMax: 68999999, Uf: 'Amapá', salesChannel: 21 },
    { nome: 'BA', Unidade: 'MG17', cMin: 40000000, cMax: 48999999, Uf: 'Bahia', salesChannel: 6 },
    { nome: 'CE', Unidade: 'MG25', cMin: 60000000, cMax: 63999999, Uf: 'Ceará', salesChannel: 7 },
    { nome: 'DF', Unidade: 'MG03', cMin: 70000000, cMax: 72799999, Uf: 'Distrito Federal', salesChannel: 8 },
    { nome: 'DF', Unidade: 'MG03', cMin: 73000000, cMax: 73699999, Uf: 'Distrito Federal', salesChannel: 8 },
    { nome: 'GO', Unidade: 'MG22', cMin: 72800000, cMax: 72999999, Uf: 'Goiás', salesChannel: 9 },
    { nome: 'GO', Unidade: 'MG22', cMin: 73700000, cMax: 76799999, Uf: 'Goiás', salesChannel: 9 },
    { nome: 'MA', Unidade: 'MG32', cMin: 65000000, cMax: 65999999, Uf: 'Maranhão', salesChannel: 10 },
    { nome: 'MS', Unidade: 'MG21', cMin: 79000000, cMax: 79999999, Uf: 'Mato Grosso do Sul', salesChannel: 11 },
    { nome: 'MT', Unidade: 'MG08', cMin: 78000000, cMax: 78899999, Uf: 'Mato Grosso', salesChannel: 12 },
    { nome: 'PA', Unidade: 'MG26', cMin: 66000000, cMax: 68899999, Uf: 'Pará', salesChannel: 13 },
    { nome: 'PB', Unidade: 'MG43', cMin: 58000000, cMax: 58999999, Uf: 'Paraíba', salesChannel: 14 },

    { nome: 'PE', Unidade: 'RC01', cMin: 50000000, cMax: 53689999, Uf: 'Pernambuco', salesChannel: 15 },
    { nome: 'PE', Unidade: 'RC01', cMin: 54000000, cMax: 54599999, Uf: 'Pernambuco', salesChannel: 15 },
    { nome: 'PE3', Unidade: 'MG40', cMin: 56300000, cMax: 56354999, Uf: 'Pernambuco', salesChannel: 17 },
    { nome: 'PE2', Unidade: 'MG23', cMin: 50000000, cMax: 56999999, Uf: 'Pernambuco', salesChannel: 15, imSpecial: true }, //faltando esse

    { nome: 'PI', Unidade: 'MG33', cMin: 64000000, cMax: 64999999, Uf: 'Piauí', salesChannel: 18 },

    { nome: 'PR2', Unidade: 'MG49', cMin: 86730000, cMax: 86754999, Uf: 'Paraná', salesChannel: 20 },
    { nome: 'PR2', Unidade: 'MG49', cMin: 86770000, cMax: 86779999, Uf: 'Paraná', salesChannel: 20 },
    { nome: 'PR2', Unidade: 'MG49', cMin: 86900000, cMax: 86909999, Uf: 'Paraná', salesChannel: 20 },
    { nome: 'PR2', Unidade: 'MG49', cMin: 86975000, cMax: 87119999, Uf: 'Paraná', salesChannel: 20 },
    { nome: 'PR2', Unidade: 'MG49', cMin: 87140000, cMax: 87154999, Uf: 'Paraná', salesChannel: 20 },
    { nome: 'PR2', Unidade: 'MG49', cMin: 87160000, cMax: 87169999, Uf: 'Paraná', salesChannel: 20 },
    { nome: 'PR2', Unidade: 'MG49', cMin: 87780000, cMax: 87789999, Uf: 'Paraná', salesChannel: 20 },
    { nome: 'PR', Unidade: 'MG13', cMin: 80000000, cMax: 87999999, Uf: 'Paraná', salesChannel: 19, imSpecial: true },

    { nome: 'RJ', Unidade: 'MG05', cMin: 20000000, cMax: 28999999, Uf: 'Rio de Janeiro', salesChannel: 21 },
    { nome: 'RN', Unidade: 'MG29', cMin: 59000000, cMax: 59999999, Uf: 'Rio Grande do Norte', salesChannel: 22 },
    { nome: 'RO', Unidade: 'MG08', cMin: 76800000, cMax: 76999999, Uf: 'Rondônia', salesChannel: 12 },
    { nome: 'RR', Unidade: 'MG50', cMin: 69300000, cMax: 69399999, Uf: 'Roraima', salesChannel: 5 },
    { nome: 'RS', Unidade: 'MG11', cMin: 90000000, cMax: 99999999, Uf: 'Rio Grande do Sul', salesChannel: 23 },
    { nome: 'SC', Unidade: 'MG31', cMin: 88000000, cMax: 89999999, Uf: 'Santa Catarina', salesChannel: 24 },
    { nome: 'SE', Unidade: 'MG07', cMin: 49000000, cMax: 49999999, Uf: 'Sergipe', salesChannel: 25 },

    { nome: 'SP2', Unidade: 'NW01', cMin: 4000000, cMax: 4999999, Uf: 'São Paulo', salesChannel: 27},
    { nome: 'SP2', Unidade: 'NW01', cMin: 5600000, cMax: 5899999, Uf: 'São Paulo', salesChannel: 27},
    { nome: 'SP2', Unidade: 'NW01', cMin: 6750000, cMax: 6799999, Uf: 'São Paulo', salesChannel: 27},
    { nome: 'SP2', Unidade: 'NW01', cMin: 6900000, cMax: 6949999, Uf: 'São Paulo', salesChannel: 27},

    { nome: 'SP3', Unidade: 'NW02', cMin: 2200000, cMax: 2999999, Uf: 'São Paulo', salesChannel: 28},
    { nome: 'SP3', Unidade: 'NW02', cMin: 5100000, cMax: 5299999, Uf: 'São Paulo', salesChannel: 28},
    { nome: 'SP3', Unidade: 'NW02', cMin: 6400000, cMax: 6549999, Uf: 'São Paulo', salesChannel: 28},
    { nome: 'SP3', Unidade: 'NW02', cMin: 6600000, cMax: 6649999, Uf: 'São Paulo', salesChannel: 28},
    { nome: 'SP3', Unidade: 'NW02', cMin: 6850000, cMax: 6949999, Uf: 'São Paulo', salesChannel: 28},
    { nome: 'SP3', Unidade: 'NW02', cMin: 7700000, cMax: 7749999, Uf: 'São Paulo', salesChannel: 28},

    { nome: 'SP4', Unidade: 'NW04', cMin: 3000000, cMax: 3999999, Uf: 'São Paulo', salesChannel: 29},
    { nome: 'SP4', Unidade: 'NW04', cMin: 7000000, cMax: 7399999, Uf: 'São Paulo', salesChannel: 29},
    { nome: 'SP4', Unidade: 'NW04', cMin: 8500000, cMax: 8599999, Uf: 'São Paulo', salesChannel: 29},

    { nome: 'SP5', Unidade: 'SP01', cMin: 12900000, cMax: 12929999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP5', Unidade: 'SP01', cMin: 12940000, cMax: 12954999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP5', Unidade: 'SP01', cMin: 13000000, cMax: 13149999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP5', Unidade: 'SP01', cMin: 13170000, cMax: 13189999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP5', Unidade: 'SP01', cMin: 13200000, cMax: 13229999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP5', Unidade: 'SP01', cMin: 13250000, cMax: 13259999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP5', Unidade: 'SP01', cMin: 13270000, cMax: 13294999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP5', Unidade: 'SP01', cMin: 13330000, cMax: 13349999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP5', Unidade: 'SP01', cMin: 13380000, cMax: 13389999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP5', Unidade: 'SP01', cMin: 13400000, cMax: 13439999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP5', Unidade: 'SP01', cMin: 13450000, cMax: 13479999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP5', Unidade: 'SP01', cMin: 13480000, cMax: 13489999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP5', Unidade: 'SP01', cMin: 13910000, cMax: 13919999, Uf: 'São Paulo', salesChannel: 30},

    { nome: 'SP6', Unidade: 'NW06', cMin: 1000000, cMax: 1599999, Uf: 'São Paulo', salesChannel: 31},
    { nome: 'SP6', Unidade: 'NW06', cMin: 2000000, cMax: 2099999, Uf: 'São Paulo', salesChannel: 31},
    { nome: 'SP6', Unidade: 'NW06', cMin: 2055000, cMax: 2055001, Uf: 'São Paulo', salesChannel: 31},
    { nome: 'SP6', Unidade: 'NW06', cMin: 5000000, cMax: 5099999, Uf: 'São Paulo', salesChannel: 31},
    { nome: 'SP6', Unidade: 'NW06', cMin: 5075020, cMax: 5075020, Uf: 'São Paulo', salesChannel: 31},
    { nome: 'SP6', Unidade: 'NW06', cMin: 5300000, cMax: 5599999, Uf: 'São Paulo', salesChannel: 31},
    { nome: 'SP6', Unidade: 'NW06', cMin: 6000000, cMax: 6299999, Uf: 'São Paulo', salesChannel: 31},

    { nome: 'SP7', Unidade: 'NW07', cMin: 09000000, cMax: 09999999, Uf: 'São Paulo', salesChannel: 32},

    { nome: 'SP8', Unidade: 'NW08', cMin: 15000000, cMax: 15104999, Uf: 'São Paulo', salesChannel: 33},
    { nome: 'SP8', Unidade: 'NW08', cMin: 15110000, cMax: 15119999, Uf: 'São Paulo', salesChannel: 33},
    { nome: 'SP8', Unidade: 'NW08', cMin: 15130000, cMax: 15159999, Uf: 'São Paulo', salesChannel: 33},
    { nome: 'SP8', Unidade: 'NW08', cMin: 15170000, cMax: 15179999, Uf: 'São Paulo', salesChannel: 33},
    { nome: 'SP8', Unidade: 'NW08', cMin: 15400000, cMax: 15409999, Uf: 'São Paulo', salesChannel: 33},
    { nome: 'SP8', Unidade: 'NW08', cMin: 15440000, cMax: 15449999, Uf: 'São Paulo', salesChannel: 33},

    { nome: 'SP9', Unidade: 'NW11', cMin: 11000000, cMax: 11599999, Uf: 'São Paulo', salesChannel: 34},
    { nome: 'SP9', Unidade: 'NW11', cMin: 11700000, cMax: 11759999, Uf: 'São Paulo', salesChannel: 34},

    { nome: 'SP10', Unidade: 'NW12', cMin: 13300000, cMax: 13314999, Uf: 'São Paulo', salesChannel: 35},
    { nome: 'SP10', Unidade: 'NW12', cMin: 18000000, cMax: 18119999, Uf: 'São Paulo', salesChannel: 35},
    { nome: 'SP10', Unidade: 'NW12', cMin: 18125000, cMax: 18146999, Uf: 'São Paulo', salesChannel: 35},
    { nome: 'SP10', Unidade: 'NW12', cMin: 18160000, cMax: 18179999, Uf: 'São Paulo', salesChannel: 35},
    { nome: 'SP10', Unidade: 'NW12', cMin: 18185000, cMax: 18194999, Uf: 'São Paulo', salesChannel: 35},
    { nome: 'SP10', Unidade: 'NW12', cMin: 18200000, cMax: 18215999, Uf: 'São Paulo', salesChannel: 35},
    { nome: 'SP10', Unidade: 'NW12', cMin: 18120000, cMax: 18124999, Uf: 'São Paulo', salesChannel: 35},

    { nome: 'SP11', Unidade: 'SP02', cMin: 14000000, cMax: 14109999, Uf: 'São Paulo', salesChannel: 36},
    { nome: 'SP11', Unidade: 'SP02', cMin: 14300000, cMax: 14349999, Uf: 'São Paulo', salesChannel: 36},
    { nome: 'SP11', Unidade: 'SP02', cMin: 14680000, cMax: 14699999, Uf: 'São Paulo', salesChannel: 36},
    { nome: 'SP11', Unidade: 'SP02', cMin: 14850000, cMax: 14859999, Uf: 'São Paulo', salesChannel: 36},

    { nome: 'SP12', Unidade: 'SP03', cMin: 12000001, cMax: 12119999, Uf: 'São Paulo', salesChannel: 37},
    { nome: 'SP12', Unidade: 'SP03', cMin: 12180000, cMax: 12350000, Uf: 'São Paulo', salesChannel: 37},
    { nome: 'SP12', Unidade: 'SP03', cMin: 12200000, cMax: 12249999, Uf: 'São Paulo', salesChannel: 37},
    { nome: 'SP12', Unidade: 'SP03', cMin: 12280001, cMax: 12299999, Uf: 'São Paulo', salesChannel: 37},
    { nome: 'SP12', Unidade: 'SP03', cMin: 12400001, cMax: 12449999, Uf: 'São Paulo', salesChannel: 37},

    { nome: 'SP13', Unidade: 'SP04', cMin: 17120000, cMax: 17149999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP13', Unidade: 'SP04', cMin: 16600000, cMax: 16639999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP13', Unidade: 'SP04', cMin: 16680000, cMax: 17119999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP13', Unidade: 'SP04', cMin: 17150000, cMax: 17154999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP13', Unidade: 'SP04', cMin: 17180000, cMax: 17220999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP13', Unidade: 'SP04', cMin: 17270000, cMax: 17299999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP13', Unidade: 'SP04', cMin: 17470000, cMax: 17499999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP13', Unidade: 'SP04', cMin: 18500000, cMax: 18519999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP13', Unidade: 'SP04', cMin: 18670000, cMax: 18674999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP13', Unidade: 'SP04', cMin: 16670000, cMax: 16679999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP13', Unidade: 'SP04', cMin: 17160000, cMax: 17179999, Uf: 'São Paulo', salesChannel: 38},

    { nome: 'SP', Unidade: 'NW10', cMin: 01000000, cMax: 19999999, Uf: 'São Paulo', salesChannel: 26, imSpecial: true },

    { nome: 'TO', Unidade: 'MG56', cMin: 77000000, cMax: 77999999, Uf: 'Tocantins', salesChannel: 39 },
];
const SPs = ["SP", "SP1", "SP2", "SP3", "SP4", "SP5", "SP6", "SP7", "SP8", "SP9", "SP10", "SP11", "SP12", "SP13"];

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

function findSalesChannelByCep(cep) {
    var cleanCep = parseInt(cep.replace(/\D+/g, ''));
    var city = States.find(cd => cleanCep >= cd.cMin && cleanCep <= cd.cMax);

    if (city) {
        // Se o cep estiver no range, o valor da variável cidade será a primeira cidade que fez match com a expressão usada no método `find`
        return city;
    } else {
        console.error(`Infelizmente não conseguimos detectar seu CEP. Tente novamente.`);
    }
}

async function changeSalesChannel(orderForm) {

    if (!orderForm) {
        console.error('OrderForm inválido. \n', orderForm)
        return;
    }

    const isntInstallInHome = $(".onda-v1 .instalacao label.blue .instalar").text() != "Instalar em casa";
    const { items, shippingData, salesChannel } = orderForm;
    const postalCode = shippingData.address?.postalCode;

    if (!postalCode) {
        console.error('Cep não encontrado: ', postalCode);

        const myuf = readCookie('myuf');

        const city = States.find(ct => ct.nome === myuf);

        $('#myplace').text(city.Uf);

        if (city.salesChannel !== +salesChannel)
            await reAddCartItems(items, city.salesChannel);

        return;
    }

    let selectedSla, isDelivery, hasError;
    try {
        selectedSla = shippingData.logisticsInfo[0].selectedSla;
        isDelivery = shippingData.logisticsInfo[0].selectedDeliveryChannel === 'delivery';
    } catch (err) {
        hasError = true;
        console.error(`Falha ao recuperar a entrega escolhida.\n
        selectedSla: ${selectedSla}\n isDelivery: ${isDelivery}\n`, err);
    }

    try {
        const currentSalesChannel = findSalesChannelByCep(postalCode);

        if (testLogs) {
            let log = 'Produtos\n';
            log += items.map(item => `${item.refId} - R$ ${(item.price / 100).toLocaleString()}`).join('\n');

            log += '\n\nLogística\n';
            log += 'Cep: ' + postalCode;
            log += '\nSc: ' + currentSalesChannel.salesChannel + ' - ' + currentSalesChannel.Unidade;
            log += '\nEstado: ' + currentSalesChannel.Uf;
            log += '\nEscolhido: ' + selectedSla;

            console.log(log);
        }

        $('#myplace').text(currentSalesChannel.Uf);
        document.cookie = `myuf=${currentSalesChannel.nome.substr(0, 2)}; expires=Sun, 1 Jan 2099 00:00:00 UTC; path=/`;
        document.cookie = `VTEXSC=sc=${currentSalesChannel.salesChannel}; expires=Sun, 1 Jan 2099 00:00:00 UTC; domain=.${location.host.replace('www.', '')}; path=/`;

        if (salesChannel == currentSalesChannel.salesChannel)
            return;

        startAnimation();

        if (isntInstallInHome
            && (isDelivery || selectedSla == "Express" || hasError)
            && currentSalesChannel.imSpecial
        ) {
            if (SPs.includes(currentSalesChannel.nome))
                await reAddCartItems(items, 26)
            else if (currentSalesChannel.nome === "PR")
                await reAddCartItems(items, 19)
            else if (currentSalesChannel.nome === "PE2")
                await reAddCartItems(items, 15)
        } else {
            await reAddCartItems(items, currentSalesChannel.salesChannel);
        }

        if (!!$('.vtex-pickup-points-modal-3-x-modalBackdrop.pkpmodal-backdrop').length)
            $('.vtex-pickup-points-modal-3-x-closeButton.pkpmodal-close').click();

        finishAnimation();
    } catch (err) {
        console.error('Falha ao realizar a troca de políticas. \n', err.message)
    }
}

async function reAddCartItems(items, salesChannel) {
    return await vtexjs.checkout.addToCart(
        items.map(item => ({
            id: item.id,
            quantity: item.quantity,
            seller: item.seller
        })),
        null,
        salesChannel
    );
}

function startAnimation() {
    $('.summary-template-holder').css('opacity', 0);
    $('.cart-template-holder').css('opacity', 0);

    /*   $("#theviewblocker").attr("style", `
           display: block;
           background-color: rgba(255,255,255,.8);
           position: fixed;
           left: 0;
           right: 0;
           top: 0;
           bottom: 0;
           width: 100%;
           backdrop-filter: blur(9px);
           height: 100%;
           z-index: 99;`
       );
   
       $("#thegif").attr("style", `
           display: block;
           position: fixed;
           z-index: 9999999;
           backdrop-filter: blur(0px);
           height: auto;
           margin: auto;
           top: 50%;
           left: 50%;
           transform: translate(-50%, -50%);
       `); */
}

function finishAnimation() {
    $('.summary-template-holder').css('opacity', 1);
    $('.cart-template-holder').css('opacity', 1);

    /*   $("#thegif").attr("style", "display:none");
       $("#theviewblocker").attr("style", "display:none");
       $(".product-item").css({ "visibility": "visible" });*/
}

$(window).on("orderFormUpdated.vtex", (_, oF) => changeSalesChannel(oF));

