//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
    fetch(PRODUCTS_URL)
        .then(info => info.json())
        .then(data => {
            showProductsList(data);
        });

    // Si bien en la entrega 1 el fetch estaba junto con el for, ahora los separo, así no tengo que duplicar el código para ordenarlos.
    // Defino la funcion showProductsList() y despues la utilizo con lo que quiero.
    var array = [];

    function showProductsList(data) {
        document.getElementById("prod-list-container").innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            var lista = data[i];
            let nombre = lista.name;
            let descripcion = lista.description;
            let costo = lista.cost;
            let moneda = lista.currency;
            let foto = lista.imgSrc;
            let totalvendidos = lista.soldCount;

            let productsamostrar = "";
            productsamostrar += `
                  <div class="col-md-4">
                    <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                      <img class="bd-placeholder-img card-img-top"  src="` + foto + `">
                      <div class="card-body">
                      <h4 class="m-0">`+ nombre + `</h4>
                      <div><small class="text-muted">` + "Cant. vendidas: " + totalvendidos + `</small></div>
                        <p class="card-text">`+ descripcion +`</p>
                        <small class="text-muted">` + moneda +`  `+ costo + `</small>
                      </div>
                    </a>
                  </div>
               `
            // Ahora para agregar los datos vehículo a vehículo utilizo el push con la variable lista que definí arriba.
            document.getElementById("prod-list-container").innerHTML += productsamostrar;
            array.push(lista);
        }
    }

    // Para que los botones de ordenar me funcionen le indico como ordenarlos (dependiendo si son asc. o desc.)
    // Luego muestro la lista con la funcion showProductsList().
    document.getElementById("sortbyprice-asc").onclick = function () {
        fetch(PRODUCTS_URL)
            .then(info => info.json())
            .then(data => {
                data.sort(function (previous, next) {
                    return parseInt(previous.cost) - parseInt(next.cost);
                })
                showProductsList(data);
            })
    }

    document.getElementById("sortbyprice-desc").onclick = function () {
        fetch(PRODUCTS_URL)
            .then(info => info.json())
            .then(data => {
                data.sort(function (previous, next) {
                    return parseInt(next.cost) - parseInt(previous.cost);
                })
                showProductsList(data);
            })
    }

    document.getElementById("sortbyRel-desc").onclick = function () {
        fetch(PRODUCTS_URL)
            .then(info => info.json())
            .then(data => {
                data.sort(function (previous, next) {
                    return parseInt(next.soldCount) - parseInt(previous.soldCount);
                })
                showProductsList(data);
            })
    }

    // Filtros de precios segun rango: según el valor elegido de minPrice y maxPrice agrego a la lista de productosentreMinyMax.
    // Luego de agregarlos a la lista, con la funcion showProductsList() muestro esta lista.
    // Al clickear en el botón de Limpiar, hago que el valor de los rangos quede vacío y que vuelva a mostrar la lista original.
    document.getElementById("rangeFilterPrice").onclick = function () {
        let minPrice = document.getElementById("rangeFilterPriceMin").value;
        let maxPrice = document.getElementById("rangeFilterPriceMax").value;

        fetch(PRODUCTS_URL)
            .then(info => info.json())
            .then(data => {

                productosentreMinyMax = [];

                for (let i = 0; i < data.length; i++) {
                    let costo = data[i].cost;
                    if (costo >= minPrice && costo <= maxPrice) {
                        productosentreMinyMax.push(data[i]);
                    }
                }
                showProductsList(productosentreMinyMax);
            })
    }

    document.getElementById("clearRangeFilter").onclick = function () {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";
        fetch(PRODUCTS_URL)
            .then(info => info.json())
            .then(data => {
                showProductsList(data);
            })
    }
});