import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';

type MainCategoriesSwitchProps = {
  filter: string;
  handleFilter: (text: string) => void;
};

const MainCategoriesSwitch = ({
  filter,
  handleFilter,
}: MainCategoriesSwitchProps) => {
  return (
    <View style={styles.switchContainer}>
      <TouchableOpacity onPress={() => handleFilter('none')}>
        <Text
          style={
            filter === 'none'
              ? styles.switchCategoryTextActive
              : styles.switchCategoryText
          }
        >
          All
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleFilter('laptops')}>
        <Text
          style={
            filter === 'laptops'
              ? styles.switchCategoryTextActive
              : styles.switchCategoryText
          }
        >
          Laptop
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleFilter('smartphones')}>
        <Text
          style={
            filter === 'smartphones'
              ? styles.switchCategoryTextActive
              : styles.switchCategoryText
          }
        >
          Smartphones
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  switchCategoryText: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  switchCategoryTextActive: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.darkerPrimary,
  },
  switchContainer: {
    flexDirection: 'row',
    gap: SIZES.small,
  },
});
export default MainCategoriesSwitch;
