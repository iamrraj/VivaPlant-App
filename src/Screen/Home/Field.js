import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const data = [
  {
    image: '../../../assets/Image/used.png',
  },
  {
    image: '../../../assets/Image/used.png',
  },
];

function Field({navigation}) {
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.mainImage}>
          {data.map(c => (
            <TouchableOpacity
              tyle={styles.ImageClass}
              onPress={() =>
                navigation.navigate('Details', {
                  name: 'Details Data 1',
                })
              }>
              <Image
                source={require('../../../assets/Image/used.png')}
                style={styles.images}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default Field;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    width: '100%',
  },
  ImageClass: {
    marginTop: 30,
  },
  mainImage: {
    justifyContent: 'center',

    width: '95%',
    paddingTop: 20,
    paddingLeft: 23,
  },

  images: {
    width: '100%',

    height: undefined,
    aspectRatio: 1,
    borderColor: '#00FFBC',
    flex: 1,
    borderWidth: 2,
    resizeMode: 'contain',
    borderRadius: 4,
    marginHorizontal: 3,
    marginBottom: 25,
  },
});
