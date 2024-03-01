import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import ProductsContainer from '../../components/ProductsContainer';
import CategoriesConteiner from '../../components/CategoriesConteiner';

export default function Page() {
  return (
    <ScrollView
      style={{
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.small,
      }}
    >
      <View>
        <Text>Search input</Text>
      </View>
      <View>
        <CategoriesConteiner />
      </View>
      <View>
        <ProductsContainer />
      </View>
    </ScrollView>
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
