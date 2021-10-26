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


        // creo objeto
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

        localStorage.setItem('arrayDatosaguardar', JSON.stringify(arrayDatosaguardar));
    };

           // obtengo el array
           let arrayDatos = JSON.parse(localStorage.getItem('arrayDatosaguardar'));

           
            document.getElementById("nombre1").value = arrayDatos.primerNombre;
            document.getElementById("nombre2").value = arrayDatos.segundoNombre;
            document.getElementById("apellido1").value = arrayDatos.primerApellido;
            document.getElementById("apellido2").value = arrayDatos.segundoApellido;
            document.getElementById("emailUs").value = arrayDatos.correoElec;
            document.getElementById("telefono").value = arrayDatos.telefono;
            document.getElementById("edad").value = arrayDatos.edad;

});


    // let arrayDatos = {}

    /*
    
    function guardarDatos() {

        let primerNombre = document.getElementById("nombre1").value;
        let segundoNombre = document.getElementById("nombre2").value;
        let primerApellido = document.getElementById("apellido1").value;
        let segundoApellido = document.getElementById("apellido2").value;
        let emailUsuario = document.getElementById("email").value;
        let telefono = document.getElementById("telefono").value;
        let usuario = document.getElementById("username").value;
    
        // creo objeto
        let arrayDatosaguardar = {
            "userlogged": usuario,
            "primerNombre": primerNombre, 
            "segundoNombre": segundoNombre,
            "primerApellido": primerApellido, 
            "segundoApellido": segundoApellido, 
            "correoelectronico": emailUsuario, 
            "telefono": telefono
        };

        localStorage.setItem('arrayDatosaguardar', JSON.stringify(arrayDatosaguardar));
    }

    document.getElementById("guardarCambiosPerfil").onclick = function () {
        // creo el array
        guardarDatos();
    }

    // obtengo el array
    let arrayDatos = JSON.parse(localStorage.getItem('arrayDatosaguardar'));



    function mostrarDatos(arrayDatos) {

        if (arrayDatos.length = 0) {
            document.getElementById("nombre1").value = "";
            document.getElementById("nombre2").value = "";
            document.getElementById("apellido1").value = "";
            document.getElementById("apellido2").value = "";
            document.getElementById("email").value = "";
            document.getElementById("telefono").value = "";

        } else {

        document.getElementById("nombre1").value = arrayDatos.primerNombre;
        document.getElementById("nombre2").value = arrayDatos.segundoNombre;
        document.getElementById("apellido1").value = arrayDatos.primerApellido;
        document.getElementById("apellido2").value = arrayDatos.segundoApellido;
        document.getElementById("email").value = arrayDatos.emailUsuario;
        document.getElementById("telefono").value = arrayDatos.telefono;
    }
}

    


    mostrarDatos(arrayDatos);


// let arrayDatos = {}

*/