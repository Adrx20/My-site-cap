// 65848e1b9b604bc355b1ea91	

let productsGrid = document.getElementById("products-grid");
let productsArray = [];
let cartProducts = document.getElementById("cart-products")
let cart = [];

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    drawCart();
}

let xhr = new XMLHttpRequest();
xhr.open("GET", "https://marketplace-a708.restdb.io/rest/products");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "65848e1b9b604bc355b1ea91");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.responseType = "json";
xhr.send();

function buyAll() {
    cart = [];
    localStorage.removeItem("cart");
    cartProducts.innerHTML = "Money was withdrawn from your card";
}

xhr.onload = () => {
    productsGrid.inner = null;
    let data = xhr.response;
    data.forEach(p => {
        productsArray.push(p);
        let pElement = document.createElement("div");
        pElement.classList.add("product");
        pElement.innerHTML = `
            <h2 class="product-name">${p.name}</h2>
            <img src="${p.photo_url}" class="product-img" alt="${p.name}">
            <p class="product-desc"><b>${p.description}</b></p>
            <p class="product-price"><b>Price: </b>${p.price}UAH</p>
            <a href="userProfile.html?id=${p.author_id}">Seller profile</a>
            <button onclick="addProductToCart('${p._id}')">Buy</button>
        `;
        productsGrid.appendChild(pElement);
    });
}

function openCart() {
    cartProducts.classList.toggle("hide");
}

let cartButton = document.getElementById("cart-button")
function addProductToCart(id) {
    let product = productsArray.find((p) => {
        return p._id == id;
    })
    
    cart.push(product); 
    drawCart()
    localStorage.setItem("cart", JSON.stringify(cart))
    cartButton.classList.add("active")
    setTimeout(() => {
        cartButton.classList.remove("active")
    }, 500);
}

function drawCart() {
    if (cart.lenght == 0) return cartProducts.innerHTML = "Cart is empty";
    cartProducts.innerHTML = null;
    let productCount = {};
    let uniquProducts = [];
    let sum = 0;
    cart.forEach(p => {
        if (!productCount[p._id]) {
            productCount[p._id] = 1;
            uniquProducts.push(p);

        } else {
            productCount[p._id]++;
        }
        sum += +p.price;
    })

    uniquProducts.forEach(p => {
        cartProducts.innerHTML += `
            <p>
                <img src="${p.photo_url}">
                ${p.name}<br></br>
                <b>${p.price}</b>
                (Quantity: ${productCount[p._id]})
            </p><hr>
        `
    })
    cartProducts.innerHTML += `
        <p>Total price: ${sum}UAH</p>
        <button onclick="buyAll()">Buy all</button>
        <button onclick="buyAll()">Buy all</button>
    `
}


