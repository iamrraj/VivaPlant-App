import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = 'https://digitalfleet.eu/api/1/';
const api1 = 'https://digitalfleet.eu/api/1/lafarge/';

const getToken = async () => await AsyncStorage.getItem('id_token');

const config = {
  apiUrl: {
    loginAPI: `${api}oauth/token/`,
    accessTokenAPI: `${api}users/accesstoken/`,
    logoutAPI: ` ${api}oauth/revoke_token/`,
    userMeAPI: `${api}users/me/`,
    myFleetAPI: `${api}fleets/my/`,
    requestOtpAPI: `${api}users/request/code/`,
    confirmOtpAPI: `${api}users/confim/code/`,
    forgetPassword: `${api}users/sendForgottenPasswordEmail/`,
    newpassword: `${api}users/confim/code/`,
    changePassword: `${api}users/update-password/`,

    driversAPI: `${api}stats/month/`,
    driversOverview: `${api1}stats/`,
  },

  head: {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

      Authorization: 'Bearer ' + 'EtdTDGJ90nTYxFeOw1WCqozEfbgP64',
    },
  },
  fakeHead: {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },

  headPostAxios: {
    Accept: 'application/json',
    'Content-Type': 'application/json',

    Authorization: 'Bearer ' + 'EtdTDGJ90nTYxFeOw1WCqozEfbgP64',
  },
};

export default config;
