import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../Interfaces/IProducts';

export type wishlistState = IProduct[];

const initialState: wishlistState = [];

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: initialState,
  reducers: {
    addProductToWishlist: (state, action: PayloadAction<IProduct>) => {
      return [...state, action.payload];
    },
    removeProductFromWishlist: (state, action: PayloadAction<IProduct>) => {
      return state.filter((product) => product.id !== action.payload.id);
    },
    deleteWishlist: () => {
      return initialState;
    },
  },
});

export const {
  addProductToWishlist,
  deleteWishlist,
  removeProductFromWishlist,
} = wishlistSlice.actions;
export default wishlistSlice;
