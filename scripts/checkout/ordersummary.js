import { cart, removeFromCart, updatedeliveryoption,cartQuantity,savetolocalstorage } from "../../data/cart.js";
import { renderPaymentSummary } from "./paymentsummary.js";
import { products,getProduct } from "../../data/products.js";
import formatmoney from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryoptions, getDeliveryOption } from "../../data/delivery.js";
import { renderProductsGrid } from "../amazon.js";

const today = dayjs();
const deliverydate = today.add(7, "days");

export function renderOrderSummary() {
  let cartsummary = "";
  let quantity = cartQuantity();
  document.querySelector(
    ".change-the-cart-total"
  ).innerHTML = `${quantity} items`;
  cart.forEach((cartitem) => {
    const productId = cartitem.productId;

    const matchingproduct=getProduct(productId);

    const deleveryoptionid = cartitem.deliveryoptionid;
    const deliveryoption=getDeliveryOption(deleveryoptionid);
    const today = dayjs();
    const deliverydate = today.add(deliveryoption.delivaryDays, "days");
    const dateString = deliverydate.format(`dddd, MMMM D`);
    

    cartsummary += `
        <div class="cart-item-container js-cart-item-container-${
          matchingproduct.id
        }">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingproduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingproduct.name}
                  </div>
                  <div class="product-price">
                    ${matchingproduct.getprice()}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${
                        cartitem.quantity
                      }</span>
                    </span>
                    
                    
                    <span class="update-quantity-link
                     link-primary" data-pro-id=${productId}>
                      Update
                     
            <select class="js-update-value-${productId}  find-option quantity-css" data-product-id=${productId} >
              <option value="0">0</option>
              <option value="1">1</option>
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
        
                      
                    </span>
                    <span 
                    class="delete-quantity-link link-primary js-delete-link"
                    data-product-id="${matchingproduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryoptionhtml(matchingproduct, cartitem)}
                </div>
              </div>
        </div>
        `;


        
  });

  function deliveryoptionhtml(matchingproduct, cartitem) {
    let html = "";
    deliveryoptions.forEach((deleveryoption) => {
      const today = dayjs();
      const deliverydate = today.add(deleveryoption.delivaryDays, "days");
      const dateString = deliverydate.format(`dddd, MMMM D`);

      const extraprice =
        deleveryoption.price === 0 ? "FREE" : `₹${deleveryoption.price}`;
      const ischecked = deleveryoption.id === cartitem.deliveryoptionid;

      html += `<div class="delivery-option  js-delivery-option"
                  data-product-id="${matchingproduct.id}"
                  data-delivery-option-id="${deleveryoption.id}">
                      <input type="radio"
                        ${ischecked ? "checked" : ""}
                        class="delivery-option-input"
                        name="delivery-option-${matchingproduct.id}">
                      <div>
                        <div class="delivery-option-date">
                          ${dateString}
                        </div>
                        <div class="delivery-option-price">
                          ${extraprice} - Shipping
                        </div>
                      </div>
                    </div>`;
    });

    
    return html;
  }


  document.querySelector(".js-order-summary").innerHTML = cartsummary;
  

  document.querySelectorAll(".link-primary").forEach((doc)=>{
   let {proId}=doc.dataset;
   
  doc.addEventListener('click',()=>{
          show(proId);
          

  });
});

function show(proId){
  document
    .querySelector(`.js-update-value-${proId}`)
    .classList.remove("quantity-css");

}


  document.querySelectorAll('.find-option').forEach((e)=>{
      e.addEventListener('change',()=>{
            const {productId}=e.dataset;
            let tar;
             cart.forEach((match)=>{
                 if(productId === match.productId){
                     tar = match;
                     
                 }
                 
             })
             tar.quantity=Number(e.value);
             
             savetolocalstorage();
             renderOrderSummary();
             renderPaymentSummary();
               renderProductsGrid();
      });
  });


  
 

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productid = link.dataset.productId;
      removeFromCart(productid);
      
      let quantity = 0;
      cart.forEach((item) => {
        quantity += item.quantity;
      });
      

      const container = document.querySelector(
        `.js-cart-item-container-${productid}`
      );
      container.remove();
      document.querySelector(
        ".change-the-cart-total"
      ).innerHTML = `${quantity} items`;
       renderPaymentSummary();
       renderProductsGrid();
    });
   
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updatedeliveryoption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}




