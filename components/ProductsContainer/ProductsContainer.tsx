import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useRetrieveAllProductsQuery } from '../../Services/product/api';
import ProductCard from '../ProductCard';
import { COLORS, SIZES } from '../../constants';

const ProductsContainer = () => {
  const { data, isError, isFetching } = useRetrieveAllProductsQuery();
  if (isError) return <Text>An error occured</Text>;
  if (isFetching) return <ActivityIndicator />;
  if (data?.products) {
    return (
      <View style={{ marginTop: SIZES.xxSmall }}>
        <Text style={{ fontSize: SIZES.medium, color: COLORS.primary }}>
          Products{' '}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: SIZES.xxSmall,
            gap: SIZES.medium,
          }}
        >
          {data.products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </View>
    );
  }
};

export default ProductsContainer;
