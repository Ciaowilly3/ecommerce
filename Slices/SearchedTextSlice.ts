import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: string = '';

const searchedTextSlice = createSlice({
  name: 'searchedText',
  initialState: initialState,
  reducers: {
    setSearchedText: (state, action: PayloadAction<string>) => action.payload,
    resetSearchedText: (state) => '',
  },
});
export const { resetSearchedText, setSearchedText } = searchedTextSlice.actions;
export default searchedTextSlice;
