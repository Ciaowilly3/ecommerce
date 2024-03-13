import React, { useCallback } from 'react';
import { useRetrieveAllCategoriesQuery } from '../../Services/category/api';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS, SIZES } from '../../constants';
import CategoryCard from '../CategoryCard';
import _ from 'lodash';
import Spinner from '../Spinner';
import { useHeaderHeight } from '@react-navigation/elements';

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
  if (isFetching) return <Spinner />;
  if (categories) {
    return (
      <View style={{ marginTop: SIZES.xxSmall }}>
        <Text
          style={{
            fontSize: SIZES.medium,
            color: COLORS.primary,
            marginBottom: SIZES.small,
          }}
        >
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
            maxHeight: 150,
          }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({});
export default CategoriesContainer;
