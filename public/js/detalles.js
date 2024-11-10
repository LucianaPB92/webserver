
const contenedorComentarios = document.getElementById("contenedorComentarios");
function crearComentarioEstructura(nombre, comentario) {
  // Crea la estructura del comentario
  const comentarioDiv = document.createElement("div");
  comentarioDiv.classList.add("media", "mt-3");

  const mediaBodyDiv = document.createElement("div");
  mediaBodyDiv.classList.add("media-body");

  const nombreH5 = document.createElement("h5");
  nombreH5.classList.add("mt-0");
  nombreH5.textContent = nombre;

  const comentarioP = document.createElement("p");
  comentarioP.textContent = comentario;

  mediaBodyDiv.append(nombreH5, comentarioP);
  comentarioDiv.append(mediaBodyDiv);

  const SEPARADOR = document.createElement('hr')
  SEPARADOR.classList.add('card-separator')
  comentarioDiv.appendChild(SEPARADOR)

  return comentarioDiv;
}

function agregarComentario() {
  const nombre = document.getElementById("nombreUsuario").value.trim();
  
  const comentario = document.getElementById("comentarioUsuario").value.trim();

  if(!nombre || !comentario){
    
      alert("Por favor, complete ambos campos antes de enviar el comentario.");
      return; // Detener la ejecución si los campos están vacíos
    
  }
  
  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

  // Crea un nuevo comentario
  const nuevoComentario = {
    nombre: nombre,
    comentario: comentario,
  };
  comentarios.push(nuevoComentario);

  localStorage.setItem("comentarios", JSON.stringify(comentarios));

  //Creamos y agregamos al dom la estructura del comentario
  const comentarioDiv = crearComentarioEstructura(nombre, comentario);
  contenedorComentarios.appendChild(comentarioDiv);
}

// Función para cargar los comentarios desde el localStorage cuando cargue el DOM
function cargarComentarios() {
  const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

  comentarios.forEach((comentario) => {
    const comentarioDiv = crearComentarioEstructura(
      comentario.nombre,
      comentario.comentario
    );
    contenedorComentarios.appendChild(comentarioDiv);
  });
}

document.addEventListener("DOMContentLoaded", cargarComentarios);

document.addEventListener("DOMContentLoaded", () => {
  const url = new URL(location.href);
  const idviaje = url.searchParams.get("id");

  const arrayProductos = JSON.parse(localStorage.getItem("productos")) || [];
  const viaje = arrayProductos.find((item) => item.id == idviaje);

  if (viaje) {
    updateProduct(viaje);
  } else {
    console.error("Producto no encontrado");
  }
  const categoria = viaje.categoria;
  console.log(categoria); 
  
const productoRelacionado = arrayProductos.filter(
  (producto) => producto.categoria === categoria && producto.id !== idviaje
);
console.log(productoRelacionado)

const contenedor = document.getElementById("div-relacionados");
productoRelacionado.forEach((producto) => {
  const card = document.createElement("div");
  card.classList.add("card"); // Clase necesaria para Swiper

  card.innerHTML = `
    
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
        <hr class="card-separator">
        <div class="d-flex justify-content-between align-items-center">
          <div class="info-container">
            <p class="card-text fs-5 mb-1 precio">${producto.precio}</p>
            <a href="#" onclick="irViaje(${producto.id})" class="text-decoration-none fs-6">Ver más...</a>
          </div>                       
        </div>
      </div>
    
  `;
  contenedor.append(card);


if (viaje) {
  updateProduct(viaje);
} else {
  console.error("Producto no encontrado");
}
});
});

    

function updateProduct(viaje) {
  document.getElementById("nombre").innerText = viaje.nombre;
  document.getElementById("categoria").innerText = viaje.categoria;
  document.getElementById("precio").innerText = viaje.precio;
  document.getElementById("descripcion").innerText = viaje.descripcion;

  let lista = `<ul>
        <li>Fecha de salida: ${viaje.fecha_de_salida}</li>
        <li>Fecha de regreso: ${viaje.fecha_de_regreso}</li>
        <li>Alojamiento: ${viaje.alojamiento}</li>
    </ul>`;

  const CONT_LIST = document.getElementById("contlist");
  CONT_LIST.innerHTML = lista;
  // CONT_LIST.append(lista)

  //Cambiar imagen
  const DINAMIC_IMG = document.querySelector("#productImageDisplay");
  DINAMIC_IMG.src = viaje.imagen;
}
document.addEventListener("DOMContentLoaded", () => {
  const btnContactoAsesor = document.getElementById("contacto-asesor");

  btnContactoAsesor.addEventListener("click", () => {
    const numeroTelefono = "543816817725";
    const mensaje = encodeURIComponent(
      "Hola, estoy interesado en obtener más información sobre el viaje"
    );
    const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${mensaje}`;

    window.open(urlWhatsApp, "_blank");
  });
});
function scrollCarousel(containerId, direction) {
    const container = document.getElementById(containerId);
    const slideWidth = container.querySelector('.swiper-slide').offsetWidth;
    container.scrollBy({
      left: direction * slideWidth, // Desplazar en la dirección adecuada
      behavior: 'smooth', // Desplazamiento suave
    });
  }
  function irViaje(id){
    location.href=`../pages/detalles.html?id=${id}`
}
  