import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import CartTotalBubble from '../CartTotalBubble';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainHeader = () => {
  const navigateToCart = useCallback(() => {
    router.navigate('cart');
  }, []);
  const navigateToHome = useCallback(() => {
    router.navigate('');
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
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
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.xSmall,
    marginBottom: SIZES.xSmall,
  },
  btnContainer: {
    flexBasis: 33.3,
    justifyContent: 'center',
  },
});

//TODO: validazione con ZOD
//TODO: cambio password e email

export default MainHeader;
