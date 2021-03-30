fetch("db.json").then(function(response) {
   

    response.json().then(function(data){
        data.product.forEach(element => {
            console.log(element);
            document.getElementById("row").innerHTML += ` <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="card border-dark mb-3" style="max-width: 20rem">
            <div class="card-header">${element.name}</div>
            <div class="card-body">
                <img class="product-img" src=${element.image} alt="bild på ${element.name}">
              <p class="card-text">
                ${element.description}
              </p>
              <p class="product-price">
                ${element.price}
              </p>
              <button type="button" class="btn btn-outline-success">Köp</button>
            </div>
            </div>
          </div>`
        })
    })
})


