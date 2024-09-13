export const deliveryoptions = [
  {
    id: "1",
    delivaryDays: 7,
    price: 0,
  },
  {
    id: "2",
    delivaryDays: 3,
    price: 30,
  },
  {
    id: "3",
    delivaryDays: 0,
    price: 60,
  }
];

export function getDeliveryOption(deleveryoptionid){
  let deliveryoption;
  deliveryoptions.forEach((option) => {
    if (option.id == deleveryoptionid) deliveryoption = option;
  });
  return deliveryoption ||deliveryoptions[0];

}
