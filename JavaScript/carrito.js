let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function vaciarCarrito() {
  carrito = [];
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedor = document.getElementById("carrito-contenido");
  const totalDiv = document.getElementById("total");

  contenedor.innerHTML = "";
  if (carrito.length === 0) {
    contenedor.innerHTML = "<p><b>El carrito está vacío</b></p>";
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

