$(document).ready(function() {
    $.getJSON("db.json", function(customer) {
        // $.getJSON("products.json", function(item) {
          let data = customer.db;
        //   console.log(data);
          $.each(data, function(i) {
            $("#test").append(
             

            );
          });