import React, {Fragment, Component} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Feather from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: null,
      preview: false,
      result: '',
    };
  }

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response,
          fileUri: response.uri,
        });
      }
    });
  };

  createFormData = photo => {
    const data = new FormData();

    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    return data;
  };

  submitData = () => {
    this.setState({
      preview: true,
    });

    fetch(`http://145.239.135.178:9000/api/predict/`, {
      method: 'POST',
      body: this.createFormData(this.state.fileUri),
    })
      .then(response => response.json())
      .then(response => {
        console.log('response', response);
        this.setState({
          result: response.result,
        });
        this.setState({
          preview: false,
        });
        this.props.navigation.navigate('Response', {
          name: 'Image Uploaded',
          image: this.state.fileUri.uri,
          result: response.result,
        });
      })
      .catch(error => {
        this.setState({
          preview: false,
        });
        console.log('error', error);
      });
  };

  launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response Cam', JSON.stringify(response));
        this.setState({
          fileUri: response.assets[0],
        });
      }
    });
  };

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('Source', source);
        console.log('response Lib', JSON.stringify(response));
        this.setState({
          fileUri: response.assets[0],
          fileData: response.data,
          // fileUri: response.uri,
        });
      }
    });
  };

  toggleOption = () => {
    this.setState({fileUri: ''});
  };
  renderFileData = () => {
    if (this.state.fileUri) {
      console.log('fileData', this.state.fileUri.uri);
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + this.state.fileUri.uri}}
          style={styles.images}
        />
      );
    } else {
      return (
        <Image
          source={require('../../../assets/Image/unnamed.png')}
          style={styles.images}
        />
      );
    }
  };

  renderFileUri = () => {
    if (this.state.fileUri) {
      console.log('fileUrl;', this.state.fileUri.uri);
      return (
        <Image source={{uri: this.state.fileUri.uri}} style={styles.images} />
      );
    }
  };

  render() {
    const navigation = this.props;
    return (
      <Fragment>
        <SafeAreaView>
          <View style={styles.body}>
            <Text
              style={{
                fontFamily: 'Oswald',
                textAlign: 'left',
                fontSize: 14,
                paddingBottom: 10,
                paddingLeft: 20,
                color: '#757575',
              }}>
              Upload Image
            </Text>
            <Text
              style={{
                fontFamily: 'Oswald',
                textAlign: 'left',
                fontSize: 16,
                paddingBottom: 10,
                paddingLeft: 20,
                color: '#4A4A4A',
                marginTop: -5,
              }}>
              Select an image from your camera or Gallery
            </Text>

            <Animatable.View animation="fadeInUpBig">
              <View style={styles.ImageSections}>
                {this.state.fileUri ? (
                  <View>{this.renderFileUri(this)}</View>
                ) : (
                  <TouchableOpacity onPress={this.launchImageLibrary}>
                    <View style={styles.images1}>
                      <Text style={styles.btnText1}>
                        <Feather name="upload" color="#00F5B5" size={14} />{' '}
                        &nbsp;Browse Image
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}

                {/* <View>
                {this.renderFileUri(this)}
                <Text style={{textAlign: 'center'}}>File Uri</Text>
              </View> */}
              </View>

              {this.state.fileUri ? (
                <View style={styles.btnParentSection}>
                  <LinearGradient
                    colors={['#00F5B5', '#00FFBC']}
                    style={styles.btnSection}>
                    <TouchableOpacity
                      onPress={() => this.submitData()}
                      disabled={this.state.preview}>
                      <Text style={styles.btnText}>
                        {' '}
                        <Feather name="send" color="white" size={14} /> &nbsp;
                        {this.state.preview ? 'Sending ...' : 'Submit Image'}
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>

                  <TouchableOpacity
                    onPress={this.toggleOption}
                    style={styles.btnSectionCancle}>
                    <Text style={styles.btnTextCancle}>
                      {' '}
                      <Feather name="remove" color="white" size={14} /> &nbsp;
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Oswald',
                        textAlign: 'left',
                        fontSize: 14,
                        paddingTop: 30,
                        paddingBottom: 5,
                        paddingLeft: 30,
                        color: '#757575',
                      }}>
                      Take Photo
                    </Text>
                  </View>

                  <View style={styles.btnParentSection}>
                    <LinearGradient
                      colors={['#00F5B5', '#00FFBC']}
                      style={styles.btnSection}>
                      <TouchableOpacity onPress={this.launchCamera}>
                        <Text style={styles.btnText}>
                          {' '}
                          <Feather name="camera" color="white" size={14} />{' '}
                          &nbsp;Camera
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </>
              )}
            </Animatable.View>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 10,
    width: Dimensions.get('screen').width,
    marginTop: -100,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 300,
    height: 200,

    borderColor: '#00F5B5',
    borderWidth: 1,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  images1: {
    width: 300,
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
  btnSection: {
    width: 300,
    height: 40,
    backgroundColor: '#00F5B5',
    alignItems: 'center',

    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
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
});

export default Home;
