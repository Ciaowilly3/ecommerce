import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { wishlistState } from '../../../Slices/wishlistSlice';
import ProductCard from '../../../components/ProductCard';
import { IProduct } from '../../../Interfaces/IProducts';
import { COLORS, SIZES } from '../../../constants';

const Wishlist = () => {
  const wishlist = useSelector(
    (state: { wishlist: wishlistState }) => state.wishlist
  );
  const renderProduct = useCallback(
    ({ item }: { item: IProduct }) => <ProductCard product={item} />,
    []
  );
  if (wishlist.length === 0)
    return (
      <View style={styles.noProductsContainer}>
        <Text style={styles.noProductsText}>
          Add some products to your wishlist!
        </Text>
      </View>
    );
  return (
    <View style={{ paddingHorizontal: SIZES.small }}>
      <FlatList
        data={wishlist}
        renderItem={renderProduct}
        numColumns={2}
        scrollEnabled
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
};

const styles = StyleSheet.create({
  noProductsContainer: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    shadowColor: COLORS.darkerPrimary,
    shadowOpacity: 1,
    borderBottomColor: COLORS.secondary,
    borderBottomWidth: 1,
    paddingBottom: SIZES.small,
  },
  noProductsText: {
    fontSize: SIZES.medium,
  },
});
export default Wishlist;
