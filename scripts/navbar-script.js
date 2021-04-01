$(document).ready(function () {
  loadNavbar();
  $("#logout-btn").click(function () {
    alert("Du har loggat ut från din kundsida");
    localStorage.clear();
    window.location.replace("index.html");
  });
});

function loadNavbar() {
  let $loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  let $newNavbar = $("#right-nav-form");
  if ($loggedInUser == null) {
    $($newNavbar).append(`<a
    href="login.html"
    id="login-btn"
    class="btn btn-outline-primary my-2 my-sm-0"
    >Logga in</a
  >
  <a
    href="cart.html"
    id="cart-btn"
    class="btn btn-outline-primary my-2 my-sm-0"
    >Varukorg</a
  >`);
  } else if ($loggedInUser.isadmin) {
    $($newNavbar).append(`
        <a
        href="customer-index.html"
        id="profile-btn"
        class="btn btn-outline-primary my-2 my-sm-0"
        >Profil</a
      >
        <a
        href="#"
        id="logout-btn"
        class="btn btn-outline-primary my-2 my-sm-0"
        >Logga ut</a
      >
      <a
        href="#"
        id="admin-btn"
        class="btn btn-outline-primary my-2 my-sm-0"
        >Admin panelen</a
      >
        `);
  } else if ($loggedInUser != null) {
    $($newNavbar).append(`
    <a
    href="customer-index.html"
    id="profile-btn"
    class="btn btn-outline-primary my-2 my-sm-0"
    >Profil</a
  >
    <a
    href="#"
    id="logout-btn"
    class="btn btn-outline-primary my-2 my-sm-0"
    >Logga ut</a
  >
  <a
    href="cart.html"
    id="cart-btn"
    class="btn btn-outline-primary my-2 my-sm-0"
    >Varukorg</a
  >`);
  }
}
