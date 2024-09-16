import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
import { loadproducts } from "../data/products.js";

// import '../data/cart-class.js'
// import '../backend/backendpractice.js'
loadproducts(()=>{
renderOrderSummary();
renderPaymentSummary();
})
