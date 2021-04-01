let resource = "./db.json"

async function checkIfUserExist(form) {
  let inputEmail = $("#e-mail").val()
  const errorTxt = $("#alert")
  var responce = await fetch(resource)
  var data = await responce.json()
  if (validateNotEmpty() && validateEmailBox()) {
    let user = data.user.find(item => item.email === inputEmail)
    if (user !== undefined) {
      if (checkPassword(user)) {
        form.submit()
        window.location.replace("customer-index.html");
        // const registeredUser = { firstname: $firstname, lastname: $lastname, adress: $adress, zipcode: $postNr, city: $ort, email: $mail, password: $password };
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        console.log(user);
 
      } else errorTxt.text("* Epost och lösenord matchar inte")
    } else errorTxt.text("* Epost och lösenord matchar inte")
  } else errorTxt.text("* Fyll i alla fälten korrekt")
}

async function checkEmail(form) {
  let inputEmail = $("#e-mail").val()
  const errorTxt = $("#alert")
  var responce = await fetch(resource)
  var data = await responce.json()
  if (validateMailNotEmpty()) {
    if(validateEmailBox()){
    let user = data.user.find(item => item.email === inputEmail)
    if (user !== undefined) {
      form.submit();
      alert("Ett mail har skickats till din inbox")
    } else errorTxt.text("* Användaren finns ej")
   } else errorTxt.text("* Fel e-post")
  } else errorTxt.text("* Fyll i alla fälten")
}

function checkPassword(user) {
  let inputPassword = $("#password").val()
  if (inputPassword === user.password)
    return true;
  else
    return false;
}

function validateMailNotEmpty() {
  let inputEmail = $("#e-mail").val()
  if (inputEmail == "")
    return false;
  else
    return true;
}

function validateNotEmpty() {
  let inputEmail = $("#e-mail").val()
  let inputPassword = $("#password").val()
  if (inputPassword == "" || inputEmail == "")
    return false;
  else
    return true;

}

function validateEmailBox() {
  let inputEmail = $("#e-mail").val()

  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;


  if (pattern.test(inputEmail)) {
    return true;
  } else {
    return (false);
  }
}
