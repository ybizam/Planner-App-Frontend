/*
  Group Members: Jasmine Tye (p2036137), Yuhanaa Binte Izam (p2002145)
*/

import React, { useState, Component } from "react";
import axios from 'axios';
import moment from 'moment';
import {
  Text, View, StyleSheet, Image, Dimensions,
  ScrollView, Switch, Alert, TouchableOpacity
} from 'react-native';
import DayWeekMonthHeader from '../components/dayWeekMonthHeader';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import AddButton from '../components/addBtn';

const hostname = 'https://planner-app-backend-final.herokuapp.com';
const port = 3000;
const baseURL = `${hostname}:${port}`;

const Separator = () => (
  <View style={styles.separator} />
);

const TimeSeparator = () => (
  <View style={styles.timeSeparator} />
);

export default class Month extends Component {


  constructor(props) {
    super(props);

    this.state = {
      data: [],
      calendarDate: moment().format('YYYY-MM-DD'),
      formattedDate: moment().format('DD-MM-YYYY'),
      begin: moment().format("YYYY-MM-01"),
      isHidden: false
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () =>
        getTaskByDate(),
      250 // the 2 states are changed every second
    );

    const getTaskByDate = () => {
      axios.get(`${hostname}/task/${this.state.formattedDate}`, {params: {date: this.state.formattedDate}})
      .then((response) => {
          this.setState({
            data: response.data
          })
          
          console.log(this.state.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
  
  //---runs before the component is removed---
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ backgroundColor: '#D484E1' }}>

            <DayWeekMonthHeader navigation={navigation} />

          </View>

          <View style={[styles.container, { padding: 10 }]}>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => navigation.navigate('Day')}>
                <Text style={styles.buttons}>Day</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Week')}>
                <Text style={styles.buttons}>Week</Text>
              </TouchableOpacity>

              <Text style={[styles.buttons, styles.buttonSelected]}>Month</Text>
            </View>

            <Separator />

            <Calendar
              current={this.state.calendarDate}
              minDate={this.state.begin}
              style={styles.calendar}
              markedDates={{
                [this.state.calendarDate]: { selected: true, startingDay: true, endingDay: true, color: 'rgba(101, 34, 187, 0.5)' },
              }}
              markingType={'period'}
              theme={{
                arrowColor: 'rgba(101, 34, 187, 0.5)'

              }}
              onDayPress={(day) => {
                var dayObj = JSON.stringify(day);
                console.log("Selected day: " + JSON.stringify(day));
                var calendarDate = day.dateString;
                var formattedDate = moment(day.dateString).format("DD-MM-YYYY");
                this.setState({
                  calendarDate: calendarDate,
                  formattedDate: formattedDate
                })
                console.log(this.state.calendarDate);
                console.log(this.state.formattedDate);
              }}
            />

            <Separator />
            <Separator />
            <Separator />
            <Text style={{
              padding: 10,
              marginLeft: 15,
              fontSize: 20,
            }}>Schedule List:</Text>
            <Separator />
            {
              this.state.isHidden ? (
                <View><Text style={{
                  padding: 5,
                  paddingHorizontal: 10,
                  marginLeft: 15,
                  fontSize: 18,
                }}>There are no tasks for this date.</Text></View>
              ) :
                this.state.data.map(function (item) {
                  if (item.notes == null) {
                    return <View key={item.taskID}>
                      <View style={styles.task} >
                        <Text style={styles.taskTime}>{moment(item.timeFrom, "HH:mm").format('LT')} - {moment(item.timeTo, "HH:mm").format('LT')}</Text>
                        <TimeSeparator />
                      </View>
                      <View style={styles.task}>
                        <View style={{ backgroundColor: item.colorTag, flex: 0.1, marginRight: 20 }}></View>
                        <Text style={styles.taskNote}>{item.title}</Text>
                      </View>
                    </View>
                  } else {
                    return <View key={item.key}>
                      <View style={styles.task}>
                        <Text style={styles.taskTime}>{moment(item.timeFrom, "HH:mm").format('LT')} - {moment(item.timeTo, "HH:mm").format('LT')}</Text>
                        <TimeSeparator />
                      </View>
                      <View style={styles.task}>
                        <View style={{ backgroundColor: item.colorTag, flex: 0.1, marginRight: 20 }}></View>
                        <Text style={[styles.taskNote, styles.noteWithDet]}>{item.title}</Text>
                        <Text style={styles.taskDetail}>{item.notes}</Text>
                      </View>

                    </View>
                  }
                })
            }
          </View>

        </ScrollView>
        <AddButton navigation={navigation} />
      </View>
    );
  }


};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D484E1',
    minHeight: Dimensions.get("window").height,
    marginBottom: 60
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 20,
    fontSize: 20,
    textTransform: 'uppercase'
  },
  buttonSelected: {
    color: 'white',
    paddingHorizontal: 15,
    marginHorizontal: 5,
    backgroundColor: "rgba(101, 34, 187, 0.5)",
    borderRadius: 100 / 5
  },
  separator: {
    marginVertical: 5
  },
  calendar: {
    marginHorizontal: -10
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginLeft: 30,
    marginBottom: 5,
  },
  taskNote: {
    flex: 2,
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontSize: 20,
    paddingRight: 40
  },
  noteWithDet: {
    paddingTop: 10,
    paddingBottom: 30,
    paddingRight: 40
  },
  taskDetail: {
    fontSize: 17.5,
    position: 'absolute',
    bottom: 7.5,
    left: 54,
    color: '#424242',
  },
  taskTime: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingTop: 10,
    fontSize: 20,
    textAlign: 'left'
  },
  timeSeparator: {
    flex: 1,
    alignSelf: 'center',
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 3
  }
});