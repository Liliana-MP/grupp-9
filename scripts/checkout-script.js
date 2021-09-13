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
  } else if (!validateZipCode($zipCode)) {
    $alert.text("* Felaktigt postnummer");
  } else if (!validateName($firstname)) {
    $alert.text("* Felaktigt förnamn");
  } else if (!validateName($lastname)) {
    $alert.text("* Felaktigt efternamn");
  } else if (!validateAdress($adress)) {
    $alert.text("* Felaktig adress");
  } else if (!validateCity($city)) {
    $alert.text("* Felaktig ort");
  } else if (!validateEmail($email)) {
    $alert.text("* Felaktig E-Mail adress");
  } else if (!validatePhoneNumber($phoneNumber)) {
    $alert.text("* Formatet ska vara 0701234567");
  } else {
    sendOrder(form);
  }
}

function validateEmail(email) {
  let regex = /^(?=[\w\.]+@([\w-]+\.)+[\w-]{2,4}).{3,30}$/;
  return regex.test(email);
}

function validateName(name) {
  let regex = /^[a-zåäöA-ZÅÄÖ\-\'\ ]{2,30}$/;
  return regex.test(name);
}

function validateAdress(adress) {
  let regex = /^[a-zåäöA-ZÅÄÖ ]{2,30}([ ][0-9]{0,4})?[^.{}|^~[`%]$/;
  return regex.test(adress);
}

function validateZipCode(zipCode) {
  let regex = /^[0-9]{5}$/;
  return regex.test(zipCode);
}

function validateCity(city) {
  let regex = /^[a-zåäöA-ZÅÄÖ]{2,30}$/;
  return regex.test(city);
}

function validatePhoneNumber(phoneNumber) {
  let regex2 = /^\d{10}$/;
  return regex2.test(phoneNumber);
}

//+46765554662
//0765554662

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
