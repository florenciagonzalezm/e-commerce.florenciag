//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  // Entrega 2 - Al hacer click en el sendBtn se guarda el usuario en el localStorage.
  document.getElementById("sendBtn").onclick = function () {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    localStorage.setItem("userloggedin", username);

  }
});
