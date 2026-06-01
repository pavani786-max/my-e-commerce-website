const cartBtn = document.getElementById("cartBtn");
const wishlistBtn = document.getElementById("wishlistBtn");

const cartSidebar = document.getElementById("cartSidebar");
const wishlistSidebar = document.getElementById("wishlistSidebar");

const cartItems = document.getElementById("cartItems");
const wishlistItems = document.getElementById("wishlistItems");

const cartCount = document.getElementById("cartCount");
const wishlistCount = document.getElementById("wishlistCount");

const cartTotal = document.getElementById("cartTotal");

const toast = document.getElementById("toast");

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function() {

  const searchValue = this.value.toLowerCase();

  const products =
  document.querySelectorAll(".product-card");

  products.forEach(product => {

    const productName =
    product.dataset.name.toLowerCase();

    if(productName.includes(searchValue)){
      product.style.display = "block";
    }else{
      product.style.display = "none";
    }

  });

});

const darkModeBtn = document.getElementById("darkModeBtn");

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];


/* TOAST */

function showToast(message){

toast.innerText = message;

toast.style.display = "block";

setTimeout(()=>{

toast.style.display = "none";

},2000);

}


/* CART UPDATE */

function updateCart(){

cartItems.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

total += item.price;

cartItems.innerHTML += `
<div style="
padding:10px;
border-bottom:1px solid #ddd;
margin-bottom:10px;
">

<h4>${item.name}</h4>

<p>$${item.price}</p>

<button onclick="removeCart(${index})">
Remove
</button>

</div>
`;

});

cartCount.innerText = cart.length;

cartTotal.innerText =
"Total : $" + total;

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

}


/* WISHLIST UPDATE */

function updateWishlist(){

wishlistItems.innerHTML = "";

wishlist.forEach((item,index)=>{

wishlistItems.innerHTML += `
<div style="
padding:10px;
border-bottom:1px solid #ddd;
margin-bottom:10px;
">

<h4>${item.name}</h4>

<p>$${item.price}</p>

<button onclick="removeWishlist(${index})">
Remove
</button>

</div>
`;

});

wishlistCount.innerText =
wishlist.length;

localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);

}


/* REMOVE CART */

function removeCart(index){

cart.splice(index,1);

updateCart();

showToast("Removed From Cart");

}


/* REMOVE WISHLIST */

function removeWishlist(index){

wishlist.splice(index,1);

updateWishlist();

showToast("Removed From Wishlist");

}


/* ADD TO CART */

document
.querySelectorAll(".add-cart")
.forEach(button=>{

button.addEventListener(
"click",
function(){

const card =
this.closest(".product-card");

const product = {

name:
card.dataset.name,

price:
Number(card.dataset.price)

};

cart.push(product);

updateCart();

showToast(
"Added To Cart"
);

});

});


/* WISHLIST */

document
.querySelectorAll(".wishlist")
.forEach(button=>{

button.addEventListener(
"click",
function(){

const card =
this.closest(".product-card");

const product = {

name:
card.dataset.name,

price:
Number(card.dataset.price)

};

wishlist.push(product);

updateWishlist();

showToast(
"Added To Wishlist"
);

});

});


/* SIDEBARS */

cartBtn.addEventListener(
"click",
()=>{

cartSidebar.classList.toggle(
"active"
);

wishlistSidebar.classList.remove(
"active"
);

});

wishlistBtn.addEventListener(
"click",
()=>{

wishlistSidebar.classList.toggle(
"active"
);

cartSidebar.classList.remove(
"active"
);

});


/* PRODUCT DETAILS */

const modal =
document.getElementById(
"productModal"
);

const modalTitle =
document.getElementById(
"modalTitle"
);

const modalPrice =
document.getElementById(
"modalPrice"
);

document
.querySelectorAll(".details-btn")
.forEach(button=>{

button.addEventListener(
"click",
function(){

const card =
this.closest(".product-card");

modalTitle.innerText =
card.dataset.name;

modalPrice.innerText =
"$" +
card.dataset.price;

modal.style.display =
"flex";

});

});


document
.querySelector(".closeModal")
.addEventListener(
"click",
()=>{

modal.style.display =
"none";

});


window.addEventListener(
"click",
e=>{

if(e.target === modal){

modal.style.display =
"none";

}

});


/* SEARCH */

searchInput.addEventListener(
"keyup",
function(){

const value =
this.value.toLowerCase();

document
.querySelectorAll(
".product-card"
)
.forEach(card=>{

const text =
card.dataset.name
.toLowerCase();

card.style.display =
text.includes(value)
? "block"
: "none";

});

});


/* CHECKOUT */

const checkoutBtn =
document.getElementById(
"checkoutBtn"
);

const checkoutModal =
document.getElementById(
"checkoutModal"
);

checkoutBtn.addEventListener(
"click",
()=>{

if(cart.length===0){

showToast(
"Cart Empty"
);

return;

}

checkoutModal.style.display =
"flex";

});


const checkoutForm =
document.getElementById(
"checkoutForm"
);

checkoutForm.addEventListener(
"submit",
function(e){

e.preventDefault();

showToast(
"🎉 Order Confirmed"
);

cart = [];

updateCart();

checkoutModal.style.display =
"none";

this.reset();

});


window.addEventListener(
"click",
e=>{

if(
e.target === checkoutModal
){

checkoutModal.style.display =
"none";

}

});


/* DARK MODE */

darkModeBtn.addEventListener(
"click",
()=>{

document.body.classList.toggle(
"dark"
);

});


/* INITIAL LOAD */

updateCart();

updateWishlist();
/* NEWSLETTER SUBSCRIBE */

const subscribeBtn =
document.querySelector(".newsletter-box button");

const subscribeInput =
document.querySelector(".newsletter-box input");

subscribeBtn.addEventListener("click", () => {

if(subscribeInput.value.trim() === ""){

showToast("Enter Email Address");

return;

}

showToast("✅ Subscribed Successfully");

subscribeInput.value = "";

});
/* CONTACT FORM */

const contactForm =
document.querySelector(".contact form");

contactForm.addEventListener(
"submit",
function(e){

e.preventDefault();

showToast("✅ Message Sent Successfully");

this.reset();

});