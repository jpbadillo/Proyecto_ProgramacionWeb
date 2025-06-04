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