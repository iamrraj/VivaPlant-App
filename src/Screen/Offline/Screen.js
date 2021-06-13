import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles1 from '../Style/LoginStyle';
import NetInfo from '@react-native-community/netinfo';
const Screen = () => {
  const [netInfo, setNetInfo] = useState(null);
  const CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === 'android') {
      NetInfo.fetch().then(state => {
        console.log('Connection type', state.type);
        console.log('Is connected again?', state.isConnected);
        setNetInfo(state.isConnected);
      });
    }
  };

  return (
    <View style={styles.offlineContainer}>
      <View style={styles1.imageClass}>
        <Image
          source={require('../../../assets/Image/Logo1.png')}
          style={styles1.images}
        />
        <Text style={styles.offlineText}>No Internet Connection available</Text>
        <View>
          <TouchableOpacity
            onPress={() => CheckConnectivity()}
            style={{
              width: 200,
              height: 44,
              marginTop: 30,
              borderRadius: 6,
              backgroundColor: '#00F5B5',
            }}>
            <Text style={[styles1.btnText, {marginTop: 12}]}>TRY AGAIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#00A870',
    height: '100%',
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  offlineText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 50,
  },
});

export default Screen;
