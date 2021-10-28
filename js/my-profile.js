//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("guardarCambiosPerfil").onclick = function () {

        let primerNombre = document.getElementById("nombre1").value;
        let segundoNombre = document.getElementById("nombre2").value;
        let primerApellido = document.getElementById("apellido1").value;
        let segundoApellido = document.getElementById("apellido2").value;
        let emailUsuario = document.getElementById("emailUs").value;
        let telefono = document.getElementById("telefono").value;
        let edad = document.getElementById("edad").value;
        let usuario = document.getElementById("username").value;


        // Creo el array e igualo cada dato a las variables, que arriba las igualé a el valor que se obtenga
        // de cada input que esta en el html, transformo a formato JSON.
        let arrayDatosaguardar = {
            "userlogged": usuario,
            "primerNombre": primerNombre,
            "segundoNombre": segundoNombre,
            "primerApellido": primerApellido,
            "segundoApellido": segundoApellido,
            "correoElec": emailUsuario,
            "telefono": telefono,
            "edad": edad
        };

        // Guardo el array en el localStorage
        localStorage.setItem('arrayDatosaguardar', JSON.stringify(arrayDatosaguardar));
    };

    // Obtengo el array para que luego de guardarlo también lo muestre en los inputs.
    let arrayDatos = JSON.parse(localStorage.getItem('arrayDatosaguardar'));


    document.getElementById("nombre1").value = arrayDatos.primerNombre;
    document.getElementById("nombre2").value = arrayDatos.segundoNombre;
    document.getElementById("apellido1").value = arrayDatos.primerApellido;
    document.getElementById("apellido2").value = arrayDatos.segundoApellido;
    document.getElementById("emailUs").value = arrayDatos.correoElec;
    document.getElementById("telefono").value = arrayDatos.telefono;
    document.getElementById("edad").value = arrayDatos.edad;

});
