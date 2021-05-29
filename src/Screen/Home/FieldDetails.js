import React, {useLayoutEffect} from 'react';
import {StyleSheet, Image, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const FieldDetails = ({route, navigation}) => {
  const {name} = route;
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
  return (
    <View style={styles.mainContainer}>
      <View style={styles.result}>
        <View style={styles.redbox}>
          <Text style={{fontSize: 16, fontWeight: '400'}}>Field 1</Text>
        </View>
        <View style={styles.bluebox}>
          <Text style={styles.textButton}>Coordenates</Text>
        </View>
      </View>
      <View style={{justifyContent: 'center', width: '95%'}}>
        <Image
          source={require('../../../assets/Image/name.png')}
          style={styles.images}
        />
      </View>
      <View style={[styles.result, {marginTop: 25}]}>
        <View style={styles.redbox}>
          <Text style={styles.Title}>Crop &nbsp; </Text>
          <Text style={styles.textIndentificauon}>Potatoes </Text>
        </View>
        <View style={styles.bluebox}>
          <Text style={styles.Title}>Area &nbsp; </Text>
          <Text style={styles.textIndentificauon}>3946 m2</Text>
        </View>
        <View style={styles.bluebox}>
          <Text style={styles.buttonLol}>Update crop</Text>
        </View>
      </View>
      <View style={[styles.result, {marginTop: 25}]}>
        <View style={styles.redbox}>
          <Text style={styles.Title}>Time to cultivate &nbsp; </Text>
          <Text style={styles.textIndentificauon}>47 days </Text>
        </View>
      </View>

      <View style={{marginTop: 25, paddingLeft: 23}}>
        <View style={styles.redbox}>
          <Text style={styles.Title}>Detected bad plants &nbsp; </Text>
          <Text style={styles.textIndentificauon}>Deadly Nightshade (48)</Text>
          <Text style={styles.textIndentificauon}>White snakeroot (73) </Text>
          <Text style={styles.textIndentificauon}>Water Hemlock (142) </Text>
        </View>
      </View>
    </View>
  );
};

export default FieldDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  Title: {
    textTransform: 'uppercase',
    color: '#757575',
    fontSize: 13,
    fontFamily: 'Oswald',
  },
  result: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '95%',
    paddingLeft: 23,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  textButton: {
    backgroundColor: '#F4F4F4',
    width: 110,
    textAlign: 'center',
    padding: 6,
    borderRadius: 3,
  },
  buttonLol: {
    backgroundColor: '#008C68',
    width: 120,
    color: 'white',
    textAlign: 'center',
    padding: 11,
    borderRadius: 3,
  },
  textIndentificauon: {
    fontSize: 17,
    marginTop: 5,
    color: '#4A4A4A',
    fontWeight: '700',
  },
  images: {
    justifyContent: 'center',
    width: '95%',

    height: 200,

    borderColor: '#00FFBC',

    borderWidth: 2,

    resizeMode: 'contain',
    borderRadius: 4,
    marginHorizontal: 20,
    marginTop: 25,
  },
});
