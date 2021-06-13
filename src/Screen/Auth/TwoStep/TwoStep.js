import React from 'react';
import {
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from '../../Style/LoginStyle';

const TwoStep = () => {
  const [opt, setOpt] = useState('');
  const [broswer, setbrowser] = useState(false);
  const handleChange = e => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setOpt(e.target.value);
    }
  };
  return (
    <>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.imageClass}>
          <Image
            source={require('../../../../assets/Image/Logo.png')}
            style={styles.images}
          />
          <View style={{marginTop: 30}}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>
              Forget Password
            </Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                width: 330,
                marginTop: 10,
                marginBottom: -30,
              }}>
              Enter your correct email to get forget password link on youe email
              id
            </Text>
          </View>
        </View>
        <View style={styles.loginSection}>
          <View>
            <Text style={styles.text_footer}>Email Id</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Write your email "
                style={styles.textInput}
                autoCapitalize="none"
                value={opt}
                onChangeText={handleChange}
              />
            </View>
          </View>

          <View style={(styles.password, {marginTop: 20})}>
            <TouchableOpacity style={styles.Forget}>
              <Text style={styles.ForgetText}>Request Code</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 40}}>
            <TouchableOpacity style={styles.btnSection}>
              <Text style={styles.btnText}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default TwoStep;
