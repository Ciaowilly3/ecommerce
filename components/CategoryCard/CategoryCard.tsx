import React, { useCallback } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SIZES } from '../../constants';
import _, { capitalize, upperCase } from 'lodash';
import { router } from 'expo-router';

interface ICategoryCardProp {
  category: string;
}

const CategoryCard = ({ category }: ICategoryCardProp) => {
  const handleOnPress = useCallback(() => {
    router.navigate({
      pathname: 'discover/[category]',
      params: { category: category },
    });
  }, []);

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handleOnPress}>
      <ImageBackground
        source={{
          uri: `https://picsum.photos/id/${_.random(0, 500)}/800/800`,
        }}
        style={styles.image}
      >
        <Text style={styles.text}>{upperCase(category)}</Text>
      </ImageBackground>
    </TouchableOpacity>
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
    overflow: 'hidden',
    gap: SIZES.medium,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: SIZES.small,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {},
  text: {
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    textShadowRadius: 10,
    color: COLORS.white,
  },
});
export default CategoryCard;
