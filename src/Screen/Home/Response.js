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
                  uri: 'https://4.imimg.com/data4/OG/RH/MY-26663927/vestige-agri-82-500x500.png',
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
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  switch: {
    borderColor: 'red',
    borderWidth: 1,
  },
  secondContainer: {
    width: '100%',
    marginTop: 0,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  result1: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '80%',
    paddingLeft: 23,
    paddingTop: 40,
    justifyContent: 'space-between',
  },
  result: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '80%',
    paddingLeft: 23,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  recommend: {
    justifyContent: 'center',

    width: '95%',
    paddingLeft: 23,
    paddingTop: 50,
  },

  images: {
    width: '95%',
    height: 250,
    borderColor: '#00FFBC',
    borderWidth: 2,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  textSextion: {
    paddingLeft: 20,
    width: 190,
    marginTop: 20,
  },
  textIndentificauon: {
    fontSize: 17,
    marginTop: 5,
    color: '#4A4A4A',
    fontWeight: '700',
  },
  switchEnableBorder: {
    borderColor: '#6fa6d3',
    borderWidth: 1,
  },

  switchDisableBorder: {
    borderColor: '#f2f2f2',
    borderWidth: 1,
  },
  Title: {
    textTransform: 'uppercase',
    color: '#757575',
    fontSize: 13,
    fontFamily: 'Oswald',
  },
  btnSection: {
    width: '95%',
    height: 40,

    justifyContent: 'center',
    borderRadius: 3,
  },
  btnBuy: {
    width: 80,
    height: 35,
    borderWidth: 1,
    borderColor: '#00F5B5',
    justifyContent: 'center',
    borderRadius: 3,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
