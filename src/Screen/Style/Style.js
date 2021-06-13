import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
export default StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderWidth: 0,
    // height: Dimensions.get('screen').height - 10,
    // width: Dimensions.get('screen').width,
    marginTop: 70,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 320,
    height: 200,

    borderColor: '#00F5B5',
    borderWidth: 1,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  images1: {
    width: 320,
    height: 150,
    borderColor: '#00F5B5',
    borderWidth: 1,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },

  btnSectionCancle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText1: {
    textAlign: 'center',
    color: '#00F5B5',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 55,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  btnTextCancle: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
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
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
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
