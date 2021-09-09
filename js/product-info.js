// ENTREGA 3
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

    document.getElementById("enviarComentario").addEventListener("click", function(){
        let newCommentDescription = document.getElementById("addNewComment").value;
        let newCommentScore = document.getElementById("selectStars").value;

        let error = "";

        if (newCommentDescription.length == 0 || newCommentScore == 0) {
            error += `<FONT FACE="arial" SIZE=2 COLOR="red"> El comentario debe tener un mensaje y una puntuación.</FONT>`
        } else {    
        error += `Comentario enviado con éxito.`

    }

        document.getElementById("mensajeEnviado").innerHTML = error;
       
       /* 
        let newCommentDescription = document.getElementById("addNewComment").value;
        let scoreSelect = document.getElementById("Puntuacionstars").value;
        let commentUser = localStorage.getItem("userloggedin");


       // let DateTime = new Date().toLocaleString(); // TO CHECK



/*        var stars = '';

        for(var index = 0; index < score; index++)
            stars += '<span class="fa fa-star" style="color:orange"/>';
        
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

*/  

})


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

                for(var index = 0; index < score; index++) {
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
});