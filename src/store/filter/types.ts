export type SortItem = {
  title: string;
  value: "price" | "rating" | "title";
};

export type FilterParams = {
  category?: number;
  sort?: string;
  isOrderAsc?: boolean;
  currentPage?: number;
  searchBy?: string;
};

export interface FilterSliceState {
  category: number;
  sort: string;
  isOrderAsc: boolean;
  currentPage: number;
  searchBy: string;
}
