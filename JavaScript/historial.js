let historial = JSON.parse(localStorage.getItem('historial')) || [];

function irAHistorial(pagina) {
  const historial = JSON.parse(localStorage.getItem("historial")) || [];
  historial.push({ pagina, fecha: new Date().toLocaleString() });
  localStorage.setItem("historial", JSON.stringify(historial));
  window.location.href = "historial.html";
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
