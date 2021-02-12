/* Teste para galeria de imagens com vídeo */

$(document).ready(function () {
    ImageControl1($("ul.thumbs a:first"), 0);
    
    imageVideoGalery();

    clickThumbs1();
    
    var imageControlListener = new Vtex.JSEvents.Listener('imageControlListener', imageControl_OnSkuDataReceived1);
    skuEventDispatcher.events.skuDataReceived.listeners[0] = null;
    skuEventDispatcher.addListener(skuDataReceivedEventName, imageControlListener);

    var imageControlSpecSelectedListener = new Vtex.JSEvents.Listener('imageControlSpecSelectedListener', imageControl_OnSkuImageRelatedSpecSelected1);
    skuEventDispatcher.events.skuImageRelatedSpecSelected.listeners[0] = null;
    skuEventDispatcher.addListener(skuImageRelatedSpecSelectedEventName, imageControlSpecSelectedListener);
});

function imageControl_OnSkuImageRelatedSpecSelected1(e) {
    var skuData = getSkuData(e.newSkuId);
    var args = new Vtex.Commerce.JSEvents.SkuDataReceivedEventArgs();
    args.skuData = skuData;
    imageControl_OnSkuDataReceived1(args);
}

function imageControl_OnSkuDataReceived1(e) {
    //Limpo as imagens thumb
    $("ul.thumbs").html("");

    var arrayLi = new Array();
    var idMain = 0;
    var idZoom = 0;
    var idThumb = 0;
    var pathMain = "";
    var pathZoom = "";
    var pathThumb = "";

    var pi = e.productIndex;
    if (pi === undefined) { pi = 0; }
    //Inicio o loop para preencher o objeto li com as novas tumbs
    for (i = 0; i < e.skuData.images.length; i++) {
        idZoom = 0;
        idThumb = 0;
        for (j = 0; j < e.skuData.images[i].length; j++) {
            if (e.skuData.images[i][j].ArchiveTypeId == 3) {
                idThumb = e.skuData.images[i][j].IdArchive;
                pathThumb = e.skuData.images[i][j].Path;
            }
            if (e.skuData.images[i][j].ArchiveTypeId == 2) {
                idMain = e.skuData.images[i][j].IdArchive;
                pathMain = e.skuData.images[i][j].Path;
            }
            if (e.skuData.images[i][j].ArchiveTypeId == 10) {
                idZoom = e.skuData.images[i][j].IdArchive;
                pathZoom = e.skuData.images[i][j].Path;
            }

        }
        if (idMain > 0 && idThumb > 0) {
            arrayLi[i] = $("<li></li>");
            var href = $("<a></a>").attr('rel', pathMain).attr('title', 'Zoom').attr('href', 'javascript:void(0);').attr("id", "botaoZoom").attr("class", "");
            if (idZoom > 0) {
                href.attr('zoom', pathZoom);
            }
            else {
                href.attr('zoom', '');
            }
            var img = $('<img />').attr('title', e.skuData.name).attr('src', pathThumb);
            href.append(img);
            arrayLi[i].append(href);
        }
    }
    //fim do loop

    // preencho a ul com os li criados
    for (i = 0; i < arrayLi.length; i++) {
        $("ul.thumbs").append(arrayLi[i]);
    }

    //recalculo a imagem zoom e os clicks
    ImageControl1($("ul.thumbs a:first"), pi);
    clickThumbs1();
}

function imageVideoGalery() {
    /* Somente será renderizado thumbnail do vídeo se houver vídeo renderizado ocultado na página */
    if ($("#gtm-video-parabrisa").length > 0){
        
        var arrayLi = new Array();

        /* Busca o ID do vídeo e cria a URL para imágem do thumbnail */
        var idVideo = $("#gtm-video-parabrisa-player")[0].src.split('/')[4];
        var url = 'http://img.youtube.com/vi/' + idVideo + '/0.jpg';

        /* Monta o objeto <li> */
        var li = $("<li></li>");
        var href = $("<a></a>").attr('rel', url).attr('title', 'Zoom').attr('href', 'javascript:void(0);').attr("id", "botaoZoom").attr("class", "");
        href.attr('zoom', '');
        
        /* Monta objeto img */
        var img = $('<img />').attr('title', 'Video Da Categoria').attr('src', url);
        href.append(img);
        li.append(href);

        var lis = $("ul.thumbs")[0].children;
        for (let index = 0; index < lis.length; index++) {
            arrayLi.push(lis[index]);
        }   

        $('ul.thumbs').html("");

        for (let index = 0; index < arrayLi.length; index++) {
            if (index == 1){
                //arrayLi[index].append(li);
                $("ul.thumbs").append(li);
            }
            else {
                //arrayLi[index].append(listaLi[index]);
                $("ul.thumbs").append(arrayLi[index]);
            }
        }

        //$('ul.thumbs').html(arrayLi);
        
        // var liImg01 = $('ul.thumbs li:nth-child(0)');
        // var liImg02 = $('ul.thumbs li:nth-child(1)');
        // var liImg03 = $('ul.thumbs li:nth-child(2)');
        // var liImg04 = $('ul.thumbs li:nth-child(3)');

        // $('ul.thumbs').html("");
        // $('ul.thumbs').append(liImg01);
        // $('ul.thumbs').append(li);
        // $('ul.thumbs').append(liImg01);
        // $('ul.thumbs').append(liImg01);
        // $('ul.thumbs').append(liImg01);

        // preencho a ul com o li do video criado
        //$("ul.thumbs").append(li);
        //$("ul.thumbs").eq(1).after(li);
        //$("ul.thumbs li")[1].after(li);
        //$('ul.thumbs li:nth-child(1)').append(li);
    }
}

