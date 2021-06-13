import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, RefreshControl} from 'react-native';
import Top from '../Top/Top';
import styles from '../Style/DriverStyle';
import {getDriver, getMonth} from '../../Service/Driver/Driver';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from '../../Service/Spinner/Spinner';
import PickerList from '../Picker/Picker';

const Driver = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [driver, setDrivewr] = useState([]);
  const [month, setMonth] = useState([]);

  const getDriverlist = () => {
    getDriver(
      setDrivewr,
      setLoading,
      selectedValue ? selectedValue : '2021-05-30',
    );
  };

  const getMonthList = () => {
    getMonth(setMonth);
  };
  useEffect(() => {
    getDriverlist();
    getMonthList();
  }, [selectedValue]);

  const _onRefresh = () => {
    setLoading(true);
    getDriverlist();
  };

  const getValuefromDropDown = evt => {
    setLoading(true);
    setSelectedValue(evt);
  };

  // const options = month.map(c => {
  //   return {value: c.id, label: c.name};
  // });

  const score = data =>
    data <= 2
      ? ['#85dd26', '#c8ed24']
      : data <= 5
      ? ['#ffc105', '#f29f06']
      : ['#b61c1c', '#8d0c0c'];

  return (
    <>
      <Top
        color={'white'}
        color1={'black'}
        imageUri={require('../../../assets/Image/Logo.png')}
      />

      <View style={styles.mainContainer}>
        <View style={styles.TextDropDown}>
          <View>
            <Text style={styles.driving_text}>Driving Record</Text>
          </View>

          <PickerList
            month={month}
            change={evt => getValuefromDropDown(evt)}
            value={selectedValue}
          />

          <View style={styles.table}>
            <Text style={styles.tableData2}>Date</Text>
            <Text style={styles.tableData}>Distance</Text>
            <Text style={styles.tableData}>Time </Text>
            <Text style={styles.tableData}>Score</Text>
          </View>
          {loading ? (
            <Spinner />
          ) : (
            <ScrollView
              style={styles.ScrollViewDriver}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={_onRefresh} />
              }>
              {driver.map((c, i) => (
                <View style={styles.table} key={i + 1}>
                  <Text style={styles.tableData11}>{c.date}</Text>
                  <Text style={styles.tableData1}>{c.mileage.toFixed(1)}</Text>
                  <Text style={styles.tableData1}>
                    {(c.duration / 60 / 60).toFixed(1)}
                    {' h'}
                  </Text>

                  <LinearGradient
                    colors={score(c.scores.speed.score)}
                    style={styles.scoreData}>
                    <Text style={styles.tableData1S}>
                      {c.scores.speed.score.toFixed(0)}
                    </Text>
                  </LinearGradient>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </>
  );
};

export default Driver;
