import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRetrieveAllProductsQuery } from '../../Services/product/api';
import ProductCard from '../ProductCard';
import { COLORS, SIZES } from '../../constants';
import { IProduct } from '../../Interfaces/IProducts';

const ProductsContainer = () => {
  const { data, isError, isFetching } = useRetrieveAllProductsQuery();
  const [products, setProducts] = useState<IProduct[] | undefined>(
    data?.products
  );
  const [filter, setFilter] = useState<string>('none');

  const renderProduct = useCallback(
    ({ item }: { item: IProduct }) => (
      <ProductCard key={item.id} product={item} />
    ),
    [data?.products]
  );

  useEffect(() => {
    if (!products) handleFilter('none');
  }, [data]);

  const handleFilter = useCallback(
    (filter: string) => {
      setFilter(filter);
      if (filter === 'none') {
        setProducts(data?.products);
        return;
      }
      setProducts(
        data?.products.filter((product) => product.category === filter)
      );
    },
    [filter, data]
  );

  if (isError) return <Text>An error occured</Text>;
  if (isFetching) return <ActivityIndicator />;
  if (data?.products) {
    return (
      <View style={{ marginTop: SIZES.xxSmall }}>
        <View style={style.switchContainer}>
          <TouchableOpacity onPress={() => handleFilter('none')}>
            <Text
              style={
                filter === 'none'
                  ? style.switchCategoryTextActive
                  : style.switchCategoryText
              }
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('laptops')}>
            <Text
              style={
                filter === 'laptops'
                  ? style.switchCategoryTextActive
                  : style.switchCategoryText
              }
            >
              Laptop
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('smartphones')}>
            <Text
              style={
                filter === 'smartphones'
                  ? style.switchCategoryTextActive
                  : style.switchCategoryText
              }
            >
              Smartphones
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={products}
          renderItem={renderProduct}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={{
            marginTop: SIZES.xxSmall,
            rowGap: SIZES.small,
          }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
        />
      </View>
    );
  }
};

const style = StyleSheet.create({
  switchCategoryText: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  switchCategoryTextActive: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.darkerPrimary,
  },
  switchContainer: {
    flexDirection: 'row',
    gap: SIZES.small,
  },
});
export default ProductsContainer;
