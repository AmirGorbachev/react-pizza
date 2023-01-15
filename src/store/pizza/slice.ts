import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadPizzas } from "./asyncActions";
import { PizzaSliceState, Status, PizzaItem, Response } from "./types";

const initialState: PizzaSliceState = {
  items: [],
  totalPages: 1,
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaItem[]>) => {
      state.items = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(
      loadPizzas.fulfilled,
      (state, action: PayloadAction<Response>) => {
        state.status = Status.SUCCESS;
        state.items = action.payload.items;
        state.totalPages = Math.ceil(action.payload.count / 4);
      }
    );

    builder.addCase(loadPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems, setTotalPages } = pizzaSlice.actions;

export default pizzaSlice.reducer;
