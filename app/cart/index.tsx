import React, { useCallback, useLayoutEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ICartState, deleteCart } from '../../Slices/cartSlice';
import { COLORS, SIZES } from '../../constants';
import { IProductCart } from '../../Interfaces/IProducts';
import CartProductCard from '../../components/CartProductCard';
import { useNavigation } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import EmptyCart from '../../components/EmptyCart';
import CartAnimation from '../../components/CartAnimation';
import Toast from 'react-native-toast-message';
import CardDetailsModal from '../../components/CardDetailsModal';
import useCalcBodyHeight from '../../Hooks/useCalcBodyHeight';
import { IUserState } from '../../Slices/userSlice';

const Cart = () => {
  const cart = useSelector((state: { cart: ICartState }) => state.cart);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const viewHeight = useCalcBodyHeight(120);
  const { user } = useSelector((state: { user: IUserState }) => state.user);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePurchase = useCallback(async () => {
    if (!user.name) {
      Toast.show({
        type: 'error',
        text1: 'You must log before Buying anything!',
        text2: 'Click the 🙍🏻‍♂️ below on the right to login!',
      });
      return;
    }
    setIsModalVisible(true);
  }, [user.name]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Cart',
    });
  }, [navigation]);

  const handleRenderCard = useCallback(
    ({ item }: { item: IProductCart }) => (
      <CartProductCard key={item.id} product={item} />
    ),
    []
  );

  if (showAnimation) return <CartAnimation />;
  if (cart.products.length === 0) return <EmptyCart />;

  return (
    <View style={{ backgroundColor: COLORS.darkerPrimary }}>
      <CardDetailsModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setShowAnimation={setShowAnimation}
        user={user}
      />
      <View style={[styles.fullPageView, { height: viewHeight }]}>
        <Text>Your cart</Text>
        <FlatList
          data={cart.products}
          ItemSeparatorComponent={() => (
            <View style={{ height: SIZES.xxLarge }}></View>
          )}
          showsVerticalScrollIndicator={false}
          renderItem={handleRenderCard}
        />
      </View>
      <View style={styles.bottomView}>
        <View>
          <Text style={styles.priceNumber}>Total: ${cart.total}</Text>
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
    backgroundColor: COLORS.yellow,
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
