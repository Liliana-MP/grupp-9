getOrders()

function getOrders() {
    fetch("db.json")
    .then(function(response){
        response.json()
        .then(function(data){
            data.order.forEach(element => {
                createOrders(element.id, element.userid, element.date)
            });
        })
    })
}

// onclick metod på a taggen som skickar ett API request med orderID
// Fixa när vi har API och databas
function createOrders(order, user, date) {
    document.getElementById("order-table").innerHTML += `
    <tr class="table-active" id="test">
      <th scope="row">${order}</th>
      <td>${date}</td>
      <td>${user}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td><a class="btn btn-outline-primary my-2 my-sm-0" id=${order} href="print-order.html">Till beställning</a></td>
    </tr>
  `

  console.log(order);
}