import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { cartState, deleteCart } from '../../Slices/cartSlice';
import _, { size } from 'lodash';
import { COLORS, SIZES } from '../../constants';
import { IProduct } from '../../Interfaces/IProducts';
import CartProductCard from '../../components/CartProductCard';
import { router, useNavigation } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Feather } from '@expo/vector-icons';

const cart = () => {
  const cart = useSelector((state: { cart: cartState }) => state.cart);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const windowHeight = Dimensions.get('window').height;
  const headerHeight = useHeaderHeight();
  const viewHeight = windowHeight - 120 - headerHeight;
  const [total, setTotal] = useState(0);

  const handlePurchase = useCallback(() => {
    dispatch(deleteCart());

    Toast.show({
      type: 'info',
      text1: 'Succesfull',
      text2: 'Your order has been made, thank you customer!',
    });
  }, [cart]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Cart',
    });
  }, [navigation]);

  useEffect(() => {
    let sum = 0;
    cart.forEach((product) => (sum += product.price));
    setTotal(sum);
  }, [cart]);

  const handleRenderCard = useCallback(
    ({ item }: { item: IProduct }) => (
      <CartProductCard key={_.uniqueId()} product={item} />
    ),
    [cart]
  );
  if (!size(cart))
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: SIZES.medium,
        }}
      >
        <Text>Your cart is empty, discover some of our </Text>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: COLORS.darkerPrimary,
            borderRadius: SIZES.xxSmall,
            padding: SIZES.xxSmall,
          }}
          onPress={() => router.push('/')}
        >
          <Text style={{ color: COLORS.secondary }}>products</Text>
        </TouchableOpacity>
      </View>
    );
  return (
    <View style={{ height: '100%', backgroundColor: COLORS.darkerPrimary }}>
      <View style={[styles.fullPageView, { height: viewHeight }]}>
        <Text>Your cart</Text>
        <FlatList
          data={cart}
          ItemSeparatorComponent={() => (
            <View style={{ height: SIZES.small }}></View>
          )}
          renderItem={handleRenderCard}
        />
      </View>
      <View style={styles.bottomView}>
        <View>
          <Text style={styles.priceNumber}>Total: ${total}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: SIZES.small }}>
          <TouchableOpacity
            style={styles.purchaseBtn}
            onPress={() => handlePurchase()}
          >
            <Text style={{ color: COLORS.darkerPrimary }}>Purchase</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => dispatch(deleteCart())}
          >
            <Feather name="trash-2" size={18} color={COLORS.darkerPrimary} />
            <Text style={{ color: COLORS.darkerPrimary }}></Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullPageView: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    gap: SIZES.medium,
    padding: SIZES.small,
    borderBottomLeftRadius: SIZES.xxLarge,
    borderBottomRightRadius: SIZES.xxLarge,
  },
  bottomView: {
    height: 120,
    backgroundColor: COLORS.darkerPrimary,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: SIZES.small,
  },
  priceNumber: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: '800',
  },
  purchaseBtn: {
    padding: SIZES.small,
    backgroundColor: '#e1c26f',
    borderRadius: SIZES.xSmall,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtn: {
    padding: SIZES.small,
    backgroundColor: COLORS.red,
    borderRadius: SIZES.xSmall,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default cart;
