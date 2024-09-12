export const cart=[];

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
}

