import { createSlice } from "@reduxjs/toolkit";

// Load cart and stock from localStorage
const storedCart = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cart")) : [];
const storedStock = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("cartStock")) : {};

const initialState = {
  items: storedCart || [],
  stock: storedStock || {}, // { productId: availableStock }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setStock: (state, action) => {
      const { productId, stock } = action.payload;
      if (!(productId in state.stock)) {
        state.stock[productId] = stock; // only set if not already exists
        localStorage.setItem("cartStock", JSON.stringify(state.stock));
      }
    },

    add: (state, action) => {
      const item = action.payload; // {id, title, price, quantity, image, stock, originalStock}
      const availableStock = state.stock[item.id] ?? item.stock ?? item.originalStock ?? 100;

      if (availableStock < item.quantity) return; // Not enough stock

      // Add item as separate entry
      state.items.push({
        ...item,
        entryId: Date.now() + Math.random(),
        totalPrice: item.price * item.quantity,
      });

      // Update stock in Redux & localStorage
      state.stock[item.id] = availableStock - item.quantity;

      localStorage.setItem("cart", JSON.stringify(state.items));
      localStorage.setItem("cartStock", JSON.stringify(state.stock));
    },

    remove: (state, action) => {
      const item = state.items.find(i => i.entryId === action.payload);
      if (item) {
        state.stock[item.id] = (state.stock[item.id] || 0) + item.quantity;
      }

      state.items = state.items.filter(i => i.entryId !== action.payload);

      localStorage.setItem("cart", JSON.stringify(state.items));
      localStorage.setItem("cartStock", JSON.stringify(state.stock));
    },

    clear: (state) => {
      state.items.forEach(item => {
        state.stock[item.id] = (state.stock[item.id] || 0) + item.quantity;
      });
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items));
      localStorage.setItem("cartStock", JSON.stringify(state.stock));
    },
  },
});

export const { add, remove, clear, setStock } = cartSlice.actions;
export default cartSlice.reducer;
