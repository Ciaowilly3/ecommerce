import { ScrollView, StyleSheet, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import ProductsContainer from '../../components/ProductsContainer';
import CategoriesConteiner from '../../components/CategoriesConteiner';
import SearchProductComponent from '../../components/InputText';
import { useState } from 'react';
import FilteredProductsContainer from '../../components/FilteredProductsContainer';

export default function Page() {
  const [searchedName, setSearchedName] = useState<string>('');

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.small,
      }}
    >
      <SearchProductComponent
        onBlurFn={(text: string) => setSearchedName(text)}
        placeholder="search products..."
      />
      {searchedName ? (
        <FilteredProductsContainer
          searchedText={searchedName}
          setSearchedName={setSearchedName}
        />
      ) : (
        <>
          <CategoriesConteiner />

          <ProductsContainer
            searchedText={searchedName}
            setSearchedName={setSearchedName}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 36,
    color: '#38434D',
  },
});
