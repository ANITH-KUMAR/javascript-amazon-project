export function formatmoney(price){
  price=Math.round((price*0.1*3)).toFixed(2);
  return price;

}

export default formatmoney;