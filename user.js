let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
let userProductsGrid = document.getElementById("user-products-grid");
let profile = document.getElementById("profile");
let url = "https://my-json-server.typicode.com/vitaliymv/TH-20-00-Web-middle/";

let xhr = new XMLHttpRequest();
xhr.open("GET", url + "users/" + id);
xhr.responseType = "json";
xhr.send();

xhr.onload = () => {
    let user = xhr.response;
    console.log(user);
    profile.innerHTML = `
        <h1>${user.name}</h1>
        <img src="${user.img}" alt="${user.name}" class="profile-img">
        <p>Balance: ${user.balance}UAH</p>
    `
}

let pXhr = new XMLHttpRequest();
pXhr.open("GET", url + "products?author_id=" + id);
pXhr.responseType = "json";
pXhr.send();
pXhr.onload = () => {
    let products = pXhr.response;
    products.forEach(p => {
        userProductsGrid.innerHTML += `
            <div class="product">
                <h2 class="product-name">${p.name}</h2>
                <img src="${p.photo_url}" alt="${p.name}" class="product-img">
                <p class="product-desc">
                    <b>Description:</b> ${p.description}
                </p>
                <p class="product-price">
                    <b>Price</b> ${p.price}UAH
                </p>
            </div>
        `
    });
}