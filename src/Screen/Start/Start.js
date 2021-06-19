import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
  AppState,
} from 'react-native';
import Top from '../Top/Top';
import styles from '../Style/Start';
import LinearGradient from 'react-native-linear-gradient';
import uuid from 'react-native-uuid';
import Geolocation from 'react-native-geolocation-service';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {differenceInSeconds} from 'date-fns';
//usage
import appConfig from '../../../app.json';
var testUUID = uuid.v1();

const Start = () => {
  const [start, setStart] = useState('start');
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [hour, setHour] = useState('00');
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [time, totalTime] = useState('');

  const [loading, setloading] = useState(false);
  const [number, setNumber] = useState(0);
  const [gpsPosition, setGpsPosition] = useState([]);

  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [significantChanges, setSignificantChanges] = useState(false);
  const [observing, setObserving] = useState(false);
  const [foregroundService, setForegroundService] = useState(true);
  const [location, setLocation] = useState(null);

  const watchId = useRef(null);

  useEffect(() => {
    return () => {
      removeLocationUpdates();
    };
  }, [removeLocationUpdates]);

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  // useEffect(() => {
  //   getLocation();
  // }, []);
  // const getLocation = async () => {
  //   const hasPermission = await hasLocationPermission();

  //   if (!hasPermission) {
  //     return;
  //   }
  //   setloading(true);
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       setLocation(position);

  //       setloading(false);
  //     },
  //     error => {
  //       Alert.alert(`Code ${error.code}`, error.message);
  //       setLocation(null);
  //       console.log(error);
  //     },
  //     {
  //       accuracy: {
  //         android: 'high',
  //         ios: 'best',
  //       },
  //       enableHighAccuracy: highAccuracy,
  //       timeout: 15000,
  //       maximumAge: 10000,
  //       distanceFilter: 0,
  //       forceRequestLocation: forceLocation,
  //       showLocationDialog: locationDialog,
  //     },
  //   );
  // };

  const getLocationUpdates = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    if (Platform.OS === 'android' && foregroundService) {
      await startForegroundService();
      setGpsPosition([]);
      console.log('one');
    }

    // {
    //   "coords":
    //   { "accuracy": 13.031000137329102, "altitude": 118.07911660861846, "heading": 23.411136627197266, "latitude": 52.24939, "longitude": 21.0387127, "speed": 0.7061119079589844 },
    //   "mocked": false, "timestamp": 1624124844000
    // }

    setObserving(true);

    watchId.current = Geolocation.watchPosition(
      position => {
        setLocation(position);
        // setGpsPosition(prevState => [...prevState, position]);
        setGpsPosition(prevState => [
          ...prevState,
          {
            accuracy: position.coords['accuracy'],
            date: new Date(position.timestamp).toLocaleString(),
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            speed: position.coords['speed'],
            timeUtc: position['timestamp'],
          },
        ]);
      },
      error => {
        setLocation(null);

        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
        forceRequestLocation: forceLocation,
        showLocationDialog: locationDialog,
        useSignificantChanges: significantChanges,
      },
    );
  };

  // console.log('Gps final Data', gpsPosition);

  const sendData = async () => {
    //  this.setState({ loading: true });
    console.log('Just Data', gpsPosition);
    setloading(true);
    const token = await AsyncStorage.getItem('@storage_Key');
    const data = {
      gpsPosition: gpsPosition,
      userActivity: [
        {
          activityType: 'SESSION_RECORDING',
          date: '2021-06-19 17:55:27.143+0200',
          transitionType: 'EXIT',
        },
      ],
      uuid: testUUID,
    };
    axios({
      method: 'POST',
      url: `https://digitalfleet.eu/api/1/data/mobile/`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },

      data: data,
    })
      .then(response => {
        console.log('Succes', data);
        setloading(false);
      })
      .catch(reject => {
        console.log(reject);
        setloading(false);
      });
  };

  const removeLocationUpdates = useCallback(() => {
    if (watchId.current !== null) {
      stopForegroundService();
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setObserving(false);
    }
  }, [stopForegroundService]);

  const startForegroundService = async () => {
    if (Platform.Version >= 26) {
      await VIForegroundService.createNotificationChannel({
        id: 'locationChannel',
        name: 'Location Tracking Channel',
        description: 'Tracks location of user',
        enableVibration: true,
      });
    }
    setIsActive(true);
    console.log(isActive);
    return VIForegroundService.startService({
      channelId: 'locationChannel',
      id: 420,
      title: appConfig.displayName,
      text: 'Tracking location updates',
      icon: 'ic_launcher',
    });
  };

  const stopForegroundService = useCallback(() => {
    VIForegroundService.stopService().catch(err => err);
  }, []);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);
        const minuteHour = Math.floor(counter / 60 / 60);
        let computedSHour =
          String(minuteHour).length === 1 ? `0${minuteHour}` : minuteHour;
        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);
        setHour(computedSHour);
        const timeUp = `${minuteHour}:${computedMinute}:${computedSecond}`;
        totalTime(timeUp);
        setStart('stop');

        setCounter(counter => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  function stopTimer() {
    setIsActive(false);
    setStart('stoptrip');
    setCounter(0);
    setSecond('00');
    setMinute('00');
    setHour('00');
    // sendData();
  }
  const startService = () => {
    setIsActive(!isActive);
    getDataTime();
    getLocationUpdates();
  };

  const StartAlert = () =>
    Alert.alert(
      'Start Recording',
      'Are you sure You want ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: startService},
      ],
      {cancelable: false},
    );

  const removeLocationUpdates1 = () => {
    removeLocationUpdates();

    stopTimer();

    // sendData();
  };

  const StopAlert = () =>
    Alert.alert(
      'Stop Recording',
      'Are you sure You want ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: removeLocationUpdates1},
      ],
      {cancelable: false},
    );

  return (
    <>
      <Top
        color={start === 'stoptrip' ? '#01875A' : 'white'}
        color1={start === 'stoptrip' ? 'white' : 'black'}
        imageUri={
          start === 'stoptrip'
            ? require('../../../assets/Image/Logo1.png')
            : require('../../../assets/Image/Logo.png')
        }
      />
      {start === 'stoptrip' ? (
        <View style={styles.mainContainer}>
          <LinearGradient
            colors={['#01875A', '#00C684']}
            style={styles.scoreContainer}>
            <View style={styles.startButton}>
              <View style={styles.tripFished}>
                <Text style={styles.TripText}>TRIP FINISHED</Text>

                <View style={styles.drivingSection}>
                  <Text style={styles.driving}>DRIVING TIME</Text>
                  <Text style={styles.drivingTimefinish}>{time}</Text>
                </View>
                <View style={styles.distnceSection}>
                  <Text style={styles.driving}>DISTANCE (KM)</Text>
                  <Text style={styles.drivingTimefinish}>
                    0.<Text style={styles.distanceTime}>000</Text>
                  </Text>

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setStart('start')}>
                    <Text style={styles.closeButtonText}>CLOSE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <View style={styles.startButton}>
            <Text style={styles.manualModel}>Manual Mode</Text>
            <LinearGradient
              style={styles.startButtonSection}
              colors={
                start === 'start'
                  ? ['#01875A', '#00C684']
                  : ['#701221', '#C52039']
              }>
              <TouchableOpacity
                style={styles.startButtonClick}
                onPress={start === 'start' ? StartAlert : StopAlert}>
                <Text style={styles.startButtonText}>
                  {start === 'start' ? 'START' : 'STOP'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={styles.drivingSection}>
            <Text style={styles.driving}>DRIVING TIME</Text>
            <Text
              style={
                start === 'start' ? styles.drivingTime : styles.drivingTimeStop
              }>
              {/* 00:00:00 */}
              {hour}:{minute}:{second}
            </Text>
          </View>

          <View style={styles.distnceSection}>
            <Text style={styles.driving}>DISTANCE (KM)</Text>
            <Text
              style={
                start === 'start' ? styles.drivingTime : styles.drivingTimeStop
              }>
              0.<Text style={styles.distanceTime}>000</Text>
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default Start;
