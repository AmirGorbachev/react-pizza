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
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { setCategory, setSort, setOrderAsc } = filterSlice.actions;

export default filterSlice.reducer;
