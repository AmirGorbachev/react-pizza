import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadPizzas = createAsyncThunk("pizza/load", async (params) => {
  const { sortMask, orderMask, categoryMask, searchMask, currentPage } = params;

  const response = await axios.get(
    `https://63b84b4e6f4d5660c6d29fea.mockapi.io/pizzas`,
    { params }
  );

  return response.data;
});

const initialState = {
  items: [],
  totalPages: 1,
  status: "loading", // loading | success | error
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(loadPizzas.pending, (state, action) => {
  //       state.entities.push(action.payload)
  //     })
  //   },
  extraReducers: {
    [loadPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [loadPizzas.fulfilled]: (state, action) => {
      state.status = "success";
      console.log(action.payload);
      state.items = action.payload.items;
      state.totalPages = Math.ceil(action.payload.count / 4);
    },
    [loadPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems, setTotalPages } = pizzaSlice.actions;

export default pizzaSlice.reducer;
