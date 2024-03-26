import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useRetrieveAllProductsQuery } from '../../Services/product/api';
import ProductCard from '../ProductCard';
import { SIZES } from '../../constants';
import { IProduct } from '../../Interfaces/IProducts';
import MainCategoriesSwitch from '../MainCategoriesSwitch';
import Spinner from '../Spinner';

type ProductsContainerProps = {
  searchedText: string;
  setSearchedName: React.Dispatch<React.SetStateAction<string>>;
};

const ProductsContainer = ({
  searchedText,
  setSearchedName,
}: ProductsContainerProps) => {
  const [productsToSkip, setProductsToSkip] = useState<number>(0);
  const { data, isError, isFetching } = useRetrieveAllProductsQuery({
    productsToSkip: productsToSkip,
  });

  const [filter, setFilter] = useState<string>('none');

  const renderProduct = useCallback(
    ({ item }: { item: IProduct }) => (
      <ProductCard key={item.id} product={item} />
    ),
    []
  );

  const handleFilter = useCallback((filter: string) => {
    setFilter(filter);
  }, []);

  if (isError) return <Text>An error occured</Text>;
  if (isFetching) return <Spinner />;
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
              : () =>
                  productsToSkip >= 90
                    ? ''
                    : setProductsToSkip((prev) => prev + 30)
          }
          numColumns={2}
          scrollEnabled={true}
          contentContainerStyle={{
            marginTop: SIZES.xxSmall,
            rowGap: SIZES.small,
            paddingBottom: 575,
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
