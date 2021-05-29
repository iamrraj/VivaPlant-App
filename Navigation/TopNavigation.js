import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Home from '../src/Screen/Home/Home';
import Field from '../src/Screen/Home/Field';

const Tab = createMaterialTopTabNavigator();
function TopNavigation() {
  return (
    <>
      <View style={styles.container}>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#00F5B5',
            inactiveTintColor: 'gray',
            labelStyle: {
              fontSize: 13,
              textTransform: 'none',
              fontWeight: 'bold',
              marginTop: 0,
            },
            tabStyle: {
              borderRadius: 10,
              height: 45,
            },
            indicatorStyle: {
              backgroundColor: 'white',

              borderBottomColor: '#00F5B5',
              borderBottomWidth: 2,
            },
            style: {
              borderBottomColor: 'black',

              borderRadius: 10,
            },
          }}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Field" component={Field} />
        </Tab.Navigator>
      </View>
    </>
  );
}

export default TopNavigation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D5D0EC',
    marginTop: 20,
  },
});
