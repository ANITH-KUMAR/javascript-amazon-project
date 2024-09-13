import { cart,removeFromCart,updatedeliveryoption} from "../data/cart.js";
import { products } from "../data/products.js";
import  formatmoney  from "./utils/money.js";
import  dayjs  from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryoptions} from"../data/delivery.js"
// console.log(deliveryoptions);
const today=dayjs();
const deliverydate=today.add(7,'days');
// console.log(deliverydate.format(`dddd,MMMM D`));
function renderOrderSummary(){


    let cartsummary="";
    let quantity = 0;
    cart.forEach((item) => {
      quantity += item.quantity;
    });
    document.querySelector(
      ".change-the-cart-total"
    ).innerHTML = `${quantity} items`;
    cart.forEach((cartitem)=>{
      const productId=cartitem.productId;

      let matchingproduct;
      
      products.forEach((product)=>{
        if(product.id==productId){
          matchingproduct=product;
        }

      })
      
      const deleveryoptionid = cartitem.deliveryoptionid;
      let deliveryoption;
      deliveryoptions.forEach((option)=>{
              if(option.id==deleveryoptionid)
                    deliveryoption=option;
      });
          const today = dayjs();
          const deliverydate = today.add(deliveryoption.delivaryDays, "days");
          const dateString = deliverydate.format(`dddd, MMMM D`);
    // console.log(deliveryoption)

      cartsummary+=
        `
        <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
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
                    ₹${formatmoney(matchingproduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link"
                    data-product-id="${matchingproduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryoptionhtml(matchingproduct,cartitem)}
                </div>
              </div>
        </div>
        `;
    });

    function deliveryoptionhtml(matchingproduct,cartitem){
            let html='';
              deliveryoptions.forEach((deleveryoption)=>{
                  const today=dayjs();
                  const deliverydate=today.add(
                    deleveryoption.delivaryDays,
                    'days'
                  );
                  const dateString=deliverydate.format(`dddd, MMMM D`);

                  const extraprice=deleveryoption.price === 0?'FREE':`₹${deleveryoption.price}`
                  const ischecked = deleveryoption.id === cartitem.deliveryoptionid;
                  
                  html+=`<div class="delivery-option  js-delivery-option"
                  data-product-id="${matchingproduct.id}"
                  data-delivery-option-id="${deleveryoption.id}">
                      <input type="radio"
                        ${ischecked? 'checked': '' }
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


    document.querySelector('.js-order-summary').innerHTML=cartsummary;

    document.querySelectorAll('.js-delete-link').forEach((link)=>{
      link.addEventListener('click',()=>{
        const productid=link.dataset.productId;
        removeFromCart(productid);
        
          let quantity = 0;
          cart.forEach((item) => {
            quantity += item.quantity;
          });

        const container=document.querySelector(`.js-cart-item-container-${productid}`)
          container.remove();

          document.querySelector(
            ".change-the-cart-total"
          ).innerHTML = `${quantity} items`;
      })
        

    });

    document.querySelectorAll(".js-delivery-option").forEach((element)=>{
      element.addEventListener('click',()=>{
        const {productId,deliveryOptionId}=element.dataset;
            updatedeliveryoption(productId,deliveryOptionId);
            renderOrderSummary();
      });

    });

}
renderOrderSummary();