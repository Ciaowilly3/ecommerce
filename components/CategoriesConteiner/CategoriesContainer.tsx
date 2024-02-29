import React, { useCallback } from 'react';
import { useRetrieveAllCategoriesQuery } from '../../Services/category/api';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { COLORS, SIZES } from '../../constants';
import CategoryCard from '../CategoryCard';
import _, { size } from 'lodash';

const CategoriesContainer = () => {
  const {
    data: categories,
    isError,
    isFetching,
  } = useRetrieveAllCategoriesQuery();

  const renderCategory = useCallback(
    ({ item }: { item: string }) => (
      <CategoryCard key={_.uniqueId()} category={item} />
    ),
    [categories]
  );
  if (isError) return <Text>An error occured</Text>;
  if (isFetching) return <ActivityIndicator />;
  if (categories) {
    return (
      <View style={{ marginTop: SIZES.xxSmall }}>
        <Text style={{ fontSize: SIZES.medium, color: COLORS.primary }}>
          Categories{' '}
        </Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          alwaysBounceHorizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={{ width: SIZES.small }}></View>
          )}
          horizontal
          contentContainerStyle={{
            flex: 1,
            marginTop: SIZES.xxSmall,
            maxHeight: 150,
          }}
        ></FlatList>
      </View>
    );
  }
};
//TODO: flatlist

export default CategoriesContainer;
