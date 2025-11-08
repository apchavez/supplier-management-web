import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listProviders, addProvider, deleteProvider } from "../../api/client";

const initialState = {
  page: null,
  loading: false,
  error: null,
  pageIndex: 0,
  pageSize: 10,
  query: "",
};

export const loadProviders = createAsyncThunk(
  "providers/load",
  async (_, { getState }) => {
    const { pageIndex, pageSize } = getState().providers;
    return await listProviders(pageIndex, pageSize);
  }
);

export const createProvider = createAsyncThunk(
  "providers/create",
  async (payload, { dispatch }) => {
    const res = await addProvider(payload);
    await dispatch(loadProviders());
    return res;
  }
);

export const removeProvider = createAsyncThunk(
  "providers/remove",
  async (id, { dispatch }) => {
    await deleteProvider(id);
    await dispatch(loadProviders());
    return id;
  }
);

const slice = createSlice({
  name: "providers",
  initialState,
  reducers: {
    setPageIndex(state, action) {
      state.pageIndex = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProviders.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loadProviders.fulfilled, (s, a) => {
        s.loading = false;
        s.page = a.payload;
      })
      .addCase(loadProviders.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message || "Error";
      })
      .addCase(createProvider.rejected, (s, a) => {
        s.error = a.error.message || "Error";
      })
      .addCase(removeProvider.rejected, (s, a) => {
        s.error = a.error.message || "Error";
      });
  },
});

export const { setPageIndex, setPageSize, setQuery } = slice.actions;
export default slice.reducer;
