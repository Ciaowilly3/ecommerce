import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IProduct } from '../../Interfaces/IProducts';
import { COLORS, SIZES } from '../../constants';
import { router } from 'expo-router';

interface IProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProductCardProps) => {
  const { title, thumbnail, price } = product;
  const navigateToSingleProduct = useCallback(() => {
    router.navigate({
      pathname: 'singleProduct/[id]',
      params: { id: product.id },
    });
  }, [product.id]);

  return (
    <TouchableOpacity onPress={() => navigateToSingleProduct()}>
      <View style={[styles.cardContainer]}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: thumbnail }} style={styles.image} />
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 175,
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
