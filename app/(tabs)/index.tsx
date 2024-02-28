import { Link, router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants';
import ProductsContainer from '../../components/ProductsContainer';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import CategoriesConteiner from '../../components/CategoriesConteiner';

export default function Page() {
  return (
    <Provider store={store}>
      <ScrollView style={{ backgroundColor: COLORS.white }}>
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
    </Provider>
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
