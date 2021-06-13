import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getRemoveToken} from '../../Service/Password/Password';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ErrorCard = () => {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
};

const Top = props => {
  const {navigation} = props;

  async function onLogout() {
    try {
      getRemoveToken(await AsyncStorage.getItem('@storage_Key'));

      await AsyncStorage.removeItem('@storage_Key');

      navigation.navigate('Login');
    } catch (exception) {
      console.log('Token', await AsyncStorage.getItem('@storage_Key'));
      return false;
    }
  }

  const loginAlert = () =>
    Alert.alert(
      'Logout',
      'Are you sure ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: onLogout},
      ],
      {cancelable: false},
    );

  return (
    <>
      {/* <OfflineNotice /> */}
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: props.color,
          padding: 10,
        }}>
        <View>
          <Image source={props.imageUri} style={styles.imagesTop} />
        </View>
        <TouchableOpacity style={styles.dropdown} onPress={loginAlert}>
          <AntDesign name={'logout'} color={props.color1} size={25} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imagesTop: {
    width: 125,
    height: 41,
  },
  dropdown: {
    paddingVertical: 10,
  },
});

export default Top;
