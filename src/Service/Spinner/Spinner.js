import React from 'react';

import {View, Image, StyleSheet} from 'react-native';

function Spinner() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/Image/Spinner.gif')}
        style={{width: 90, height: 90}}
        resizeMode="contain"
      />
    </View>
  );
}

export default Spinner;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: 50,
  },
});
