import React, { useCallback } from 'react';
import { IUser } from '../../Interfaces/IUser';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

interface IAccountDetailsProps {
  user: IUser;
}

const AccountDetails = ({ user }: IAccountDetailsProps) => {
  const navigateToCreditCards = useCallback(() => {
    router.navigate('creditCards');
  }, []);

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

      <TouchableOpacity
        onPress={() => navigateToCreditCards()}
        style={styles.btnStyle}
      >
        <Text style={styles.title}>Manage your payment methods</Text>
        <FontAwesome5
          name="credit-card"
          size={18}
          color={COLORS.darkerPrimary}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.darkerPrimary,
    marginBottom: SIZES.xSmall,
    alignSelf: 'flex-end',
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
