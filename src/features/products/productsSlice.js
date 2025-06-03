import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch("/products.json");
    return await res.json();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    searchQuery: "",
    selectedCategory: "All",
    selectedProduct: null,
    isModalOpen: false
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSelectedProduct(state, action) {
      state.selectedProduct = action.payload;
      state.isModalOpen = true;
    },
    closeProductModal(state) {
      state.selectedProduct = null;
      state.isModalOpen = false;
    },
    setLoading(state) {
      state.loading = !state.loading;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Selectors
export const selectAllProducts = state => state.products.items;

export const selectFilteredProducts = state => {
  const { items, searchQuery, selectedCategory } = state.products;

  // Apply category filter
  const filteredByCategory =
    selectedCategory === "All"
      ? items
      : items.filter(item => item.category === selectedCategory);

  // If no search query, return category-filtered list
  if (!searchQuery.trim()) return filteredByCategory;

  // Case-insensitive title search
  const lowerQuery = searchQuery.toLowerCase();
  return filteredByCategory.filter(item =>
    item.title.toLowerCase().includes(lowerQuery)
  );
};

const selectItems = state => state.products.items;
export const selectCategories = createSelector([selectItems], items => {
  const uniqueCategories = [
    "All",
    ...new Set(items.map(item => item.category))
  ];
  return uniqueCategories;
});

// Actions
export const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedProduct,
  closeProductModal,
  setLoading
} = productsSlice.actions;

export default productsSlice.reducer;
