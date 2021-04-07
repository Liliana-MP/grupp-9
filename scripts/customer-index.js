$(document).ready(function() {
fetchUser();
function fetchUser() {
    let $loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let $firstname = JSON.parse(localStorage.getItem("firstname"));
    console.log($firstname);

    let $fName = $loggedInUser.firstname;
    let $lName = $loggedInUser.lastname;
      let $adress = $loggedInUser.adress;
      let $email = $loggedInUser.email;
      let $tNum = $loggedInUser.phonenumber;
      let $cityId = $loggedInUser.cityid;
      console.log($cityId);

       document.forms["orderForm"]["fName"].value = $fName;
       document.forms["orderForm"]["lName"].value = $lName;
       document.forms["orderForm"]["adrs"].value = $adress;
       document.forms["orderForm"]["email"].value = $email;
       document.forms["orderForm"]["tNumber"].value = $tNum;
       document.forms["orderForm"]["city"].value = $cityId;


     }
     $("#btn-change-info").click(function(){
      $("#form-lock").removeAttr("disabled");
      // alert("Ändra funkar");
    
    });
    $("#btn-save-info").click(function(){
      
      $("#form-lock").prop("disabled", true);
      // alert("Spara funkar");
    
    });



    });