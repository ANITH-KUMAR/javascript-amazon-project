import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
import { loadproductsFetch } from "../data/products.js";
import { cart, loadCart } from "../data/cart.js";
// import '../data/cart-class.js'
// import '../backend/backendpractice.js'

async function loadPage()
{
   await loadproductsFetch();
   await new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
   });

   renderOrderSummary();
   renderPaymentSummary();
  
}
loadPage()

/*
Promise.all([
  loadproductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('hai');
    });
  }),
]).then((values)=>{
  console.log(values)
  renderOrderSummary();
  renderPaymentSummary();
});
*/
/*
new Promise((resolve)=>{
  loadproducts(()=>{
    resolve('value');
  });
}).then((value)=>{
  console.log(value)
  return new Promise((resolve)=>{
          loadCart(()=>{
            resolve();
          });
  })
 
}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/
/*
loadproducts(()=>{
  loadCart(()=>{
      renderOrderSummary();
      renderPaymentSummary();
  });

})
  */

