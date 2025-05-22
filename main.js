// Simulación de carrito y usuarios para demostración
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let historial = JSON.parse(localStorage.getItem('historial')) || [];

function agregarAlCarrito(producto) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${producto.nombre} añadido al carrito`);
}


function irAMenu() {
  window.location.href = "menu.html";
}

function irALogin(pagina){
  window.location.href = "login.html"
}

function irARegistro(pagina){
  window.location.href = "registro.html"
}

function volverAlInicio() {
  window.location.href = "index.html";
}

function irAProductos(pagina) {
  window.location.href = "productos.html";
}

function irACarrito(pagina) {
  window.location.href = "carrito.html";
}

function irAHistorial(pagina) {
  window.location.href = "historial.html";
}

function vaciarCarrito() {
  carrito = [];
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function guardarCompra(datosPago = {}) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito.length === 0) return;

  const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
  const fecha = new Date().toISOString();

  const historial = JSON.parse(localStorage.getItem("historial")) || [];
  historial.push({
    fecha,
    total,
    productos: carrito,
    metodo: datosPago.tipo || "N/A",
    titular: datosPago.titular || "Desconocido",
    expiracion: datosPago.expiracion || "-"
  });

  localStorage.setItem("historial", JSON.stringify(historial));
  localStorage.removeItem("carrito");
}

function mostrarFormulario() {
  document.getElementById("formulario-producto").classList.remove("oculto");
}

function cerrarFormulario() {
  document.getElementById("formulario-producto").classList.add("oculto");
}

function agregarNuevoProducto() {
  const nombre = document.getElementById("nuevo-nombre").value.trim();
  const precio = parseFloat(document.getElementById("nuevo-precio").value);
  const imagen = document.getElementById("nueva-imagen").value.trim();

  if (!nombre || isNaN(precio) || precio <= 0) {
    alert("Ingrese nombre y precio válido.");
    return;
  }

  const nuevoProducto = { nombre, precio, imagen };

  const productosGuardados = JSON.parse(localStorage.getItem("productos")) || obtenerProductosIniciales();
  productosGuardados.push(nuevoProducto);
  localStorage.setItem("productos", JSON.stringify(productosGuardados));

  agregarTarjeta(nuevoProducto, productosGuardados.length - 1);
  cerrarFormulario();

  document.getElementById("nuevo-nombre").value = '';
  document.getElementById("nuevo-precio").value = '';
  document.getElementById("nueva-imagen").value = '';
}


// Lógica reutilizable
function agregarTarjeta(producto, index = null) {
  const card = document.createElement("div");
  card.className = "producto-card";

  const imagen = producto.imagen || "https://via.placeholder.com/100"; // imagen por defecto si no hay

  card.innerHTML = `
    <img src="${imagen}" alt="${producto.nombre}">
    <div class="producto-info">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio.toFixed(2)}</p>
    </div>
    <div class="producto-acciones">
      <button class="btn-agregar" onclick='agregarAlCarrito(${JSON.stringify(producto)})'>Agregar</button>
      <button class="btn-eliminar" onclick='eliminarProducto(${index})'>Eliminar</button>
    </div>
  `;

  console.log("Cargando imagen:", imagen);

  document.querySelector(".productos-lista").appendChild(card);
}


function eliminarProducto(index) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  if (index >= 0 && index < productos.length) {
    if (confirm(`¿Estás seguro de que deseas eliminar "${productos[index].nombre}"?`)) {
      productos.splice(index, 1);
      localStorage.setItem("productos", JSON.stringify(productos));
      location.reload(); // recarga para actualizar la vista
    }
  }
}

function obtenerProductosIniciales() {
  return [
    { nombre: "Tofu", precio: 3.49, imagen: "Imagenes/Tofu.jpg"  },
    { nombre: "Batido de Frutas", precio: 3.99, imagen: "Imagenes/BatidodeFrutas.jpg"},
    { nombre: "Queso Vegano", precio: 5.49, imagen: "Imagenes/QuesoVegano.jpg" },
    { nombre: "Sopa de Miso", precio: 3.99, imagen: "Imagenes/SopadeMiso.jpg" },
    { nombre: "Pizza Vegana", precio: 9.99, imagen: "Imagenes/pizza-vegana.jpg" },
    { nombre: "Nuggets de Soya", precio: 6.99, imagen: "Imagenes/NuggetsdeSoya.jpg" },
    { nombre: "Pan Integral", precio: 2.49, imagen: "Imagenes/PanIntegral.jpg" },,
    { nombre: "Yogur de Coco", precio: 4.29, imagen: "Imagenes/YogurdeCoco.jpg" },
    { nombre: "Helado Vegano", precio: 6.49, imagen: "Imagenes/HeladoVegano.jpg" },
  ];
}

function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedor = document.getElementById("carrito-contenido");
  const totalDiv = document.getElementById("total");

  contenedor.innerHTML = "";
  if (carrito.length === 0) {
    contenedor.innerHTML = "<p><b>El carrito está vacío.</b></p>";
    totalDiv.innerText = "";
    return;
  }

  let total = 0;

  carrito.forEach((producto, index) => {
    total += producto.precio;

    const card = document.createElement("div");
    card.className = "carrito-item";

    const imagen = producto.imagen || "https://via.placeholder.com/100";

    card.innerHTML = `
      <img src="${imagen}" alt="${producto.nombre}">
      <div class="carrito-info">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio.toFixed(2)}</p>
      </div>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;

    contenedor.appendChild(card);
  });

  totalDiv.innerText = `Total: $${total.toFixed(2)}`;
}

function eliminarDelCarrito(index) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function realizarPago() {
  alert("Funcionalidad de pago aún no implementada.");
  // Aquí podrías redirigir a pago.html o mostrar un modal
}

function mostrarHistorial() {
  const historial = JSON.parse(localStorage.getItem("historial")) || [];
  const contenedor = document.getElementById("historial-container");
  contenedor.innerHTML = "";

  if (historial.length === 0) {
    contenedor.innerHTML = "<p>No hay historial de compras.</p>";
    return;
  }

  historial.forEach((compra, index) => {
    const div = document.createElement("div");
    div.className = "historial-item";

    const productosList = compra.productos.map(p =>
      `<li>${p.nombre} - $${p.precio.toFixed(2)}</li>`
    ).join("");

   div.innerHTML = `
  <h3>Compra #${index + 1}</h3>
  <p>Fecha: ${new Date(compra.fecha).toLocaleString()}</p>
  <p>Titular: ${compra.titular || "Desconocido"}</p>
  <p>Tipo de tarjeta: ${compra.metodo || "N/A"}</p>
  <p>Expiración: ${compra.expiracion || "-"}</p>
  <p>Total: $${compra.total.toFixed(2)}</p>
  <ul>${productosList}</ul>
`;

    contenedor.appendChild(div);
  });
}


function registrarUsuario(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const clave = document.getElementById("clave").value;
  const nacimiento = document.getElementById("nacimiento").value;

  if (!nombre || !apellido || !telefono || !correo || !clave || !nacimiento) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const usuario = {
    nombre,
    apellido,
    telefono,
    correo,
    clave,
    nacimiento,
    creado: new Date().toISOString()
  };

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push(usuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("¡Registro exitoso!");
  window.location.href = "login.html";
}