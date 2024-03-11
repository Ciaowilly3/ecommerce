import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRetrieveProductsByNameQuery } from '../../Services/product/api';
import { COLORS, SIZES } from '../../constants';
import { IProduct } from '../../Interfaces/IProducts';
import ProductCard from '../ProductCard';
import { FontAwesome5 } from '@expo/vector-icons';

type FilteredProductsContainerProps = {
  searchedText: string;
  setSearchedName: React.Dispatch<React.SetStateAction<string>>;
};

const FilteredProductsContainer = ({
  searchedText,
  setSearchedName,
}: FilteredProductsContainerProps) => {
  const { data, isFetching, isError } = useRetrieveProductsByNameQuery({
    name: searchedText,
  });

  const renderProduct = useCallback(
    ({ item }: { item: IProduct }) => (
      <ProductCard key={item.id} product={item} />
    ),
    [data?.products]
  );

  if (isError) return <Text>An error occured</Text>;
  if (isFetching) return <ActivityIndicator />;
  if (data?.products.length === 0)
    return <Text>No products match your search</Text>;
  return (
    <View>
      <View style={styles.textFilterContainer}>
        <Text>filtering results for :{searchedText}</Text>
        <TouchableOpacity
          onPress={() => setSearchedName('')}
          style={styles.closeButtonStyle}
        >
          <FontAwesome5 name="times" size={18} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data?.products}
        renderItem={renderProduct}
        numColumns={2}
        scrollEnabled={true}
        contentContainerStyle={{
          marginTop: SIZES.xxSmall,
          rowGap: SIZES.small,
          minHeight: '90%',
          paddingBottom: 225,
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 26,
    height: 26,
    backgroundColor: COLORS.darkerPrimary,
    borderRadius: 13,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.8,
    shadowOffset: { width: 3, height: 1 },
  },
});

export default FilteredProductsContainer;
