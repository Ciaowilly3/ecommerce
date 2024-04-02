import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICreditCard, IUser } from '../Interfaces/IUser';

export interface IUserState {
  user: IUser;
}

const initialState: IUserState = {
  user: { name: '', creditCards: [], email: '' },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<IUser>) => ({
      user: action.payload,
    }),
    addCreditCard: (state: IUserState, action: PayloadAction<ICreditCard>) => ({
      user: {
        ...state.user,
        creditCards: [...state.user.creditCards, action.payload],
      },
    }),
    removeCreditCard: (state: IUserState, action: PayloadAction<string>) => ({
      user: {
        ...state.user,
        creditCards: state.user.creditCards.filter(
          (card: ICreditCard) => card.cardNumber != action.payload
        ),
      },
    }),
    removeUser: () => initialState,
  },
});

export const { removeUser, saveUser, addCreditCard, removeCreditCard } =
  userSlice.actions;
export default userSlice;
