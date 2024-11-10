function crearTarjeta(producto) {
    const isFavorite = favoritos.some(fav => fav.id === producto.id);
    const addedClass = isFavorite ? 'active' : '';
    return `
        <div class="d-flex justify-content-center">
            <div class="card">
                <div class="card-img-container">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="badge-container">
                        <i class="bi bi-luggage-fill"></i> 
                        <span>Paquete</span>
                    </div>
                </div>
                <div class="card-body">
                    <h4 class="card-title fs-5">${producto.nombre}</h4>
                    <p class="card-text fs-6 fw-medium">${producto.duracion}</p>
                    <p class="card-text fs-6 my-0">Alojamiento: ${producto.alojamiento}</p>
                    <hr class="card-separator"> <!-- Línea separatoria -->
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="info-container">
                            <p class="card-text fs-5 mb-1 precio">${producto.precio}</p>
                            <a href="#" onclick="irViaje(${producto.id})" class="text-decoration-none fs-6 mx-2 my-2">Ver más...</a>
                        </div>
                        <div class="contenedor-boton-tarjeta">
                            <button class="favorite" onclick="toggleFavorito(${producto.id})">
                                <i class="fa-regular fa-heart ${addedClass}" id="favorito-regular"></i>
                                <i class="fa-solid fa-heart ${addedClass}" id="agregado-favorito"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

const secciones = {
    "Ofertas": document.getElementById('div-ofertas'),
    "Playas": document.getElementById('div-playa'),
    "Grandes Ciudades": document.getElementById('div-ciudades'),
    "Bosques y Montañas": document.getElementById('div-bosques'),
};

function llenarSeccionesTarjetas() {
    
    Object.values(secciones).forEach(div => {
        div.innerHTML = '';
    });
    arrayProductos.forEach(producto => {
        const tarjeta = crearTarjeta(producto);
        if (producto.oferta) {
            secciones["Ofertas"].innerHTML += tarjeta;
        } else {
            const seccion = secciones[producto.categoria];
            if (seccion) {
                seccion.innerHTML += tarjeta;
            }
        }
    });
    actualizarContadorFavoritos();
}
llenarSeccionesTarjetas()


function irViaje(id){
    location.href=`./pages/detalles.html?id=${id}`
}

window.addEventListener('storage', (event) => {
    if (event.key === 'productos') {
        console.log('Storage event detected:', event);
        traerFavoritosDeLocalStorage();
        llenarSeccionesTarjetas();
    }
});

