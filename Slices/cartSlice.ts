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
      if (productToRemove.quantity === 1) {
        return {
          products: state.products.filter(
            (product) => product.id !== action.payload.id
          ),
          total: state.total - productToRemove.price,
        };
      } else {
        return {
          products: [
            ...state.products,
            { ...productToRemove, quantity: productToRemove.quantity - 1 },
          ],
          total: state.total - productToRemove.price,
        };
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

//TODO: emulare amazon se quntity 1 cestino e altra action
//TODO: bordo grigio e shadow
