import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  startButton: {
    alignItems: 'center',
    top: 50,
  },
  drivingSection: {
    alignItems: 'center',
    top: 110,
  },
  distnceSection: {
    alignItems: 'center',
    top: 150,
  },
  manualModel: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Roboto',
  },
  startButtonSection: {
    width: 164,
    height: 164,
    borderRadius: 82,

    top: 15,
  },
  startButtonClick: {
    width: 144,
    height: 144,
    borderRadius: 72,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.75)',
    top: 10,
    left: 10,
  },
  startButtonText: {
    color: 'white',
    textAlign: 'center',
    top: 41,
    fontSize: 40,
    fontWeight: '700',
  },
  driving: {
    fontSize: 19,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: 'black',
  },
  drivingTimefinish: {
    fontSize: 36,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: 'white',
  },
  drivingTime: {
    fontSize: 36,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: '#00A870',
  },
  drivingTimeStop: {
    fontSize: 36,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: '#A1192E',
  },
  distanceTime: {
    color: 'black',
  },
  scoreContainer: {
    height: 500,
    backgroundColor: '#00A870',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 5,
  },
  TripText: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    top: 60,
  },
  closeButton: {
    width: 120,
    borderColor: 'white',
    borderWidth: 2,
    padding: 10,
    top: 30,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
