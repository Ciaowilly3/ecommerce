import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../Interfaces/IProducts';

export type cartState = IProduct[];

const initialState: cartState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<IProduct>) => {
      return [...state, action.payload];
    },
    deleteCart: () => {
      return initialState;
    },
  },
});

export const { addProductToCart, deleteCart } = cartSlice.actions;
export default cartSlice;
