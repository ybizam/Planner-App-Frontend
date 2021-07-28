/*
  Group Members: Jasmine Tye (p2036137), Yuhanaa Binte Izam (p2002145)
*/

import React, { Component, useEffect } from 'react'
import axios from 'axios';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Alert, ScrollView } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import DayWeekMonthHeader from '../components/dayWeekMonthHeader';
import AddButton from '../components/addBtn';

//const hostname = '192.168.1.116';
const hostname = 'https://planner-app-backend-final.herokuapp.com';
const port = 3000;
const baseURL = `${hostname}:${port}`;

export default class Week extends Component {

  constructor(props) {
    super(props);

    this.state = {
      date: moment().format("DD-MM-YYYY"),
      data: [],
      isHidden: true
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () =>
        getTaskByDate(),
      250 // the 2 states are changed every second
    );

    const getTaskByDate = () => {
      axios.get(`${hostname}/task/${this.state.date}`, {params: {date: this.state.date}})
      .then((response) => {
        this.setState({
          data: response.data
        });
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

    const daysInWeek = [
      moment().format('dddd'), moment().add(1, 'd').format('dddd'), moment().add(2, 'd').format('dddd'),
      moment().add(3, 'd').format('dddd'), moment().add(4, 'd').format('dddd'),
      moment().add(5, 'd').format('dddd'), moment().add(6, 'd').format('dddd')
    ];

    const datesInWeek = [
      moment().format('DD-MM-YYYY'), moment().add(1, 'd').format('DD-MM-YYYY'),
      moment().add(2, 'd').format('DD-MM-YYYY'), moment().add(3, 'd').format('DD-MM-YYYY'),
      moment().add(4, 'd').format('DD-MM-YYYY'), moment().add(5, 'd').format('DD-MM-YYYY'),
      moment().add(6, 'd').format('DD-MM-YYYY')
    ];

    return (
      
      <View style={styles.container}>
        <ScrollView>
          <View style={{ backgroundColor: '#D484E1', marginBottom: 15 }}>

            <DayWeekMonthHeader navigation={navigation} />

            <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center', padding: 10, margin: 10 }}>
              <View style={styles.buttons}>
                <TouchableOpacity onPress={() => navigation.navigate('Day')}>
                  <Text style={styles.buttons}> Day   </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Week')}>
                  <Text style={[styles.buttons, styles.buttonSelected]}>Week</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Month')}>
                  <Text style={styles.buttons}>Month</Text>
                </TouchableOpacity>
              </View>
            </View>

            <DropDownPicker
              items={[
                { label: daysInWeek[0] + '\n' + datesInWeek[0], value: datesInWeek[0]},
                { label: daysInWeek[1] + '\n' + datesInWeek[1], value: datesInWeek[1]},
                { label: daysInWeek[2] + '\n' + datesInWeek[2], value: datesInWeek[2]},
                { label: daysInWeek[3] + '\n' + datesInWeek[2], value: datesInWeek[3]},
                { label: daysInWeek[4] + '\n' + datesInWeek[4], value: datesInWeek[4]},
                { label: daysInWeek[5] + '\n' + datesInWeek[5], value: datesInWeek[5]},
                { label: daysInWeek[6] + '\n' + datesInWeek[6], value: datesInWeek[6]},
              ]}
              placeholder="Select a Day"
              arrowSize={20}
              style={{ paddingVertical: 12, backgroundColor: '#f9edfb' }}
              placeholderStyle={{ textAlign: 'center', color: 'black', fontSize: 18 }}
              labelStyle={{ textAlign: 'center', fontSize: 18, color: 'black' }}
              containerStyle={{ height: 'auto', marginTop: 20 }}
              itemStyle={{ borderBottomWidth: 1, borderBottomColor: '#707070' }}
              dropDownStyle={{ backgroundColor: '#C486ED', paddingHorizontal: -20, minHeight: 450 }}
              onChangeItem={item => {
                this.setState({
                  date: item.value,
                  isHidden: false
                });
                console.log(this.state.date);
              }
              }

              dropDownMaxHeight={Dimensions.get("window").height / 1.5}
            />

            <View style={[styles.taskList, (this.state.data == 0) ? { marginTop: -25 } : { marginTop: 0 }]}>
              {
                this.state.isHidden ? (<View style={{ marginTop: Dimensions.get("screen").height / 4 }}><Text style={{
                  justifyContent: "center",
                  textAlignVertical: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                  height: "auto",
                  textAlign: "center",
                  fontSize: 24,
                }}>Select a date above!</Text></View>)
                  :
                  (this.state.data.map((item) => (
                    item == this.state.data[0] ? (
                    <TouchableOpacity style={{ marginTop: -25}} onPress={ () => {navigation.navigate('SelectedTask', { data: item.taskID });}}>
                      {(item.notes == null || item.notes == "" || item.notes == undefined) ? (
                        <View style={styles.timeTab} key={item.taskID}>
                          <Text style={{ flex: 1.5, backgroundColor: item.colorTag, fontSize: 18, padding: 15,     textAlign: 'center'}}>{moment(item.timeFrom, "HH:mm").format('LT')} - {item.timeTo}</Text>
                          <Text style={styles.taskTitleAlt}>{item.title}</Text>
                        </View>
                      ):(
                        <View style={styles.timeTab} key={item.taskID}>
                        <Text style={{ flex: 1.5, backgroundColor: item.colorTag, fontSize: 18, padding: 15 ,textAlign: 'center'}}>{moment(item.timeFrom, "HH:mm").format('LT')} - {item.timeTo}</Text>
                        <View style={{ flex: 5, flexDirection: 'column', backgroundColor: '#eac2f0', justifyContent: 'center', }}>
                          <Text style={styles.taskTitle}>{item.title}</Text>
                          <Text style={styles.note}>{item.notes}</Text>
                        </View>
                      </View>
                      )}
                    
                    </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={ () => {navigation.navigate('SelectedTask', { data: item.taskID });}}>
                      {(item.notes == null || item.notes == "" || item.notes == undefined) ? (
                        <View style={styles.timeTab} key={item.taskID}>
                          <Text style={{ flex: 1.5, backgroundColor: item.colorTag, fontSize: 18, padding: 15,     textAlign: 'center'}}>{moment(item.timeFrom, "HH:mm").format('LT')} - {moment(item.timeTo, "HH:mm").format('LT')}</Text>
                          <Text style={styles.taskTitleAlt}>{item.title}</Text>
                        </View>
                      ):(
                        <View style={styles.timeTab} key={item.taskID}>
                        <Text style={{ flex: 1.5, backgroundColor: item.colorTag, fontSize: 18, padding: 15 ,textAlign: 'center'}}>{moment(item.timeFrom, "HH:mm").format('LT')} - {moment(item.timeTo, "HH:mm").format('LT')}</Text>
                        <View style={{ flex: 5, flexDirection: 'column', backgroundColor: '#eac2f0', justifyContent: 'center', }}>
                          <Text style={styles.taskTitle}>{item.title}</Text>
                          <Text style={styles.note}>{item.notes}</Text>
                        </View>
                      </View>
                      )}
                    
                    </TouchableOpacity>
                    )
                    
                  ))
                  )
              }
            </View>
          </View>
        </ScrollView>

        <AddButton navigation={navigation} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D484E1',
  },

  taskList: {
    minHeight: 560
  },

  timeTab: {
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: -25,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1
  },

  taskTitle: {
    flex: 4,
    backgroundColor: '#eac2f0',
    fontSize: 18,
    paddingRight: 40,
    paddingLeft: 20,
    paddingTop: 15
  },

  taskTitleAlt: {
    flex: 4,
    backgroundColor: '#eac2f0',
    fontSize: 18,
    textAlignVertical: 'center',
    paddingRight: 40,
    paddingLeft: 20,
  },
  
  note: {
    fontSize: 18, 
    textAlignVertical: 'top', 
    color: 'grey',
    position: 'absolute',
    left: 20,
    bottom: 15,
  },

  checkbox: {
    backgroundColor: '#eac2f0',
    alignSelf: 'center',
    justifyContent: 'center',
    minHeight: 90,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 10,
    fontSize: 20,
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

  chosenLabel: {
    backgroundColor: '#9d53ce',
    borderRadius: 100,
    width: Dimensions.get("window").width / 3.5,
    paddingVertical: 10,
    alignItems: 'center'
  },

  textStyle: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
  },

  pickerStyle: {
    flex: 1,
    height: "auto",
    marginTop: 20,
    paddingVertical: 30,
    backgroundColor: '#f9edfb',
    justifyContent: 'center',
  },

  chooseWeek: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 'auto',
    height: 'auto',
    alignSelf: 'center',
  },

})
