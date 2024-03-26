import React, { useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import CartTotalBubble from '../CartTotalBubble';

const MainHeader = () => {
  const navigateToCart = useCallback(() => {
    router.navigate('cart');
  }, []);
  const navigateToHome = useCallback(() => {
    router.navigate('');
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.btnContainer}></Text>

      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => navigateToHome()}
      >
        <Ionicons
          name="infinite"
          size={SIZES.xxLarge}
          color={COLORS.darkerPrimary}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => navigateToCart()}
      >
        <Feather name="shopping-bag" size={24} color={COLORS.darkerPrimary} />
        <CartTotalBubble />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: SIZES.small,
    paddingRight: SIZES.small,
    marginBottom: SIZES.xSmall,
  },
  btnContainer: {
    flexBasis: 33.3,
    justifyContent: 'center',
  },
});

//TODO: pallino numuero prodotti su carrello
//TODO: da account passare ad uno screen diverso con carte di credito senza tabs con header

export default MainHeader;
