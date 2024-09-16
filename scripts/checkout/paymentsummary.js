import { cart,cartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/delivery.js";
import formatmoney from "../utils/money.js";
import { addOrder } from "../../data/orders.js";
export function renderPaymentSummary(){
  let productprice=0;
  let shippingprice=0;
  cart.forEach((element) => {
      let product=getProduct(element.productId);
     productprice+= formatmoney(product.priceCents)*element.quantity;
     
     const deliveryoption=getDeliveryOption(element.deliveryoptionid);
     shippingprice+=deliveryoption.price;
  });
  const totalbeforetax=productprice+shippingprice;
  const aftertaxprice=Math.round(totalbeforetax*0.05);
  const finalprice=totalbeforetax+aftertaxprice;

  const paymentsummaryhtml = `
      
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity()}):</div>
            <div class="payment-summary-money">
            ₹${productprice}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">₹${shippingprice}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">₹${totalbeforetax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (5%):</div>
            <div class="payment-summary-money">₹${aftertaxprice}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">₹${finalprice}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
  `;

  document.querySelector(`.js-payment-summary`).innerHTML = paymentsummaryhtml;

  document.querySelector('.js-place-order').addEventListener('click',async ()=>{

     try{
const response = await fetch("https://supersimplebackend.dev/orders", {
  method: "POST",
  headers: {
    "content-Type": "application/json",
  },
  body: JSON.stringify({
    cart: cart,
  }),
});
const order = await response.json();
addOrder(order);
     }
     catch(error){
         console.log('unexpected error try again later')
     }

   window.location.href='orders.html'
  });
  
}


