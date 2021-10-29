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


        // Creo el objeto e igualo cada dato a las variables, que arriba las igualé a el valor que se obtenga
        // de cada input que esta en el html.
        let objetoDatosaguardar = {
            "userlogged": usuario,
            "primerNombre": primerNombre,
            "segundoNombre": segundoNombre,
            "primerApellido": primerApellido,
            "segundoApellido": segundoApellido,
            "correoElec": emailUsuario,
            "telefono": telefono,
            "edad": edad
        };

        // Guardo el objeto en el localStorage, transformo el objeto a formato JSON.
        localStorage.setItem('Datosaguardar', JSON.stringify(objetoDatosaguardar));
    };

    // Obtengo el objeto para que luego de guardarlo también lo muestre en los inputs
    // Con JSON.parse obtengo los datos que estan en formato JSON.
    let objetoDatos = JSON.parse(localStorage.getItem('Datosaguardar'));


    document.getElementById("nombre1").value = objetoDatos.primerNombre;
    document.getElementById("nombre2").value = objetoDatos.segundoNombre;
    document.getElementById("apellido1").value = objetoDatos.primerApellido;
    document.getElementById("apellido2").value = objetoDatos.segundoApellido;
    document.getElementById("emailUs").value = objetoDatos.correoElec;
    document.getElementById("telefono").value = objetoDatos.telefono;
    document.getElementById("edad").value = objetoDatos.edad;

});
