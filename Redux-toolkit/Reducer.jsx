import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: { productData: [], cartData: [] },
  reducers: {
    addProductData: (state, action) => {
      state.productData = action.payload;
    },
    addCart: (state, action) => {
      const data = {
        id: action.payload.id,
        color: action.payload.color,
        quantity: 1,
      };
      state.cartData.push(data);
    },
    decreaseProduct: (state, action) => {
      const findIndex = state.cartData.findIndex(
        (item) =>
          item.id === Number(action.payload.id) &&
          item.color === action.payload.color
      );
      if (findIndex >= 0) {
        if (state.cartData[findIndex].quantity - 1 === 0) {
          state.cartData.splice(findIndex, 1);
        } else {
          state.cartData[findIndex].quantity =
            state.cartData[findIndex].quantity - 1;
        }
      }
    },
    increaseProduct: (state, action) => {
      const findIndex = state.cartData.findIndex(
        (item) =>
          item.id === Number(action.payload.id) &&
          item.color === action.payload.color
      );
      if (findIndex >= 0) {
        state.cartData[findIndex].quantity =
          state.cartData[findIndex].quantity + 1;
      }
    },
  },
});

export default productSlice.reducer;
export const { addProductData, addCart, increaseProduct, decreaseProduct } =
  productSlice.actions;
