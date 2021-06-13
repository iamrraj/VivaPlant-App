import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import Top from '../Top/Top';
import styles from '../Style/Score';
import PickerList from '../Picker/Picker';
import {getMonth} from '../../Service/Driver/Driver';
import {
  Chart,
  Line,
  HorizontalAxis,
  VerticalAxis,
} from 'react-native-responsive-linechart';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from '../../Service/Spinner/Spinner';
import {getScore} from '../../Service/Score/Score';
import Speedometer from 'react-native-speedometer-chart';

const Score = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [month, setMonth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [driver, setDrivewr] = useState([]);
  const [switcher, setwitcher] = useState('Score');

  const getDriverlist = () => {
    getScore(
      setDrivewr,
      setLoading,
      selectedValue ? selectedValue : '2020-10-03',
    );
  };

  const getMonthList = () => {
    getMonth(setMonth);
  };
  useEffect(() => {
    getMonthList();
    getDriverlist();
  }, [selectedValue]);

  const _onRefresh = () => {
    setLoading(true);
    getDriverlist();
  };

  const getValuefromDropDown = evt => {
    setLoading(true);
    setSelectedValue(evt);
  };

  const score = loading
    ? '...'
    : driver.chart.items.filter(c => c.title == 'Score');
  const events = loading
    ? '...'
    : driver.chart.items.filter(c => c.y_title == 'Events');

  const handleSwitcher = data => {
    setwitcher(data);
  };
  const ScoreData = loading
    ? '...'
    : score[0].values.map((d, i) => {
        return {x: i + 1, y: d};
      });
  const EventData = loading
    ? '...'
    : events[0].values.map((d, i) => {
        return {x: i + 1, y: d};
      });
  const main = switcher === 'Score' ? ScoreData : EventData;
  const dataSecrion = switcher === 'Score' ? score : events;
  var nums = loading ? '...' : driver.chart.xLabels;
  var indents = [];
  for (var i = 1; i < nums.length; i++) {
    indents.push(i);
  }
  const scoreNA = data =>
    data <= 2
      ? ['#85dd26', '#c8ed24']
      : data <= 5
      ? ['#ffc105', '#f29f06']
      : ['#b61c1c', '#8d0c0c'];

  return (
    <>
      <Top
        color={'#00A870'}
        color1={'white'}
        imageUri={require('../../../assets/Image/Logo1.png')}
      />
      {loading ? (
        <Spinner />
      ) : (
        <ScrollView
          style={styles.mainContainer}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={_onRefresh} />
          }>
          <View style={styles.scoreContainer}>
            <View style={styles.overall}>
              <Text style={styles.overallText}>Overall score</Text>
            </View>
            <Text style={styles.yourScore}>Your score</Text>
            <View style={styles.Speedometer}>
              <Image
                source={require('../../../assets/Image/circle.png')}
                style={styles.imagesTop}
              />
              <View styles={styles.speed}>
                <Speedometer
                  value={driver.value}
                  totalValue={10}
                  size={180}
                  style={styles.cirlcle}
                  outerColor="rgba(35, 31, 32, 0.2)"
                  internalColor="#0068A6"
                  percentStyle={{color: '#0068A6'}}
                />
              </View>
              <View style={styles.scoreScire}>
                <View style={styles.scoreNumber}>
                  <Text style={styles.scoreData}>
                    {driver.value ? driver.value.toFixed(1) : '-'}
                  </Text>
                  <Text style={[styles.scoreColor, {color: driver.color}]}>
                    {driver.label ? driver.label : '-'}
                  </Text>
                </View>
              </View>
              <View style={styles.driverData}>
                <Text style={styles.driverTotal}>
                  Your position (
                  {driver.total_drivers ? driver.total_drivers : '-'} Drivers)
                </Text>
                <View style={styles.driverScore}>
                  <Text style={styles.position}>
                    {driver.position ? driver.position : '-'}
                  </Text>
                  <Text style={styles.name}>
                    {driver.name ? driver.name : '-'}
                  </Text>

                  <LinearGradient
                    colors={scoreNA(driver.value)}
                    style={styles.scoreDatadata}>
                    <Text style={styles.currentScore}>
                      {driver.value ? driver.value.toFixed(0) : '-'}
                    </Text>
                  </LinearGradient>
                </View>
              </View>
              <View style={styles.driverPOsition}>
                <Text>
                  <AntDesign
                    name={
                      driver.change === 'positive' ? 'caretup' : 'caretdown'
                    }
                    color={driver.change === 'positive' ? '#00A870' : '#A1192E'}
                    size={15}
                    style={styles.icon}
                  />
                </Text>
                <Text style={styles.positionText}>
                  {driver.changed_position ? driver.changed_position : '-'}{' '}
                  Positions
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.ChartConatainer}>
            <View style={styles.card}>
              <PickerList
                month={month}
                change={evt => getValuefromDropDown(evt)}
                value={selectedValue}
              />
              <View style={styles.RestView}>
                <Text style={styles.RestText}>My Results </Text>
              </View>
              <View style={styles.chart}>
                <View style={styles.Events}>
                  <TouchableOpacity onPress={() => handleSwitcher('Score')}>
                    <Text
                      style={
                        switcher === 'Score'
                          ? styles.activeScore
                          : styles.textScore
                      }>
                      {score[0].title}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleSwitcher('Active')}>
                    <Text
                      style={
                        switcher === 'Active'
                          ? styles.activeScore
                          : styles.textScore
                      }>
                      {events[0].title}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Chart
                  style={{height: 220, width: 'auto'}}
                  padding={{left: 40, bottom: 60, right: 20, top: 15}}
                  xDomain={{min: 1, max: indents.slice(-1)[0]}}
                  yDomain={{min: 0, max: dataSecrion[0].max}}>
                  <VerticalAxis
                    tickCount={5}
                    theme={{
                      labels: {
                        formatter: v => v.toFixed(0),
                        label: {
                          color: '#000',
                          fontSize: 13,
                          fontWeight: 300,
                          textAnchor: 'middle',
                          opacity: 1,
                          dx: -15,
                          dy: 0,
                          rotation: 0,
                          fontFamily: 'your font here',
                        },
                      },
                      ticks: {visible: false},
                      axis: {visible: false},
                    }}
                  />
                  <HorizontalAxis
                    tickCount={5}
                    // tickValues={indents}
                    theme={{
                      labels: {
                        formatter: v => v.toFixed(0),
                        label: {
                          color: '#000',
                          fontSize: 13,
                          fontWeight: 300,
                          textAnchor: 'middle',
                          opacity: 1,
                          dx: 0,
                          dy: -25,
                          rotation: 0,
                          fontFamily: 'your font here',
                        },
                      },
                      grid: {visible: false},
                      ticks: {visible: false},
                      axis: {visible: false},
                    }}
                  />

                  <Line
                    smoothing="none"
                    data={main}
                    theme={{
                      stroke: {color: '#00A870', width: 3},
                      // scatter: {
                      //   default: {width: 8, height: 8, rx: 4, color: '#44ad32'},
                      //   selected: {color: 'red'},
                      // },
                    }}
                  />
                </Chart>
                <Text style={styles.may}>
                  {nums[0].split(' ')[1].toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Score;
