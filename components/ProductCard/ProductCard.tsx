import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { IProduct } from '../../Interfaces/IProducts';
import { COLORS, SIZES } from '../../constants';

interface IProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProductCardProps) => {
  const screenWidth = Dimensions.get('window').width;
  const dynamicWidth = screenWidth * 0.5 - SIZES.medium;
  return (
    <View style={[styles.cardContainer, { width: dynamicWidth }]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} />
      </View>
      <View>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </View>
  );
};

const dynamicWidth = '50% - ' + SIZES.medium;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.xxSmall,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    marginTop: SIZES.xxSmall,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  price: {
    marginTop: SIZES.xxSmall,
    color: COLORS.darkerPrimary,
    fontWeight: 'bold',
  },
});
export default ProductCard;
