export type Product = {
  product_id: number;
  sku: string;
  title: string;
  slug: string;
  category: Category;
  img: string;
  numOfColors: number;
  price: string;
  created_at: string;
  modified_at: string;
}

export type Category = 'sport-shoes'
