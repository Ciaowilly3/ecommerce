import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../constants';
import LoginForm from '../LoginForm';
import { SafeAreaView } from 'react-native-safe-area-context';
import SigninForm from '../SigninForm';

type LogSignInFormModalProps = {
  handleVisibility: () => void;
  isModalVisible: boolean;
  isLoginForm: boolean;
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const LogSignInFormModal = ({
  handleVisibility,
  isModalVisible,
  isLoginForm,
  setIsLoginForm,
}: LogSignInFormModalProps) => {
  return (
    <Modal visible={isModalVisible} animationType="slide">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.formSwitchContainer}>
          <TouchableOpacity
            onPress={() => setIsLoginForm(true)}
            disabled={isLoginForm}
          >
            <Text
              style={[
                styles.formTitle,
                { color: isLoginForm ? COLORS.darkerPrimary : COLORS.tertiary },
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsLoginForm(false)}
            disabled={!isLoginForm}
          >
            <Text
              style={[
                styles.formTitle,
                {
                  color: !isLoginForm ? COLORS.darkerPrimary : COLORS.tertiary,
                },
              ]}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
        {isLoginForm ? (
          <LoginForm handleVisibility={handleVisibility} />
        ) : (
          <SigninForm handleVisibility={handleVisibility} />
        )}
      </SafeAreaView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    height: '100%',
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.xxLarge,
    justifyContent: 'center',
    borderRadius: SIZES.small,
  },
  formSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formTitle: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
  },
});
export default LogSignInFormModal;
