import React, {useState} from 'react';
import {
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import styles from '../../Style/LoginStyle';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getRemoveToken} from '../../../Service/Password/Password';
import axios from 'axios';
import config from '../../../Service/Config/Config';
const REACT_APP_CLIENT_ID = 'Lafarge-Dashboard';
const REACT_APP_GRANT_TYPE = 'password';
const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setsecureTextEntry] = useState(true);

  const updateSecureTextEntry = () => {
    setsecureTextEntry(!secureTextEntry);
  };

  const handleSubmit = e => {
    setLoading(true);
    // e.preventDefault();

    const re = /\S+@\S+\.\S+/;
    const isEnabled = re.test(username);

    if (isEnabled) {
      axios({
        method: 'POST',
        url: config.apiUrl.loginAPI,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: `grant_type=${REACT_APP_GRANT_TYPE}&username=${username}&password=${password}&client_id=${REACT_APP_CLIENT_ID}`,
      })
        .then(response => {
          getRightToken(response.data.access_token);
        })
        .catch(reject => {
          setLoading(false);
          if (reject.response) {
            Alert.alert(
              'Login not successfull',
              reject.response.data.message
                ? reject.response.data.message
                : reject.response.data.error_description,
            );
          }
        });
    } else {
      setLoading(false);

      Alert.alert(
        'Login not successfull',
        'Sorry, the credentials you provided are incorrect',
      );
    }
  };

  const getRightToken = token => {
    fetch(`${config.apiUrl.accessTokenAPI}${token}/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.detail) {
          getRemoveToken(token);
          navigation.navigate('Login');
        } else {
          axios({
            method: 'get',
            url: config.apiUrl.userMeAPI,
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          })
            .then(async response2 => {
              setLoading(false);
              // Check if user has email or not
              if (response2.data.email) {
                try {
                  await AsyncStorage.setItem('@storage_Key', data.token);
                  await AsyncStorage.setItem(
                    '@storage_Key_refresh',
                    data.refresh_token,
                  );
                } catch (error) {
                  console.log('AsyncStorage Error: ' + error.message);
                }

                if (await AsyncStorage.getItem('@storage_Key')) {
                  navigation.navigate('Home');
                }
              } else {
                setLoading(false);
                Alert.alert(
                  'Login in successfull',
                  'Sorry, you do not have access rights to Digital fleet',
                );
              }
            })
            .catch(reject => {
              setLoading(false);
              if (reject.response) {
                Alert.alert(
                  'Login not successfull',
                  reject.response.data.message
                    ? reject.response.data.message
                    : reject.response.data.error_description,
                );
              }
            });
        }
      })
      .catch(reject => console.log(reject));
  };

  return (
    <>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.imageClass}>
          <Image
            source={require('../../../../assets/Image/Logo.png')}
            style={styles.images}
          />
        </View>
        <View style={styles.loginSection}>
          <View>
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Write your code"
                value={username}
                name="username"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={evt => setUsername(evt)} //   onChangeText={val => textInputChange(val)}
              />
            </View>
          </View>
          <View style={styles.password}>
            <Text style={styles.text_footer}>Password</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Write your code"
                style={styles.textInput}
                value={password}
                name="password"
                autoCapitalize="none"
                secureTextEntry={secureTextEntry ? true : false}
                onChangeText={evt => setpassword(evt)}
              />
              <TouchableOpacity
                onPress={() => updateSecureTextEntry()}
                style={styles.openClose}>
                {secureTextEntry ? (
                  <Feather name="eye-off" color="#39324C" size={20} />
                ) : (
                  <Feather name="eye" color="#39324C" size={20} />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.Forget}
              onPress={() => navigation.navigate('Forget')}>
              <Text style={styles.ForgetText}>Forget Password ?</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.btnSection}
              onPress={() => handleSubmit()}>
              <Text style={styles.btnText}>
                {loading ? 'Loading ..' : 'CONTINUE'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Login;
