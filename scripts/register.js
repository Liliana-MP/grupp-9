// $(document).ready(function(){

// // $("#btn-submit").click(function(){
// // $("#btn-submit").click(function(){
// function saveUser(){
// var fname = document.forms["register-form"]["firstname"].value;
// var lname = document.forms["register-form"]["lastname"].value;
// var adress = document.forms["register-form"]["address"].value;
// var zipcode = document.forms["register-form"]["postN"].value;
// var city = document.forms["register-form"]["ort"].value;
// var email = document.forms["register-form"]["mail"].value;
// var pw = document.forms["register-form"]["password"].value;

// console.log(fname);
// // const registeredUser = { firstname: fname, lastname: lname, adress: adress, zipcode: zipcode, city: city, email: email, password: pw };
// // localStorage.setItem("registeredUser", JSON.stringify(registeredUser));
// // const getMyObject= JSON.parse(localStorage.getItem("registeredUser"));
// // console.log(getMyObject);

// }

// // });

// function checkForm(form) {
//     let $firstname = $("#firstname").val();
//     let $lastname = $("#lastname").val();
//     let $adress = $("#adress").val();
//     let $postNr = $("#postNr").val();
//     let $ort = $("#ort").val();
//     let $mail = $("#mail").val();
//     let $password = $("#password").val();
//     // alert("TEST TEST");
//     console.log("TEST")
//     if (
//       $firstname == "" ||
//       $lastname == "" ||
//       $adress == "" ||
//       $postNr == "" ||
//       $ort == "" ||
//       $mail == "" ||
//       $password == ""
//     ) {
//       $("#alert").text("* Fyll i alla fälten");
//        return false;
//     } else {
//         const registeredUser = { firstname: $firstname, lastname: $lastname, adress: $adress, zipcode: $postNr, city: $ort, email: $mail, password: $password };
//         localStorage.setItem("registeredUser", JSON.stringify(registeredUser));
//         const getMyObject= JSON.parse(localStorage.getItem("registeredUser"));
//         console.log(getMyObject);
//     //   form.submit();
//     return true;
//     //   saveUser()

//     }
//   }


// });

function checkForm(form) {
    let $firstname = $("#firstname").val();
    let $lastname = $("#lastname").val();
    let $adress = $("#adress").val();
    let $postNr = $("#postNr").val();
    let $ort = $("#ort").val();
    let $mail = $("#mail").val();
    let $password = $("#password").val();

    if (
      $firstname == "" ||
      $lastname == "" ||
      $adress == "" ||
      $postNr == "" ||
      $ort == "" ||
      $mail == "" ||
      $password == ""
    ) {
      $("#alert").text("* Fyll i alla fälten");
    } else {
        const registeredUser = { firstname: $firstname, lastname: $lastname, adress: $adress, zipcode: $postNr, city: $ort, email: $mail, password: $password };
        localStorage.setItem("registeredUser", JSON.stringify(registeredUser));
        const getMyObject= JSON.parse(localStorage.getItem("registeredUser"));
        console.log(getMyObject);
      form.submit();
    }
  }