// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Helper to save cart items to localStorage
const saveToLocalStorage = items => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

// Load cart items from localStorage or fallback to empty array
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cartItems");
    if (serializedState === null) return [];
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Failed to load from localStorage", e);
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadFromLocalStorage()
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        console.log("cart slice", product);

        state.items.push({ ...product, quantity: 1 });
      }
      saveToLocalStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveToLocalStorage(state.items);
    },
    increaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
      saveToLocalStorage(state.items);
    },
    decreaseQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      saveToLocalStorage(state.items);
    },
    clearCart: state => {
      state.items = [];
      saveToLocalStorage(state.items);
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
