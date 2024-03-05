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
import { useSelector, useDispatch } from 'react-redux';
import { ICartState, deleteCart } from '../../Slices/cartSlice';
import _, { size } from 'lodash';
import { COLORS, SIZES } from '../../constants';
import { IProductCart } from '../../Interfaces/IProducts';
import CartProductCard from '../../components/CartProductCard';
import { router, useNavigation } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import { Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const Cart = () => {
  const cart = useSelector((state: { cart: ICartState[] }) => state.cart);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const windowHeight = Dimensions.get('window').height;
  const headerHeight = useHeaderHeight();
  const viewHeight = windowHeight - 120 - headerHeight;
  const [total, setTotal] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const handlePurchase = useCallback(() => {
    dispatch(deleteCart());
    setShowAnimation(true);
    setTimeout(() => {
      router.push('/');
      setShowAnimation(false);
    }, 4000);
  }, [cart]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Cart',
    });
  }, [navigation]);

  useEffect(() => {
    let sum = 0;
    cart.forEach((product) => (sum += product.price * product.quantity));
    setTotal(sum);
  }, [cart]);

  const handleRenderCard = useCallback(
    ({ item }: { item: IProductCart }) => (
      <CartProductCard key={_.uniqueId()} product={item} />
    ),
    [cart]
  );
  if (showAnimation)
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: COLORS.secondary,
          justifyContent: 'center',
          alignItems: 'center',
          height: windowHeight - headerHeight,
        }}
      >
        <Text style={{ fontSize: SIZES.large, color: COLORS.primary }}>
          Your order has been sent
        </Text>
        <Text style={{ fontSize: SIZES.large, color: COLORS.primary }}>
          redirecting you to the Homepage
        </Text>
        <LottieView
          style={{ height: 400, width: '100%' }}
          autoPlay
          loop
          source={require('../../assets/cart.json')}
        />
      </View>
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
            <View style={{ height: SIZES.xxLarge }}></View>
          )}
          showsVerticalScrollIndicator={false}
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
    alignItems: 'center',
    gap: SIZES.small,
    padding: SIZES.small,
    paddingBottom: 4,
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

export default Cart;
