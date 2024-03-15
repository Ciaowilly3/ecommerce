import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProduct, IProductCart } from '../Interfaces/IProducts';

export interface ICartState {
  products: Array<IProduct & { quantity: number }>;
  total: number;
}

const initialState: ICartState = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<IProduct>) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
        state.total += existingProduct.price;
      } else
        return {
          products: [...state.products, { ...action.payload, quantity: 1 }],
          total: state.total + action.payload.price,
        };
    },
    removeProductFromCart: (state, action: PayloadAction<IProductCart>) => {
      const productToRemove = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (!productToRemove) return;
      return {
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
        total: state.total - productToRemove.price * productToRemove.quantity,
      };
    },
    decreaseProductQuantity: (state, action: PayloadAction<IProductCart>) => {
      const productToDecrease = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (!productToDecrease) return;
      return {
        products: state.products.map((product) => {
          if (product.id !== productToDecrease.id) return product;
          return { ...product, quantity: product.quantity - 1 };
        }),
        total: state.total - productToDecrease.price,
      };
    },
    deleteCart: () => {
      return initialState;
    },
  },
});

export const {
  addProductToCart,
  deleteCart,
  removeProductFromCart,
  decreaseProductQuantity,
} = cartSlice.actions;
export default cartSlice;
