import React, { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { wishlistState } from '../../../Slices/wishlistSlice';
import ProductCard from '../../../components/ProductCard';
import { IProduct } from '../../../Interfaces/IProducts';
import { SIZES } from '../../../constants';

const Wishlist = () => {
  const wishlist = useSelector(
    (state: { wishlist: wishlistState }) => state.wishlist
  );
  const renderProduct = useCallback(
    ({ item }: { item: IProduct }) => <ProductCard product={item} />,
    [wishlist]
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

export default Wishlist;
