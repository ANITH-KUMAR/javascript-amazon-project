import { cart,cartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/delivery.js";
import formatmoney from "../utils/money.js";
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

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;
  document.querySelector(`.js-payment-summary`).innerHTML = paymentsummaryhtml;
}

