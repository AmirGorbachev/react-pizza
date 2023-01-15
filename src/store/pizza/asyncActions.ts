import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { FilterParams } from "../filter/types";
import { Response } from "./types";

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
