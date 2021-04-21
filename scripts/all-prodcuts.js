const objectArray = [];
var cartArray = JSON.parse(localStorage.getItem("productsInCart")) || [];

const getCategoryId = sessionStorage.getItem("categoryId") || 0;

function renderAllProducts() {
  fetch("https://projekt-grupp9.herokuapp.com/products/all").then(function (
    response
  ) {
    if (response.status !== 200) {
      console.log("Något gick fel. Status kod: " + response.status);
      return;
    }

    response.json().then(function (data) {
      // Renderar ut produkter
      data.forEach((element) => {
        if (getCategoryId == 0) {
          product(element);
        } else {
          if (getCategoryId == element.categoryid) product(element);
        }
      });
      sessionStorage.setItem("products", JSON.stringify(objectArray));
    });
  });
  fetchAllCategories();
}

function fetchAllCategories() {
  fetch("https://projekt-grupp9.herokuapp.com/categories/all").then(function (
    response
  ) {
    if (response.status !== 200) {
      console.log("Något gick fel. Status kod: " + response.status);
      return;
    }

    response.json().then(function (data) {
      console.log(data);
      sessionStorage.setItem("categorys", JSON.stringify(data));
      renderCategory(data);
    });
  });
}

function renderCategory(data) {
  const $sidebar = $("#sidebar");
  let $row;
  let $active = "";
  // Renderar ut kategorier
  if (getCategoryId == 0) $active = "active";
  $row = `<a id="0" class="category ${$active}" href="index.html">Alla produkter</a>`;
  $sidebar.append($row);
  data.forEach((element) => {
    if (element.id == getCategoryId) {
      $active = "active";
    } else {
      $active = "";
    }
    $row = `<a id="${element.id}" class="category ${$active}" href="category.html">${element.name}</a>`;
    $sidebar.append($row);
  });

  $(".category").click(setCategoryId);
}

function product(element) {
  document.getElementById(
    "row"
  ).innerHTML += ` <div class="col-lg-3 col-md-6 col-sm-12">
  <div class="card border-dark mb-3" style="max-width: 20rem">
  <div class="card-header" onclick="renderProduct(${element.id})" >${element.name}</div>
  <div class="card-body">
      <img class="img-thumbnail" onclick="renderProduct(${element.id})" src=${element.picture} alt="bild på ${element.name}" >
      
      <textarea class="img-thumbnail" readonly style="resize: none" cols="30" rows="5"> ${element.description}</textarea>
    <p class="product-price">
      ${element.price} SEK
    </p>
    <button type="button" class="btn btn-outline-success" onclick="locateObject(${element.id})">Köp</button>
  </div>
  </div>
</div>`;
  objectArray.push(element);
}

function setCategoryId() {
  sessionStorage.setItem("categoryId", this.id);
}

function renderProduct(id) {
  window.location.replace("product.html");
  sessionStorage.setItem("productId", id);
}

function locateObject(id) {
  const foundObject = objectArray.find((element) => element.id === id);
  addToCart(foundObject);
}

// Vi måste minska quantity i DB (vet ej om det behövs göras i json filen just nu)
function addToCart(object) {
  const findProduct = cartArray.find((element) => element.id == object.id);

  if (findProduct == undefined) {
    const product = {
      id: object.id,
      name: object.name,
      price: object.price,
      quantityInCart: 1,
    };
    cartArray.push(product);
  } else {
    findProduct.quantityInCart += 1;
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartArray));
}
