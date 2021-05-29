import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TopNavigation from './TopNavigation';
import Main from '../src/Screen/Main/Main';
import Response from '../src/Screen/Home/Response';
import FieldDetails from '../src/Screen/Home/FieldDetails';

function Navigation1({navigation}) {
  const AuthStack = createStackNavigator();
  const AuthStackScreen = () => (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
          height: 47,
        },
      }}>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{title: 'Dashboard', headerShown: false}}
      />
      <AuthStack.Screen
        name="Home"
        component={TopNavigation}
        options={{title: 'Main', headerShown: false}}
      />
      <AuthStack.Screen
        name="Response"
        component={Response}
        options={({route}) => ({title: route.params.name})}
      />
      <AuthStack.Screen
        name="Details"
        component={FieldDetails}
        options={({route}) => ({title: route.params.name})}
      />
    </AuthStack.Navigator>
  );

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{title: 'Dashboard', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation1;
