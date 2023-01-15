export type CartItem = {
  id: number | string;
  title: string;
  price: number;
  count: number;
  imageUrl: string;
  size?: number;
  type?: number;
};

export interface CartSliceState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}
