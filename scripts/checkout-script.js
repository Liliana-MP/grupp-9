var product = JSON.parse(localStorage.getItem("productsInCart")) || [];

getItemFromLocalStorage();

function getItemFromLocalStorage() {
  product.forEach((product) => {
    createDataInCart(product.name, product.price, product.quantityInCart);
  });
  updateTotal();
}

function createDataInCart(name, price, quantity) {
  document.getElementById("product-in-cart").innerHTML += `
  <tbody>
  <tr class="table-active">
    <th scope="row">${name}</th>
    <td>${price} SEK</td>
    <td>
      <span>${quantity}</span>
    </td>
  </tr>
</tbody>`;
  updateTotal();
}

function updateTotal() {
  let total = 0;
  product.forEach((product) => {
    total += product.price * product.quantityInCart;
  });
  $("#total-amount").text(total.toFixed(2) + " SEK");
}

/*
$(document).ready(function() {
  fetchUser();
  function fetchUser() {
      let $loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  
      let $fName = $loggedInUser.firstname;
      let $lName = $loggedInUser.lastname;
      let $adress = $loggedInUser.adress;
      let $zipcode = $loggedInUser.zipcode;
      // City ska fixas när vi har databas
      // let $cityId = $loggedInUser.cityid;

      document.forms["confirm-form"]["fName"].value = $fName;
      document.forms["confirm-form"]["lName"].value = $lName;
      document.forms["confirm-form"]["adrs"].value = $adress;
      document.forms["confirm-form"]["zip"].value = $zipcode;
      // City ska fixas när vi har databas
      // document.forms["confirm-form"]["city"].value = $cityId;
  
  
  
       }  
  });
  */

let resource = "./db.json";
const $alert = $("#alert");

function checkForm(form) {
  let $firstname = $("#fName").val();
  let $lastname = $("#lName").val();
  let $city = $("#city").val();
  let $adress = $("#adrs").val();
  let $zipCode = $("#zip").val();
  let $email = $("#email").val();
  let $phoneNumber = $("#phoneNumber").val();

  if (
    $firstname == "" ||
    $lastname == "" ||
    $adress == "" ||
    $zipCode == "" ||
    $city == "" ||
    $email == "" ||
    $phoneNumber == ""
  ) {
    $alert.text("* Fyll i alla fälten");
  } else if (isNaN($zipCode)) {
    $alert.text("* Enbart siffror i postnummer fältet");
  } else if (!validateName($firstname)) {
    $alert.text("* Enbart bokstäver i förnamn fältet");
  } else if (!validateName($lastname)) {
    $alert.text("* Enbart bokstäver i efternamn fältet");
  } else if ($adress.length <= 2) {
    $alert.text("* Adressen måste ha mer än 2 bokstäver");
  } else if (!isNaN($city)) {
    $alert.text("* Enbart bokstäver i ort fältet");
  } else if (!validateEmail($email)) {
    $alert.text("* Felaktig E-Mail adress");
  } else if (isNaN($phoneNumber)) {
    $alert.text("* Enbart siffror i telefonnummer fältet");
  } else {
    sendOrder(form);
  }
}

function validateEmail(email) {
  //var re = /^[^\s@]+@[^\s@]+$/;
  var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return re.test(email);
}

function validateName(name) {
  let regex = /^[a-z]{2,30}+[-']+[^.]$/;
  return regex.test(name);
}

function validateAdress(adress) {
  let regex = /^[a-z]{2,30}+[-'\s]$/;
}

async function sendOrder(form) {
  let $firstname = $("#fName").val();
  let $lastname = $("#lName").val();
  let $city = $("#city").val();
  let $adress = $("#adrs").val();
  let $zipCode = $("#zip").val();
  let $email = $("#email").val();
  let $phoneNumber = $("#phoneNumber").val();
  let products = new Array();

  product.forEach((element) =>
    products.push({
      product: { id: element.id },
      quantity: element.quantityInCart,
    })
  );

  axios
    .post(
      "https://projekt-grupp9.herokuapp.com/order/add",
      {
        date: new Date(),
        customer: {
          firstName: $firstname,
          lastName: $lastname,
          city: $city,
          adress: $adress,
          zipCode: $zipCode,
          email: $email,
          phoneNumber: $phoneNumber,
        },
        products: products,
      },
      { headers: { "Content-Type": "application/json" } }
    )
    .then((res) => {
      if (res.data == "Order tillagd") {
        sendEmail($firstname, $email, products, $adress, $zipCode, $city);
        form.submit();
      } else $alert.text("* Något gick fel");
    })
    .catch((err) => console.error(err));
}

function sendEmail(firstName, email, products, adress, zipCode, city) {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "hakimlivsonline@gmail.com",
    Password: "vvnowqalsopkvfar",
    To: email,
    From: "hakimlivsonline@gmail.com",
    Subject: `Beställningsbekräftelse ${email}`,
    Body: `${firstName} tack för din beställning.
    <br/>  Levereras till: ${adress} ${zipCode} ${city}`,
  });
}

function saveInfo() {
  let infoArray = [];
  let $firstname = $("#fName").val();
  let $lastname = $("#lName").val();
  let $city = $("#city").val();
  let $adress = $("#adrs").val();
  let $zipCode = $("#zip").val();
  let $email = $("#email").val();
  let $phoneNumber = $("#phoneNumber").val();
  let customer = {
    firstName: $firstname,
    lastName: $lastname,
    city: $city,
    adress: $adress,
    zipCode: $zipCode,
    email: $email,
    phoneNumber: $phoneNumber,
  };
  infoArray.push(customer);
  sessionStorage.setItem("Customer", JSON.stringify(infoArray));
}
