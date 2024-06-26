import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ICartState } from '../../Slices/cartSlice';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const CartTotalBubble = () => {
  const { products } = useSelector((state: { cart: ICartState }) => state.cart);

  const total = useMemo(
    () =>
      products.reduce(
        (totalQuantity, product) => totalQuantity + product.quantity,
        0
      ),
    [products]
  );
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{total < 10 ? `${total}` : '9+'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 2,
    top: -2,
    backgroundColor: COLORS.yellow,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: COLORS.white,
    fontSize: SIZES.small,
  },
});

export default CartTotalBubble;
