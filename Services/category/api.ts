import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URLS } from '../../enums/Paths';
import { retrieveAllCategories } from './enpoints';

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: URLS.DUMMYJSON }),
  endpoints: () => ({}),
}).injectEndpoints({
  endpoints: (builder) => ({
    retrieveAllCategories: retrieveAllCategories(builder),
  }),
});

export const { useRetrieveAllCategoriesQuery } = categoriesApi;
