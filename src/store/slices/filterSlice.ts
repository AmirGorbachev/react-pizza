import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

type SortItem = {
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

const initialState: FilterSliceState = {
  category: 0,
  sort: "rating",
  isOrderAsc: true,
  currentPage: 1,
  searchBy: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setOrderAsc: (state, action: PayloadAction<boolean>) => {
      state.isOrderAsc = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchBy: (state, action: PayloadAction<string>) => {
      state.searchBy = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterParams>) => {
      state.category = Number(action.payload.category) || 0;
      state.sort = action.payload.sort || "rating";
      state.currentPage = Number(action.payload.currentPage) || 1;
      state.searchBy = action.payload.searchBy || "";
      state.isOrderAsc = action.payload.isOrderAsc || true;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const {
  setCategory,
  setSort,
  setOrderAsc,
  setCurrentPage,
  setSearchBy,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
