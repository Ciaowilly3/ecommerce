import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRetrieveProductsByCategoryQuery } from '../../Services/product/api';
import { IProduct } from '../../Interfaces/IProducts';
import ProductCard from '../ProductCard';
import { COLORS, SIZES } from '../../constants';
type DiscoverProductsContainerProps = {
  category: string;
};

const DiscoverProductsContainer = ({
  category,
}: DiscoverProductsContainerProps) => {
  const { data, isError, isFetching } = useRetrieveProductsByCategoryQuery({
    category: category,
  });
  const renderProduct = useCallback(
    ({ item }: { item: IProduct }) => <ProductCard product={item} />,
    [data]
  );

  if (!category)
    return <Text style={styles.noCategorySelected}>Choose a category</Text>;

  if (isFetching) return <ActivityIndicator />;

  if (isError) return <Text>An error occured</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.categoryText}>Showing our: {category}</Text>
      <FlatList
        style={{ marginBottom: 100 }}
        data={data?.products ?? []}
        renderItem={renderProduct}
        numColumns={2}
        scrollEnabled
        contentContainerStyle={{
          rowGap: SIZES.small,
          columnGap: SIZES.small,
          marginBottom: SIZES.xxLarge,
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          columnGap: SIZES.small,
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.small,
    gap: SIZES.small,
  },
  noCategorySelected: {
    padding: SIZES.medium,
  },
  categoryText: {
    textAlign: 'center',
    fontSize: SIZES.medium,
    color: COLORS.darkerPrimary,
  },
});

export default DiscoverProductsContainer;
