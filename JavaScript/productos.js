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

function mostrarFormulario() {
  document.getElementById("formulario-producto").classList.remove("oculto");
}

function cerrarFormulario() {
  document.getElementById("formulario-producto").classList.add("oculto");
}


// Mostrar productos al cargar
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

function agregarAlCarrito(producto) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`${producto.nombre} añadido al carrito`);
}




