
type Category = "sport-shoes"

type Product = {
  product_id: number;
  sku: string;
  title: string;
  slug: string;
  category: Category;
  img: string;
  numofcolors: number;
  price: string;
  created_at: string;
  modified_at: string;
}

type Cart = {
  product: Product;
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