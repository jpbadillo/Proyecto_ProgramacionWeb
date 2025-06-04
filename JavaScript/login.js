function iniciarSesion(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (usuarios.length === 0) {
    alert("Debe registrarse primero para iniciar sesión.");
    return;
  }

  const usuarioEncontrado = usuarios.find(
    u => u.correo === email && u.clave === password
  );

  if (usuarioEncontrado) {
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
    alert("¡Inicio de sesión exitoso!");
    window.location.href = "productos.html";
  } else {
    alert("Correo o contraseña incorrectos.");
  }
}