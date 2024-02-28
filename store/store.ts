import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../Services/product/api';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducers = {
  [productsApi.reducerPath]: productsApi.reducer,
};

export const store = configureStore({
  reducer: combineReducers(rootReducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
