
const categorias = ["Playas", "Bosques y Montañas", "Grandes Ciudades"];
const duraciones = ["7 noches", "10 noches"];
const listaCategorias = document.querySelector("#categoria");
const listaDuracionDelViaje = document.getElementById("duracion");

//funcion para cargar previamente en local storage productos
cargarProductosEnLocalStorage();

function cargarProductosEnLocalStorage() {
    if (!localStorage.getItem("productos")) {
        localStorage.setItem("productos", JSON.stringify(paquetes));
    };
};

let altaProductoValido = true;
let myModal, myModalUpdate;

function inicializarModal() {
    const elementoModal = document.querySelector("#modalAdd");
    const elementoModalActualizar = document.querySelector("#modalUpdate");
    if (elementoModal) {
        myModal = new bootstrap.Modal(elementoModal);
    }
    if (elementoModalActualizar) {
        myModalUpdate = new bootstrap.Modal(elementoModalActualizar);
    }
    cargarOpciones();
};

inicializarModal();

let idProducto = null;

//variables para paginacion
let limite = 5;
let desde = 0;
// let paginas = arrayProductos.length / limite
let paginas = Math.ceil(arrayProductos.length / limite);
let paginaActiva = 1;
let arregloPaginas = arrayProductos.slice(desde, limite);

//Abrir modal para agregar productos
function showModal() {
myModal.show();
}

// cargar tabla con productos predefinidos
const cargarProductos = () => {
    let cuerpoTabla = document.querySelector("#cuerpo-tabla");
    cuerpoTabla.innerHTML = "";
    arregloPaginas.map((producto) => {
        const filas = document.createElement("tr");
        filas.setAttribute("key", producto.id);
        const celdas = `<td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>${producto.stock}</td>
            <td class="d-flex flex-column flex-md-row align-items-center justify-content-end">
                <button class="btn btn-primary btn-sm my-2 my-md-0 me-md-2 " data-bs-toggle="modal" data-bs-target="#modalUpdate" onclick = "cargarFormulario(${producto.id})">
                <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button class="btn btn-danger btn-sm my-2 my-md-0" onclick="borrarRegistro(${producto.id})">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
                </button>
            </td>`;
        filas.innerHTML = celdas;
        cuerpoTabla.append(filas);
    });
    cargarItemPaginacion();
};

const cargarItemPaginacion = () => {
    document.querySelector("#items").innerHTML = "";
    for (let i = 0; i < paginas; i++) {
        const item = document.createElement("li");
        item.classList = `page-item ${paginaActiva == i + 1 ? "active" : ""}`;
        const enlace = `<button class="page-link bg-info" onclick ="pasarPagina(${i})">${
        i + 1
        }</button>`;
        item.innerHTML = enlace;
        document.querySelector("#items").append(item);
    }
};

const modificarArregloProducto = () => {
    arregloPaginas = arrayProductos.slice(desde, desde + limite);
    cargarProductos();
};

const pasarPagina = (pagina) => {
    paginaActiva = pagina + 1;
    desde = limite * pagina;
    if (desde <= arrayProductos.length) {
        modificarArregloProducto();
    };
};

const paginaSiguiente = () => {
    if (paginaActiva < paginas) {
        // desde += 5
        desde += limite;
        paginaActiva++;
        modificarArregloProducto();
    };
};

const paginaPrevia = () => {
    if (desde > 0) {
        paginaActiva--;
        // desde-=5
        desde -= limite;
        modificarArregloProducto();
    };
};

const actualizarPaginacion = () => {
    paginas = Math.ceil(arrayProductos.length / limite);
    cargarItemPaginacion();
};

cargarProductos();


let nombre = document.querySelector("#nombre");
let descripcion = document.querySelector("#descripcion");
let fechaDeSalida = document.querySelector("#fecha_de_salida");
let fechaDeRegreso = document.querySelector("#fecha_de_regreso");
let alojamiento = document.querySelector("#alojamiento");
let imagen = document.querySelector("#imagen");
let oferta = document.querySelector("#oferta");
let precio = document.querySelector("#precio");
let stock = document.querySelector("#stock");


//funcion cargar opciones

