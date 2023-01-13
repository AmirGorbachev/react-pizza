import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadPizzas = createAsyncThunk(
  "pizza/load",
  async (params, thunkApi) => {
    const search = thunkApi.getState().filter.searchBy.trim();
    const category = thunkApi.getState().filter.category;
    const page = thunkApi.getState().filter.currentPage;
    const order = thunkApi.getState().filter.isOrderAsc;
    const sort = thunkApi.getState().filter.sort;

    const response = await axios.get(
      `https://63b84b4e6f4d5660c6d29fea.mockapi.io/pizzas`,
      {
        params: {
          ...params,
          search: search ? search : null,
          category: category > 0 ? category : null,
          page,
          order: order ? "acs" : "desc",
          sort,
          limit: 4,
        },
      }
    );

    if (response.data?.items.length === 0) {
      thunkApi.rejectWithValue();
    }

    return response.data;
  }
);

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
      state.items = action.payload.items;
      state.totalPages = Math.ceil(action.payload.count / 4);
    },
    [loadPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const selectPizza = (state) => state.pizza;
export const selectPizzaByID = (id) => (state) =>
  state.cart.items.find((item) => item.id === id);

export const { setItems, setTotalPages } = pizzaSlice.actions;

export default pizzaSlice.reducer;
