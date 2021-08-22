//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
    fetch(PRODUCTS_URL)
    .then(info => info.json())
    .then(data => {
        for(let i = 0; i < data.length; i++){
            let lista = data[i];
            let nombre = lista.name;
            let descripcion = lista.description;
            let costo = lista.cost;
            let moneda = lista.currency;
            let foto = lista.imgSrc;
            let totalvendidos = lista.soldCount;

            document.getElementById("prod-list-container").innerHTML += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + foto + `" alt="` +  `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ nombre +`</h4>
                            <small class="text-muted">` + moneda +`  `+ costo + `</small>
                        </div>
                        <p class="mb-1">` + descripcion + `</p>
                    </div>
                </div>
            </a>`
        }
    });
});