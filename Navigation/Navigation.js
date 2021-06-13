import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomNavigation from './BottomNavigation';
import Main from '../src/Screen/Main/Main';
import Response from '../src/Screen/Home/Response';
import FieldDetails from '../src/Screen/Home/FieldDetails';
import Login from '../src/Screen/Auth/Login/Login';
import ForgetPassword from '../src/Screen/Auth/Forget/ForgetPassword';
import OfflineNotice from '../src/Screen/Offline/Offline';
import Screen from '../src/Screen/Offline/Screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Navigation1({navigation}) {
  const [age, setAge] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const readData = async () => {
    try {
      const userAge = await AsyncStorage.getItem('@storage_Key');
      setLoading(false);
      setAge(userAge);
    } catch (e) {
      console.log('Error While Fetching Storage data ');
    }
  };
  React.useEffect(() => {
    const interval = setInterval(() => {
      readData();
    }, 100);

    return () => {
      clearTimeout(interval);
    };
  }, [navigation]);

  const getLageoginPage = async () => {
    if (await AsyncStorage.getItem('@storage_Key')) {
    } else {
      navigation.navigate('Login');
    }
  };

  React.useEffect(() => {
    getLageoginPage();
  }, [navigation]);

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
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: 'Dashboard', headerShown: false}}
      />
      <Stack.Screen
        name="Forget"
        component={ForgetPassword}
        options={{title: 'Dashboard', headerShown: false}}
      />
    </AuthStack.Navigator>
  );

  const MainStack = createStackNavigator();
  const MainStackScreen = () => (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
          height: 45,
        },
      }}>
      <MainStack.Screen
        name="Home"
        component={BottomNavigation}
        options={{title: 'Main', headerShown: false}}
      />
      <MainStack.Screen
        name="Response"
        component={Response}
        options={({route}) => ({title: route.params.name})}
      />
      <MainStack.Screen
        name="Details"
        component={FieldDetails}
        options={({route}) => ({title: route.params.name})}
      />
    </MainStack.Navigator>
  );

  const Stack = createStackNavigator();

  const ErrorCard = () => {
    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet Connection</Text>
      </View>
    );
  };

  let network = OfflineNotice();
  if (network === false) {
    return <Screen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {age !== null ? (
          <Stack.Screen
            name="Main"
            component={MainStackScreen}
            options={{title: 'Dashboard', headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthStackScreen}
            options={{title: 'Dashboard', headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation1;
