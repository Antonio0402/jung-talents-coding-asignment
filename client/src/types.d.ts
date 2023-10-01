type SHOE = {
  slug: string,
  sku: number;
  name: string,
  category: string;
  imageSrc: string,
  price: number,
  numOfColors: number,
}

type Cart = {
  product: SHOE;
  quantity: number;
}

type CheckoutItem = {
  amount: string;
  quantity: number,
  name: string;
  category: string;
  sku: string;
}

type FormItems = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  countryCode: string;
  postCode: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  payment: "pay-in-3" | "later"
}

type OrderObject = {
  totalAmount: string,
  firstName: string,
  lastName: string,
  suburb: string;
  line1: string;
  phone: string;
  countryCode: string;
  postcode: string;
  product: "pay-in-3" | "later"
  items: CheckoutItem[]
}

// type CheckoutItem = {
//   price: { currency: 'EUR', amount: string },
//   quantity: number,
//   name: string;
//   category: string;
//   sku: string;
// }

// export type OrderObject = {
//   totalAmount: {
//     currency: "EUR",
//     amount: string,
//   },
//   consumer: {
//     surname: string,
//     givenNames: string,
//   },
//   shipping: {
//     suburb: string,
//     line1: string
//     countryCode: string,
//     name: string,
//     postcode: string,
//     phoneNumber: string,
//   },
//   merchant: {
//     redirectCancelUrl: string,
//     redirectConfirmUrl: string
//   },
//   type: 'online',
//   product: "pay-in-3" | "later"
//   frequency: { number: 1, frequencyType: 'monthly' },
//   orderExpiryMilliseconds: 600000,
//   items: CheckoutItem[]
// }