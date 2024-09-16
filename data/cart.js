export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryoptionid: "1"
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryoptionid: "2"
  },
];

export function savetolocalstorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
  
}

export function Addtocart(productId) {
  let c = 0;

  const k = document.querySelector(`.js-modify-${productId}`);

  const intervalId = setInterval(() => {
    k.classList.add("added-remove");
  }, 0);

  setTimeout(() => {
    clearInterval(intervalId);
    k.classList.remove("added-remove");
  }, 3000);

  let find = document.querySelector(`.js-quantity-selector-${productId}`);

  cart.forEach((cartitem) => {
    if (productId === cartitem.productId) {
      cartitem.quantity += Number(find.value);
      c++;
    }
  });
  if (c === 0) {
    cart.push({
      productId,
      quantity: Number(find.value),
      deliveryoptionid:'1'

    });
  }

  savetolocalstorage();
}



export function removeFromCart(productId){
    const newcart=[];
    cart.forEach((cartitem)=>{
      if(cartitem.productId!==productId){
        newcart.push(cartitem);
      }
    })
    cart=newcart;
     savetolocalstorage();
}

export function updatedeliveryoption(productId,deliveryOptionId){
  let matchingItem;
  cart.forEach((cartitem)=>{
    if(productId === cartitem.productId){
      matchingItem=cartitem;
    }
  });
   
  matchingItem.deliveryoptionid=deliveryOptionId;
  
  savetolocalstorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    console.log(xhr.response);
    console.log('load cart')
    fun();
  });
  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}


export function cartQuantity(){
  let quantity = 0;
  cart.forEach((item) => {
    quantity += Number(item.quantity);
  });
  return quantity;
}


