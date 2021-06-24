const testLogs = true;

/**
 * CENÁRIO 2
 */
const pickupPointsPolicies = [
    { nome: 'PE', Unidade: 'RC01', Uf: 'Pernambuco', salesChannel: 15},
    { nome: 'PE', Unidade: 'MG23', Uf: 'Pernambuco', salesChannel: 16},
    { nome: 'PE', Unidade: 'MG40', Uf: 'Pernambuco', salesChannel: 17},

    { nome: 'PR', Unidade: 'MG13', Uf: 'Paraná', salesChannel: 19},
    { nome: 'PR', Unidade: 'MG49', Uf: 'Paraná', salesChannel: 20},
    
    { nome: 'SP', Unidade: 'NW10', Uf: 'São Paulo', salesChannel: 26},
    { nome: 'SP', Unidade: 'NW01', Uf: 'São Paulo', salesChannel: 27},
    { nome: 'SP', Unidade: 'NW02', Uf: 'São Paulo', salesChannel: 28},
    { nome: 'SP', Unidade: 'NW04', Uf: 'São Paulo', salesChannel: 29},
    { nome: 'SP', Unidade: 'SP01', Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP', Unidade: 'MG62', Uf: 'São Paulo', salesChannel: 31},
    { nome: 'SP', Unidade: 'MG61', Uf: 'São Paulo', salesChannel: 32},
    { nome: 'SP', Unidade: 'NW08', Uf: 'São Paulo', salesChannel: 33},
    { nome: 'SP', Unidade: 'NW11', Uf: 'São Paulo', salesChannel: 34},
    { nome: 'SP', Unidade: 'NW12', Uf: 'São Paulo', salesChannel: 35},
    { nome: 'SP', Unidade: 'SP02', Uf: 'São Paulo', salesChannel: 36},
    { nome: 'SP', Unidade: 'SP03', Uf: 'São Paulo', salesChannel: 37},
    { nome: 'SP', Unidade: 'SP04', Uf: 'São Paulo', salesChannel: 38},
]

/**
 * CENÁRIO 3
 */
const specialCasePolicies = [
    
    { nome: 'PE', Unidade: 'RC01', cMin: 50000000, cMax: 53689999, Uf: 'Pernambuco', salesChannel: 15 },
    { nome: 'PE', Unidade: 'RC01', cMin: 54000000, cMax: 54599999, Uf: 'Pernambuco', salesChannel: 15 },

    { nome: 'PE', Unidade: 'MG40', cMin: 56300000, cMax: 56354999, Uf: 'Pernambuco', salesChannel: 17 },

    { nome: 'PR', Unidade: 'MG13', cMin: 80000000, cMax: 83189999, Uf: 'Paraná', salesChannel: 19 },
    { nome: 'PR', Unidade: 'MG13', cMin: 83300000, cMax: 83349999, Uf: 'Paraná', salesChannel: 19 },
    { nome: 'PR', Unidade: 'MG13', cMin: 83400000, cMax: 83479999, Uf: 'Paraná', salesChannel: 19 },
    { nome: 'PR', Unidade: 'MG13', cMin: 83500000, cMax: 83569999, Uf: 'Paraná', salesChannel: 19 },
    { nome: 'PR', Unidade: 'MG13', cMin: 83600000, cMax: 83649999, Uf: 'Paraná', salesChannel: 19 },
    { nome: 'PR', Unidade: 'MG13', cMin: 83700000, cMax: 83729999, Uf: 'Paraná', salesChannel: 19 },
    { nome: 'PR', Unidade: 'MG13', cMin: 83820000, cMax: 83839999, Uf: 'Paraná', salesChannel: 19 },

    { nome: 'PR', Unidade: 'MG49', cMin: 86730000, cMax: 86754999, Uf: 'Paraná', salesChannel: 20 },
    { nome: 'PR', Unidade: 'MG49', cMin: 86770000, cMax: 86779999, Uf: 'Paraná', salesChannel: 20 },
    { nome: 'PR', Unidade: 'MG49', cMin: 86900000, cMax: 86909999, Uf: 'Paraná', salesChannel: 20 },
    { nome: 'PR', Unidade: 'MG49', cMin: 86975000, cMax: 87119999, Uf: 'Paraná', salesChannel: 20 },
    { nome: 'PR', Unidade: 'MG49', cMin: 87140000, cMax: 87154999, Uf: 'Paraná', salesChannel: 20 },
    { nome: 'PR', Unidade: 'MG49', cMin: 87160000, cMax: 87169999, Uf: 'Paraná', salesChannel: 20 },
    { nome: 'PR', Unidade: 'MG49', cMin: 87780000, cMax: 87789999, Uf: 'Paraná', salesChannel: 20 },
 
    { nome: 'SP', Unidade: 'NW01', cMin: 4000000, cMax: 4999999, Uf: 'São Paulo', salesChannel: 27},
    { nome: 'SP', Unidade: 'NW01', cMin: 5600000, cMax: 5899999, Uf: 'São Paulo', salesChannel: 27},
    { nome: 'SP', Unidade: 'NW01', cMin: 6750000, cMax: 6799999, Uf: 'São Paulo', salesChannel: 27},
    { nome: 'SP', Unidade: 'NW01', cMin: 6900000, cMax: 6949999, Uf: 'São Paulo', salesChannel: 27},
    
    { nome: 'SP', Unidade: 'NW02', cMin: 2200000, cMax: 2999999, Uf: 'São Paulo', salesChannel: 28},
    { nome: 'SP', Unidade: 'NW02', cMin: 5100000, cMax: 5299999, Uf: 'São Paulo', salesChannel: 28},
    { nome: 'SP', Unidade: 'NW02', cMin: 6400000, cMax: 6549999, Uf: 'São Paulo', salesChannel: 28},
    { nome: 'SP', Unidade: 'NW02', cMin: 6600000, cMax: 6649999, Uf: 'São Paulo', salesChannel: 28},
    { nome: 'SP', Unidade: 'NW02', cMin: 6800000, cMax: 6889999, Uf: 'São Paulo', salesChannel: 28},
    { nome: 'SP', Unidade: 'NW02', cMin: 7700000, cMax: 7749999, Uf: 'São Paulo', salesChannel: 28},
    
    { nome: 'SP', Unidade: 'NW04', cMin: 3000000, cMax: 3999999, Uf: 'São Paulo', salesChannel: 29},
    { nome: 'SP', Unidade: 'NW04', cMin: 7000000, cMax: 7399999, Uf: 'São Paulo', salesChannel: 29},
    { nome: 'SP', Unidade: 'NW04', cMin: 8500000, cMax: 8599999, Uf: 'São Paulo', salesChannel: 29},
    
    { nome: 'SP', Unidade: 'SP01', cMin: 12900000, cMax: 12929999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP', Unidade: 'SP01', cMin: 12940000, cMax: 12954999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP', Unidade: 'SP01', cMin: 13000000, cMax: 13149999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP', Unidade: 'SP01', cMin: 13170000, cMax: 13189999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP', Unidade: 'SP01', cMin: 13200000, cMax: 13229999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP', Unidade: 'SP01', cMin: 13250000, cMax: 13259999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP', Unidade: 'SP01', cMin: 13270000, cMax: 13294999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP', Unidade: 'SP01', cMin: 13330000, cMax: 13349999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP', Unidade: 'SP01', cMin: 13380000, cMax: 13389999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP', Unidade: 'SP01', cMin: 13400000, cMax: 13439999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP', Unidade: 'SP01', cMin: 13450000, cMax: 13479999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP', Unidade: 'SP01', cMin: 13480000, cMax: 13489999, Uf: 'São Paulo', salesChannel: 30},
    { nome: 'SP', Unidade: 'SP01', cMin: 13910000, cMax: 13919999, Uf: 'São Paulo', salesChannel: 30},
    
    { nome: 'SP', Unidade: 'MG62', cMin: 1000000, cMax: 1599999, Uf: 'São Paulo', salesChannel: 31},
    { nome: 'SP', Unidade: 'MG62', cMin: 2000000, cMax: 2099999, Uf: 'São Paulo', salesChannel: 31},
    { nome: 'SP', Unidade: 'MG62', cMin: 5000000, cMax: 5099999, Uf: 'São Paulo', salesChannel: 31},
    { nome: 'SP', Unidade: 'MG62', cMin: 5300000, cMax: 5599999, Uf: 'São Paulo', salesChannel: 31},
    { nome: 'SP', Unidade: 'MG62', cMin: 6000000, cMax: 6299999, Uf: 'São Paulo', salesChannel: 31},
    
    { nome: 'SP', Unidade: 'MG61', cMin: 09000000, cMax: 09999999, Uf: 'São Paulo', salesChannel: 32},

    { nome: 'SP', Unidade: 'NW08', cMin: 15000000, cMax: 15104999, Uf: 'São Paulo', salesChannel: 33},
    { nome: 'SP', Unidade: 'NW08', cMin: 15110000, cMax: 15119999, Uf: 'São Paulo', salesChannel: 33},
    { nome: 'SP', Unidade: 'NW08', cMin: 15130000, cMax: 15159999, Uf: 'São Paulo', salesChannel: 33},
    { nome: 'SP', Unidade: 'NW08', cMin: 15170000, cMax: 15179999, Uf: 'São Paulo', salesChannel: 33},
    { nome: 'SP', Unidade: 'NW08', cMin: 15400000, cMax: 15409999, Uf: 'São Paulo', salesChannel: 33},
    { nome: 'SP', Unidade: 'NW08', cMin: 15440000, cMax: 15449999, Uf: 'São Paulo', salesChannel: 33},
    
    { nome: 'SP', Unidade: 'NW11', cMin: 11000000, cMax: 11599999, Uf: 'São Paulo', salesChannel: 34},
    { nome: 'SP', Unidade: 'NW11', cMin: 11700000, cMax: 11759999, Uf: 'São Paulo', salesChannel: 34},
    
    { nome: 'SP', Unidade: 'NW12', cMin: 13300000, cMax: 13314999, Uf: 'São Paulo', salesChannel: 35},
    { nome: 'SP', Unidade: 'NW12', cMin: 18000000, cMax: 18119999, Uf: 'São Paulo', salesChannel: 35},
    { nome: 'SP', Unidade: 'NW12', cMin: 18125000, cMax: 18146999, Uf: 'São Paulo', salesChannel: 35},
    { nome: 'SP', Unidade: 'NW12', cMin: 18160000, cMax: 18179999, Uf: 'São Paulo', salesChannel: 35},
    { nome: 'SP', Unidade: 'NW12', cMin: 18185000, cMax: 18194999, Uf: 'São Paulo', salesChannel: 35},
    { nome: 'SP', Unidade: 'NW12', cMin: 18200000, cMax: 18215999, Uf: 'São Paulo', salesChannel: 35},
    { nome: 'SP', Unidade: 'NW12', cMin: 18120000, cMax: 18124999, Uf: 'São Paulo', salesChannel: 35},
    
    { nome: 'SP', Unidade: 'SP02', cMin: 14000000, cMax: 14109999, Uf: 'São Paulo', salesChannel: 36},
    { nome: 'SP', Unidade: 'SP02', cMin: 14300000, cMax: 14349999, Uf: 'São Paulo', salesChannel: 36},
    { nome: 'SP', Unidade: 'SP02', cMin: 14680000, cMax: 14699999, Uf: 'São Paulo', salesChannel: 36},
    { nome: 'SP', Unidade: 'SP02', cMin: 14850000, cMax: 14859999, Uf: 'São Paulo', salesChannel: 36},
    
    { nome: 'SP', Unidade: 'SP03', cMin: 12000000, cMax: 12119999, Uf: 'São Paulo', salesChannel: 37},
    { nome: 'SP', Unidade: 'SP03', cMin: 12300000, cMax: 12349999, Uf: 'São Paulo', salesChannel: 37},
    { nome: 'SP', Unidade: 'SP03', cMin: 12200000, cMax: 12249999, Uf: 'São Paulo', salesChannel: 37},
    { nome: 'SP', Unidade: 'SP03', cMin: 12280000, cMax: 12299999, Uf: 'São Paulo', salesChannel: 37},
    { nome: 'SP', Unidade: 'SP03', cMin: 12400000, cMax: 12449999, Uf: 'São Paulo', salesChannel: 37},
    
    { nome: 'SP', Unidade: 'SP04', cMin: 17120000, cMax: 17149999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP', Unidade: 'SP04', cMin: 16600000, cMax: 16639999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP', Unidade: 'SP04', cMin: 16680000, cMax: 17119999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP', Unidade: 'SP04', cMin: 17150000, cMax: 17154999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP', Unidade: 'SP04', cMin: 17180000, cMax: 17220999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP', Unidade: 'SP04', cMin: 17270000, cMax: 17299999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP', Unidade: 'SP04', cMin: 17470000, cMax: 17499999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP', Unidade: 'SP04', cMin: 18500000, cMax: 18519999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP', Unidade: 'SP04', cMin: 18670000, cMax: 18674999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP', Unidade: 'SP04', cMin: 16670000, cMax: 16679999, Uf: 'São Paulo', salesChannel: 38},
    { nome: 'SP', Unidade: 'SP04', cMin: 17160000, cMax: 17179999, Uf: 'São Paulo', salesChannel: 38},
    
];

/**
 * CENÁRIO 4 - CASO GERAL
 */
const generalPolicies = [
    { nome: 'AC', Unidade: 'MG08', cMin: 69900000, cMax: 69999999, Uf: 'Acre', salesChannel: 12 },
    { nome: 'AL', Unidade: 'MG24', cMin: 57000000, cMax: 57999999, Uf: 'Alagoas', salesChannel: 4 },
    { nome: 'AP', Unidade: 'MG05', cMin: 68900000, cMax: 68999999, Uf: 'Amapá', salesChannel: 21 },
    { nome: 'AM', Unidade: 'MG50', cMin: 69000000, cMax: 69299999, Uf: 'Amazonas', salesChannel: 5 },
    { nome: 'AM', Unidade: 'MG50', cMin: 69400000, cMax: 69899999, Uf: 'Amazonas', salesChannel: 5 },
    { nome: 'BA', Unidade: 'MG17', cMin: 40000000, cMax: 48999999, Uf: 'Bahia', salesChannel: 6 },
    { nome: 'CE', Unidade: 'MG25', cMin: 60000000, cMax: 63999999, Uf: 'Ceará', salesChannel: 7 },
    { nome: 'DF', Unidade: 'MG03', cMin: 70000000, cMax: 72799999, Uf: 'Distrito Federal', salesChannel: 8 },
    { nome: 'DF', Unidade: 'MG03', cMin: 73000000, cMax: 73699999, Uf: 'Distrito Federal', salesChannel: 8 },
    { nome: 'ES', Unidade: 'PG06', cMin: 29000000, cMax: 29999999, Uf: 'Espírito Santo', salesChannel: 3 },
    { nome: 'GO', Unidade: 'MG22', cMin: 72800000, cMax: 72999999, Uf: 'Goiás', salesChannel: 9 },
    { nome: 'GO', Unidade: 'MG22', cMin: 73700000, cMax: 76799999, Uf: 'Goiás', salesChannel: 9 },
    { nome: 'MA', Unidade: 'MG32', cMin: 65000000, cMax: 65999999, Uf: 'Maranhão', salesChannel: 10 },
    { nome: 'MT', Unidade: 'MG08', cMin: 78000000, cMax: 78899999, Uf: 'Mato Grosso', salesChannel: 12 },
    { nome: 'MS', Unidade: 'MG21', cMin: 79000000, cMax: 79999999, Uf: 'Mato Grosso do Sul', salesChannel: 11 },
    { nome: 'MG', Unidade: 'MG38', cMin: 30000000, cMax: 39999999, Uf: 'Minas Gerais', salesChannel: 2 },
    { nome: 'PA', Unidade: 'MG26', cMin: 66000000, cMax: 68899999, Uf: 'Pará', salesChannel: 13 },
    { nome: 'PB', Unidade: 'MG43', cMin: 58000000, cMax: 58999999, Uf: 'Paraíba', salesChannel: 14 },
    { nome: 'PR', Unidade: 'MG13', cMin: 80000000, cMax: 87999999, Uf: 'Paraná', salesChannel: 19},
    { nome: 'PE', Unidade: 'RC01', cMin: 50000000, cMax: 56999999, Uf: 'Pernambuco', salesChannel: 15},
    { nome: 'PI', Unidade: 'MG33', cMin: 64000000, cMax: 64999999, Uf: 'Piauí', salesChannel: 18 },
    { nome: 'RJ', Unidade: 'MG05', cMin: 20000000, cMax: 28999999, Uf: 'Rio de Janeiro', salesChannel: 21 },
    { nome: 'RN', Unidade: 'MG29', cMin: 59000000, cMax: 59999999, Uf: 'Rio Grande do Norte', salesChannel: 22 },
    { nome: 'RS', Unidade: 'MG11', cMin: 90000000, cMax: 99999999, Uf: 'Rio Grande do Sul', salesChannel: 23 },
    { nome: 'RO', Unidade: 'MG08', cMin: 76800000, cMax: 76999999, Uf: 'Rondônia', salesChannel: 12 },
    { nome: 'RR', Unidade: 'MG50', cMin: 69300000, cMax: 69399999, Uf: 'Roraima', salesChannel: 5 },
    { nome: 'SC', Unidade: 'MG31', cMin: 88000000, cMax: 89999999, Uf: 'Santa Catarina', salesChannel: 24 },
    { nome: 'SP', Unidade: 'NW10', cMin: 00000000, cMax: 999999, Uf: 'São Paulo', salesChannel: 26, imSpecial: true },
    { nome: 'SP', Unidade: 'NW10', cMin: 01000000, cMax: 19999999, Uf: 'São Paulo', salesChannel: 26, imSpecial: true },
    { nome: 'SE', Unidade: 'MG07', cMin: 49000000, cMax: 49999999, Uf: 'Sergipe', salesChannel: 25 },
    { nome: 'TO', Unidade: 'MG56', cMin: 77000000, cMax: 77999999, Uf: 'Tocantins', salesChannel: 39 },
];

$(window).on("orderFormUpdated.vtex", (_, oF) => {
    checkSelectedDeliveryChannel(oF);
    changeSalesChannel(oF);
});

localStorage.setItem('locationChanged', 0);

ga('create', 'UA-133498560-1', 'autoglassonline.com', 'gaTracker' );
ga('send', 'event', 'SalesChannel', 'script-loaded', 'Sc setted = ' + vtexjs.checkout.orderForm.salesChannel, {
    nonInteraction: true,
    // 'hitCallback': function(){
    //     console.log("ga event SalesChannel script-loaded hit");
    // }
  });

const botaoFinalizaCompra = document.querySelectorAll('#payment-data-submit')
botaoFinalizaCompra[1].addEventListener('click', () => {
    ga('send', 'event', 'SalesChannel', 'on-payment', 'Sc setted = ' + vtexjs.checkout.orderForm.salesChannel, {
        nonInteraction: true,
        // 'hitCallback': function(){
        //     console.log("ga event SalesChannel on-payment hit");
        // }
      });
})

function checkSelectedDeliveryChannel(orderForm) {
    activeDeliveryChannel = localStorage.getItem('activeDeliveryChannel');
    let logisticsInfo = orderForm.shippingData.logisticsInfo;
    const selectedAddresses = orderForm.shippingData.selectedAddresses;
    const hasPickupInPoint = logisticsInfo[0].slas.find(sla => sla.deliveryChannel == 'pickup-in-point');

    actualSelectedDeliveryChannel = logisticsInfo[0].selectedDeliveryChannel;

    if (activeDeliveryChannel == 'pickup-in-point' && actualSelectedDeliveryChannel != 'pickup-in-point' && hasPickupInPoint) {

        logisticsInfo = logisticsInfo.map(item => {
            item.selectedDeliveryChannel = 'pickup-in-point';
            item.selectedSla = hasPickupInPoint.id;
            return item;
        })
       
        vtexjs.checkout.sendAttachment("shippingData", {
            logisticsInfo,
            selectedAddresses
        });
            
        return;
    }
}

async function changeSalesChannel(orderForm){

    if (!orderForm) {
        console.error('OrderForm inválido. \n', orderForm)
        return;
    }

    const actualSalesChannel = orderForm.salesChannel;
    const shippingData = orderForm.shippingData;
    const items = orderForm.items;

    if (testLogs) logEstadoAtual(actualSalesChannel, items);

    const newSalesChannelObject = determineNewSalesChannel(shippingData);
    if (!newSalesChannelObject){
        console.error('Houve algum problema ao determinar a nova política a ser aplicada');
        return;
    }
    
    $('#myplace').text(newSalesChannelObject.Uf);

    const myufCurrent = readCookie('myuf');

    document.cookie = `myuf=${newSalesChannelObject.nome.substr(0, 2)}; expires=Sun, 1 Jan 2099 00:00:00 UTC; path=/`;

    //houver cookie VTEXSC sem o ponto no início (no secure), apaga esse cookie.
    document.cookie = 'VTEXSC'+ `=; Max-Age=-99999999;  path=/`;
    document.cookie = `VTEXSC=sc=${newSalesChannelObject.salesChannel}; expires=Sun, 1 Jan 2099 00:00:00 UTC;domain=${location.host}; path=/; secure=true`;

    
    if (testLogs) logNewPolicy(newSalesChannelObject, shippingData)

    //teste
    // await vtexjs.checkout.simulateShipping(shippingData, orderForm.orderFormId, "BRA", newSalesChannelObject.salesChannel)
    //     .done(function(li) {
    //         console.log("\nTeste Simulação:\nDelivery Channel: " + li.logisticsInfo[0].selectedDeliveryChannel + "\nSla: " + li.logisticsInfo[0].selectedSla)
    //     });
    //teste - FIM

    if (newSalesChannelObject.salesChannel != +actualSalesChannel) {

        if(newSalesChannelObject.nome != myufCurrent){
            localStorage.setItem('locationChanged', 1);
        }

        if (testLogs) console.log("Política definida é diferente da atual.\n\nAplicando nova política...");

        startAnimation();

        ga('send', 'event', 'SalesChannel', 'changed', 'Setting Sc = ' +newSalesChannelObject.salesChannel, {
            nonInteraction: true,
            // 'hitCallback': function(){
            //     console.log("ga event SalesChannel changed hit");
            // }
          });

        await reAddCartItems(items, newSalesChannelObject);

        if (!!$('.vtex-pickup-points-modal-3-x-modalBackdrop.pkpmodal-backdrop').length)
            $('.vtex-pickup-points-modal-3-x-closeButton.pkpmodal-close').click();

        finishAnimation();
    } else {
        if (testLogs) console.log("Política desterminada já é a atual");
    }
}

function determineNewSalesChannel(shippingData) {

    const postalCode = shippingData.address?.postalCode;

    // se não houver CEP definido aplica politica geral do estado definido em outras páginas no cookie 'myuf'
    if (!postalCode) {
        console.error('Cep não encontrado: ', postalCode);
        const myuf = readCookie('myuf');
        const salesChannelObject = generalPolicies.find(sc => sc.nome === myuf);

        return salesChannelObject;
    }

    //recupera informações de logística
    let selectedSla, selectedDeliveryChannel;
    try {
        selectedDeliveryChannel = shippingData.logisticsInfo[0].selectedDeliveryChannel; //delivery, pickup-in-point (...)
        selectedSla = shippingData.logisticsInfo[0].selectedSla; //express, autoglass móvel, retirada (...)
    } catch (err) {
        console.error(`Falha ao recuperar a entrega escolhida.\n
            selectedSla: ${selectedSla}\n isDelivery: ${selectedDeliveryChannel}\n`, err);
        return null;
    }

    //se não houver DeliveryChannel definido, provavelmente o CEP digitado com sales channel atual não resultou em nenhuma opção
    if (!selectedDeliveryChannel){
        
        if(testLogs){
            console.log("selectedDeliveryChannel indefinido. Definindo politica geral")
        }

        const salesChannelObject = findSalesChannelByCep(generalPolicies, postalCode);
        return salesChannelObject;
    }


    //verifica se Retire / Instale na Loja ===> CENÁRIO 2
    if (selectedDeliveryChannel == "pickup-in-point") {
        if (selectedSla) {
            const slaInfo = shippingData.logisticsInfo[0].slas.find(sla => sla.id == selectedSla);
            const storeId = slaInfo.pickupStoreInfo.address.addressId;
            const salesChannelObject = findSalesChannelByStore(pickupPointsPolicies, storeId);
            if (salesChannelObject){
                return salesChannelObject;
            } else{
                if(testLogs) console.log("Problema ao recuperar SC de pickup-in-point");
            }
        }
        // implementar
    }

    //se Autoglass Móvel ou Express ===> CENÁRIO 3
    if ((selectedDeliveryChannel == "delivery") && selectedSla &&
        (selectedSla.match(/autoglass.*?m[oó]vel/gi) || selectedSla.match(/express/gi)))
    {
        const salesChannelObject = findSalesChannelByCep(specialCasePolicies, postalCode);

        if (salesChannelObject) 
            return salesChannelObject //se encontrou CEP nos casos especiais aplica a politica correspondente
        //se não, continua execução para aplicação da política de caso geral
    }


    //se chegou aqui, não entrou em nenhum caso especial acima, então busca e retorna política de caso geral
    //CENÁRIO 4

    const salesChannelObject = findSalesChannelByCep(generalPolicies, postalCode);
    if (salesChannelObject) {
        return salesChannelObject;
    } else {
        if(testLogs) console.log("CEP não encontrado no range de politicas de caso geral")
        return null;
    }

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

function findSalesChannelByCep(policiesArray, cep) {
    var cleanCep = parseInt(cep.replace(/\D+/g, ''));
    var city = policiesArray.find(cd => cleanCep >= cd.cMin && cleanCep <= cd.cMax);

    if (city) {
        // Se o cep estiver no range, o valor da variável cidade será a primeira cidade que fez match com a expressão usada no método `find`
        return city;
    }
}

function findSalesChannelByStore(policiesArray, storeId) {
    
    var policy = policiesArray.find(pol => pol.Unidade == storeId);

    if (policy) {
        // Se o cep estiver no range, o valor da variável cidade será a primeira cidade que fez match com a expressão usada no método `find`
        return policy;
    }
}

async function reAddCartItems(items, salesChannelObject) {

    return await vtexjs.checkout.addToCart(
        items.map(item => ({
            id: item.id,
            quantity: item.quantity,
            seller: item.seller
        })),
        null,
        salesChannelObject.salesChannel
    );
}

function logEstadoAtual (actualSalesChannel, items) {
    let log = 'Sales channel atual no orderForm: ' + actualSalesChannel + '\n';
    log += 'Produtos:\n';
    log += items.map(item => `${item.refId} - R$ ${(item.price / 100).toLocaleString()}`).join('\n');
    console.log(log);
}

function logNewPolicy (newSalesChannelObject, shippingData) {
    selectedDeliveryChannel = shippingData.logisticsInfo[0].selectedDeliveryChannel; //delivery, pickup-in-point (...)
    selectedSla = shippingData.logisticsInfo[0].selectedSla; //express, autoglass móvel, retirada (...)
    
    let log = 'Política determinada:\n\nLogística:\n';
    log += 'Cep: ' + shippingData.address?.postalCode;;
    log += '\nSc: ' + newSalesChannelObject.salesChannel + ' - ' + newSalesChannelObject.Unidade;
    log += '\nEstado: ' + newSalesChannelObject.Uf;
    log += '\nDelivery Channel: ' + selectedDeliveryChannel;
    log += '\nSla: ' + selectedSla;

    console.log(log);
}

function startAnimation() {
    $('.summary-template-holder').css('opacity', 0);
    $('.cart-template-holder').css('opacity', 0);
}

function finishAnimation() {
    $('.summary-template-holder').css('opacity', 1);
    $('.cart-template-holder').css('opacity', 1);
}



