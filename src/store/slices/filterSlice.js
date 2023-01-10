import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
  sortList: [
    { title: "популярности", value: "rating" },
    { title: "цене", value: "price" },
    { title: "алфавиту", value: "title" },
  ],
  sort: "rating",
  isOrderAsc: true,
  currentPage: 1,
  totalPages: 1,
  searchBy: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setOrderAsc: (state, action) => {
      state.isOrderAsc = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setSearchBy: (state, action) => {
      state.searchBy = action.payload;
    },
    setFilters: (state, action) => {
      state.category = Number(action.payload.category);
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.searchBy = action.payload.searchBy;
      state.isOrderAsc = Boolean(action.payload.isOrderAsc);
    },
  },
});

export const {
  setCategory,
  setSort,
  setOrderAsc,
  setCurrentPage,
  setTotalPages,
  setSearchBy,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
