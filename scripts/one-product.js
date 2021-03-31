const objectArray = JSON.parse(sessionStorage.getItem("products")) || [];
var cartArray = JSON.parse(localStorage.getItem("productsInCart")) || [];
const productId = JSON.parse(sessionStorage.getItem("productId")) || 1;


        
        // Renderar ut produkter
          
        const product = objectArray.find(item => item.id == productId)
      $("#row").append(`<div class="col-lg-3 col-md-6 col-sm-12">
      <div class="card border-dark mb-3" style="max-width: 20rem">
      <div class="card-header">${product.name}</div>
      <div class="card-body">
          <img class="img-thumbnail" src=${product.image} alt="bild på ${product.name}">
          <textarea class="img-thumbnail" readonly style="resize: none" cols="30" rows="5"> ${product.description}</textarea>
          <p class="product-price">
          ${product.price}
          </p>
          <button type="button" class="btn btn-outline-success" onclick="locateObject(${product.id})">Köp</button>
      </div>
      </div>
    </div>`)

  
  function setCategoryId(){
    sessionStorage.setItem("category", this.id);
  }

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
  



