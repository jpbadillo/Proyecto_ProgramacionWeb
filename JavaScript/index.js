document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-continuar");
  if (btn) {
    btn.addEventListener("click", () => {
      window.location.href = "menu.html";
    });
  }
});
