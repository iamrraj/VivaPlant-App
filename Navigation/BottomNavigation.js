import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Dimensions} from 'react-native';
import Start from '../src/Screen/Start/Start';
import Driver from '../src/Screen/Driver/Driver';
import Score from '../src/Screen/Score/Score';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();
const DEVICE_WIDTH = Dimensions.get('window').width;
const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      lazy={true}
      tabBarOptions={{
        showLabel: false,
        inactiveTintColor: '#00A870',
        backgroundColor: 'white',
        activeTintColor: '#00A870',
        labelStyle: {
          fontSize: 12,
        },

        // tabStyle: {
        //   //Add this
        //   borderLeftWidth: 2,
        //   borderColor: 'green',
        // },

        style: {
          backgroundColor: 'white',
          position: 'absolute',
          marginLeft: 100, // Use margins as you required
          marginRight: 100,
          marginBottom: 20,
          width: DEVICE_WIDTH - 200, // Or using a percentage as required
          borderRadius: 25,
        },
      }}>
      <Tab.Screen
        name="Start"
        component={Start}
        options={{
          tabBarLabel: 'Start',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'steering' : 'steering-off'}
              color={focused ? '#00A870' : '#231F20'}
              size={25}
            />
          ),
        }}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Start');
          },
        })}
      />

      <Tab.Screen
        name="Driver"
        component={Driver}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();

            // Do something with the `navigation` object
            navigation.navigate('Driver');
          },
        })}
        options={{
          tabBarLabel: 'Driver',

          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'map-outline' : 'map'}
              color={focused ? '#00A870' : '#231F20'}
              size={25}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Score"
        component={Score}
        options={{
          tabBarLabel: 'Score',

          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'trophy-outline' : 'trophy'}
              color={focused ? '#00A870' : '#231F20'}
              size={25}
              style={{}}
            />
          ),
        }}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Score');
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
