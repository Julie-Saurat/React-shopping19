import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [], totalQuantity: 0, changed: false };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },

    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
      } else {
        state.items.push({ 
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title
        });
      }
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const initialState = { quantity: 0, total: 0 };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     increment(state, action) {
//       state.quantity++;
//       state.total = state.quantity*action.payload;
//     },

//     decrement(state, action) {
//       state.quantity--;
//       state.total = state.quantity*action.payload;
//     }
//   }
// })

// export const cartActions = cartSlice.actions;

// export default cartSlice.reducer;
