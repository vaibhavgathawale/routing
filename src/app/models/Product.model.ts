export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  sizes: string[];
  selectedSize: string;
  image: string;
  isNew?: boolean; // optional
  quantity: number;

}