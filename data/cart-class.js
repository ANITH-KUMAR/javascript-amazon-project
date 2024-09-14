class Cart {
  cartitems;
  localStoragekey;

  constructor(localStoragekey){
       this.localStoragekey = localStoragekey;
       this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartitems = JSON.parse(localStorage.getItem(this.localStoragekey));
    if (!this.cartitems) {
      this.cartitems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryoptionid: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryoptionid: "2",
        },
      ];
    }
  }


  savetostorage() {
    localStorage.setItem(this.localStoragekey, JSON.stringify(this.cartitems));
  }

  addToCart(productId) {
    let matchingItem;

    this.cartitems.forEach((cartitem) => {
      if (productId === cartitem.productId) {
        matchingItem = cartitem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartitems.push({
        productId: productId,
        quantity: 1,
        deliveryoptionid: "1",
      });
    }
    this.savetostorage();
  }

  removeFromCart(productId) {
    const newcart = [];
    this.cartitems.forEach((cartitem) => {
      if (cartitem.productId !== productId) {
        newcart.push(cartitem);
      }
    });
    this.cartitemst = newcart;
    this.savetostorage();
  }
  updatedeliveryoption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartitems.forEach((cartitem) => {
      if (productId === cartitem.productId) {
        matchingItem = cartitem;
      }
    });

    matchingItem.deliveryoptionid = deliveryOptionId;

    this.savetostorage();
  }
}

const cart=new Cart('cart-oop');
const businesscart = new Cart('cart-business');
cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c");

console.log(cart);
console.log(businesscart);