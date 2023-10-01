
type CheckoutItem = {
  price: { currency: 'EUR', amount: string },
  quantity: number,
  name: string;
  category: string;
  sku: string;
}

export type OrderObject = {
  totalAmount: {
    currency: "EUR",
    amount: string,
  },
  consumer: {
    surname: string,
    givenNames: string,
  },
  shipping: {
    suburb: string,
    line1: string
    countryCode: string,
    name: string,
    postcode: string,
    phoneNumber: string,
  },
  merchant: {
    redirectCancelUrl: string,
    redirectConfirmUrl: string
  },
  type: 'online',
  product: "pay-in-3" | "later"
  frequency: { number: 1, frequencyType: 'monthly' },
  orderExpiryMilliseconds: 600000,
  items: CheckoutItem[]
}