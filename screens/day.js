/*
  Group Members: Jasmine Tye (p2036137), Yuhanaa Binte Izam (p2002145)
*/

import React, { useState, Component, useEffect } from "react";
import axios from 'axios';
import {
  Text, View, StyleSheet, Image, Dimensions,
  ScrollView, Switch, Alert, TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import DayWeekMonthHeader from '../components/dayWeekMonthHeader';
import AddButton from '../components/addBtn';

const hostname = 'https://planner-app-backend-final.herokuapp.com';
const port = 3000;
const baseURL = `${hostname}:${port}`;

const Separator = () => (
  <View style={styles.separator} />
);

export default class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () =>
        getTaskByDate(),
      250 // the 2 states are changed every second
    );

    const getTaskByDate = () => {
      axios.get(`${hostname}/task/${moment().format('DD-MM-YYYY')}`, { params: { date: moment().format('DD-MM-YYYY') } })
        .then((response) => {
          this.setState({
            data: response.data
          })
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
      <View style={{ marginBottom: -10 }}>
        <ScrollView>
          <DayWeekMonthHeader navigation={navigation} />

          <View style={styles.container}>
            <View style={styles.buttons}>
              <Text style={[styles.buttons, styles.buttonSelected]}>Day</Text>

              <TouchableOpacity onPress={() => navigation.navigate('Week')}>
                <Text style={styles.buttons}>Week</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Month')}>
                <Text style={styles.buttons}>Month</Text>
              </TouchableOpacity>
            </View>

            <Separator />
            {(this.state.data.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => { navigation.navigate('SelectedTask', { data: item.taskID }); }}>
                {(item.notes == null || item.notes == "" || item.notes == undefined) ? (
                  <View style={styles.task} key={item.taskID}>
                    <View style={{ backgroundColor: item.colorTag, flex: 0.15 }}></View>
                    <Text style={styles.taskTime}>{moment(item.timeFrom, "HH:mm").format('LT')} - {moment(item.timeTo, "HH:mm").format('LT')}</Text>
                    <Text style={styles.taskTitleAlt}>{item.title}</Text>
                  </View>
                ) : (
                    <View style={styles.task} key={item.taskID}>
                      <View style={{ backgroundColor: item.colorTag, flex: 0.15 }}></View>
                      <Text style={styles.taskTime}>{moment(item.timeFrom, "HH:mm").format('LT')} - {moment(item.timeTo, "HH:mm").format('LT')}</Text>
                      <Text style={styles.taskTitle}>{item.title}</Text>
                      <Text style={styles.taskDetail}>{item.notes}</Text>
                    </View>
                  )}

              </TouchableOpacity>
            ))
            )
            }

          </View>

        </ScrollView>
        <AddButton navigation={navigation} />
      </View>
    )
  }
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D484E1',
    padding: 10,
    minHeight: Dimensions.get("window").height,
    marginBottom: 5
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  buttonSelected: {
    color: 'white',
    paddingHorizontal: 35,
    marginLeft: 5,
    backgroundColor: "rgba(101, 34, 187, 0.5)",
    borderRadius: 100 / 5,
  },
  separator: {
    marginVertical: 5
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: -10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1
  },
  taskAlt: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)'
  },
  taskTitle: {
    flex: 4,
    fontSize: 19,
    paddingVertical: 35,
    marginTop: -10,
    alignItems: 'center',
  },
  taskTitleAlt: {
    flex: 4,
    fontSize: 19,
    paddingVertical: 35,
    alignItems: 'center',
  },
  taskDetail: {
    fontSize: 17.5,
    position: 'absolute',
    left: 140,
    bottom: 23,
    color: 'gray',
  },
  taskTime: {
    flex: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 25,
    fontSize: 20,
    textAlign: 'center'
  },
});
