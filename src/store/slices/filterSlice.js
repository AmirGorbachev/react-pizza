import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 0,
  sortList: [
    { title: "популярности", value: "rating" },
    { title: "цене", value: "price" },
    { title: "алфавиту", value: "title" },
  ],
  sort: { title: "популярности", value: "rating" },
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
  },
});

export const {
  setCategory,
  setSort,
  setOrderAsc,
  setCurrentPage,
  setTotalPages,
  setSearchBy,
} = filterSlice.actions;

export default filterSlice.reducer;
