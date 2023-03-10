export type PizzaItem = {
  id: number | string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzaSliceState {
  items: PizzaItem[];
  totalPages: number;
  status: Status;
}

export type Response = {
  items: PizzaItem[];
  count: number;
};
