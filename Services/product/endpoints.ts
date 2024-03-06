import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { IProduct, IProductsData } from '../../Interfaces/IProducts';
import { URLS } from '../../enums/Paths';

type customBuilder = EndpointBuilder<
  BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
  >,
  never,
  'productsApi'
>;

const retrieveAllProducts = (builder: customBuilder) =>
  builder.query<IProductsData, void>({
    query: () => URLS.PRODUCTS,
  });
const retrieveProductById = (builder: customBuilder) =>
  builder.query<IProduct, { id: string }>({
    query: ({ id }) => ({
      url: `${URLS.PRODUCTS}/${id}`,
      method: 'GET',
    }),
  });
const retrieveProductsByCategory = (builder: customBuilder) =>
  builder.query<IProductsData, { category: string }>({
    query: ({ category }) => ({
      url: `${URLS.PRODUCTS}/category/${category}`,
      method: 'GET',
    }),
  });

export { retrieveAllProducts, retrieveProductById, retrieveProductsByCategory };
