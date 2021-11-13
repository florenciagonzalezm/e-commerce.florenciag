//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//ENTREGA 5
document.addEventListener("DOMContentLoaded", function (e) {

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
      }
    }
    
    tCredito.addEventListener('change', updateStatus)
    tBancaria.addEventListener('change', updateStatus);
    
});