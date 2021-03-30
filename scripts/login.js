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
      } else errorTxt.text("* Epost och lösenord matchar inte")
    } else errorTxt.text("* Epost och lösenord matchar inte")
  } else errorTxt.text("* Fyll i alla fälten")
}

function checkEmail(user) {
  let inputEmail = $("#e-mail").val()
  if (inputEmail === user.email)
    return true;
  else
    return false;
}

function checkPassword(user) {
  let inputPassword = $("#password").val()
  if (inputPassword === user.password)
    return true;
  else
    return false;
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


  if (inputEmail.match(pattern)) {
    return true;
  } else {
    return (false);
  }
}
