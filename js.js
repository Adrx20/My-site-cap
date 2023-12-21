let productsGrid = document.getElementById("products-grid");
let productsArray = [];
let url = "https://my-json-server.typicode.com/vitaliymv/TH-20-00-Web-middle";
let cartProducts = document.getElementById("cart-products")
let cart = [];

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    drawCart();
}

let xhr = new XMLHttpRequest();
xhr.open("GET", url + "/products");
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
            <button onclick="addProductToCart(${p.id})">Buy</button>
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
        return p.id == id;
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
        if (!productCount[p.id]) {
            productCount[p.id] = 1;
            uniquProducts.push(p);

        } else {
            productCount[p.id]++;
        }
        sum += +p.price;
    })

    uniquProducts.forEach(p => {
        cartProducts.innerHTML += `
            <p>
                <img src="${p.photo_url}">
                ${p.name}<br></br>
                <b>${p.price}</b>
                (Quantity: ${productCount[p.id]})
            </p><hr>
        `
    })
    cartProducts.innerHTML += `
        <p>Total price: ${sum}UAH</p>
        <button onclick="buyAll()">Buy all</button>
    `
}