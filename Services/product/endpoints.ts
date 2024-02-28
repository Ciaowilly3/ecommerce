import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { IProductData, Products } from '../../Interfaces/IProducts';
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
  builder.query<IProductData, void>({
    query: () => URLS.PRODUCTS,
  });

export { retrieveAllProducts };
