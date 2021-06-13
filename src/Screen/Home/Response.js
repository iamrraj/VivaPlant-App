import React, {useState, useLayoutEffect} from 'react';
import {
  Text,
  Switch,
  ScrollView,
  Image,
  StyleSheet,
  RefreshControl,
  View,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../Style/Style';

function Response({route, navigation}) {
  const {name, image, result} = route.params;
  const [switchValue, setSwitchValue] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  //   const wait = timeout => {
  //     setSwitchValue(!switchValue);
  //   };

  //   const onRefresh = React.useCallback(() => {
  //     setRefreshing(true);
  //     wait(2000).then(() => setRefreshing(false));
  //   }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 17,
        marginLeft: -20,
      },
      headerStyle: {
        backgroundColor: 'white',

        height: 50,
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginLeft: 10}}>
          <Ionicons
            name={'chevron-back-outline'}
            size={25}
            color={'black'}
            //onPress={this.onchange.bind(this)}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const toggleSwitch = value => {
    setSwitchValue(value);
  };

  const dataMai = [
    {
      image: image,
      name: 'Product 1',
    },
    {
      image: image,
      name: 'Product 2',
    },
  ];
  return (
    <View style={styles.mainContainer}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} />}>
        <View style={styles.secondContainer}>
          <Image
            // source={require('../../../assets/Image/apple.jpg')}
            source={{uri: image}}
            style={styles.images}
          />
        </View>
        <View style={styles.textSextion}>
          <Text style={styles.textIndentificauon}>Identifications &nbsp; </Text>
          <Switch
            style={{marginTop: -23}}
            onValueChange={toggleSwitch}
            value={switchValue}
          />
        </View>

        <View style={styles.result}>
          <View style={styles.redbox}>
            <Text style={styles.Title}>Plant &nbsp; </Text>
            <Text style={styles.textIndentificauon}>
              {result.split('__')[0]} &nbsp;{' '}
            </Text>
          </View>
          <View style={styles.bluebox}>
            <Text style={styles.Title}>Disease &nbsp; </Text>
            <Text style={styles.textIndentificauon}>
              {' '}
              {result.split('__')[1]} &nbsp;{' '}
            </Text>
          </View>
        </View>

        <View style={styles.result1}>
          <Text style={styles.Title}>Recommedation pestici &nbsp; </Text>
        </View>

        {dataMai.map((c, i) => (
          <View style={[styles.result, {marginBottom: 5}]} key={i + 1}>
            <View style={[styles.redbox, {width: '29%'}]}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIX9C9wNAx4u5hBrMBKXOLGv2y5rjJtUf8nOh9PH7TC4hA3i8kiCR5uOwhmcDLAdqxcCo&usqp=CAU',
                }}
                style={{width: 50, height: 40, borderRadius: 4}}
              />
            </View>
            <View style={[styles.bluebox, {width: '60%'}]}>
              <Text style={[styles.Title, {marginTop: 10}]}>{c.name} </Text>
            </View>
            <View style={styles.bluebox}>
              <TouchableOpacity style={styles.btnBuy}>
                <Text style={[styles.btnText, {color: 'black'}]}>Buy</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={{paddingLeft: 23, marginTop: 40}}>
          <LinearGradient
            colors={['#00F5B5', '#00FFBC']}
            style={styles.btnSection}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.btnText}>
                <Feather name="send" color="white" size={14} /> &nbsp;
                Re-Analize Image
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}

export default Response;
