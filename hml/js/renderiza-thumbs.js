$(function () {
  renderPrimeiraImagem();
  configurarListenersSku();
});

function renderPrimeiraImagem() {
  const primeiraThumb = $("ul.thumbs a:first");
  if (primeiraThumb.length > 0) {
      atualizarImagemPrincipal(primeiraThumb, 0);
  }
  configurarClickThumbs();
}

function configurarClickThumbs() {
  $("ul.thumbs a").off("click").on("click", function () {
      atualizarImagemPrincipal(this, 0);
  });
}

function configurarListenersSku() {
  const listener = new Vtex.JSEvents.Listener('imageControlListener', onSkuDataReceived);
  skuEventDispatcher.addListener(skuDataReceivedEventName, listener);

  const specListener = new Vtex.JSEvents.Listener('imageControlSpecSelectedListener', onSpecSelected);
  skuEventDispatcher.addListener(skuImageRelatedSpecSelectedEventName, specListener);
}

function onSpecSelected(e) {
  const skuData = getSkuData(e.newSkuId);
  const args = new Vtex.Commerce.JSEvents.SkuDataReceivedEventArgs();
  args.skuData = skuData;
  onSkuDataReceived(args);
}

function onSkuDataReceived(e) {
  const images = e.skuData.images || [];
  const skuName = e.skuData.name;
  const pi = e.productIndex || 0;

  $("ul.thumbs").empty();

  images.forEach((imageGroup, i) => {
      let thumb = null, main = null, zoom = null;

      imageGroup.forEach(img => {
          if (img.ArchiveTypeId === 2) main = img;
          if (img.ArchiveTypeId === 3) thumb = img;
          if (img.ArchiveTypeId === 10) zoom = img;
      });

      if (main && thumb) {
          const $li = $("<li>");
          const $a = $("<a>", {
              rel: main.Path,
              href: 'javascript:void(0);',
              title: 'Zoom',
              zoom: zoom ? zoom.Path : '',
              id: 'botaoZoom',
              class: ''
          });

          const $img = $('<img>', {
              src: thumb.Path,
              title: skuName
          });

          $a.append($img);
          $li.append($a);
          $("ul.thumbs").append($li);
      }
  });

  renderPrimeiraImagem();
}

function atualizarImagemPrincipal(a, pi) {
  const $thumb = $(a);
  $("ul.thumbs a").removeClass("ON");
  $thumb.addClass("ON");

  const pos = $thumb.offset();
  const holder = $("#produto").offset();
  if (pos && holder) {
      $("div#setaThumbs").css({ 'left': (pos.left - holder.left + 30) + 'px' });
  }

  const $container = $("[id=show] [id=include] [id=image][productIndex=" + pi + "]");
  const alt = $container.find("img").attr("alt") || "";

  // Substitui conteúdo mantendo o mesmo <img> (suporte a GIF)
  const newSrc = $thumb.attr("rel");
  const zoomHref = $thumb.attr("zoom");
  const existing = $container.find("#image-main");

  if (existing.length > 0) {
      existing.attr("src", newSrc);
  } else {
      const $img = $('<img>', {
          id: "image-main",
          src: newSrc,
          alt: alt,
          title: alt,
          class: 'sku-rich-image-main',
          productIndex: pi
      });

      if (zoomHref) {
          const $zoomLink = $('<a>', {
              class: "image-zoom",
              href: zoomHref
          }).append($img);
          $container.html($zoomLink);
          carregarZoom();
      } else {
          $container.html($img);
      }
  }
}

function carregarZoom() {
  if ($(".image-zoom").length > 0) {
      $(".image-zoom").jqzoom({
          preloadText: "",
          title: false
      });
  }
}
