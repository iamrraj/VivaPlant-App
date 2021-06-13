import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../Config/Config';

export async function getScore(setdata, setLoading, date) {
  const data = await AsyncStorage.getItem('@storage_Key');
  fetch(`${config.apiUrl.driversOverview}${date}/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + data,
    },
  })
    .then(response => response.json())
    .then(data => {
      setdata(data);
      setLoading(false);
    });
}
