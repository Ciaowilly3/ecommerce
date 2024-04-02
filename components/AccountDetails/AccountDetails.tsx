import React, { useCallback } from 'react';
import { IUser } from '../../Interfaces/IUser';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

interface IAccountDetailsProps {
  user: IUser;
}

const AccountDetails = ({ user }: IAccountDetailsProps) => {
  const buttons = ['creditCards'];

  const navigateTo = useCallback((destination: string) => {
    router.navigate(destination);
  }, []);

  const renderButton = useCallback(
    ({ item }: { item: string }) => (
      <TouchableOpacity
        onPress={() => navigateTo(item)}
        style={styles.btnStyle}
      >
        <Text style={styles.title}>Manage your payment methods</Text>
        <FontAwesome5
          name="credit-card"
          size={18}
          color={COLORS.darkerPrimary}
        />
      </TouchableOpacity>
    ),
    [navigateTo]
  );
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <Text>Username: {user.name}</Text>
          <Text>email: {user.email}</Text>
          <Text>Password: *******</Text>
        </View>
        <View style={styles.contentContainer}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSppkoKsaYMuIoNLDH7O8ePOacLPG1mKXtEng&usqp=CAU',
            }}
            style={styles.image}
          />
        </View>
      </View>

      <FlatList data={buttons} renderItem={renderButton} />
    </>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: SIZES.xSmall,
    alignItems: 'center',
    gap: SIZES.xSmall,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.darkerPrimary,
    borderRadius: SIZES.xSmall,
    shadowColor: COLORS.darkerPrimary,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
    marginTop: SIZES.xxLarge,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.darkerPrimary,
  },
  mainContainer: {
    flexDirection: 'row',
    paddingVertical: SIZES.small,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
  },
  image: {
    alignSelf: 'flex-end',
    flex: 1,
    width: 60,
    borderRadius: 30,
    resizeMode: 'contain',
  },
});

export default AccountDetails;
