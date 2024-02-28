import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useRetrieveAllProductsQuery } from '../../Services/product/api';
import ProductCard from '../ProductCard';

const ProductsContainer = () => {
  const { data, isError, isFetching } = useRetrieveAllProductsQuery();
  if (isError) return <Text>An error occured</Text>;
  if (isFetching) return <ActivityIndicator />;
  if (data?.products) {
    return (
      <View>
        {data.products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </View>
    );
  }
};

export default ProductsContainer;
