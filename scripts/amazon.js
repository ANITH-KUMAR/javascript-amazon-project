import {cart,Addtocart} from '../data/cart.js'
import { products } from '../data/products.js';
import { formatmoney } from './utils/money.js';
let productshtml = "";
products.forEach((product) => {
  productshtml += `<div class="product-container">
        <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getstarurl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getprice()}
          </div>

          <div class="product-quantity-container ">
            <select class="js-quantity-selector-${product.id}" >
              <option  value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div class="added js-modify-${product.id}">
            <img id="img" src="images/icons/checkmark.png">Added
          </div>
          <div class="product-spacer"></div>


          <button class="add-to-cart-button button-primary js-add-to-cart" 
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
        `;
});
let cartquantity = 0;
cart.forEach((item) => {
  cartquantity += item.quantity;
});

document.querySelector(".js-cart-quantity").innerHTML = cartquantity;
document.querySelector(".products-js-grid").innerHTML = productshtml;

function updatecartquantity() {
let cartquantity = 0;
  cart.forEach((item) => {
    cartquantity += item.quantity;
  });
  
  document.querySelector(".js-cart-quantity").innerHTML = cartquantity;
}




document.querySelectorAll('.js-add-to-cart').
forEach((button)=>{
       button.addEventListener('click',()=>{
        const productId=button.dataset.productId;
        
        Addtocart(productId);//adding cart and added button
        
        updatecartquantity(productId);//update cart quantity
       });

})