import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IProductCart } from '../../Interfaces/IProducts';
import { COLORS, SIZES } from '../../constants';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import {
  addProductToCart,
  decreaseProductQuantity,
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
        <View style={styles.buttonsContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={
                product.quantity === 1
                  ? styles.removeIcon
                  : styles.handleQuantityIcon
              }
              onPress={() =>
                product.quantity === 1
                  ? dispatch(removeProductFromCart(product))
                  : dispatch(decreaseProductQuantity(product))
              }
            >
              <Feather
                name={product.quantity === 1 ? 'trash' : 'minus'}
                size={24}
                color={COLORS.secondary}
              />
            </TouchableOpacity>
            <Text>{quantity}</Text>
            <TouchableOpacity
              style={styles.handleQuantityIcon}
              onPress={() => dispatch(addProductToCart(product))}
            >
              <Feather name="plus" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>
          {product.quantity === 1 ? (
            ''
          ) : (
            <TouchableOpacity
              style={styles.removeIcon}
              onPress={() => dispatch(removeProductFromCart(product))}
            >
              <Feather name="trash" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
          )}
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
    borderColor: COLORS.primary,
    borderWidth: 1,
    backgroundColor: COLORS.secondary,
    height: 120,
    shadowColor: COLORS.darkerPrimary,
    shadowOpacity: 0.4,
    shadowRadius: SIZES.small,
    shadowOffset: { width: 6, height: 12 },
  },
  imageContainer: {
    flexGrow: 1,
    width: 80,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    gap: SIZES.small,
  },
  quantityContainer: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SIZES.xSmall,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SIZES.xSmall,
  },
  handleQuantityIcon: {
    backgroundColor: COLORS.darkerPrimary,
    borderRadius: 4,
    padding: 2,
  },
  removeIcon: {
    backgroundColor: COLORS.red,
    padding: 2,
    borderRadius: 4,
  },
  price: {
    height: '100%',
    width: 80,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.primary,
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
