import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../Config/Config';

export async function getDriver(setdata, setLoading, date) {
  const data = await AsyncStorage.getItem('@storage_Key');
  fetch(`${config.apiUrl.driversAPI}${date}/overview/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + data,
    },
  })
    .then(response => response.json())
    .then(data => {
      setdata(data.days);
      setLoading(false);
    });
}

export async function getMonth(setdata) {
  const data = await AsyncStorage.getItem('@storage_Key');
  fetch(config.apiUrl.driversAPI, {
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
    });
}
