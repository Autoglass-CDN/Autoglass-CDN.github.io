/* Teste para galeria de imagens com vídeo */

$(document).ready(function () {
    ImageControl1($("ul.thumbs a:first"), 0);
    
    clickThumbs1();
    
    var imageControlListener = new Vtex.JSEvents.Listener('imageControlListener', imageControl_OnSkuDataReceived1);
    skuEventDispatcher.addListener(skuDataReceivedEventName, imageControlListener);

    var imageControlSpecSelectedListener = new Vtex.JSEvents.Listener('imageControlSpecSelectedListener', imageControl_OnSkuImageRelatedSpecSelected1);
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

function clickThumbs1() {
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

    $(a).addClass("ON");
    if (pos !== undefined && holder !== undefined) {
        $("div#setaThumbs").css({ 'left': (pos.left - holder.left + 30) + 'px' });
    }
    if ($("[id=show] [id=include] [id=image][productIndex=" + pi + "] a").length > 0) {
        $("[id=show] [id=include] [id=image][productIndex=" + pi + "] a").remove();
    }
    else {
        $("[id=show] [id=include] [id=image][productIndex=" + pi + "] img").remove();
    }

    //Preencho as opcoes da imagem principal
    if (pi == 0) {
        image.attr("id", "image-main").attr("src", $(a).attr("rel")).attr('productIndex', pi).attr('class', 'sku-rich-image-main');
    } else {
        image.attr("id", "image-main").attr("src", $(a).attr("rel")).attr('productIndex', pi);
    }

    // VERIFICO SE TEM ZOOM.
    if ($(a).attr("zoom") == "") {
        image.attr("alt", alt).attr("title", alt)
        $("[id=show] [id=include] [id=image][productIndex=" + pi + "]").append(image);
    }
    else {
        var href = $("<a></a>").addClass("image-zoom").attr("href", $(a).attr("zoom"));
        href.append(image);
        $("[id=show] [id=include] [id=image][productIndex=" + pi + "]").append(href);
        LoadZoom(pi);
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
