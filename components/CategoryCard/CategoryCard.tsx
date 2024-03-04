import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import _ from 'lodash';

interface ICategoryCardProp {
  category: string;
}

const CategoryCard = ({ category }: ICategoryCardProp) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: `https://picsum.photos/id/${_.random(0, 500)}/800/800` }}
        style={styles.image}
      />
      <Text style={styles.text}>{category}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexGrow: 1,
    aspectRatio: 1 / 1,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.small,
    paddingVertical: SIZES.medium,
    gap: SIZES.medium,
    width: 150,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    width: 80,
    borderRadius: 40,
    resizeMode: 'cover',
  },
  text: {
    color: COLORS.darkerPrimary,
  },
});
export default CategoryCard;
