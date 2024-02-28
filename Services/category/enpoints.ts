import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { URLS } from '../../enums/Paths';
import { Categories } from '../../Interfaces/ICategories';

type customBuilder = EndpointBuilder<
  BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
  >,
  never,
  'categoriesApi'
>;

const retrieveAllCategories = (builder: customBuilder) =>
  builder.query<Categories, void>({
    query: () => URLS.CATEGORIES,
  });

export { retrieveAllCategories };
