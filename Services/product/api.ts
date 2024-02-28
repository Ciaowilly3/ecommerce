import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { retrieveAllProducts } from './endpoints';
import { URLS } from '../../enums/Paths';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: URLS.DUMMYJSON }),
  endpoints: () => ({}),
}).injectEndpoints({
  endpoints: (builder) => ({
    retrieveAllProducts: retrieveAllProducts(builder),
  }),
});

export const { useRetrieveAllProductsQuery } = productsApi;
