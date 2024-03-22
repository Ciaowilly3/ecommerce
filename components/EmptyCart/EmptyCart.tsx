import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { router } from 'expo-router';
import useCalcBodyHeight from '../../Hooks/useCalcBodyHeight';

const EmptyCart = () => {
  const bodyHeight = useCalcBodyHeight(0);
  return (
    <View style={[styles.container, { height: bodyHeight }]}>
      <View style={styles.textContainer}>
        <Text>Your cart is empty, discover some of our </Text>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: COLORS.darkerPrimary,
            borderRadius: SIZES.xxSmall,
            padding: SIZES.xxSmall,
          }}
          onPress={() => router.navigate('/')}
        >
          <Text style={{ color: COLORS.secondary }}>products</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: SIZES.medium,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmptyCart;
