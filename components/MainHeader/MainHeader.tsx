import React, { useCallback } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';

const MainHeader = () => {
  const navigate = useNavigation();
  const navigateToCart = useCallback(() => {
    navigate.navigate('cart/index' as never);
  }, []);
  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: SIZES.small,
        paddingRight: SIZES.small,
        marginBottom: SIZES.xSmall,
      }}
    >
      <Text style={{ flexBasis: 33.3 }}></Text>

      <TouchableOpacity
        style={{ flexBasis: 33.3 }}
        onPress={() => router.push('/')}
      >
        <Ionicons
          name="infinite"
          size={SIZES.xxLarge}
          color={COLORS.darkerPrimary}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexBasis: 33.3, justifyContent: 'center' }}
        onPress={() => navigateToCart()}
      >
        <Feather name="shopping-bag" size={24} color={COLORS.darkerPrimary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MainHeader;
