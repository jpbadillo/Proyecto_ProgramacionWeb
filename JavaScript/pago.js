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

function realizarPago() {
  alert("Funcionalidad de pago aún no implementada.");
}
