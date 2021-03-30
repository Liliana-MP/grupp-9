const objectArray = [];
var cartArray = JSON.parse(localStorage.getItem("productsInCart")) || []


fetch("db.json").then(function(response) {

  if (response.status !== 200){
    console.log("Något gick fel. Status kod: " + response.status);
    return;
  }
   

    response.json().then(function(data){
        data.product.forEach(element => {
            
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
              <button type="button" class="btn btn-outline-success" onclick="locateObject(${element.id})">Köp</button>
            </div>
            </div>
          </div>`
          objectArray.push(element);
        })
    })
})

function locateObject(id){
  const foundObject = objectArray.find(element => element.id === id);
  addToCart(foundObject)
  $("#test" + id).toggle();
}

// Vi måste minska quantity i DB (vet ej om det behövs göras i json filen just nu)
function addToCart(object){
  const findProduct = cartArray.find(element => element.id == object.id);
  
  if (findProduct == undefined){
    const product = {
      "id": object.id,
      "name": object.name,
      "price": object.price,
      "quantityInCart": 1
    }
    cartArray.push(product);
  }
  else {
    findProduct.quantityInCart += 1;
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartArray));
  alert("Produkten las till i varukorgen")
}


