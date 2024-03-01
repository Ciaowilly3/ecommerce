import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useRetrieveAllProductsQuery } from '../../Services/product/api';
import ProductCard from '../ProductCard';
import { COLORS, SIZES } from '../../constants';
import { IProduct } from '../../Interfaces/IProducts';

const ProductsContainer = () => {
  const { data, isError, isFetching } = useRetrieveAllProductsQuery();

  const renderProduct = useCallback(
    ({ item }: { item: IProduct }) => (
      <ProductCard key={item.id} product={item} />
    ),
    [data?.products]
  );

  if (isError) return <Text>An error occured</Text>;
  if (isFetching) return <ActivityIndicator />;
  if (data?.products) {
    return (
      <View style={{ marginTop: SIZES.xxSmall }}>
        <Text style={{ fontSize: SIZES.medium, color: COLORS.primary }}>
          Products{' '}
        </Text>
        <FlatList
          data={data.products}
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

export default ProductsContainer;
