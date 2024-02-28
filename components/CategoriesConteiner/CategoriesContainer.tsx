import React from 'react';
import { useRetrieveAllCategoriesQuery } from '../../Services/category/api';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import CategoryCard from '../CategoryCard';
import _, { size } from 'lodash';

const CategoriesContainer = () => {
  const {
    data: categories,
    isError,
    isFetching,
  } = useRetrieveAllCategoriesQuery();
  if (isError) return <Text>An error occured</Text>;
  if (isFetching) return <ActivityIndicator />;
  if (categories) {
    return (
      <View style={{ marginTop: SIZES.xxSmall }}>
        <Text style={{ fontSize: SIZES.medium, color: COLORS.primary }}>
          Categories{' '}
        </Text>
        <ScrollView
          horizontal={true}
          style={{
            flex: 1,
            marginTop: SIZES.xxSmall,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'nowrap',
              gap: SIZES.medium,
            }}
          >
            {categories.map((category) => (
              <CategoryCard key={_.uniqueId()} category={category} />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default CategoriesContainer;
