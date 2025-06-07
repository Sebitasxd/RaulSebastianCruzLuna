document.addEventListener("DOMContentLoaded", function () {
  let filtrando = false;

  // -------------------- Modal de resultados de búsqueda --------------------
  const modalElement = document.getElementById('modalResultados');
  const bootstrapModal = new bootstrap.Modal(modalElement);

  // -------------------- Carruseles --------------------
  function crearCarrusel(idContenedor) {
    const contenidoScroll = document.getElementById(idContenedor);
    const scrollIzquierda = document.getElementById(idContenedor.replace('contenido-scroll', 'scroll-izquierda-horizontal'));
    const scrollDerecha = document.getElementById(idContenedor.replace('contenido-scroll', 'scroll-derecha-horizontal'));

    if (scrollIzquierda) scrollIzquierda.addEventListener('click', () => contenidoScroll.scrollLeft -= 300);
    if (scrollDerecha) scrollDerecha.addEventListener('click', () => contenidoScroll.scrollLeft += 300);
  }

  crearCarrusel('contenido-scroll');
  crearCarrusel('contenido-scroll-2');
  crearCarrusel('contenido-scroll-3');
  crearCarrusel('contenido-scroll-4');

  // Scroll automático para carruseles
  setInterval(() => {
    if (!filtrando) {
      document.querySelectorAll('[id^="contenido-scroll"]').forEach(c => {
        c.scrollLeft += 0.5;
        if (c.scrollLeft >= c.scrollWidth - c.offsetWidth) c.scrollLeft = 0;
      });
    }
  }, 33);

  // -------------------- Buscador --------------------
  const formularioBuscar = document.getElementById('buscador');
  const inputBuscar = formularioBuscar.querySelector('input');

  inputBuscar.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      formularioBuscar.querySelector('button').click();
    }
  });

  const contenedorTarjetas = document.querySelector('.container1.tarjetas,.group-tarjetas1');
  const mensajeNoEncontrado = document.createElement('p');
  mensajeNoEncontrado.textContent = "No se encontraron productos.";
  mensajeNoEncontrado.style.display = 'none';
  mensajeNoEncontrado.style.textAlign = 'center';
  mensajeNoEncontrado.style.fontWeight = 'bold';
  mensajeNoEncontrado.style.marginTop = '20px';

  contenedorTarjetas?.parentNode?.insertBefore(mensajeNoEncontrado, contenedorTarjetas.nextSibling);

  const contenedorResultados = document.getElementById('contenedorResultados');

  formularioBuscar.querySelector('button').addEventListener('click', (e) => {
    e.preventDefault();
    const textoBuscar = inputBuscar.value.trim().toLowerCase();
    filtrando = true;
    filtrarProductos(textoBuscar);
    inputBuscar.value = '';
    setTimeout(() => { filtrando = false; }, 1000);
  });

  const inputFilter = document.getElementById('inputFilter');
  inputFilter.addEventListener('input', () => {
    const filtro = inputFilter.value.trim().toLowerCase();
    filtrarProductos(filtro);
  });

  // -------------------- Función para filtrar productos --------------------
  function filtrarProductos(texto) {
    contenedorResultados.innerHTML = '';

    fetch('productos.json')
      .then(response => response.json())
      .then(data => {
        const productosFiltrados = data.filter(producto =>
          producto.nombre.toLowerCase().includes(texto)
        );

        if (productosFiltrados.length === 0) {
          contenedorResultados.innerHTML = `
            <p class="text-center fw-bold mt-3">No se encontraron productos.</p>
          `;
        } else {
          productosFiltrados.forEach(producto => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('product-card', 'buscable-product');
            tarjeta.innerHTML = `
              <div class="img-container">
                <img src="${producto.imagen}" alt="producto" class="imagen">
                <img src="${producto.imagenSecundaria}" alt="producto" class="imagen-cambio">
              </div>
              <div class="info">
                <h2>${producto.nombre}</h2>
                <p class="price">${producto.precio}</p>
                <button class="button-1">Comprar</button>
              </div>
            `;
            contenedorResultados.appendChild(tarjeta);
          });
        }

        bootstrapModal.show();
      })
      .catch(error => {
        console.error("Error al cargar el JSON:", error);
        contenedorResultados.innerHTML = `
          <p class="text-danger">No se pudieron cargar los productos.</p>
        `;
      });
  }
});