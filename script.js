console.log("SCRIPT BARU BERHASIL DIMUAT");
window.products = [

    {
        id: 1,
        name: "Tumbler Stainless",
        price: 89000,
        image: "images/tumbler.jpg"
    },

    {
        id: 2,
        name: "Gelas Kaca Premium",
        price: 45000,
        image: "images/gelas.jpg"
    },

    {
        id: 3,
        name: "Piring Keramik",
        price: 39000,
        image: "images/piring.jpg"
    },

    {
        id: 4,
        name: "Tempat Makan",
        price: 65000,
        image: "images/tempat makan.jpg"
    },

    {
        id: 5,
        name: "Sendok & Garpu Set",
        price: 55000,
        image: "images/sendok dan garpu set.jpg"
    },

    {
        id: 6,
        name: "Mangkok Keramik",
        price: 42000,
        image: "images/mangkuk kramik.jpg"
    },

    {
        id: 7,
        name: "Sumpit Kayu",
        price: 20000,
        image: "images/sumpit kayu.jpg"
    },

    {
        id: 8,
        name: "Panci Stainless",
        price: 189000,
        image: "images/panci stainless.jpg"
    },

    {
        id: 9,
        name: "Tempat Saus",
        price: 25000,
        image: "images/tempat saus.jpg"
    },

    {
        id: 10,
        name: "Set Peralatan Dapur",
        price: 299000,
        image: "images/set peralatan dapur.jpg"
    }

];


// ===============================
// ADD TO CART (FIXED + GLOBAL)
// ===============================
window.addToCart = function(id){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = window.products.find(item => item.id === Number(id));

    let existing = cart.find(p => p.id === Number(id));

    if(existing){
        existing.qty += 1;
    }else{
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartBadge();

    alert(product.name + " berhasil ditambahkan ke keranjang 🛒");
};


// ===============================
// LOAD CART
// ===============================
function loadCart(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cart-items");

    if(!container) return;

    let total = 0;

    container.innerHTML = "";

    if(cart.length === 0){
        container.innerHTML = `<p class="text-center text-gray-500">Keranjang kosong 🛒</p>`;
        document.getElementById("total-price").innerHTML = "Rp 0";
        return;
    }

    cart.forEach(item => {

        total += item.price * item.qty;

        container.innerHTML += `
        <div class="flex justify-between items-center border-b py-5">

            <div class="flex items-center gap-5">

                <img src="${item.image}" class="w-24 h-28 object-cover rounded-xl">

                <div>
                    <h2 class="font-bold text-lg">${item.name}</h2>
                    <p class="text-pink-500 font-bold">
                        Rp ${item.price.toLocaleString("id-ID")}
                    </p>

                    <div class="flex items-center gap-3 mt-3">

                        <button onclick="decreaseQty(${item.id})"
                            class="bg-pink-300 w-8 h-8 rounded-full text-white">-</button>

                        <span>${item.qty}</span>

                        <button onclick="increaseQty(${item.id})"
                            class="bg-pink-400 w-8 h-8 rounded-full text-white">+</button>

                        <button onclick="removeItem(${item.id})"
                            class="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">
                            Hapus
                        </button>

                    </div>
                </div>

            </div>

            <h2 class="font-bold text-pink-500">
                Rp ${(item.price * item.qty).toLocaleString("id-ID")}
            </h2>

        </div>
        `;
    });

    document.getElementById("total-price").innerHTML =
        "Rp " + total.toLocaleString("id-ID");
}


// ===============================
// CART ACTIONS
// ===============================
window.increaseQty = function(id){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(p => p.id === Number(id));

    if(item) item.qty++;

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartBadge();
};

window.decreaseQty = function(id){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(p => p.id === Number(id));

    if(item){
        item.qty--;
        if(item.qty <= 0){
            cart = cart.filter(p => p.id !== Number(id));
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartBadge();
};

window.removeItem = function(id){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== Number(id));

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartBadge();
};


// ===============================
// CART BADGE (REAL TIME)
// ===============================
function updateCartBadge(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = cart.reduce((sum, item) => sum + item.qty, 0);

    let badge = document.getElementById("cart-count");

    if(badge){
        badge.innerText = total;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    updateCartBadge();
    loadCart();
});


// ===============================
// WISHLIST
// ===============================
window.toggleWishlist = function(id){

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    id = Number(id);

    if(wishlist.includes(id)){
        wishlist = wishlist.filter(item => item != id);
        alert("Dihapus dari wishlist ❤️");
    }else{
        wishlist.push(id);
        alert("Ditambahkan ke wishlist ❤️");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
};