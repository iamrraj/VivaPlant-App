import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  scoreContainer: {
    height: 330,
    backgroundColor: '#00A870',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 5,
  },
  ChartConatainer: {
    padding: 20,
    marginTop: 50,
  },
  chart: {
    height: 275,
    backgroundColor: 'white',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 5,
    marginBottom: 70,
  },
  RestView: {
    marginTop: 10,
    marginBottom: 10,
  },
  RestText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#061231',
    letterSpacing: 0.24,
  },
  may: {
    color: '#231F20',
    fontWeight: '400',
    fontSize: 13,
    position: 'relative',
    top: -32,
    left: 33,
  },
  Events: {
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingTop: 15,
    paddingLeft: 20,
    width: '70%',
    paddingBottom: 10,
  },
  textScore: {
    fontWeight: '400',
    fontSize: 17,
    color: 'black',
  },
  activeScore: {
    fontWeight: '700',
    fontSize: 17,
    textAlign: 'center',
    color: '#00A870',
    borderBottomColor: '#00A870',
    borderBottomWidth: 2,

    paddingBottom: 5,
  },
  Speedometer: {
    alignItems: 'center',
    position: 'relative',
    top: 45,
  },
  imagesTop: {
    position: 'absolute',
    top: -14,
    width: 195,
    height: 150,
  },

  speed: {
    position: 'absolute',
    top: 10,
  },
  scoreScire: {
    backgroundColor: 'white',
    height: 120,
    width: 120,
    borderRadius: 60,
    position: 'absolute',
    top: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  overallText: {
    fontWeight: '700',
    fontSize: 20,
    padding: 0,
    paddingLeft: 25,
    color: 'white',
  },
  yourScore: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
    top: 20,
    color: 'white',
  },
  scoreNumber: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
    height: 92,
    width: 92,
    borderRadius: 46,
    top: 14,
    left: 14,
  },
  scoreData: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 35,
    top: 10,
    color: 'black',
  },
  scoreColor: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    top: 5,
  },
  driverData: {
    position: 'relative',
    top: 70,
  },
  driverTotal: {
    fontSize: 18,

    fontWeight: '700',
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  driverScore: {
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E2F9F1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 5,
    width: 316,
    padding: 9,
    height: 53,
    top: 10,
    borderRadius: 3,
  },
  position: {
    borderRightWidth: 1,
    paddingRight: 20,
    borderColor: 'rgba(35, 31, 32, 0.25)',
    fontSize: 24,
    fontWeight: '700',
    paddingLeft: 10,
  },
  name: {
    width: '60%',
    fontSize: 18,
    fontWeight: '400',
    paddingLeft: 0,
    top: 5,
  },
  scoreDatadata: {
    borderRadius: 50,
    width: 30,
    height: 30,
    top: 3,
  },
  currentScore: {
    textAlign: 'center',
    top: 5,
    color: 'white',
  },
  driverPOsition: {
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    top: 95,
  },
  positionText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto',
    top: -4,
    paddingLeft: 10,
  },
});
