let productForm = document.querySelector("#product-form");
productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://marketplace-a708.restdb.io/rest/products");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "65848e1b9b604bc355b1ea91");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.responseType = "json";

    let data = JSON.stringify({
        "name": event.target["name"].value,
        "description": event.target["description"].value,
        "price": event.target["price"].value,
        "photo_url": event.target["photo_url"].value
    });

    xhr.send(data);

    xhr.onload = () => {
        if (xhr.status == 201) {
            window.open("index.html", "_self");
        }
    }
});

let orders = document.getElementById("orders")
let xhr1 = new XMLHttpRequest();
xhr1.open("GET", "https://marketplace-a708.restdb.io/rest/orders");
xhr1.setRequestHeader("content-type", "application/json");
xhr1.setRequestHeader("x-apikey", "65848e1b9b604bc355b1ea91");
xhr1.setRequestHeader("cache-control", "no-cache");
xhr1.responseType = "json";
xhr1.send();
xhr1.onload = function () {
    let orderJSON = xhr1.response
    for (const order of orderJSON) {
        let statusColor = "text-white";
        if (order.status == "New") {
            statusColor = "text-warning"
        } else {
            statusColor = "text-seccess"
        }

        orders.innerHTML += `
            <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${order._id}" aria-expanded="true" aria-controls="collapse-${order._id}">
                            ${order._id} -> <span class="${statusColor}">${order.status}</span>
                        </button>
                    </h2>
                <div id="collapse-${order._id}" class="accordion-collapse collapse" data-bs-parent="#orders">
                    <div class="accordion-body">
                        <p>Customer name: <b>${order.name}</b></p>
                        <p>Customer address: <b>${order.address}</b></p>
                        <p>Customer phone: <b>${order.phone}</b></p>
                        <p>Customer post number: <b>${order.post_number}</b></p>
                        <div id="${order._id}" class="row row-cols-3"></div>
                        <button class="btn btn-primary" onclick="complete('${order._id}')">Mark as Completed</button>
                    </div>
                </div>
            </div>
        `;
        let productElement = document.getElementById(`${order._id}`)
        let productCount = {};
        let uniquProducts = [];
        let sum = 0;
        order.products.forEach(p => {
            if (!productCount[p._id]) {
                productCount[p._id] = 1;
                uniquProducts.push(p);

            } else {
                productCount[p._id]++;
            }
            sum += +p.price;
        })

        uniquProducts.forEach(p => {
            productElement.innerHTML += `
            <div class="col">
                <img class="float-start me-3 my-3" width="130px" src="${p.photo_url}">
                <p>${p.name}</p>
                (Quantity: ${productCount[p._id]})
                <p>${p.price}UAH</p>
                <div class="clearfix"></div>
            </div>
        `
        })
        let h3 = document.createElement('h3')
        h3.textContent = `Sum: ${sum}UAH`
        productElement.after(h3)
    }
}

function complete(id) {
    let status = JSON.stringify({
        "status":  "Completed"
    })
    let xhr2 = new XMLHttpRequest();
    xhr2.open("PUT", "https://marketplace-a708.restdb.io/rest/orders/" + id);
    xhr2.setRequestHeader("content-type", "application/json");
    xhr2.setRequestHeader("x-apikey", "65848e1b9b604bc355b1ea91");
    xhr2.setRequestHeader("cache-control", "no-cache");
    xhr2.responseType = "json";
    xhr2.send(status);
    xhr2.onload = function () {
        if (xhr2.status == 200) {
            location.reload();
        } else {
            alert("Some error")
        }
    } 
}