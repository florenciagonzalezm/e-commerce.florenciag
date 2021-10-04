// ENTREGA 3
// Para que aparezcan las imagenes en forma de galería.
var productos = {};

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productinfoImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
// Para mostrar la información del producto.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productos = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productPriceHTML = document.getElementById("productPrice");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCategoryHTML = document.getElementById("productCategory");
            let productSoldCountHTML = document.getElementById("productSoldCount");

            productNameHTML.innerHTML = productos.name;
            productPriceHTML.innerHTML = productos.currency + " " + productos.cost;
            productDescriptionHTML.innerHTML = productos.description;
            productCategoryHTML.innerHTML = productos.category;
            productSoldCountHTML.innerHTML = productos.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGallery(productos.images);
        }
    });

    // Para mostrar los comentarios ya existentes.
    fetch(PRODUCT_INFO_COMMENTS_URL)
        .then(infocomments => infocomments.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                let comments = data[i];

                let score = comments.score;
                let commentDescription = comments.description;
                let commentUser = comments.user;
                let DateTime = comments.dateTime;

                var stars = '';

                for (var index = 0; index < score; index++) {
                    stars += '<span class="fa fa-star" style="color:orange"/>';
                }

                document.getElementById("comments-container").innerHTML += `
            <a class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                    `+ stars + `
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h6 class="mb-1">`+ commentUser + `<small class="text-muted">` + " - " + DateTime + `</small></h6>
                        </div>
                        <small class="text-muted">` + commentDescription + `</small>
                    </div>
                </div>
            </a>`
            }
        });

    // Función para que no me permita continuar en caso de no completar ambos (comentario + puntuación)
    //DESAFIATE ENTREGA 3 - Para que el comentario que enviamos se agregue a la lista de comentarios.
    document.getElementById("enviarComentario").addEventListener("click", function () {
        let newCommentDescription = document.getElementById("addNewComment").value;
        let newCommentScore = document.getElementById("selectStars").value;

        let error = "";

        if (newCommentDescription.length == 0 || newCommentScore == 0) {
            error += `<FONT FACE="arial" SIZE=2 COLOR="red"> El comentario debe tener un mensaje y una puntuación.</FONT>`
        } else {
            error += `Comentario enviado con éxito.`


            let newCommentDescription = document.getElementById("addNewComment").value;
            let scoreSelect = document.getElementById("selectStars").value;
            let commentUser = localStorage.getItem("userloggedin");
            let DateTime = new Date().toLocaleString();

            let stars = '';

            for (var index = 0; index < scoreSelect; index++) {
                stars += '<span class="fa fa-star" style="color:orange"/>';
            }

            let showNewComment = "";
            showNewComment += `
        <a class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                `+ stars + `
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">`+ commentUser + `<small class="text-muted">` + " - " + DateTime + `</small></h6>
                    </div>
                    <small class="text-muted">` + newCommentDescription + `</small>
                </div>
            </div>
        </a>`
            document.getElementById("comments-container").innerHTML += showNewComment;

            // Entrega 3 - Para que al enviar el comentario se vacíen los campos.
            document.getElementById("addNewComment").value = "";
            document.getElementById("selectStars").value = 0;
        }

        document.getElementById("mensajeEnviado").innerHTML = error;
    })



    // Entrega 4 - Productos relacionados
    fetch(PRODUCT_INFO_URL)
        .then(info => info.json())
        .then(data => {
            for (let i = 0; i < data.relatedProducts.length; i++) {
                let relatedProducts = data.relatedProducts[i];

                fetch(PRODUCTS_URL)
                    .then(info => info.json())
                    .then(data => {

                        let namerelatedProducts = data[relatedProducts].name;
                        let descriprelatedProducts = data[relatedProducts].description;
                        let imgrelatedProducts = data[relatedProducts].imgSrc;
                        let pricerelatedProducts = data[relatedProducts].currency + " " + data[relatedProducts].cost;


                        let relatedProd = "";
                        relatedProd += `
            <div class="col-lg-3 col-md-4 col-6">
                <div>
                    <img class="img-fluid img-thumbnail" src="` + imgrelatedProducts + `"> 
                    <h7 class="mb-1">`+ namerelatedProducts + `</h7>
                    <div>
                    <small class="text-muted">` + descriprelatedProducts + `</small>
                </div>
                <div>
                    <small class="text-muted">` + pricerelatedProducts + `</small>
                </div>
                </div>
            </div>
            `
                        document.getElementById("relatedProducts").innerHTML += relatedProd;
                    })
            }

        });
});

