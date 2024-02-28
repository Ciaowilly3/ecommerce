import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../Services/product/api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { categoriesApi } from '../Services/category/api';

const rootReducers = {
  [productsApi.reducerPath]: productsApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
};

export const store = configureStore({
  reducer: combineReducers(rootReducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      categoriesApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
