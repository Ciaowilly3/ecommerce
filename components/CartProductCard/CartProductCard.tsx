import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IProductCart } from '../../Interfaces/IProducts';
import { COLORS, SIZES } from '../../constants';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import {
  addProductToCart,
  removeProductFromCart,
} from '../../Slices/cartSlice';
import { Feather } from '@expo/vector-icons';

interface CartProductCardProps {
  product: IProductCart;
}

const CartProductCard = ({ product }: CartProductCardProps) => {
  const { thumbnail, title, quantity, price } = product;
  const dispatch = useDispatch();
  const navigateToSingleProduct = useCallback(() => {
    router.navigate({
      pathname: 'singleProduct/[id]',
      params: { id: product.id },
    });
  }, []);
  return (
    <View style={styles.CardContainer}>
      <TouchableOpacity onPress={() => navigateToSingleProduct()}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: thumbnail }} style={styles.image} />
        </View>
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text>{title}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={{ backgroundColor: COLORS.darkerPrimary, borderRadius: 4 }}
            onPress={() => dispatch(removeProductFromCart(product))}
          >
            <Feather name="minus" size={24} color={COLORS.secondary} />
          </TouchableOpacity>
          <Text>quantity: {quantity}</Text>
          <TouchableOpacity
            style={{ backgroundColor: COLORS.darkerPrimary, borderRadius: 4 }}
            onPress={() => dispatch(addProductToCart(product))}
          >
            <Feather name="plus" size={24} color={COLORS.secondary} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.price}>
        <Text>${price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    flexDirection: 'row',
    borderRadius: SIZES.xSmall,
    gap: SIZES.small,
    borderBlockColor: COLORS.darkerPrimary,
    borderWidth: 1,
    backgroundColor: COLORS.secondary,
    height: 120,
  },
  imageContainer: {
    flexGrow: 1,
    width: 80,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZES.xSmall,
    padding: SIZES.small,
  },
  price: {
    height: '100%',
    width: 80,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.darkerPrimary,
    justifyContent: 'center',
    alignItems: 'center',
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

//TODO: sistemare la prop per passare valore per valore
