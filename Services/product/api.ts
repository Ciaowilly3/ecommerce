import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  retrieveAllProducts,
  retrieveProductById,
  retrieveProductsByCategory,
  retrieveProductsByName,
} from './endpoints';
import { URLS } from '../../enums/Paths';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: URLS.DUMMYJSON }),
  endpoints: () => ({}),
}).injectEndpoints({
  endpoints: (builder) => ({
    retrieveAllProducts: retrieveAllProducts(builder),
    retrieveProductById: retrieveProductById(builder),
    retrieveProductsByCategory: retrieveProductsByCategory(builder),
    retrieveProductsByName: retrieveProductsByName(builder),
  }),
});

export const {
  useRetrieveAllProductsQuery,
  useRetrieveProductByIdQuery,
  useRetrieveProductsByCategoryQuery,
  useRetrieveProductsByNameQuery,
} = productsApi;
