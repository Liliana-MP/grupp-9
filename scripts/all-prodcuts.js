const objectArray = [];
var cartArray = JSON.parse(localStorage.getItem("productsInCart")) || []

const getCategoryId = sessionStorage.getItem("category") || 0;
console.log(getCategoryId);


fetch("db.json").then(function(response) {

  if (response.status !== 200){
    console.log("Något gick fel. Status kod: " + response.status);
    return;
  }
  
    response.json().then(function(data){
      let row;
      // Renderar ut produkter
        data.product.forEach(element => {

          if(getCategoryId == 0){
            
            document.getElementById("row").innerHTML += ` <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="card border-dark mb-3" style="max-width: 20rem">
            <div class="card-header">${element.name}</div>
            <div class="card-body">
                <img class="img-thumbnail" src=${element.image} alt="bild på ${element.name}">
                
                <textarea class="img-thumbnail" readonly style="resize: none" cols="30" rows="5"> ${element.description}</textarea>
              <p class="product-price">
                ${element.price}
              </p>
              <button type="button" class="btn btn-outline-success" onclick="locateObject(${element.id})">Köp</button>
            </div>
            </div>
          </div>`
          objectArray.push(element);
          console.log(objectArray);
        }else{
         
          if(getCategoryId == element.categoryid){
            document.getElementById("row").innerHTML += ` <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="card border-dark mb-3" style="max-width: 20rem">
            <div class="card-header">${element.name}</div>
            <div class="card-body">
                <img class="img-thumbnail" src=${element.image} alt="bild på ${element.name}">
                <textarea class="img-thumbnail" readonly style="resize: none" cols="30" rows="5"> ${element.description}</textarea>
                <p class="product-price">
                ${element.price}
                </p>
                <button type="button" class="btn btn-outline-success" onclick="locateObject(${element.id})">Köp</button>
            </div>
            </div>
          </div>`
          objectArray.push(element);
          }
        } 
        
        })

        // Renderar ut kategorier
        if(getCategoryId == 0){
        document.getElementById("sidebar").innerHTML += `<a id="0" class="category active" href="index.html">Alla produkter</a>`
      } else {
        document.getElementById("sidebar").innerHTML += `<a id="0" class="category" href="index.html">Alla produkter</a>`
      }
        data.category.forEach(element => {
          if(element.id == getCategoryId){
            document.getElementById("sidebar").innerHTML += `
            <a id="${element.id}" class="category active" href="category.html">${element.name}</a>`
          } else {
            document.getElementById("sidebar").innerHTML += `
            <a id="${element.id}" class="category" href="category.html">${element.name}</a>`
          }
        })

        $(".category").click(setCategoryId);
    })
})


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





