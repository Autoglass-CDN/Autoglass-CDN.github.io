document.addEventListener("DOMContentLoaded", async () => {
  const refId = extrairRefIdDoNome(skuJson?.name);
  const skuId = skuJson?.skus?.[0]?.sku;
  if (!refId || !skuId) {
    console.warn("RefId ou SKU ID ausente.");
    return;
  }

  const [imagens, videos] = await Promise.all([
    buscarImagensDoSku(skuId),
    buscarVideosDoSku(refId)
  ]);
  renderGaleria([...imagens, ...videos]);

  const modal = document.getElementById("modalZoom");
  document.querySelector(".close-zoom").addEventListener("click", () => modal.style.display = "none");
  modal.addEventListener("click", e => { if (e.target.id === "modalZoom") modal.style.display = "none"; });
});

const urlApi = window.location.href.includes("hml") || window.location.href.includes("dev")
    ? "https://api.autoglass.com.br"
    : "https://api.autoglass.com.br";

function extrairRefIdDoNome(nome) {
  if (!nome) return null;
  const ult = nome.split("-").pop().trim();
  return /^\d+$/.test(ult) ? ult : null;
}

async function buscarImagensDoSku(skuId) {
  const endpoint = `${urlApi}/integracao-b2c/api/web-app/sincronismo/sku/imagens/${skuId}`;
  try {
    const data = await (await fetch(endpoint)).json();
    return Array.isArray(data)
      ? data.map(img =>
          img.Url ??
          (img.FileLocation
            ? `https://autoglass.vteximg.com.br/${img.FileLocation.replace(/^.*?arquivos/, "arquivos")}`
            : null)
        ).filter(Boolean)
      : [];
  } catch (e) {
    console.error("Erro ao buscar imagens:", e);
    return [];
  }
}

async function buscarVideosDoSku(refId) {
  const endpoint = `${urlApi}/integracao-b2c/api/web-app/sincronismo/sku/${refId}`;
  try {
    const data = await (await fetch(endpoint)).json();
    return data.videoList || data.Videos || [];
  } catch (e) {
    console.error("Erro ao buscar vídeos:", e);
    return [];
  }
}

function renderGaleria(midias) {
  const thumbs = document.getElementById("thumbsContainer");
  const main   = document.getElementById("mainMediaContainer");
  if (!thumbs || !main) return;

  thumbs.innerHTML = main.innerHTML = "";

  midias.forEach((url, i) => {
    const isVideo = /youtube|\.mp4$|\.webm$/i.test(url);
    const li = document.createElement("li");
    li.className = "thumb-item";
    li.innerHTML = isVideo
      ? `<div class="thumb-video"><video src="${url}" muted playsinline preload="metadata"></video></div>`
      : `<img src="${url}" alt="Miniatura ${i + 1}" loading="lazy">`;

    const evento = window.matchMedia("(min-width: 768px)").matches ? "mouseenter" : "click";
    li.addEventListener(evento, () => {
      document.querySelectorAll(".thumb-item").forEach(el => el.classList.remove("active"));
      li.classList.add("active");
      exibirMidia(url);
    });

    thumbs.appendChild(li);
    if (i === 0) { li.classList.add("active"); exibirMidia(url); }
  });
}

function exibirMidia(url) {
  const main = document.getElementById("mainMediaContainer");
  const isVideo = /youtube|\.mp4$|\.webm$/i.test(url);
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

  if (isVideo) {
    main.innerHTML = url.includes("youtube")
      ? `<iframe src="${url.replace("watch?v=", "embed/")}" frameborder="0" allowfullscreen></iframe>`
      : `<video src="${url}" controls autoplay></video>`;
    return;
  }

  if (isDesktop) {
    main.innerHTML = `<div class="zoom-wrapper" data-zoom-image="${url}" style="background-image:url('${url}')"></div>`;
    const wrapper = main.querySelector(".zoom-wrapper");
    inicializarZoom(wrapper);

    wrapper.addEventListener("click", () => {
      const modal = document.getElementById("modalZoom");
      const zoomedImg = document.getElementById("zoomedImage");
      zoomedImg.src = url;
      modal.style.display = "block";
      inicializarZoomModal(zoomedImg);
    });
  } else {
    main.innerHTML = `
      <img
        id="mobileZoomTrigger"
        src="${url}"
        alt="Imagem Principal"
        width="350" height="350"
        style="max-width:100%; height:auto; aspect-ratio:1/1;"
        decoding="async" fetchpriority="high"
      />
    `;

    const trigger = document.getElementById("mobileZoomTrigger");
    if (trigger) {
      trigger.addEventListener("click", () => {
        const modal = document.getElementById("modalZoom");
        const zoomedImg = document.getElementById("zoomedImage");
        zoomedImg.setAttribute("width", "350");
        zoomedImg.setAttribute("height", "350");
        zoomedImg.style.maxWidth = "100%";
        zoomedImg.style.height = "auto";
        zoomedImg.style.aspectRatio = "1 / 1";

        zoomedImg.src = url;
        modal.style.display = "block";
        inicializarZoomModal(zoomedImg);
      });
    }
  }
}

function inicializarZoom(wrapper) {
  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  if (!wrapper || !isDesktop) return;

  const zoomFactor = 1.5;
  wrapper.style.backgroundSize = "100%";
  wrapper.style.backgroundPosition = "center";

  wrapper.addEventListener("mouseenter", () => {
    wrapper.style.backgroundSize = `${zoomFactor * 100}%`;
  });

  wrapper.addEventListener("mousemove", e => {
    const r = wrapper.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width)  * 100;
    const y = ((e.clientY - r.top ) / r.height) * 100;
    wrapper.style.backgroundPosition = `${x}% ${y}%`;
  });

  wrapper.addEventListener("mouseleave", () => {
    wrapper.style.backgroundSize = "100%";
    wrapper.style.backgroundPosition = "center";
  });

  wrapper.addEventListener("click", () => {
    const modal   = document.getElementById("modalZoom");
    const imgZoom = document.getElementById("zoomedImage");
    imgZoom.src   = wrapper.dataset.zoomImage;
    modal.style.display = "block";
  });
}

function inicializarZoomModal(img) {
  const zoomFactor = 1.5;
  let isZoomed = false;

  img.addEventListener("mouseenter", () => {
    img.classList.add("zoomed");
    isZoomed = true;
  });

  img.addEventListener("mousemove", e => {
    if (!isZoomed) return;
    const r = img.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
  });

  img.addEventListener("mouseleave", () => {
    img.classList.remove("zoomed");
    img.style.transformOrigin = "center center";
    isZoomed = false;
  });
}