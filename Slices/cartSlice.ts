import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProduct, IProductCart } from '../Interfaces/IProducts';

export interface ICartState extends IProduct {
  quantity: number;
}

const initialState: ICartState[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<IProduct>) => {
      const existingProduct = state.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else return [...state, { ...action.payload, quantity: 1 }];
    },
    removeProductFromCart: (state, action: PayloadAction<IProductCart>) => {
      const existingProduct = state.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct?.quantity === 1) {
        return state.filter((product) => product.id !== action.payload.id);
      } else {
        existingProduct ? (existingProduct.quantity -= 1) : '';
      }
    },
    deleteCart: () => {
      return initialState;
    },
  },
});

export const { addProductToCart, deleteCart, removeProductFromCart } =
  cartSlice.actions;
export default cartSlice;
