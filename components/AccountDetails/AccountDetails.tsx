import React from 'react';
import { IUser } from '../../Interfaces/IUser';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SIZES } from '../../constants';

interface IAccountDetailsProps {
  user: IUser;
}

const AccountDetails = ({ user }: IAccountDetailsProps) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    paddingVertical: SIZES.small,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    flex: 1,
    width: 60,
    borderRadius: 30,
    resizeMode: 'contain',
  },
});

export default AccountDetails;
