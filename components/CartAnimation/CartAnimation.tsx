import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import LottieView from 'lottie-react-native';
import useCalcBodyHeight from '../../Hooks/useCalcBodyHeight';

const CartAnimation = () => {
  const bodyHeight = useCalcBodyHeight(0);
  return (
    <View style={[styles.container, { height: bodyHeight }]}>
      <Text style={styles.textStyle}>Your order has been sent</Text>
      <Text style={styles.textStyle}>redirecting you to the Homepage</Text>
      <LottieView
        style={{ height: 400, width: '100%' }}
        autoPlay
        loop
        source={require('../../assets/cart.json')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
});

export default CartAnimation;
