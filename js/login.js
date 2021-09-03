//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  // Entrega 2 - Al hacer click en el se
  document.getElementById("sendBtn").onclick = function () {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    localStorage.setItem("userloggedin", username);

  }
});

   // userValidation();
  //}

  //function userValidation(event) {
  //event.preventDefault();

  //if (username.length != 0 || password.length != 0) {
  //window.location.href="indexhome.html";
  //}