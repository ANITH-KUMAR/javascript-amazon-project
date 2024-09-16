import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
import { loadproductsFetch } from "../data/products.js";
import { cart, loadCart } from "../data/cart.js";
import { orders } from "../data/orders.js";
// import '../data/cart-class.js'
// import '../backend/backendpractice.js'

async function loadPage()
{
  try{

      await loadproductsFetch();
   await new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
   });
  }
  catch(error){
      console.log('error in loading products');
  }

   

   renderOrderSummary();
   renderPaymentSummary();
  
}
loadPage();
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

