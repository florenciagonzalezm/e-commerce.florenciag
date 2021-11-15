//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//ENTREGA 5
document.addEventListener("DOMContentLoaded", function (e) {

    const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";

    fetch(CART_INFO_URL)
        .then(info => info.json())
        .then(data => {
            let nombre = data.articles[0].name;
            let cantidad = data.articles[0].count;
            let moneda = data.articles[0].currency;
            let unitCost = data.articles[0].unitCost;
            let imagen = data.articles[0].src;
            let subtotal = data.articles[0].unitCost * data.articles[0].count;
            let subtotalDos = data.articles[0].unitCost * data.articles[0].count;

            document.getElementById("articleName").innerHTML = nombre;
            document.getElementById("articleImage").innerHTML = `<img src="` + imagen + `" alt="` + nombre + `" class="img-thumbnail">`;
            document.getElementById("articleCost").innerHTML = moneda + " " + unitCost;
            document.getElementById("articleQ").innerHTML = cantidad;
            document.getElementById("subtotal").innerHTML = subtotal;
            document.getElementById("subtotalDos").innerHTML = subtotalDos;

            let shippingCost = document.getElementById("ShippingCost").value;
            // Para que al entrar seleccione por defecto el envio Premium.
            let porcentaje = 0.15;
            updateShippingCost();
            updateQ();
            updateQ2()

            // Función para actualizar el subtotal luego de cambiar las cantidades.
            function updateQ() {
                subtotal = unitCost * cantidad
                document.getElementById("articleQ").value = cantidad;
                document.getElementById("articleQ").innerHTML = cantidad;
                document.getElementById("subtotal").innerHTML = moneda + " " + subtotal;
                document.getElementById("subtotalDos").innerHTML = moneda + " " + subtotalDos;
            }
            // Función para actualizar el subtotal que aparece más abajo, luego de cambiar las cantidades.
            function updateQ2() {
                subtotalDos = unitCost * cantidad
                document.getElementById("articleQ").value = cantidad;
                document.getElementById("articleQ").innerHTML = cantidad;
                document.getElementById("subtotalDos").innerHTML = moneda + " " + subtotalDos;
            }

            // Función para actualizar el costo de envío y costo total.
            function updateShippingCost() {
                shippingCost = Math.round(subtotalDos * porcentaje)
                document.getElementById("ShippingCost").innerHTML = moneda + " " + shippingCost;
                let totalCost = subtotalDos + shippingCost;
                document.getElementById("totalCost").innerHTML = moneda + " " + totalCost;
            }

            // Para que al cambiar las cantidades se actualicen las funciones.
            document.getElementById("articleQ").onchange = function () {
                cantidad = this.value;
                updateQ()
                updateQ2()
                updateShippingCost()
            }

            // Para que se actualice la función de updateShippingCost() al seleccionar los distintos tipos de envios.
            document.getElementById("envioPremium").onchange = function () {
                porcentaje = this.value;
                updateShippingCost()
            }

            document.getElementById("envioExpress").onchange = function () {
                porcentaje = this.value;
                updateShippingCost()
            }

            document.getElementById("envioStandard").onchange = function () {
                porcentaje = this.value;
                updateShippingCost()
            }
        })

    //ENTREGA 7 - Creo variables para cada ID de los input para luego poder habilitarlos 
    // o deshabilitarlos en función de la opción de pago seleccionada.

    var tCredito = document.getElementById("credito");
    var tBancaria = document.getElementById("transfBancaria");
    var nombreTarjeta = document.getElementById("creditCardName");
    var numTarjeta = document.getElementById("creditCardNumber");
    var fechaTarjeta = document.getElementById("expirationDate");
    var cvvTarjeta = document.getElementById("codigocvv");
    var banco = document.getElementById("bancoTransferencia");
    var numCuenta = document.getElementById("numeroDeCuenta");

    updateStatus()

    function updateStatus() {
        if (tBancaria.checked) {
            nombreTarjeta.disabled = true;
            numTarjeta.disabled = true;
            fechaTarjeta.disabled = true;
            cvvTarjeta.disabled = true;
            numCuenta.disabled = false;
            banco.disabled = false;
        } else if (tCredito.checked) {
            numCuenta.disabled = true;
            banco.disabled = true;
            nombreTarjeta.disabled = false;
            numTarjeta.disabled = false;
            fechaTarjeta.disabled = false;
            cvvTarjeta.disabled = false;
        } else {
            numCuenta.disabled = true;
            banco.disabled = true;
            nombreTarjeta.disabled = true;
            numTarjeta.disabled = true;
            fechaTarjeta.disabled = true;
            cvvTarjeta.disabled = true;
        }
    }

    //Para ejecutar la función anterior y me muestre la forma de pago seleccionada en el carrito.

    let seleccionoFormaDePago = "";

    document.getElementById("credito").onchange = function () {
        updateStatus()
        seleccionoFormaDePago = this.value;
        document.getElementById("seleccionarPago").innerHTML = seleccionoFormaDePago;
        document.getElementById("guardoDatosPago").disabled = true;
    }

    document.getElementById("transfBancaria").onchange = function () {
        updateStatus()
        seleccionoFormaDePago = this.value;
        document.getElementById("seleccionarPago").innerHTML = seleccionoFormaDePago;
        document.getElementById("guardoDatosPago").disabled = true;
    }

    document.getElementById("cerrarDatosPago").onclick = function () {
        seleccionoFormaDePago = this.value
        document.getElementById("seleccionarPago").innerHTML = seleccionoFormaDePago;
    }


    // AL CAMBIAR DATOS EN LA FORMA DE PAGO VERIFICO SI TODO ESTA COMPLETO PARA CONTINUAR
    document.getElementById("codigocvv").onchange = function () {
        if (seleccionoFormaDePago = "Tarjeta de crédito") {
            if (nombreTarjeta.value.length != 0 && numTarjeta.value.length != 0 && fechaTarjeta.value.length != 0 && cvvTarjeta.value.length != 0) {
                document.getElementById("guardoDatosPago").disabled = false;
            } else {
                document.getElementById("guardoDatosPago").disabled = true;
            }
        }
    }

    document.getElementById("creditCardName").onchange = function () {
        if (seleccionoFormaDePago = "Tarjeta de crédito") {
            if (nombreTarjeta.value.length != 0 && numTarjeta.value.length != 0 && fechaTarjeta.value.length != 0 && cvvTarjeta.value.length != 0) {
                document.getElementById("guardoDatosPago").disabled = false;
            } else {
                document.getElementById("guardoDatosPago").disabled = true;
            }
        }
    }

    document.getElementById("creditCardNumber").onchange = function () {
        if (seleccionoFormaDePago = "Tarjeta de crédito") {
            if (nombreTarjeta.value.length != 0 && numTarjeta.value.length != 0 && fechaTarjeta.value.length != 0 && cvvTarjeta.value.length != 0) {
                document.getElementById("guardoDatosPago").disabled = false;
            } else {
                document.getElementById("guardoDatosPago").disabled = true;
            }
        }
    }

    document.getElementById("expirationDate").onchange = function () {
        if (seleccionoFormaDePago = "Tarjeta de crédito") {
            if (nombreTarjeta.value.length != 0 && numTarjeta.value.length != 0 && fechaTarjeta.value.length != 0 && cvvTarjeta.value.length != 0) {
                document.getElementById("guardoDatosPago").disabled = false;
            } else {
                document.getElementById("guardoDatosPago").disabled = true;
            }
        }
    }

    document.getElementById("numeroDeCuenta").onchange = function () {
        if (seleccionoFormaDePago = "Transferencia bancaria") {
            if (numCuenta.value.length != 0) {
                document.getElementById("guardoDatosPago").disabled = false;
            } else {
                document.getElementById("guardoDatosPago").disabled = true;
            }
        }
    }

    // Creo una función para validar que todo el carrito esté completo.
    function cartValidation() {
        let calleEnvio = document.getElementById("calle").value;
        let numeroDePuerta = document.getElementById("numeroDeCasa").value;
        let esquina = document.getElementById("esquina").value;
        let cantidades = document.getElementById("articleQ").value;

        if (calleEnvio.length == 0) {
            alert("Por favor ingresar una dirección de envío.");
        } else if (numeroDePuerta.length == 0) {
            alert("Por favor ingresar un número de puerta.");
        } else if (esquina.length == 0) {
            alert("Por favor ingresar la esquina.");
        } else if (cantidades.length == 0) {
            alert("Por favor ingresar cantidades");
        } else if (seleccionoFormaDePago == "") {
            alert("Por favor seleccionar un medio de pago")
        }
        else if (calleEnvio.length > 0 && numeroDePuerta.length > 0 && esquina.length > 0 && seleccionoFormaDePago != "aquí.") {
            alert("Su compra se ha finalizado con éxito.");
        }
    }

    document.getElementById("finalizarCompra").onclick = function () {
        cartValidation();
    }


});

