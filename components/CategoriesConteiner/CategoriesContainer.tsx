import React, { useCallback } from 'react';
import { useRetrieveAllCategoriesQuery } from '../../Services/category/api';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import CategoryCard from '../CategoryCard';
import _ from 'lodash';

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
          ItemSeparatorComponent={() => (
            <View style={{ width: SIZES.small }}></View>
          )}
          horizontal={true}
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
