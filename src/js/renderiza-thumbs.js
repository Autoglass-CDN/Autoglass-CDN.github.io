document.addEventListener('DOMContentLoaded', () => {
  const sku = window?.skuJson?.skus?.[0];
  if (!sku) return;

  const midiaContainer  = document.getElementById('midia-container');
  const thumbsContainer = document.getElementById('thumbnails');
  if (!midiaContainer || !thumbsContainer) return;

  function renderPrincipal(html) {
    midiaContainer.innerHTML = html;
  }

  function criaThumb(src, alt, onClick) {
    const li    = document.createElement('li');
    const thumb = document.createElement('img');
    thumb.src   = src;
    thumb.alt   = alt;
    thumb.addEventListener('click', onClick);
    li.appendChild(thumb);
    thumbsContainer.appendChild(li);
  }

  if (sku.images?.length) {
    renderPrincipal(
      `<img class="imagem-principal" src="${sku.images[0].imageUrl}" alt="Imagem do Produto" />`
    );

    sku.images.forEach((img, idx) => {
      criaThumb(
        img.imageUrl,
        `Imagem ${idx + 1}`,
        () => renderPrincipal(
          `<img class="imagem-principal" src="${img.imageUrl}" alt="Imagem do Produto" />`
        )
      );
    });
  }

  if (sku.videos?.length) {
    sku.videos.forEach((url, vidIdx) => {
      const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w\-]+)/);
      if (ytMatch) {
        const ytId     = ytMatch[1];
        const thumbUrl = `https://img.youtube.com/vi/${ytId}/default.jpg`;
        criaThumb(
          thumbUrl,
          `Vídeo ${vidIdx + 1}`,
          () => renderPrincipal(`
            <iframe class="video-principal" width="100%" height="315"
              src="https://www.youtube.com/embed/${ytId}?autoplay=1"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen>
            </iframe>
          `)
        );
        return;
      }

      if (url.match(/\.gif(\?.*)?$/i)) {
        criaThumb(
          url,
          `GIF ${vidIdx + 1}`,
          () => renderPrincipal(
            `<img class="imagem-principal" src="${url}" alt="GIF do Produto" />`
          )
        );
        return;
      }

      if (url.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
        const thumbTemporal = `${url}#t=0.1`;
        criaThumb(
          thumbTemporal,
          `Vídeo ${vidIdx + 1}`,
          () => renderPrincipal(`
            <video class="video-principal" width="100%" controls autoplay>
              <source src="${url}" type="video/${RegExp.$1}">
              Seu navegador não suporta o elemento <code>video</code>.
            </video>
          `)
        );
        return;
      }

      criaThumb(
        '/arquivos/play-icon.svg',
        `Vídeo ${vidIdx + 1}`,
        () => window.open(url, '_blank')
      );
    });
  }
});