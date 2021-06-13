import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  TextDropDown: {
    width: Dimensions.get('window').width - 50,
    marginLeft: 25, // Use margins as you required
    marginRight: 25,
    marginTop: 20,
  },
  driving_text: {
    fontWeight: '700',
    fontSize: 24,
  },

  pickerIcon: {
    color: '#00A870',
    position: 'absolute',
    bottom: 15,
    right: 10,
    fontSize: 20,
  },
  table: {
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingTop: 10,
    borderBottomColor: 'rgba(35, 31, 32, 0.2)',
    borderWidth: 1,
    borderColor: 'white',
    paddingBottom: 10,
  },

  tableData: {
    color: '#00A870',
    fontSize: 14,
    fontWeight: '700',
  },
  tableData2: {
    width: '29%',
    color: '#00A870',
    fontSize: 14,
    fontWeight: '700',
  },
  tableData11: {
    width: '29%',
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
  },
  tableData1: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 6,
    textAlign: 'center',
  },
  tableData1S: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
    textAlign: 'center',
  },
  scoreData: {
    borderRadius: 50,
    width: 30,
    height: 30,

    color: 'white',
  },
  ScrollViewDriver: {
    marginBottom: 190,
  },
});
