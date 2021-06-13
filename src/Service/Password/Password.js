import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../Config/Config';
const REACT_APP_CLIENT_ID = 'Lafarge-Dashboard';
const REACT_APP_CLIENT_SECRET =
  'BZiNqU28nFXlL0gA8slq5jP4JFTVaw6RqFcelbVvRDiVnR1y5u0cnlRaTYdtg3UvqqGm98c03gdicJQeiwR7db6OmB5U1FUJ5DvsUbHnhFmoLk4jwhjk5bJartYs31tU';

export async function getRemoveToken(token) {
  axios({
    method: 'POST',
    url: config.apiUrl.logoutAPI,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: `token=${token}&client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}`,
  })
    .then(async response => {
      if (response.status === 200) {
        try {
          await AsyncStorage.removeItem('@storage_Key');
        } catch (e) {
          // saving error
        }
      }
    })
    .catch(reject => {
      console.log(reject);
    });
}

export async function forgetPassword(product, setLoading, navigation) {
  let country = new Promise((resolve, reject) => {
    const mailformat = RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
    const isEnabled = product.email.match(mailformat);
    if (isEnabled) {
      axios({
        method: 'POST',
        url: config.apiUrl.forgetPassword,
        headers: config.headPostAxios,
        data: product,
      })
        .then(response => {
          if (!response.ok) {
            setLoading(false);
            Alert.alert(
              'Success',
              `Forget password link sent to you ${product.email}`,
            );

            setTimeout(function () {
              navigation.navigate('Login');
            }, 2000);
            resolve(response.json());
          }
        })
        .catch(reject => {
          if (reject.response) {
            setLoading(false);
            Alert.alert('Error !', reject.response.data.message);
          }
        });
    } else {
      Alert.alert(
        'warning !',
        "It's seems like you don't have correct email id. Please check it  !!",
      );
    }
  });
  return country;
}
