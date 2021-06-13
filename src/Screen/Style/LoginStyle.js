import {StyleSheet, Dimensons} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageClass: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 100,
  },
  loginSection: {
    width: '100%',
    margin: 0,
    paddingHorizontal: 30,
    paddingVertical: 0,
  },
  textInput: {
    borderBottomColor: '#00A870',
    borderColor: 'white',
    borderWidth: 1,
    fontSize: 16,
  },
  text_footer: {
    color: '#00A870',
    fontSize: 14,
    textTransform: 'uppercase',
    marginBottom: 0,
  },
  password: {
    marginVertical: 50,
  },
  openClose: {
    alignItems: 'flex-end',
    position: 'relative',
    top: -30,
  },
  Forget: {
    alignItems: 'flex-end',
    position: 'relative',
    top: -6,
  },
  ForgetText: {
    color: '#00A870',
    fontSize: 16,
    fontWeight: '700',
  },
  btnSection: {
    height: 40,
    backgroundColor: '#00F5B5',
    justifyContent: 'center',
    borderRadius: 3,
    marginVertical: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
