export let cart = JSON.parse(localStorage.getItem('cart'))||
[
  
  
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

function savetolocalstorage(){
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

