import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRetrieveAllCategoriesQuery } from '../../../Services/category/api';
import { COLORS, SIZES } from '../../../constants';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import DiscoverProductsContainer from '../../../components/DiscoverProductsContainer';
import { useLocalSearchParams } from 'expo-router';
import { CategorySearchParams } from '../../../Interfaces/ICategories';
import { capitalize } from 'lodash';
import Spinner from '../../../components/Spinner';

const Discover = () => {
  const {
    data: categories,
    isFetching,
    isError,
  } = useRetrieveAllCategoriesQuery();
  const { category } = useLocalSearchParams<CategorySearchParams>();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    category ?? ''
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(
    () => setSelectedCategory(category ?? selectedCategory),
    [category, selectedCategory]
  );

  const handleModalVisibility = useCallback(() => {
    setIsModalVisible((prev) => !prev);
  }, []);

  const handleCategorySelect = (selected: string) => {
    setSelectedCategory(selected);
    handleModalVisibility();
  };

  const renderCategoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategorySelect(item)}
    >
      <Text>{capitalize(item)}</Text>
    </TouchableOpacity>
  );

  if (isFetching) return <Spinner />;
  if (isError) return <Text>An error occured</Text>;
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={handleModalVisibility}
        style={styles.selectButtonStyle}
      >
        <Text style={styles.selectButtonText}>
          {capitalize(selectedCategory.replace('-', ' ')) || 'Select Category'}
        </Text>
        <FontAwesome
          name="chevron-circle-down"
          size={24}
          color={COLORS.darkerPrimary}
        />
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={handleModalVisibility}
            style={styles.closeButtonStyle}
          >
            <FontAwesome5 name="times" size={18} color={COLORS.white} />
          </TouchableOpacity>
          <FlatList
            data={categories ?? []}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.toString()}
          />
        </View>
      </Modal>
      <DiscoverProductsContainer category={selectedCategory} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    shadowColor: COLORS.darkerPrimary,
    shadowOpacity: 1,
    borderBottomColor: COLORS.secondary,
    borderBottomWidth: 1,
  },
  selectButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xSmall,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.small,
    padding: SIZES.medium,
  },
  closeButtonStyle: {
    position: 'absolute',
    top: '9%',
    right: SIZES.medium,
    zIndex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    backgroundColor: COLORS.darkerPrimary,
    borderRadius: 18,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.8,
    shadowOffset: { width: 3, height: 1 },
  },
  selectButtonText: {
    color: COLORS.darkerPrimary,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.xxLarge,
    borderRadius: SIZES.small,
  },
  categoryItem: {
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
});

export default Discover;
