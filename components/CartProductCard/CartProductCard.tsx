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
      <TouchableOpacity
        style={{ width: '20%' }}
        onPress={() => navigateToSingleProduct()}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: thumbnail }} style={styles.image} />
        </View>
      </TouchableOpacity>

      <View style={{ width: '60%' }}>
        <Text>{title}</Text>
        <View style={styles.textContainer}>
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
      <View
        style={{
          height: '100%',
          width: '20%',
          borderLeftWidth: 1,
          borderLeftColor: COLORS.darkerPrimary,
          paddingEnd: 2,
          justifyContent: 'center',
        }}
      >
        <Text>${price}</Text>
      </View>
    </View>
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
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    gap: SIZES.xSmall,
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
