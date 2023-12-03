let productsGrid = document.getElementById("products-grid");
let productsArray = [];
let url = "https://my-json-server.typicode.com/vitaliymv/TH-20-00-Web-middle";



let xhr = new XMLHttpRequest();
xhr.open("GET", url + "/products");
xhr.responseType = "json";
xhr.send();

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
            <a href="userProfile.html?id=${p.autor_id}">Seller profile</a>
            <button>Buy</button>
        `;
        productsGrid.appendChild(pElement)
    });
}