import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { FilterParams } from "./filterSlice";
import { RootState } from "..";

type Response = {
  items: PizzaItem[];
  count: number;
};

// export const loadPizzas = createAsyncThunk<PizzaItem[], Filter>(
export const loadPizzas = createAsyncThunk<
  Response,
  FilterParams,
  { state: RootState }
>("pizza/load", async (params, thunkApi) => {
  const search = thunkApi.getState().filter.searchBy.trim();
  const category = thunkApi.getState().filter.category;
  const page = thunkApi.getState().filter.currentPage;
  const order = thunkApi.getState().filter.isOrderAsc;
  const sortBy = thunkApi.getState().filter.sort;

  const response = await axios.get<Response>(
    `https://63b84b4e6f4d5660c6d29fea.mockapi.io/pizzas`,
    {
      params: {
        ...params,
        search: search ? search : null,
        category: category > 0 ? category : null,
        page,
        order: order ? "acs" : "desc",
        sortBy,
        limit: 4,
      },
    }
  );

  if (response.data?.items.length === 0) {
    thunkApi.rejectWithValue([]);
  }

  return response.data as Response;
});

type PizzaItem = {
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

interface PizzaSliceState {
  items: PizzaItem[];
  totalPages: number;
  status: Status;
}

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

export const selectPizza = (state: RootState) => state.pizza;
export const selectPizzaByID = (id: number | string) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);

export const { setItems, setTotalPages } = pizzaSlice.actions;

export default pizzaSlice.reducer;
