import React from 'react';
import {Picker, View, StyleSheet} from 'react-native';

const PickerList = props => {
  return (
    <View style={styles.card}>
      <Picker
        selectedValue={props.value}
        mode="dropdown"
        onValueChange={props.change}
        style={styles.picker}
        itemStyle={{
          backgroundColor: 'grey',
          color: 'blue',
          fontFamily: 'Ebrima',
          fontSize: 17,
        }}>
        {props.month.map((c, i) => (
          <Picker.Item
            label={c.Month}
            value={c.Date}
            key={i + 1}
            // color="#00A870"
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    color: '#00A870',
    borderWidth: 1,
    borderColor: '#00A870',
    width: 150,
    position: 'relative',
    top: -6,
  },
  card: {
    borderWidth: 1,
    width: 150,
    borderRadius: 5,
    height: 40,
    backgroundColor: '#EAFFF8',
    borderColor: 'transparent',
    marginTop: 10,
    marginLeft: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 5,
    marginBottom: 10,
  },
});

export default PickerList;
