document.addEventListener("DOMContentLoaded", async () => {
  const refId = extrairRefIdDoNome(skuJson?.name);
  const skuId = skuJson?.skus?.[0]?.sku;
  if (!refId || !skuId) return console.warn("RefId ou SKU ID ausente.");

  const [imagens, videos] = await Promise.all([
    buscarImagensDoSku(skuId),
    buscarVideosDoSku(refId)
  ]);

  renderGaleria([...imagens, ...videos]);
});

function extrairRefIdDoNome(skuName) {
  if (!skuName) return null;
  const ult = skuName.split("-").pop().trim();
  return /^\d+$/.test(ult) ? ult : null;
}

async function buscarImagensDoSku(skuId) {
  const endpoint = `http://localhost:5010/integracao-b2c/api/int-app/sincronismos/sku/imagens/${skuId}`;
  try {
    const data = await (await fetch(endpoint)).json();
    return Array.isArray(data)
      ? data.map(img => img.Url
          ?? (img.FileLocation
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
  const endpoint = `http://localhost:5010/integracao-b2c/api/int-app/sincronismos/sku/${refId}`;
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

    li.addEventListener("click", () => {
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

  main.innerHTML = isVideo
    ? (url.includes("youtube")
        ? `<iframe src="${url.replace("watch?v=","embed/")}" frameborder="0" allowfullscreen></iframe>`
        : `<video src="${url}" controls autoplay></video>`)
    : `<div class="zoom-wrapper" data-zoom-image="${url}" style="background-image:url('${url}')"></div>`;

  if (!isVideo) inicializarZoom(main.querySelector(".zoom-wrapper"));
}

function inicializarZoom(wrapper) {
  if (!wrapper) return;

  const zoomFactor = 1.5;

  wrapper.style.backgroundSize = "100%";
  wrapper.style.backgroundPosition = "center";

  wrapper.addEventListener("mouseenter", () => {
    wrapper.style.backgroundSize = `${zoomFactor * 100}%`;
  });

  wrapper.addEventListener("mousemove", (e) => {
    const r = wrapper.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    wrapper.style.backgroundPosition = `${x}% ${y}%`;
  });

  wrapper.addEventListener("mouseleave", () => {
    wrapper.style.backgroundSize = "100%";
    wrapper.style.backgroundPosition = "center";
  });
}