function clickThumbs1() {
    $("ul.thumbs a").unbind( "click" );
    $("ul.thumbs a").click(function () {
        ImageControl1(this, 0);
    });
}

function ImageControl1(a, pi) {
    $("ul.thumbs a").removeClass("ON");
    var ID = $(a).attr("id");
    var pos = $(a).offset();
    var holder = $("#produto").offset();
    var alt = $("[id=show] [id=include] [id=image][productIndex=" + pi + "] img").attr("alt"); //alt/title da imagem principal
    var image = $('<img />');

    /* Configurando loading */
    var loading = $('<div></div>').attr('class','loading').attr('id','loading-video').attr('style','z-index:90; left: 0px; position: absolute; top: 0px; height: 100%; width: 100%; align-items: center; display: none; justify-content: center;');
    loading.html('<b>Carregando vídeo...</b><img src=\"https://devautoglass.vteximg.com.br/arquivos/ajax-loader.gif\" alt=\"Carregando\" />');
    
    /* Configuração do video a ser exibido */

    /* Referência ao parágrafo onde o vídeo está incluído */
    var p = $("#gtm-video-parabrisa");

    /* Removendo o class par que não ocupe espaço na tela mesmo oculto */
    p.attr('class', '');

    // var p = $('<p></p>').attr('id','gtm-video-parabrisa').attr('class','responsive-video');
    // var video = $('<iframe></iframe>').attr('style', 'opacity: 0; width: 100%').attr('height', '480').attr('src','https://www.youtube.com/embed/EyXuvP3CKzY')
    // .attr('frameborder','0').attr('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture')
    // .attr('allowfullscreen','').attr('id','gtm-video-parabrisa-player');
    
    /* Remove o loading caso já tenha sido inserido */
    $("#container-video-categoria #loading-video").remove();

    /* Adicionando loading */
    p.append(loading);
    // p.append(video);

    $(a).addClass("ON");

    if (pos !== undefined && holder !== undefined) {
        $("div#setaThumbs").css({ 'left': (pos.left - holder.left + 30) + 'px' });
    }

    if ($("[id=show] [id=include] [id=image][productIndex=" + pi + "] p").length > 0) {
        $("[id=show] [id=include] [id=image][productIndex=" + pi + "] p").remove();
        
        /* Adicionando class para renderizar o vídeo corretamente */
        p.attr('class', '');
        
        /* Adicionando a tag P com vídeo de volta ao local de ocultação */
        $("#container-video-categoria").append(p);
        
        /* Ocultando tag do vídeo */
        //document.getElementById('gtm-video-parabrisa-player').style.display = 'none';
        $("#gtm-video-parabrisa").children("iframe").attr('style','display: none; width: 100%');
    }
    else{
        if ($("[id=show] [id=include] [id=image][productIndex=" + pi + "] a").length > 0) {
            $("[id=show] [id=include] [id=image][productIndex=" + pi + "] a").remove();
        }
        else if ($("[id=show] [id=include] [id=image][productIndex=" + pi + "] img").length > 0) {
            $("[id=show] [id=include] [id=image][productIndex=" + pi + "] img").remove();
        }
    }    

    // Se não for um vídeo
    if ($(a).attr("rel") != undefined && $(a).attr("rel").toString().indexOf('http://img.youtube.com/vi/', 0) == -1){

        //Preencho as opcoes da imagem principal
        if (pi == 0) {
            image.attr("id", "image-main").attr("src", $(a).attr("rel")).attr('productIndex', pi).attr('class', 'sku-rich-image-main');
        } else {
            image.attr("id", "image-main").attr("src", $(a).attr("rel")).attr('productIndex', pi);
        }

        // VERIFICO SE TEM ZOOM.
        if ($(a).attr("zoom") == "") {
            image.attr("alt", alt).attr("title", alt);
            $("[id=show] [id=include] [id=image][productIndex=" + pi + "]").append(image);
        }
        else {
            var href = $("<a></a>").addClass("image-zoom").attr("href", $(a).attr("zoom"));
            href.append(image);
            $("[id=show] [id=include] [id=image][productIndex=" + pi + "]").append(href);
            LoadZoom(pi);
        }
    }
    else {
        // Removendo o iframe do local escondido
        $("#container-video-categoria p").remove();
        
        /* Adicionando class para renderizar o vídeo corretamente */
        p.attr('class', 'responsive-video galeria-item-video');
        p.children("").html();

        // Injetando vídeo na página para ser viauzalidado na galeria de imagens
        $("[id=show] [id=include] [id=image][productIndex=" + pi + "]").append(p);
        
        $("#gtm-video-parabrisa").children("iframe").attr('style','display: flex; width: 100%');

        //$("gtm-video-parabrisa-player").attr('style','display: flex; width: 100%');

        // Bucando os elementos do iframe e loading
        const iframeEle = document.getElementById('gtm-video-parabrisa-player');
        const loadingEle = document.getElementById('loading-video');
        loadingEle.style.display = 'flex';

        iframeEle.addEventListener('load', function() {
            /* Remove o loading caso já tenha sido inserido */
            $("#gtm-video-parabrisa #loading-video").remove();
            // Exibindo iframe
            iframeEle.style.display = 'flex';
        });
    }
}

//ZOOM
function LoadZoom(pi) {
    if ($(".image-zoom").length > 0) {
        var optionsZoom = {
            //zoomType: "reverse",
            preloadText: "",
            title: false
        };
        $(".image-zoom").jqzoom(optionsZoom);
    }
}
