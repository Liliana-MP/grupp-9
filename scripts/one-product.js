const objectArray = JSON.parse(sessionStorage.getItem("products")) || [];
var cartArray = JSON.parse(localStorage.getItem("productsInCart")) || [];
const productId = JSON.parse(sessionStorage.getItem("productId")) || 1;
const categoryArray = JSON.parse(sessionStorage.getItem("categorys")) || [];
const getCategoryId = JSON.parse(sessionStorage.getItem("categoryId")) || 0;

console.log(categoryArray);

// Renderar ut produkter

const product = objectArray.find((item) => item.id == productId);
$("#row").append(`<div class="text-center col-md-12">
      <div class="card border-dark mb-3">
      <div class="card-header"><h1>${product.name}</h1></div>
      <div class="card-body">
      <div class="container">
        <!-- Full-width images with number text -->
        <div class="mySlides">
          <div class="numbertext">1 / 3</div>
          <img
            src="${product.picture}"
            style="width: 40%"
            alt=""
          />
        </div>

        <div class="mySlides">
          <div class="numbertext">2 / 3</div>
          <img
            src="${product.picture}"
            style="width: 40%"
            alt=""
          />
        </div>

        <div class="mySlides">
          <div class="numbertext">3 / 3</div>
          <img
            src="${product.picture}"
            style="width: 40%"
            alt=""
          />
        </div>

        <!-- Next and previous buttons -->
        <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
        <a class="next" onclick="plusSlides(1)">&#10095;</a>


        <!-- Thumbnail images -->
        <div class="row" id="pic">
          <div class="column">
            <img
              class="demo cursor"
              src="${product.picture}"
              style="width: 100%"
              onclick="currentSlide(1)"
              alt=""
            />
          </div>
          <div class="column">
            <img
              class="demo cursor"
              src="${product.picture}"
              style="width: 100%"
              onclick="currentSlide(2)"
              alt=""
            />
          </div>
          <div class="column">
            <img
              class="demo cursor"
              src="${product.picture}"
              style="width: 100%"
              onclick="currentSlide(3)"
              alt=""
            />
          </div>
        </div>
      </div>
      <br>
          <p class="img-thumbnail"> ${product.description}</p>
          <p><b>Lager saldo:</b> ${product.quantity}</p>
          <p class="product-price">
          ${product.price}: SEK &nbsp;&nbsp; <button type="button" class="btn btn-outline-success" onclick="locateObject(${product.id})">Köp</button>
          </p>
         
          
      </div>
      </div>
    </div>`);
renderCategory();

function renderCategory() {
  const $sidebar = $("#sidebar");
  let $row;
  let $active = "";
  // Renderar ut kategorier
  if (getCategoryId == 0) $active = "active";
  $row = `<a id="0" class="category ${$active}" href="index.html">Alla produkter</a>`;
  $sidebar.append($row);
  categoryArray.forEach((element) => {
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

function setCategoryId() {
  sessionStorage.setItem("categoryId", this.id);
}

function locateObject(id) {
  const foundObject = objectArray.find((element) => element.id === id);
  addToCart(foundObject);
  $("#test" + id).toggle();
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

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