function cargarOpciones() {

    const selectCategoriaEditar = document.querySelector("#editCategoria");
    const selectDuracionEditar = document.querySelector("#editDuracion");


    listaCategorias.innerHTML = "";
    listaDuracionDelViaje.innerHTML = "";
    selectCategoriaEditar.innerHTML = "";
    selectDuracionEditar.innerHTML = "";


    categorias.forEach((item) => {
        const option = document.createElement("option");
        option.innerText = item;
        const optionEdit = document.createElement("option");
        optionEdit.innerText = item;
        listaCategorias.add(option);
        selectCategoriaEditar.add(optionEdit);
    });

    duraciones.forEach((item) => {
        const option = document.createElement("option");
        option.innerText = item;
        const optionEdit = document.createElement("option");
        optionEdit.innerText = item;
        listaDuracionDelViaje.add(option);
        selectDuracionEditar.add(optionEdit);
    });
};


//agregar producto

const agregarProducto = (event) => {
    event.preventDefault();
    if (
        nombre.value.length > 0 &&
        descripcion.value.length > 0 &&
        fechaDeSalida.value &&
        fechaDeRegreso.value &&
        alojamiento.value.length > 0 &&
        imagen.value.length > 0 &&
        precio.value.length > 0 &&
        stock.value > 0
    ) {
        altaProductoValido = true;
    } else {
        altaProductoValido = false;
    };

    if (altaProductoValido) {
        let nuevoProducto = new PaqueteTurismo(
        nombre.value,
        listaCategorias.value,
        descripcion.value,
        listaDuracionDelViaje.value,
        fechaDeSalida.value,
        fechaDeRegreso.value,
        alojamiento.value,
        imagen.value,
        oferta.checked,
        precio.value,
        stock.value
        );
        arrayProductos.push(nuevoProducto);
        localStorage.setItem("productos", JSON.stringify(arrayProductos));
        // paginaActiva = Math.min(paginaActiva, Math.ceil(arrayProductos.length / limite));
        paginas = Math.ceil(arrayProductos.length / limite);
        paginaActiva = paginas;
        // cargarProductos()
        cargarProductos();
        document.querySelector("#formulario-producto").reset();
        myModal.hide();
    } else {
        alert("Por favor, complete todos los campos obligatorios que están con *.");
    };
};


if (document.querySelector("#formulario-producto")) {
    document
        .querySelector("#formulario-producto")
        .addEventListener("submit", agregarProducto);
}

//cargar formulario con datos
const cargarFormulario = (id) => {
    idProducto = arrayProductos.findIndex((item) => item.id === id);
    console.log(arrayProductos[idProducto]);
    let formulario = document.querySelector("#formulario-actualizado");
    console.log(formulario);
    Array.from(formulario.elements).forEach((campo) => {
        if (campo.type === "checkbox") {
        campo.checked = arrayProductos[idProducto][campo.id];
        } else if (campo.id === "editCategoria") {
        campo.value = arrayProductos[idProducto].categoria;
        } else if (campo.id === "editDuracion") {
        campo.value = arrayProductos[idProducto].duracion;
        } else {
        campo.value = arrayProductos[idProducto][campo.id];
        };
    });
};

//actualizar paquete turistico

const actualizarPaquete = (event) => {
    event.preventDefault();
    let formulario = document.querySelector("#formulario-actualizado");
    Array.from(formulario.elements).forEach((campo) => {
        //vacuna
        if (campo.type === "checkbox") {
        arrayProductos[idProducto][campo.id] = campo.checked;
        } else {
        arrayProductos[idProducto][campo.id] = campo.value;
        }
    });
    localStorage.setItem("productos", JSON.stringify(arrayProductos));
    cargarProductos();
    myModalUpdate.hide();
    formulario.reset();
};

//eliminar paquete turistico

const borrarRegistro = (id) => {
    let index = arrayProductos.findIndex((item) => item.id === id);

    if (index >= 0) {
        let validar = confirm(
        `Está seguro que quiere eliminar el paquete turístico  ${arrayProductos[index].nombre}`
        );
        if (validar) {
        arrayProductos.splice(index, 1);
        localStorage.setItem("productos", JSON.stringify(arrayProductos));
        paginas = Math.ceil(arrayProductos.length / limite);
        paginaActiva = Math.min(
            paginaActiva,
            Math.ceil(arrayProductos.length / limite)
        );
        modificarArregloProducto();
        };
    };
};
