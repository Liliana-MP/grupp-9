$(document).ready(function() {
fetchUser();
function fetchUser() {
    let $loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let $firstname = JSON.parse(localStorage.getItem("firstname"));
    // console.log($firstname);
    // let $user = $("id för formulär");
    let $uName = $loggedInUser.firstname + " " + lastname;
      let $adress = $loggedInUser.adress;
      let $email = $loggedInUser.email;
      let $tNum = $loggedInUser.phonenumber;
      let $cityId = $loggedInUser.cityid;



       document.forms["orderForm"]["fName"].value = $uName;
    //    document.forms["orderForm"]["adress"].value = $adress;
    //    document.forms["orderForm"]["email"].value = $email;
    //    document.forms["orderForm"]["phonenumber"].value = $tNum;
    //    document.forms["orderForm"]["cityid"].value = $cityId;

    // for (let i = 0; i < $loggedInUser.length; i++) {
    //   let $uName = $loggedInUser[i].firstname + lastname;
    //   let $adress = $loggedInUser[i].adress;
    //   let $email = $loggedInUser[i].email;
    //   let $tNum = $loggedInUser[i].phonenumber;
    //   let $cityId = $loggedInUser[i].cityid;

    // //   $($user).append(
    // //     "<li class='item-name'>" +
    // //       "<div class='order-img'>" +
    // //       "<img class='item-img' src=" +
    // //       $name +
    // //       ">" +
    // //       "</div>" +
    // //       "<div class='order-text'>" +
    // //       "<span class='item-qty'>" +
    // //       $p +
    // //       " st</span>" +
    // //       " " +
    // //       "<span>" +
    // //       $ +
    // //       "</span>" +
    // //       " " +
    // //       "<span class='item-price'>" +
    // //       $ +
    // //       " kr" +
    // //       "</span>" +
    // //       "</div>" +
    // //       "</li>"
    // //   );
     }
    });