import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useCallback, useLayoutEffect } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useRetrieveProductByIdQuery } from '../../Services/product/api';
import { addProductToCart } from '../../Slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import {
  addProductToWishlist,
  removeProductFromWishlist,
  wishlistState,
} from '../../Slices/wishlistSlice';
import { isProductInWishlist } from '../../utils/isProductInWishList';
import { IProduct } from '../../Interfaces/IProducts';
import Spinner from '../../components/Spinner';
import Rating from '../../components/Rating';
import useCalcBodyHeight from '../../Hooks/useCalcBodyHeight';
import CartTotalBubble from '../../components/CartTotalBubble';

const SingleProductPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const viewHeight = useCalcBodyHeight(120);
  const wishlist = useSelector(
    (state: { wishlist: wishlistState }) => state.wishlist
  );
  const { id } = useLocalSearchParams<{ id: string }>();

  const renderImage = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.imageList} />
  );

  const {
    data: product,
    isError,
    isFetching,
  } = useRetrieveProductByIdQuery({
    id: id ?? '1',
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Product',
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingRight: 8 }}
          onPress={() => {
            navigation.navigate('cart/index' as never);
          }}
        >
          <Feather name="shopping-bag" size={24} color={COLORS.darkerPrimary} />
          <CartTotalBubble />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleWishList = useCallback(
    (product: IProduct) => {
      if (isProductInWishlist(wishlist, product)) {
        dispatch(addProductToWishlist(product));

        Toast.show({
          type: 'info',
          text1: 'Product added to whishlist',
          text2: 'Click the ❤️ to see your wishlist',
        });
      } else dispatch(removeProductFromWishlist(product));
    },
    [wishlist, dispatch]
  );
  if (isError) return <Text>An error occured</Text>;
  if (isFetching) return <Spinner />;
  if (product) {
    const handleAddToCart = () => {
      dispatch(addProductToCart(product));

      Toast.show({
        type: 'info',
        text1: 'Product added to cart',
        text2: 'Click the 👜 to see your cart',
      });
    };
    const {
      brand,
      category,
      description,
      images,
      price,
      rating,
      thumbnail,
      title,
    } = product;
    return (
      <View
        style={{
          height: '100%',
          backgroundColor: COLORS.darkerPrimary,
        }}
      >
        <View style={[styles.fullPageView, { height: viewHeight }]}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: thumbnail }} style={styles.image} />
          </View>
          <View>
            <Text style={styles.category}>{category},</Text>
            <Text style={styles.category}>{brand}</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text>{description}</Text>
          <View style={styles.ratingContainer}>
            <Rating rating={rating} />
          </View>
          <FlatList
            data={images}
            ItemSeparatorComponent={() => (
              <View style={{ width: 8, height: '100%' }}></View>
            )}
            renderItem={renderImage}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.bottomView}>
          <View>
            <Text style={styles.price}>PRICE:</Text>
            <Text style={styles.priceNumber}>${price}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: SIZES.medium,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={() => handleWishList(product)}>
              <AntDesign
                name={
                  isProductInWishlist(wishlist, product) ? 'hearto' : 'heart'
                }
                size={28}
                color={COLORS.red}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addToCartBtn}
              onPress={() => handleAddToCart()}
            >
              <Feather
                name="shopping-bag"
                size={24}
                color={COLORS.darkerPrimary}
              />
              <Text style={{ color: COLORS.darkerPrimary }}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  fullPageView: {
    backgroundColor: COLORS.white,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: SIZES.medium,
    paddingHorizontal: SIZES.small,
    borderBottomLeftRadius: SIZES.xxLarge,
    borderBottomRightRadius: SIZES.xxLarge,
  },
  imageContainer: {
    paddingTop: SIZES.small,
    alignItems: 'center',
    width: '100%',
    height: '40%',
  },
  image: {
    flex: 1,
    width: '50%',
    resizeMode: 'cover',
    borderRadius: SIZES.medium,
  },
  bottomView: {
    height: 120,
    backgroundColor: COLORS.darkerPrimary,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: SIZES.small,
  },
  category: {
    fontSize: SIZES.small,
    color: COLORS.darkerPrimary,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: '800',
    color: COLORS.darkerPrimary,
  },
  price: {
    color: '#e1c26f',
    fontSize: SIZES.small,
  },
  priceNumber: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: '800',
  },
  addToCartBtn: {
    padding: SIZES.small,
    backgroundColor: '#e1c26f',
    borderRadius: SIZES.xSmall,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageList: {
    marginTop: SIZES.xxSmall,
    height: 80,
    width: 80,
    borderRadius: SIZES.xSmall,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
  },
});

SingleProductPage.navigationOptions = () => ({
  title: 'Product',
  headerRight: () => (
    <TouchableOpacity style={{ paddingRight: 20 }} onPress={() => {}}>
      <Text>asd</Text>
    </TouchableOpacity>
  ),
});

export default SingleProductPage;
