import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { COLORS, SIZES } from '../../constants';
import { Feather } from '@expo/vector-icons';
import { useRetrieveProductByIdQuery } from '../../Services/product/api';

const singleProductPage = () => {
  const navigation = useNavigation();
  const windowHeight = Dimensions.get('window').height;
  const headerHeight = useHeaderHeight();
  const viewHeight = windowHeight - 120 - headerHeight;
  const { id } = useLocalSearchParams();

  const renderImage = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.imageList} />
  );

  const {
    data: product,
    isError,
    isFetching,
  } = useRetrieveProductByIdQuery({
    id: id ? id[0] : '1',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Product',
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingRight: 20 }}
          onPress={() => {
            navigation.navigate('cart/index' as never);
          }}
        >
          <Feather name="shopping-bag" size={24} color={COLORS.darkerPrimary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  if (isError) return <Text>An error occured</Text>;
  if (isFetching) return <ActivityIndicator />;
  if (product) {
    const {
      brand,
      category,
      description,
      discountPercentage,
      images,
      price,
      rating,
      stock,
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
          <Text>rating : {rating}</Text>
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
          <View>
            <TouchableOpacity style={styles.addToCartBtn}>
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
    height: 80,
    width: 80,
    borderRadius: SIZES.xSmall,
  },
});

singleProductPage.navigationOptions = () => ({
  title: 'Product',
  headerRight: () => (
    <TouchableOpacity style={{ paddingRight: 20 }} onPress={() => {}}>
      <Text>asd</Text>
    </TouchableOpacity>
  ),
});

export default singleProductPage;
