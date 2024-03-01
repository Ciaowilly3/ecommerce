import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IProduct } from '../../Interfaces/IProducts';
import { COLORS, SIZES } from '../../constants';
import { router } from 'expo-router';

interface CartProductCardProps {
  product: IProduct;
}

const CartProductCard = ({ product }: CartProductCardProps) => {
  const { thumbnail, title, description, price } = product;
  const navigateToSingleProduct = useCallback(() => {
    router.navigate({
      pathname: 'singleProduct/[id]',
      params: { id: product.id },
    });
  }, []);
  return (
    <TouchableOpacity onPress={() => navigateToSingleProduct()}>
      <View style={styles.CardContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: thumbnail }} style={styles.image} />
        </View>
        <View style={{ width: '66%' }}>
          <Text>{title}</Text>
          <Text>{description}</Text>
        </View>
        <View
          style={{
            height: '100%',
            borderLeftWidth: 1,
            borderLeftColor: COLORS.darkerPrimary,
            paddingEnd: 2,
            justifyContent: 'center',
          }}
        >
          <Text>${price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.small,
    borderRadius: SIZES.xSmall,
    borderBlockColor: COLORS.darkerPrimary,
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: COLORS.secondary,
  },
  imageContainer: {
    flexGrow: 1,
  },
  image: {
    borderTopLeftRadius: SIZES.xxSmall,
    borderBottomLeftRadius: SIZES.xxSmall,
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default CartProductCard;
