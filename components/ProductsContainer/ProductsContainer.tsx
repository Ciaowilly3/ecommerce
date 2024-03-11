import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRetrieveAllProductsQuery } from '../../Services/product/api';
import ProductCard from '../ProductCard';
import { SIZES } from '../../constants';
import { IProduct } from '../../Interfaces/IProducts';
import MainCategoriesSwitch from '../MainCategoriesSwitch';

type ProductsContainerProps = {
  searchedText: string;
  setSearchedName: React.Dispatch<React.SetStateAction<string>>;
};

const ProductsContainer = ({
  searchedText,
  setSearchedName,
}: ProductsContainerProps) => {
  const [skip, setSkip] = useState<number>(0);
  const { data, isError, isFetching } = useRetrieveAllProductsQuery({
    skip: skip.toString(),
  });
  // const { products: filteredProducts, refetch } = useRetrieveAllProductsQuery(
  //   { skip: '30' },
  //   {
  //     selectFromResult: ({ data }) => ({
  //       products: data?.products.filter(
  //         (product) => product.category === filter
  //       ),
  //     }),
  //   }
  // );
  // const [products, setProducts] = useState<IProduct[] | undefined>(
  //   data?.products
  // );

  const [filter, setFilter] = useState<string>('none');

  const renderProduct = useCallback(
    ({ item }: { item: IProduct }) => (
      <ProductCard key={item.id} product={item} />
    ),
    [data?.products]
  );

  // useEffect(() => handleFilter('none'), [data?.products]);

  const handleFilter = useCallback(
    (filter: string) => {
      setFilter(filter);
      // filter === 'none'
      //   ? ''
      //   : data?.products.filter((product) => product.category === filter);
    },
    [filter]
  );

  if (isError) return <Text>An error occured</Text>;
  if (isFetching) return <ActivityIndicator />;
  else
    return (
      <View style={{ marginTop: SIZES.xxSmall }}>
        <MainCategoriesSwitch filter={filter} handleFilter={handleFilter} />
        <FlatList
          data={
            filter === 'none'
              ? data?.products
              : data?.products.filter((product) => product.category === filter)
          }
          renderItem={renderProduct}
          onEndReached={
            filter !== 'none'
              ? () => null
              : () => (skip >= 90 ? '' : setSkip((prev) => prev + 30))
          }
          numColumns={2}
          scrollEnabled={true}
          contentContainerStyle={{
            marginTop: SIZES.xxSmall,
            rowGap: SIZES.small,
            paddingBottom: 800,
          }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
        />
      </View>
    );
};

const style = StyleSheet.create({
  textFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default ProductsContainer;
